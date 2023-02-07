import { useState, useContext } from 'react'
import { useThree } from '@react-three/fiber'
import { STLExporter } from "three/examples/jsm/exporters/STLExporter"
import styled from 'styled-components'
import { Html } from '@react-three/drei'
import { HandContext } from '../hooks/HandContext'

export const BlockMesh = ({setTensor, tensor}) => {
  const {positionConstant, rotationConstant} = useContext(HandContext)
  const [popup, setPopup] = useState(false)
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
    console.log(exporter)
    saveArrayBuffer(exporter, "SufyansBlock.stl")
    // exporter.parse(
    //   scene
    // )
  }

  const toggleControls = () => {
    setTensor(!tensor)
    positionConstant.current = [
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ]
    rotationConstant.current = [
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z
    ]
  }


  return (
    <group>
      <mesh onClick={() => setPopup(!popup)}>
        <boxGeometry />
        <meshBasicMaterial color="red"/>
      </mesh>
      {
        popup && 
        <PopUp position={[0, 0, 0]}>
          <div>
            <button onClick={download}>Download</button>
            <button onClick={() => toggleControls()}>Toggle Tensor</button>
          </div>
        </PopUp>
      }
    </group>
  )
}

const PopUp = styled(Html)`
  background-color: red;
  height: 15em;
  width: 20em;
  button{
    background-color: blue;
    padding: 1px;
  }
`
