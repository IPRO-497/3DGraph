import { useContext, useEffect } from "react"
import { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { MenuContext } from "../hooks/MenuHook"

export const Form = ({setPreview, setData}) => {
  const yearDiff = new Array(10).fill(0)
  const currYear = new Date().getFullYear()
  const [name, setName] = useState("")
  const [yearHide, setYearHide] = useState(false)
  const form = useRef()
  const navigate = useNavigate()
  const locate = useLocation()
  const location = locate.pathname
  const [type, setType] = useState()
  const {addToCart} = useContext(MenuContext)

  useEffect(() => {
    if(location === "/")setType("home")
    else if(location === "/item")setType("item")
  }, [location])

  const getParams = () => {
    const parameters = {}
    for(let i = 0; form.current[i]; i++){
      if(form.current[i].tagName !== "BUTTON" && form.current[i].type !== "checkbox"){
        parameters[form.current[i].id] = form.current[i].value
      }else{
        parameters[form.current[i].id] = form.current[i]
      }
    }
    return parameters
  }

  const submitForm = (e) => {
    e.preventDefault()
    const parameters = getParams()
    if(parameters.name && parameters.website === "GitLab"){
      navigate(`/${parameters.website.toLowerCase()}/${parameters.name.toLowerCase()}`)
    }
    if(parameters.name && parameters.year && parameters.website){
      navigate(`/${parameters.website.toLowerCase()}/${parameters.name.toLowerCase()}/${parameters.year}`)
    }
  }
  
  const Preview = (e) => {
    e.preventDefault()
    const parameters = getParams()
    setData({
      "website": parameters.website,
      "name": parameters.name,
      "year": parameters.year
    })
    setPreview(true)
  }

  const addCart = (e) => {
    e.preventDefault()
    addToCart(getParams())
  }

  useEffect(() => {
    const formChange = (e) => {
      const parameters = getParams()
      if(parameters["website"] === "GitLab")setYearHide(true)
      else setYearHide(false)
      if(parameters["preview"]){
        if(parameters.name && parameters.website !== "default" && parameters.preview){
          parameters["preview"].disabled = false
        }else{
          parameters["preview"].disabled = true
        }
      }
      if(parameters["cart"]){
        if(!parameters["preview"].disabled && (parameters.download.checked || (parameters.ship.checked && parameters.quantity.length))){
          parameters["cart"].disabled = false
        }else parameters["cart"].disabled = true
      }
    }

    const formCurrent = form?.current
    formCurrent.addEventListener("change", formChange)
    return () => {
      formCurrent?.removeEventListener("change", formChange)
    }
  }, [])

  return (
    <Container ref={form}>
      {type === "item" && <h1>Add Item</h1>}
      <label htmlFor="name">
        Username
        <input type="text"
          id="name"
          placeholder="tayomide"
          onChange={e => setName(e.target.value.trim())}
          value={name}
        />
      </label>
      <label htmlFor="year">
        Year
        <select name="year" id="year" defaultValue={currYear - 1}>
          {yearDiff.map((num, diff) => <option value={currYear - diff} key={diff}>{currYear - diff}</option>)}
        </select>
      </label>
      <label htmlFor="website">
        Website
        <select name="website" id="website" defaultValue="default">
          <option value="default" disabled hidden>xyz.com</option>
          <option value="LeetCode">LeetCode</option>
          <option value="GitHub">GitHub</option>
        </select>
      </label>
      <label htmlFor="data-type">
        Data Type
        <select name="data-type" id="data-type" defaultValue="contribution">
          <option value="contribution">Contribution</option>
        </select>
      </label>
      
      {type === "item" && <>
        <label htmlFor="quantity">
          Quantity
          <input type="number" id="quantity" placeholder="1" />
        </label>
        <label htmlFor="download">
          Download Model
          <input id="download" type="checkbox" />
        </label>
        <label htmlFor="ship">
          Order Model
          <input id="ship" type="checkbox" />
        </label>
      </>}
      {type === "home" && <button id="get" onClick={submitForm}>Display model</button>}
      {type === "item" && <button id="preview" onClick={Preview}>Preview</button>}
      {type === "item" && <button id="cart">Move to Cart</button>}
      
    </Container>
  )
}

const Container = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  width: min-content;
  min-width: 500px;
  height: max-content;
  max-height: 600px;
  border: 1px solid blue;
  padding: 1em;
  grid-gap: 0.1em;
  input, select, button{
    font-size: 1.2em;
  }
  input, select{
    margin-left: 10px;
  }
  label[for="name"]{
    grid-column: 1 / 3;
  }
  select{
    max-width: 100%;
    width: fit-content;
    border: 0;
  }
  button{
    background-color: lightblue;
    grid-column: 1 / 3;
  }
`
