import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { BlockMesh } from '../components/Block'

export const Block = () => {
  const [tensor, setTensor] = useState(false)
  return (
    <>
      tensor && 
      <TensorFlow />
    <Canvas>
      <BlockMesh setTensor={setTensor} tensor={tensor}/>
    </Canvas>
    </>
  )
}
