import { useParams } from 'react-router-dom'
import { Github } from './Github'
import { useContext, useEffect, useState, useRef } from 'react'
import { MenuContext } from '../hooks/MenuHook'
import cryptoJs from 'crypto-js'
import { LeetCode } from './LeetCode'
import { GitLab } from './GitLab'
import styled from 'styled-components'
import { CartItem } from '../components/CartItem'

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
