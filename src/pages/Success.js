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
  const {setCartItems, cartItems} = useContext(MenuContext)
  const [taskComplete, setTaskComplete] = useState(false)
  const [listItems, setListItems] = useState({})
  const count = useRef(0)

  useEffect(() => {
    if(Object.keys(cartItems).length){
      if(taskComplete === true){
        setCartItems(prevCartItems => {
          const tempCartItems = {...prevCartItems}
          delete tempCartItems[Object.keys(prevCartItems)[0]]
          return tempCartItems
        })
        setListItems(prevCartItems => {
            const tempCartItems = {...prevCartItems}
            tempCartItems[Object.keys(tempCartItems)[count.current]] &&
            (tempCartItems[Object.keys(tempCartItems)[count.current]].downloaded = "Downloaded")
            count.current += 1
            return tempCartItems
          }
        )
      }
      setTaskComplete(false)
    }
    if(!Object.keys(cartItems).length){
      localStorage["uuid"] = ""
    }
  }, [taskComplete, cartItems, setCartItems, setListItems])

  useEffect(() => {
    setListItems(JSON.parse(localStorage["cartItems"]))
  }, [setListItems])

  // console.log(cryptoJs.SHA256(params.id).toString() === localStorage["uuid"])
  // Once you empty the cart set the local storage uuid to nothing
  // Keep coming soon for the ship button and quantity
  // Add fill form functionality
  return (
    <div>Success</div>
  )
}
