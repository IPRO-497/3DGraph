import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { BlockMesh } from '../components/Block'
import { TensorFlow } from './TensorFlow'

export const Block = () => {
  const [tensor, setTensor] = useState(false)
  return (
    <>
    {
      tensor && 
      <TensorFlow />
    }
    <Canvas>
      <OrbitControls />
      <BlockMesh setTensor={setTensor} tensor={tensor}/>
    </Canvas>
    </>
  )
}
