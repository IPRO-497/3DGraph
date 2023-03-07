import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MotionCamera } from '../components/MotionCamera'
import { TensorFlow } from '../components/TensorFlow'
import { MenuContext } from '../hooks/MenuHook'
import { ButtonStyle } from './ButtonStyle'

export const Github = () => {
  const [convertedData, setConvertedData] = useState()
  const params = useParams()
  const name = params.name
  const year = params.year

  // Tensor Logic - Change to Context
  const [tensor, setTensor] = useState(false)
  const {show} = useContext(MenuContext)
  
  useEffect(() => {
    const converter = require("../converter/Github")
    fetch(`/.netlify/functions/github?name=${name}&year=${year}`)
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response))
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
    <Canvas>
      {tensor ? <MotionCamera />: <OrbitControls />}
      <OrbitControls />
      {convertedData && <YearWeekDayGroup convertedData={convertedData} username={params.name} year={params.year} website="github" setTensor={setTensor} tensor={tensor} />}
    </Canvas>
    </>
  )
}
