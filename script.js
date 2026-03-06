import fs from 'fs';

async function query() {
  let hasNextPage = true;
  let cursor = null;
  let allRepos = [];
  const targetCount = 30; 
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
      console.error('Erro inesperado:', err.message);
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

  const metrics = buildMetrics(repos);
  const csvContent = generateCSV(metrics);
  
  fs.writeFileSync('repository_metrics.csv', csvContent);
  console.log("Arquivo 'repository_metrics.csv' gerado com sucesso");
}

function buildMetrics(repos) {
  const extractValues = (path) => repos.map(r => r[path]?.totalCount || 0);
  
  return {
    "Releases": extractValues('releases'),
    "Pull Requests Mergeados": extractValues('pullRequests'),
    "Total de Issues": extractValues('totalIssues'),
    "Issues Fechadas": extractValues('closedIssues')
  };
}

function generateCSV(metrics) {
  let csvContent = "Metrica,Média\n";
  
  for (const [name, values] of Object.entries(metrics)) {
    const average = calculateAverage(values).toFixed(2);
    csvContent += `${name},${average}\n`;
  }
  
  return csvContent;
}

function calculateAverage(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

const repos = await query();
saveMetricsAtCSV(repos)
