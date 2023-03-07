import { useContext, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { STLExporter } from "three/examples/jsm/exporters/STLExporter"
import styled from 'styled-components'
import { Html } from '@react-three/drei'
import { HandContext } from '../hooks/HandContext'
import { MenuContext } from '../hooks/MenuHook'

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


  return (
    <group ref={groupRef}>
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
