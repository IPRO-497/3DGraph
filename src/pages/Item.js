import { useState } from 'react'
import styled from 'styled-components'
import { Form } from '../components/Form'
import { Github } from './Github'
import { LeetCode } from './LeetCode'

export const Item = () => {
  const [preview, setPreview] = useState(false)
  const [data, setData] = useState({})
  return (
    <Container className={preview ? "preview" : "none"}>
      <Form setPreview={setPreview} setData={setData}/>
      {preview && <>
        {
          data?.website.toLowerCase() === "github" ?
          <Github name={data.name} year={data.year}/> :
          data?.website.toLowerCase() === "leetcode" ?
          <LeetCode name={data.name} year={data.year}/> : null
        }
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
