
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'

export const LeetCode = () => {
  const leetCodeData = require("../data/LeetCodeDummy").data
  const converter = require("../converter/LeetCode")
  const convertedData = converter.convert(leetCodeData)
  return (
    <Canvas>
      <OrbitControls />
      <YearWeekDayGroup convertedData={convertedData} username="tayomide" year="2022" website="leetcode" />
    </Canvas>
  )
}
