import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'

export const Github = () => {
  const data = require("../data/GithubDummy").data
  const converter = require("../converter/Github")
  const convertedData = converter.convert(data)
  return (
    <Canvas>
      <OrbitControls />
      <YearWeekDayGroup convertedData={convertedData} username="tayomide" year="2022" website="github" />
    </Canvas>
  )
}
