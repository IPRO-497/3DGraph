import styled from "styled-components"

export const Loading = ({progress}) => {
  console.log(progress)
  return (
    <Container>
      <h3>Loading...</h3>
      <progress value={progress} max="100"></progress>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  progress{
    display: inline-block;
    width: 80%;
    margin: 50px 10%;
  }

`
