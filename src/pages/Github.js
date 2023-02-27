import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MotionCamera } from '../components/MotionCamera'
import { TensorFlow } from '../components/TensorFlow'

export const Github = () => {
  const [convertedData, setConvertedData] = useState()
  const params = useParams()

  // Tensor Logic - Change to Context
  const [tensor, setTensor] = useState(false)
  
  useEffect(() => {
    const converter = require("../converter/Github")
    fetch(`/.netlify/functions/github?name=${params.name}&year=${params.year}`)
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response))
    })
  }, [params])
  return (
    <>
    {
      tensor && 
      <TensorFlow />
    }
    <Canvas>
      {tensor ? <MotionCamera />: <OrbitControls />}
      <OrbitControls />
      {convertedData && <YearWeekDayGroup convertedData={convertedData} username={params.name} year={params.year} website="github" setTensor={setTensor} tensor={tensor} />}
    </Canvas>
    </>
  )
}
