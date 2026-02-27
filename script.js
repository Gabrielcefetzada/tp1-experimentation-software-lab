async function main() {
  let hasNextPage = true;
  let cursor = null;
  let allRepos = [];
  const pageSize = 10;
    
  while (hasNextPage && allRepos.length < 100) {
    const query = getGraphqlQueryWithCursor(pageSize, cursor);
  
    const response = await fetchGithubApi(query);

    const data = await response.json();
    
    if (data.errors) {
      console.error('Erro: ', data.errors);
      break;
    }

    const pageData = data.data.search;
    allRepos = [...allRepos, ...pageData.nodes];
    hasNextPage = pageData.pageInfo.hasNextPage;
    cursor = pageData.pageInfo.endCursor;    
  }

  console.log(JSON.stringify({ data: { search: { nodes: allRepos } } }, null, 2));
  return { data: { search: { nodes: allRepos } } };
}

function getGraphqlQueryWithCursor(first = 20, cursor = null) {
  const afterParam = cursor ? `after: "${cursor}"` : '';
  
  return `
    query {
      search(
        query: "stars:>50000"
        type: REPOSITORY
        first: ${first}
        ${afterParam}
      ) {
        nodes {
          ... on Repository {
            name
            owner {
              login
            }
            description
            createdAt
            updatedAt  
            releases {
              totalCount
            }
            pullRequests {
              totalCount
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
}

async function fetchGithubApi(query)
{
  return response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js-App'
      },
      body: JSON.stringify({ query })
    });
}

main();
