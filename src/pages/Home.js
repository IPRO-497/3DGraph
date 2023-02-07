import styled from "styled-components"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"

export const Home = () => {
  const yearDiff = new Array(10).fill(0)
  const currYear = new Date().getFullYear()
  const [name, setName] = useState("")
  const nameWidth = useRef()
  const form = useRef()
  const [websiteWidth, setWebsiteWidth] = useState()
  const changeNameWidth = (e) => {
    // Create p tag to get width for input
    const p = document.createElement("p")
    // Remove white space
    const value = e.target.value.trim()
    const text = document.createTextNode(value);
    p.appendChild(text)
    // Add style to mimic input
    p.style.cssText = "font-size: 3em; height: max-content; width: max-content; position:fixed; top:-9999px; opacity:0; visibility: hidden;"
    // add the clone to the DOM 
    document.body.appendChild(p)
    // meassure it
    nameWidth.current = p.clientWidth
    // cleaup 
    p.parentNode.removeChild(p)
    setName(value)
  }

  const changeWebsiteWidth = (e) => {
    // Create p tag to get width for input
    const p = document.createElement("p")
    // Remove white space
    const value = e.target.value.trim()
    const text = document.createTextNode(value);
    p.appendChild(text)
    // Add style to mimic input
    p.style.cssText = "font-size: 3em; height: max-content; width: max-content; position:fixed; top:-9999px; opacity:0; visibility: hidden;"
    // add the clone to the DOM
    document.body.appendChild(p)
    // meassure it
    setWebsiteWidth(p.clientWidth)
    // cleaup 
    p.parentNode.removeChild(p)
  }

  const submitForm = (e) => {
    e.preventDefault()
    const parameters = {}
    for(let i = 0; form.current[i]; i++){
      if(form.current[i].tagName !== "BUTTON"){
        parameters[form.current[i].id] = form.current[i].value
      }
    }
    console.log(parameters)
  }
  
  return (
    <Container nameWidth={nameWidth.current} websiteWidth={websiteWidth}>
      <form ref={form}>
        <button id="get" onClick={submitForm}>Get</button>
        <input type="text"
          id="name"
          placeholder="tayomide"
          onChange={changeNameWidth}
          value={name}
        />
        {/* <p id="apostrophe">'s</p> Use after psuedo element */}
        <select name="year" id="year" defaultValue={currYear - 1}>
          {yearDiff.map((num, diff) => <option value={currYear - diff} key={diff}>{currYear - diff}</option>)}
        </select>
        <select name="website" id="website" defaultValue="default" onChange={changeWebsiteWidth}>
          <option value="default" disabled hidden>xyz.com</option>
          <option value="LeetCode">LeetCode</option>
          <option value="GitHub">GitHub</option>
        </select>
        <select name="data-type" id="data-type" defaultValue="contribution">
          <option value="contribution">Contribution</option>
        </select>
        <button id="end" onClick={submitForm}>.</button>
      </form>
      <Link to="/tensorflow">TensorFlow</Link>
    </Container>
  )
}

const Container = styled.div`
  form{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    select{
      cursor: pointer;
      font-size: 3em;
      height: max-content;
      outline: 0;
      border: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      text-indent: 1px;
      text-overflow: '';
      width: max-content;
      margin: 0 4px;
      ::-ms-expand {
        display: none;
      }
    }
    button{
      font-size: 3em;
      height: max-content;
      padding: 0;
    }
    #get{
      margin: 0 4px;
    }
    #name{
      font-size: 3em;
      height: max-content;
      margin: 0 4px;
      width: ${props => props.nameWidth ? props.nameWidth+"px" : "3.729em"};
    }
    #website{
      width: ${props => props.websiteWidth ? props.websiteWidth+"px": "3.41667em"};
      color: ${props => props.websiteWidth ? "inherit": "#757575"};
      option{
        color: #000000;
      }
    }
    #data-type{
      margin: 0 0 0 4px;
    }
  }
`