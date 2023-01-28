import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { BlockMesh } from '../components/Block'

export const Block = () => {
  return (
    <Canvas>
      <OrbitControls />
      <BlockMesh />
    </Canvas>
  )
}
