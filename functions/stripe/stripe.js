const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET)

const handler = async (event) => {
  const items = JSON.parse(event.body)
  const lineItems = []
  for(const item of Object.values(items)){
    if(item.download)lineItems.push({
      // price: "price_1MrsfJI1aNradUj24XS9HdlY",
      price: "price_1Mrs1tI1aNradUj20Eei7uzm",
      quantity: 1
    })
    if(item.ship)lineItems.push({
      // price: "price_1MrsfJI1aNradUj24XS9HdlY",
      price: "price_1Mrs1tI1aNradUj20Eei7uzm",
      quantity: parseInt(item.quantity)
    })
  }
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${event.queryStringParameters.origin}/success`,
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