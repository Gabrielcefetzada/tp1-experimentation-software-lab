import fs from 'fs';

async function query() {
  let hasNextPage = true;
  let cursor = null;
  let allRepos = [];
  const targetCount = 1000; 
  const pageSize = 10;

  console.log("Iniciando busca...");

  while (hasNextPage && allRepos.length < targetCount) {
    try {
      const query = getGraphqlQueryWithCursor(pageSize, cursor);
      const response = await fetchGithubApi(query);

      if (!response.ok) {
        console.error(`\nErro HTTP ${response.status}`);
        break;
      }

      const data = await response.json();

      const pageData = data.data.search;
      allRepos = [...allRepos, ...pageData.nodes];
      hasNextPage = pageData.pageInfo.hasNextPage;
      cursor = pageData.pageInfo.endCursor;

      console.log(`Progresso: ${allRepos.length}/${targetCount} coletados.`);

    } catch (err) {
      console.error('Erro:', err.message);
    }
  }

  console.log("\nBusca finalizada.");
  
  return allRepos;
}

function getGraphqlQueryWithCursor(first, cursor) {
  const afterParam = cursor ? `, after: "${cursor}"` : '';
  return `
    query {
      search(query: "stars:>2000", type: REPOSITORY, first: ${first}${afterParam}) {
        nodes {
          ... on Repository {
            name
            owner { login }
            primaryLanguage { name }
            createdAt
            updatedAt
            releases { totalCount }
            pullRequests(states: MERGED) { totalCount }
            totalIssues: issues { totalCount }
            closedIssues: issues(states: CLOSED) { totalCount }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;
}

async function fetchGithubApi(query) {
  return await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Vladimir Ilyich Ulianov'
      },
      body: JSON.stringify({ query })
    });
}

function saveMetricsAtCSV(repos) {
  if (repos.length === 0) return;

  const processedRepos = repos.map(repo => ({
    ...repo,
    ageInDays: calculateAgeInDays(repo.createdAt),
    daysSinceLastUpdate: calculateDaysSinceLastUpdate(repo.updatedAt),
    closedIssuesRatio: calculateCloseIssuesRatio(repo)
  }));

  const metrics = buildMetrics(processedRepos);
  const csvContent = generateCSV(metrics);
  
  fs.writeFileSync('repository_metrics.csv', csvContent);
  console.log("Arquivo 'repository_metrics.csv' gerado com sucesso");
}

function calculateAgeInDays(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function calculateDaysSinceLastUpdate(updatedAt) {
  const updated = new Date(updatedAt);
  const now = new Date();
  const diffTime = Math.abs(now - updated);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function calculateCloseIssuesRatio(repo){
  return repo.totalIssues?.totalCount > 0 
      ? (repo.closedIssues?.totalCount / repo.totalIssues.totalCount) * 100 
      : 0;
}

function buildMetrics(repos) {
  const extractValues = (path) => repos.map(r => r[path]?.totalCount || 0);
  
  return {
    "Releases": extractValues('releases'),
    "Pull Requests Mergeados": extractValues('pullRequests'),
    "Total de Issues": extractValues('totalIssues'),
    "Issues Fechadas": extractValues('closedIssues'),
    "Idade do Repositório (dias)": repos.map(r => r.ageInDays || 0),
    "Dias desde última atualização": repos.map(r => r.daysSinceLastUpdate || 0),
    "Percentual de Issues Fechadas": repos.map(r => r.closedIssuesRatio || 0),
    "Linguagem Primária": repos.map(r => r.primaryLanguage?.name || 'Não especificada')
  };
}

function generateCSV(metrics) {
  let csvContent = "Métrica,Valor (Média/Moda)\n";
  
  for (const [name, values] of Object.entries(metrics)) {
    if (name === "Linguagem Primária") {
      const mode = calculateMode(values);
      csvContent += `${name},${mode.valor} (${mode.quantidade} ocorrências - ${mode.percentual}%)\n`;
    } else {
      const average = calculateAverage(values).toFixed(2);
      csvContent += `${name},${average}\n`;
    }
  }
  
  return csvContent;
}

function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateMode(arr) {
  const count = {};
  let maxCount = 0;
  let mode = arr[0];
  
  arr.forEach(item => {
    count[item] = (count[item] || 0) + 1;
    if (count[item] > maxCount) {
      maxCount = count[item];
      mode = item;
    }
  });
  
  const percentual = ((maxCount / arr.length) * 100).toFixed(2);
  
  return {
    valor: mode,
    quantidade: maxCount,
    percentual: percentual
  };
}

const repos = await query();
saveMetricsAtCSV(repos);