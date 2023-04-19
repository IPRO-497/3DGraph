import { useContext, useEffect } from "react"
import { useState, useRef } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
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
  const [redirect, setRedirect] = useState(false)
  const errorMessage = {
    "empty-text": "Please fill out this field with characters",
    "empty-number": "Please enter the quantity",
    "default-dropdown": "Please choose an option",
    "no-checkbox-select": "Please choose at least one option to add to cart"
  }
  const [error, setError] = useState({
    "name": 0,
    "website": 0,
    "quantity": 0,
    "cart": 0
  })

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
    if(!parameters.name)setError(prevError => {
      return {...prevError, "name": "empty-text"}
    })
    if(parameters.website === "default")setError(prevError => {
      return {...prevError, "website": "default-dropdown"}
    })
    if(parameters.name && parameters.website === "GitLab"){
      navigate(`/${parameters.website.toLowerCase()}/${parameters.name.toLowerCase()}`)
    }
    if(parameters.name && parameters.year && parameters.website !== "default"){
      navigate(`/${parameters.website.toLowerCase()}/${parameters.name.toLowerCase()}/${parameters.year}`)
    }
  }
  
  const previewForm = (e) => {
    e.preventDefault()
    const parameters = getParams()
    if(!parameters.name)setError(prevError => {
      return {...prevError, "name": "empty-text"}
    })
    if(parameters.website === "default")setError(prevError => {
      return {...prevError, "website": "default-dropdown"}
    })
    if(parameters.name && parameters.website !== "default"){
      setData({
        "website": parameters.website,
        "name": parameters.name,
        "year": parameters.year
      })
      setPreview(true)
    }
  }

  const addCart = (e) => {
    e.preventDefault()
    const parameters = getParams()
    if(!parameters.name)setError(prevError => {
      return {...prevError, "name": "empty-text"}
    })
    if(parameters.website === "default")setError(prevError => {
      return {...prevError, "website": "default-dropdown"}
    })
    if(!parameters.download.checked)setError(prevError => {
      return {...prevError, "cart": "no-checkbox-select"}
    })
    if(parameters.name && parameters.website !== "default" && parameters.download.checked){
      addToCart(parameters)
    }
  }

  const onDownloadChange = (e) => {
    if(e.target.checked)setError(prevError => {
      return {...prevError, "cart": 0}
    })
  }

  useEffect(() => {

    const nameInput = document.querySelector("input#name")
    const websiteInput = document.querySelector("select#website")

    const onNameChange = (e) => {
      setName(e.target.value.trim())
      if(e.target.value.length)setError(prevError => {
        return {...prevError, "name": 0}
      })
    }
    const onWebsiteChange = (e) => {
      if(e.target.value !== "default")setError(prevError => {
        return {...prevError, "website": 0}
      })
      if(e.target.value === "GitLab")setYearHide(true)
      else setYearHide(false)
    }

    nameInput?.addEventListener("input", onNameChange)
    websiteInput?.addEventListener("input", onWebsiteChange)
    
    return () => {
      nameInput?.removeEventListener("input", onNameChange)
      websiteInput?.removeEventListener("input", onWebsiteChange)
    }
  }, [])

  useEffect(() => {
    if(location === "/")setType("home")
    else if(location === "/item")setType("item")
  }, [location])

  useEffect(() => {
    if(locate.state){
      for(let i = 0; form.current[i]; i++){
        if(locate.state[form.current[i].id]){
          if(form.current[i].type === "checkbox"){
            form.current[i].defaultChecked = locate.state[form.current[i].id]
            form.current[i].dispatchEvent(new Event("input"))
          }
          else if(form.current[i].tagName === "INPUT"){
            form.current[i].value = locate.state[form.current[i].id]
            form.current[i].dispatchEvent(new Event("input"))
          }
          else if(form.current[i].tagName === "SELECT"){
            form.current[i].value = locate.state[form.current[i].id]
            form.current[i].dispatchEvent(new Event("input"))
          }
        }
      }
    }
  }, [locate, type])

  return (
    <Container ref={form}>
      {type === "home" && <h1>Model Details</h1>}
      {type === "item" && <h1>Add Model</h1>}
      <label htmlFor="name">
        Username
        <input type="text"
          id="name"
          placeholder="tayomide"
          defaultValue={name}
        />
        {Boolean(error.name) && <p className="error">{errorMessage[error.name]}</p>}
      </label>
      {!yearHide && <label htmlFor="year">
        Year
        <select name="year" id="year" defaultValue={currYear - 1}>
          {yearDiff.map((num, diff) => <option value={currYear - diff} key={diff}>{currYear - diff}</option>)}
        </select>
      </label>}
      <label htmlFor="website">
        Website
        <select name="website" id="website" defaultValue="default">
          <option value="default" disabled hidden>xyz.com</option>
          <option value="LeetCode">LeetCode</option>
          <option value="GitHub">GitHub</option>
          <option value="GitLab">GitLab</option>
        </select>
        {Boolean(error.website) && <p className="error">{errorMessage[error.website]}</p>}
      </label>
      <label htmlFor="model">
        Model
        <select name="model" id="model" defaultValue="contribution">
          <option value="contribution">Contribution</option>
        </select>
      </label>
      
      {type === "item" && <ul id="cart-item-container">
        <li>
          <ul id="cart-details">
            <li>
              <label htmlFor="download">
                Download Model
                <input id="download" type="checkbox" onInput={onDownloadChange}/>
              </label>
            </li>
            <li className="tooltip">
              <label htmlFor="ship">
                Order Model
                <input id="ship" type="checkbox" disabled/>
              </label>
              <span className="tooltiptext">Coming Soon</span>
            </li>
          </ul>
        </li>
        <li className="cart-details-error">
          {Boolean(error.cart) && <p className="error">{errorMessage[error.cart]}</p>}
        </li>
      </ul>}
      {type === "home" && <button id="get" onClick={submitForm}>Display model</button>}
      {type === "item" && <button id="cart" onClick={addCart}>Add to Cart</button>}
      {type === "item" && <button id="preview" className="trans" onClick={previewForm}>Preview</button>}
      
    </Container>
  )
}

const Container = styled.form`
  width: 100%;
  max-width: 34em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.2em;
  padding: 5em 3em 5em 3em;
  background-color: #fafafa;
  border-radius: 0.2em;
  .error{
    font-size: 0.9em;
    color: red;
    margin-top: 0.2em;
  }
  h1{
    grid-column: 1 / 3;
    text-align: center;
    padding-bottom: 0.5em;
  }
  label{
    display: flex;
    flex-direction: column;
    input, select{
      margin-top: 0.6em;
      line-height: 2em;
      height: 2.2em;
      font-size: 1em;
      padding: 0 0.5em;
      outline: none;
      border: none;
      option{
        font-size: 1.2em;
      }
    }
  }
  label[for="name"]{
    grid-column: 1 / 3;
  }
  button{
    grid-column: 1 / 3;
    font-size: 1em;
    height: 2.2em;
    background-color: black;
    color: white;
    margin-top: 1.6em;
    border: 1px solid black;
    & ~ button{
      margin-top: 0;
    }
    &.trans{
      background-color: transparent;
      color: black;
    }
  }
  #cart-item-container ~ button{
    margin-top: 0;
  }
  #cart-item-container{
    display: flex;
    flex-direction: column;
    grid-column: 1 / 3;
    margin: 0.3em 0;
    #cart-details{
      display: flex;
      flex-direction: row;
      gap: 2em;
      justify-content: center;
      position: relative;
      label{
        flex-direction: row;
        font-size: 0.8em;
        align-items: center;
        input[type="number"]{
          margin: 0;
          max-width: 11ch;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          appearance: none;
          -moz-appearance: none;
        }
        input[type="checkbox"]{
          margin: 0 0 0 1em;
        }
      }
    }
    label[for="ship"], label[for="download"], label[for="name"]{
      cursor: pointer;
    }
    .tooltip {
      position: relative;
      color: rgba(0 0 0 / 50%);
      .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        position: absolute;
        bottom: 0;
        left: calc(100% + 1em);
        z-index: 1;
        ::after{
          content: "";
          position: absolute;
          top: 50%;
          right: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent #555 transparent transparent;
        }
      }
      :hover .tooltiptext {
        visibility: visible;
      }
    }
    .cart-details-error p.error{
      text-align: center;
    }
  }
`
