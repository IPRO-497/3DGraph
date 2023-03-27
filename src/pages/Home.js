import styled from "styled-components"
import { Form } from "../components/Form"

export const Home = () => {
  return (
    <Container>
      <Form />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`