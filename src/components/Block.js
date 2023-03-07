import { useContext, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { STLExporter } from "three/examples/jsm/exporters/STLExporter"
import { HandContext } from '../hooks/HandContext'
import { MenuContext } from '../hooks/MenuHook'

export const BlockMesh = ({setTensor, tensor}) => {
  const {positionConstant, rotationConstant} = useContext(HandContext)
  const { show, setShow, setItemList } = useContext(MenuContext)
  const { scene, camera } = useThree()
  const link = document.createElement('a')
  const save = (blob, filename) => {
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }
  const saveArrayBuffer = (buffer, fileName) => {
    save(new Blob([buffer], { type: "text.plain" }), fileName)
  }
  const download = () => {
    const exporter = new STLExporter().parse(scene)
    saveArrayBuffer(exporter, "SufyansBlock.stl")
  }

  const groupRef = useRef()

  const toggleControls = () => {
    positionConstant.current = [
      camera.position.x,
      camera.position.y,
      camera.position.z
    ]
    rotationConstant.current = [
      groupRef.current.rotation.x,
      groupRef.current.rotation.y,
      groupRef.current.rotation.z
    ]
    setTensor(!tensor)
  }

  setItemList([
    {
      name: "Download",
      function: download
    },
    {
      name: "Toggle Tensor",
      function:toggleControls
    }
  ])

  return (
    <group ref={groupRef}>
      <mesh onClick={() => setShow(!show)}>
        <boxGeometry />
        <meshBasicMaterial color="red"/>
      </mesh>
    </group>
  )
}
