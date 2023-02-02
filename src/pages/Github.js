import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { GithubGroup } from '../components/GithubGroup'

export const Github = () => {
  const data = require("../data/GithubDummy").data
  const converter = require("../converter/Github")
  const convertedData = converter.convert(data)
  return (
    <Canvas>
      <OrbitControls />
      <GithubGroup convertedData={convertedData}/>
    </Canvas>
  )
}
