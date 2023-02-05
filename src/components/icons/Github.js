import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export const GitHubModel = (props) => {
  const model = useLoader(GLTFLoader, "/GithubIcon.glb")
  return (
    <primitive object={model.scene} {...props} />
  )
}
