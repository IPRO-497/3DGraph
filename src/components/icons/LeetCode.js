import { useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"

export const LeetCodeModel = (props) => {
  const model = useLoader(STLLoader, "/leetcode.stl")
  const modelMesh = useRef()

  useEffect(() => {
    modelMesh.current.geometry = model
  }, [model])

  return (
    <mesh ref={modelMesh} {...props}>
      <meshBasicMaterial color={props.color} />
    </mesh>
  )
}
