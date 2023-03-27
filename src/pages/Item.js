import { useState } from 'react'
import styled from 'styled-components'
import { Form } from '../components/Form'
import { Github } from './Github'

export const Item = () => {
  const [preview, setPreview] = useState(false)
  return (
    <Container className={preview ? "preview" : "none"}>
      <Form setPreview={setPreview}/>
      {preview && <>
        <Github name="tayomide" year="2022"/>
        <button id="close" onClick={() => setPreview(false)}>x</button>
      </>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &.preview form{
    display: none;
    z-index: 2;
  }
  #close{
    position: fixed;
    top: 0;
    right: 0;
    font-size: 2em;
    padding: 1em;
    background-color: aliceblue;
  }
`
