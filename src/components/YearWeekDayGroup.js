import { ContributionGraph } from "./ContributionGraph"
import { Trapezoid } from "./Trapezoid"
import { useContext, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useThree } from '@react-three/fiber'
import { Text3D, Html } from "@react-three/drei"
import { GitHubModel } from "./icons/Github"
import { LeetCodeModel } from "./icons/LeetCode"
import styled from "styled-components"
import { STLExporter } from "three/examples/jsm/exporters/STLExporter"
import { HandContext } from '../hooks/HandContext'

export const YearWeekDayGroup = ({convertedData, username, year, website, setTensor, tensor}) => {
  // Camera Logic
  const {positionConstant, rotationConstant} = useContext(HandContext)
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

  const model = useRef()
  const name = useRef()
  const [popUp, setPopUp] = useState(false)

  // Download Logic
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
    saveArrayBuffer(exporter, `${website[0].toUpperCase() + website.slice(1)}Contribution.stl`)
  }
  
  useEffect(() => {
    const group = model.current
    const box = new THREE.Box3().setFromObject(group);
    const xOffset = box.getCenter(new THREE.Vector3(0,0,0)).x
    group.position.x -= xOffset
    scene.remove(box)
  }, [scene])

  return (
    <group onClick={() => setPopUp(!popUp)} ref={groupRef}>
      <group scale={0.25} ref={model}>
        <ContributionGraph data={convertedData} />
        <Trapezoid />
        {
          popUp &&
          <PopUp position={[0, 0, 0]}>
            <div>
              <button onClick={download}>Download</button>
              <button onClick={() => toggleControls()}>Toggle Tensor</button>
            </div>
          </PopUp>
        }
      </group>

      {/* Text */}
      <group position={[0, 0, -0.06]}>
        <Text3D
          font="/helvetiker_regular.typeface.json"
          scale={0.3}
          rotation={[-Math.PI*(0.5 - 0.35241638235), 0, 0]}
          position={[-53 * (0.3 / 8), -1.4 * 0.27, 4 * 0.258]}
          ref={name}
        >
          {username}
          <meshBasicMaterial color="BLACK" />
        </Text3D>

        <Text3D
          font="/helvetiker_regular.typeface.json"
          scale={0.3}
          rotation={[-Math.PI*(0.5 - 0.35241638235), 0, 0]}
          position={[53 * (0.3 / 8) + 0.3, -1.4 * 0.27, 4 * 0.258]}
        >
          {year}
          <meshBasicMaterial color="BLACK" />
        </Text3D>
        
        {
          website === "github"?
          <GitHubModel
            rotation={[Math.PI* 0.35241638235, 0, 0]}
            scale={68}
            position={[-53 * (0.3 / 4) + 1, -1 * 0.50, 4 * 0.28]}
          />
          : website === "leetcode"?
          <LeetCodeModel
          rotation={[-Math.PI*(0.5 - 0.35241638235), 0, 0]}
          scale={4.5}
          position={[-53 * (0.3 / 4) + 1, -.45, 4 * 0.26]}
        /> : null
        }
      </group>
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