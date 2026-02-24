async function main() {

  const query = getGraphqlQuery();

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query
    })
  });

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  console.log(JSON.stringify(data));
  return data;
}

function getGraphqlQuery() {
  return `
    query {
      search(
        query: "stars:>50000"
        type: REPOSITORY
        first: 100
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
          }
        }
      }
    }
  `;
}

main();