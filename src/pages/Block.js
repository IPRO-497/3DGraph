import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState, useContext } from 'react'
import { BlockMesh } from '../components/Block'
import { MotionCamera } from '../components/MotionCamera'
import { TensorFlow } from '../components/TensorFlow'
import { MenuContext } from '../hooks/MenuHook'
import { ButtonStyle } from './ButtonStyle'

export const Block = () => {
  const [tensor, setTensor] = useState(false)
  const {show} = useContext(MenuContext)
  return (
    <>
    {
      tensor && 
      <TensorFlow />
    }
    {
      show &&
      <ButtonStyle />
    }
    <Canvas>
      {tensor ? <MotionCamera />: <OrbitControls />}
      <BlockMesh setTensor={setTensor} tensor={tensor}/>
    </Canvas>
    </>
  )
}
