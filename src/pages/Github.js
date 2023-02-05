import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useEffect, useState } from 'react'

export const Github = () => {
  const [convertedData, setConvertedData] = useState()
  useEffect(() => {
    const converter = require("../converter/Github")
    fetch("/.netlify/functions/github")
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response))
    })
  }, [])
  return (
    <Canvas>
      <OrbitControls />
      {convertedData && <YearWeekDayGroup convertedData={convertedData} username="tayomide" year="2022" website="github" />}
    </Canvas>
  )
}
