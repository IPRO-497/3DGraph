
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useContext, useEffect, useState } from "react"
import { Navigate, useParams } from 'react-router-dom'
import { MotionCamera } from '../components/MotionCamera'
import { TensorFlow } from '../components/TensorFlow'
import { MenuContext } from '../hooks/MenuHook'
import { ButtonStyle } from './ButtonStyle'

export const LeetCode = ({name, year}) => {
  const [convertedData, setConvertedData] = useState()
  const params = useParams()
  if(typeof name !== "string")name = params.name
  if(typeof year !== "string")year = params.year

  // Tensor Logic - Change to Context
  const [tensor, setTensor] = useState(false)
  const {show} = useContext(MenuContext)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const converter = require("../converter/LeetCode")
    fetch(`/.netlify/functions/leetcode?name=${name}&year=${year}`)
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response, year))
    })
  }, [name, year])
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
        year:year,
        website:"LeetCode",
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
          website="leetcode"
          setTensor={setTensor}
          tensor={tensor}
          setRedirect={setRedirect}
        />}
      </Canvas>
    </>
  )
}
