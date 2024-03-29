
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useContext, useEffect, useState} from "react"
import { MotionCamera } from '../components/MotionCamera'
import { TensorFlow } from '../components/TensorFlow'
import { MenuContext } from '../hooks/MenuHook'
import { ButtonStyle } from './ButtonStyle'
import { Navigate, useParams } from 'react-router-dom'

export const GitLab = ({name, year, success, setTaskComplete}) => {
  // Names: feistel, dnsmichi
  const [convertedData, setConvertedData] = useState()
  const params = useParams()
  if(typeof name !== "string")name = params.name
  if(typeof year !== "string")year = (new Date().getMonth() + 1).toString() + "/" +
  (new Date().getFullYear()).toString().slice(2,4)
  // Tensor Logic - Change to Context
  const [tensor, setTensor] = useState(false)
  const {show} = useContext(MenuContext)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const converter = require("../converter/GitLab")
    fetch(`/.netlify/functions/gitlab?name=${name}`)
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response))
    })
  }, [name])

  return (
    <>
      {
        tensor && 
        <TensorFlow />
      }
      {
        show &&
        <ButtonStyle />
      }
      {
        redirect && <Navigate to={"/item"} state={{
          name:name,
          website:"GitLab",
          download:true
        }}/>
      }
      <Canvas className='canvas'>
        {tensor ? <MotionCamera />: <OrbitControls />}
        <OrbitControls />
        {convertedData && <YearWeekDayGroup
          convertedData={convertedData}
          username={name}
          year={year}
          website="gitlab"
          setTensor={setTensor}
          tensor={tensor}
          setRedirect={setRedirect}
        />}
      </Canvas>
    </>
  )
}
