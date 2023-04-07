import fetch from 'node-fetch'

const handler = async (event) => {
  try {
    let reply
    const name = event.queryStringParameters.name

    await fetch(`https://gitlab.com/users/${name}/calendar.json`, {method: "GET"})
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