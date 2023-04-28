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
    <Container>
      <div className='cart'>
        <h1>Success!</h1>
        <p>Thank you for purchasing.</p>
        <ul className='cart-items'>
          {Object.keys(listItems).map((item, key) =>
            <CartItem
              parameters={{
                name:listItems[item].name,
                year:listItems[item].year,
                website:listItems[item].website,
                model:listItems[item].model,
                ship:listItems[item].ship,
                download:listItems[item].download,
              }}
              downloader={true}
              downloaded={listItems[item].downloaded}
              key={key}
            />
          )}
        </ul>
      </div>
      { cryptoJs.SHA256(params.id).toString() === localStorage["uuid"] &&
        (
          cartItems[[Object.keys(cartItems)[0]]]?.website.toLowerCase() === "github" ?
            <Github
              name={cartItems[Object.keys(cartItems)[0]].name}
              year={cartItems[Object.keys(cartItems)[0]].year}
              taskComplete={taskComplete}
              setTaskComplete={setTaskComplete}
              success={true}
            /> :
          cartItems[Object.keys(cartItems)[0]]?.website.toLowerCase() === "leetcode" ?
            <LeetCode
              name={cartItems[Object.keys(cartItems)[0]].name}
              year={cartItems[Object.keys(cartItems)[0]].year}
              taskComplete={taskComplete}
              setTaskComplete={setTaskComplete}
              success={true}
            /> :
          cartItems[Object.keys(cartItems)[0]]?.website.toLowerCase() === "gitlab" ?
            <GitLab
              name={cartItems[Object.keys(cartItems)[0]].name}
              success={true}
              taskComplete={taskComplete}
              setTaskComplete={setTaskComplete}
            /> : null
          )
        }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3em;
  height: 100%;
  width: 100%;
  .cart{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 50em;
    padding: 3em 3em 3em 3em;
    background-color: #fafafa;
    border-radius: 0.2em;
    h1{
      width: 100%;
      text-align: center;
      margin-bottom: 0.2em;
    }
    > p{
      width: 100%;
      text-align: center;
      margin-bottom: 3em;
    }
    .cart-items{
      padding-top: 1.6em;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
    >div{
      margin: 0;
      padding: 0;
      height: 0;
      width: 0;
    }
  }
`