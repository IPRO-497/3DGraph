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

  useEffect(() => {
    const formChange = (e) => {
      const parameters = getParams()
      if(parameters["website"] === "GitLab")setYearHide(true)
      else setYearHide(false)
      // if(parameters["preview"]){
      //   if(parameters.name && parameters.website !== "default" && parameters.preview){
      //     parameters["preview"].disabled = false
      //   }else{
      //     parameters["preview"].disabled = true
      //   }
      // }
      // if(parameters["cart"]){
      //   if(!parameters["preview"].disabled && (parameters.download.checked || (parameters.ship.checked && parameters.quantity.length))){
      //     parameters["cart"].disabled = false
      //   }else parameters["cart"].disabled = true
      // }
      // formLint()
    }

    const formCurrent = form?.current
    formCurrent.addEventListener("change", formChange)

    const nameInput = document.querySelector("input#name")
    const websiteInput = document.querySelector("select#website")
    const downloadInput = document.querySelector("input#download")

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
    }
    const onDownloadChange = (e) => {
      if(e.target.checked)setError(prevError => {
        return {...prevError, "cart": 0}
      })
    }

    nameInput?.addEventListener("input", onNameChange)
    websiteInput?.addEventListener("input", onWebsiteChange)
    downloadInput?.addEventListener("input", onDownloadChange)
    
    return () => {
      nameInput?.removeEventListener("input", onNameChange)
      websiteInput?.removeEventListener("input", onWebsiteChange)
      downloadInput?.removeEventListener("input", onDownloadChange)
      formCurrent?.removeEventListener("change", formChange)
    }
  }, [])

  return (
    <Container ref={form}>
      {type === "home" && <h1>Model Details</h1>}
      {type === "item" && <h1>Add Model</h1>}
      <label htmlFor="name">
        Username
        <input type="text"
          id="name"
          placeholder="tayomide"
          onChange={e => setName(e.target.value.trim())}
          value={name}
        />
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
      </label>
      <label htmlFor="model">
        Model
        <select name="model" id="model" defaultValue="contribution">
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
      {type === "item" && <button id="cart" onClick={addCart}>Add to Cart</button>}
      {type === "item" && <button id="preview" className="trans" onClick={previewForm}>Preview</button>}
      
    </Container>
  )
}

const Container = styled.form`
  display: grid;
  grid-template-columns: 50% 50%;
  flex-direction: column;
  width: min-content;
  min-width: 500px;
  height: max-content;
  max-height: 600px;
  border: 1px solid blue;
  padding: 1em;
  grid-gap: 0.1em;
  h1{
    grid-column: 1 / 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  input, select, button{
    font-size: 1.2em;
  }
  input, select{
    margin-left: 10px;
  }
  input[type="number"]{
    width: 100%;
  }
  label{
    display: flex;
    align-items: center;
    grid-column: 1 / 3;
    &[for="name"]{
      grid-column: 1 / 3;
    }
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
