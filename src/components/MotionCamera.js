import { useContext, useEffect } from "react"
import { HandContext } from "../hooks/HandContext"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export const MotionCamera = () => {
  const {
    rightCurrent
  } = useContext(HandContext)
  const { camera } = useThree()

  const center = new THREE.Vector3()
  const errorMargin = (origin, destination, margin) => {
    if(Math.abs(origin - destination) > margin)return origin + (destination - origin) / 3.2
    return origin
  }

  useFrame(() => {
    if(rightCurrent.current.length){
      camera.position.x = errorMargin(camera.position.x, Math.sin(rightCurrent.current[0] * Math.PI * 2) * 3, 0.015)
      camera.position.z = errorMargin(camera.position.z, Math.cos(rightCurrent.current[0] * Math.PI * 2) * 3, 0.015)
      camera.position.y = errorMargin(camera.position.y, rightCurrent.current[1] * 5, 0.025)
      camera.lookAt(center)
    }
    else{
      camera.position.x = errorMargin(camera.position.x, 0, 0)
      camera.position.y = errorMargin(camera.position.y, 0, 0)
      camera.position.z = errorMargin(camera.position.z, 5, 0)
      camera.lookAt(center)
    }
  }, [])

  useEffect(() => {
    return () => {
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 5
    }
  }, [camera.position])
  return (
    <></>
  )
}
