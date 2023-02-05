
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useEffect, useState } from "react"

export const LeetCode = () => {
  const [convertedData, setConvertedData] = useState()
  useEffect(() => {
    const converter = require("../converter/LeetCode")
    fetch("/.netlify/functions/leetcode")
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response))
    })
  }, [])
  return (
    <Canvas>
      <OrbitControls />
      {convertedData && <YearWeekDayGroup convertedData={convertedData} username="tayomide" year="2022" website="leetcode" />}
    </Canvas>
  )
}
