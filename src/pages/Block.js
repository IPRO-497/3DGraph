import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState, useContext } from 'react'
import { BlockMesh } from '../components/Block'
import { MotionCamera } from '../components/MotionCamera'
import { TensorFlow } from '../components/TensorFlow'
import { MenuContext } from '../hooks/MenuHook'

export const Block = () => {
  const [tensor, setTensor] = useState(false)
  return (
    <>
    {
      tensor && 
      <TensorFlow />
    }
    <Canvas>
      {tensor ? <MotionCamera />: <OrbitControls />}
      <BlockMesh setTensor={setTensor} tensor={tensor}/>
    </Canvas>
    </>
  )
}
