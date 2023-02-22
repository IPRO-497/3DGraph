import fetch from 'node-fetch'

const handler = async (event) => {
  try {
    const name = event.queryStringParameters.name
    const year = parseInt(event.queryStringParameters.year)
    let reply
    const query = `
      query User($login: String!, $from: DateTime, $to: DateTime) {
        user(login: $login) {
          login
          contributionsCollection(from: $from, to: $to){
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      }
    `
    const variables = `
      {
        "login": "${name}",
        "from": "${year}-01-01T00:00:00.000Z",
        "to": "${year+1}-01-01T00:00:00.000Z"
      }
    `

    const Authorization = `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`

    const body = {
      query,
      variables
    }
    await fetch('https://api.github.com/graphql', {method: "POST", body: JSON.stringify(body), headers: {
      "Authorization": Authorization
    }})
    .then(response => response.json())
    .then(response => {
      reply = response
    })
    return {
      statusCode: 200,
      body: JSON.stringify(reply),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }