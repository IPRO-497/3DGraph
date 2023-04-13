const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET)

const handler = async (event) => {
  const items = JSON.parse(event.body)
  const lineItems = []
  for(const item of Object.values(items)){
    console.log(process.env.REACT_APP_GITHUBCD)
    if(item.download){
      if(item.model.toLowerCase() === "contribution"){
        if(item.website.toLowerCase() === "github")lineItems.push({
          price: process.env.REACT_APP_GITHUBCD,
          quantity: 1
        })
        if(item.website.toLowerCase() === "gitlab")lineItems.push({
          price: process.env.REACT_APP_GITLABCD,
          quantity: 1
        })
        if(item.website.toLowerCase() === "leetcode")lineItems.push({
          price: process.env.REACT_APP_LEETCODECD,
          quantity: 1
        })
      }
    }
    else if(item.ship){
      if(item.model.toLowerCase() === "contribution"){
        if(item.website.toLowerCase() === "github")lineItems.push({
          price: process.env.REACT_APP_GITHUBCS,
          quantity: item.quantity
        })
        if(item.website.toLowerCase() === "gitlab")lineItems.push({
          price: process.env.REACT_APP_GITLABCS,
          quantity: item.quantity
        })
        if(item.website.toLowerCase() === "leetcode")lineItems.push({
          price: process.env.REACT_APP_LEETCODECS,
          quantity: item.quantity
        })
      }
    }
  }
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${event.queryStringParameters.origin}/success/${items.guid}`,
    cancel_url: `${event.queryStringParameters.origin}/cancel`
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: session.url
    })
  }
}

module.exports = { handler }