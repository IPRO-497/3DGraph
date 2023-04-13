import { ContributionGraph } from "./ContributionGraph"
import { Trapezoid } from "./Trapezoid"
import { useContext, useEffect, useRef } from "react"
import * as THREE from "three"
import { useThree } from '@react-three/fiber'
import { Text3D } from "@react-three/drei"
import { GitHubModel } from "./icons/Github"
import { LeetCodeModel } from "./icons/LeetCode"
import { STLExporter } from "three/examples/jsm/exporters/STLExporter"
import { HandContext } from '../hooks/HandContext'
import { MenuContext } from '../hooks/MenuHook'
import { Environment } from "@react-three/drei"
import { GitLabModel } from "./icons/Gitlab"
import { useControls, LevaInputs } from "leva"

export const YearWeekDayGroup = ({convertedData, username, year, website, setTensor, tensor}) => {
  // Camera Logic
  const {positionConstant, rotationConstant} = useContext(HandContext)
  const { show, setShow, setItemList } = useContext(MenuContext)
  const groupRef = useRef()

  const [controls, set] = useControls("text",() => ({
    username: username,
    year: {
      value: year,
      type: LevaInputs["STRING"]
    }
  }))

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
  
  useEffect(() => {
    const group = model.current
    const box = new THREE.Box3().setFromObject(group);
    const xOffset = box.getCenter(new THREE.Vector3(0,0,0)).x
    group.position.x -= xOffset
    scene.remove(box)
    camera.position.x = Math.sin(-0.16 * Math.PI) * 5
    camera.position.z = Math.cos(-0.16 * Math.PI) * 5
    camera.position.y = 1
  }, [scene, camera.position])

  useEffect(() => {
    set({username: username, year: year})
  }, [set, username, year])

  return (
    <>
    <Environment
      background
      files={[
        '/environmentMap/7/px.png',
        '/environmentMap/7/nx.png',
        '/environmentMap/7/py.png',
        '/environmentMap/7/ny.png',
        '/environmentMap/7/pz.png',
        '/environmentMap/7/nz.png'
      ]}
    />
    <group
      onClick={() => setShow(!show)}
      ref={groupRef}
      onPointerEnter={() => document.body.style.cursor="pointer"}
      onPointerLeave={() => document.body.style.cursor="auto"}
    >
      <group scale={0.25} ref={model}>
        <ContributionGraph data={convertedData} />
        <Trapezoid />
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
        /> : website === "gitlab"? <GitLabModel
        rotation={[-Math.PI*(0.5 - 0.35241638235), 0, 0]}
        scale={4.5}
        position={[-53 * (0.3 / 4) + 1, -.45, 4.24 * 0.26]}
      />
        : null
        }
      </group>
    </group>
    </>
  )
}
