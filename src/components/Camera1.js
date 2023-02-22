import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"

export const Camera = () => {
  const initialPosition = useRef([])
  const distance = useRef([])
  const meshPosition = useRef([])
  const { scene, camera } = useThree()
  const updateMouse = (e) => {
    if(!initialPosition.current.length){
      distance.current = [0, 0]
      meshPosition.current = [
        scene.children[0].position.x,
        scene.children[0].position.y
      ]
      initialPosition.current = [
      e.x / window.innerWidth,
      e.y / window.innerHeight
      ]
    }
    distance.current = [
      e.x / window.innerWidth - initialPosition.current[0],
      -(e.y / window.innerHeight - initialPosition.current[1])
    ]
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMouse)
    return () => {
      window.removeEventListener("mousemove", updateMouse)
      meshPosition.current = [
        scene.children[0].position.x,
        scene.children[0].position.y
      ]
      distance.current = [0, 0]
      initialPosition.current = []
    }
  }, [])

  useFrame(() => {
    if(initialPosition.current[0]){
      scene.children[0].position.x = meshPosition.current[0] + distance.current[0] * 5
      scene.children[0].position.y = meshPosition.current[1] + distance.current[1] * 5
    }
  }, [])

  // Create a function that moves the group to position +3 in 5 seconds. Then make variations like 1, 1.1, 1.0, 1.5, ... till 5 on each tenth of a frame
  // and make a function that smooths that out
  return (
    <></>
  )
}
