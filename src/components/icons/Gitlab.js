import { useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"

export const GitLabModel = (props) => {
  const model = useLoader(STLLoader, "/gitlab.stl")
  const modelMesh = useRef()

  useEffect(() => {
    modelMesh.current.geometry = model
  }, [model])

  return (
    <mesh ref={modelMesh} {...props}>
      <meshBasicMaterial color="black" />
    </mesh>
  )
}
