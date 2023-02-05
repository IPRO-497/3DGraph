
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

export const LeetCode = () => {
  const [convertedData, setConvertedData] = useState()
  const params = useParams()
  useEffect(() => {
    const converter = require("../converter/LeetCode")
    fetch(`/.netlify/functions/leetcode?name=${params.name}&year=${params.year}`)
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response, params.year))
    })
  }, [params])
  return (
    <Canvas>
      <OrbitControls />
      {convertedData && <YearWeekDayGroup convertedData={convertedData} username={params.name} year={params.year} website="leetcode" />}
    </Canvas>
  )
}
