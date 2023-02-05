import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Github = () => {
  // new Date().getFullYear() - 1
  const params = useParams()
  const [convertedData, setConvertedData] = useState()
  useEffect(() => {
    const converter = require("../converter/Github")
    fetch(`/.netlify/functions/github?name=${params.name}&year=${params.year}`)
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response))
    })
  }, [params])
  return (
    <Canvas>
      <OrbitControls />
      {convertedData && <YearWeekDayGroup convertedData={convertedData} username={params.name} year={params.year} website="github" />}
    </Canvas>
  )
}
