import React from 'react'
import { useParams } from 'react-router-dom'
import cryptoJs from 'crypto-js'

export const Success = () => {
  const params = useParams()
  console.log(cryptoJs.SHA256(params.id).toString() === localStorage["uuid"])
  // Once you empty the cart set the local storage uuid to nothing
  // Keep coming soon for the ship button and quantity
  // Add fill form functionality
  return (
    <div>Success</div>
  )
}
