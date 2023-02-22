// import { OrbitControls } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { BlockMesh } from '../components/Block'
// import { Camera } from '../components/Camera'
// import { TensorFlow } from './TensorFlow'

export const Block = () => {
  const [tensor, setTensor] = useState(false)
  return (
    <>
    {/* {
      tensor && 
      <TensorFlow />
    } */}
    <Canvas>
      {/* {tensor ? <Camera /> : <OrbitControls />} */}
      <OrbitControls />
      <BlockMesh setTensor={setTensor} tensor={tensor}/>
    </Canvas>
    </>
  )
}
