import { useContext, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { HandContext } from '../hooks/HandContext'
import {gsap} from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import * as THREE from "three"

export const Camera = ({rotateObject}) => {
  gsap.registerPlugin(CustomEase)
  const { scene, camera } = useThree()
  const { leftConstant,
    rightConstant,
    leftCurrent,
    rightCurrent,
    positionConstant,
    rotationConstant } = useContext(HandContext)
  const tweenPosition = useRef()
  const tweenRotation = useRef()
  const framePosition = useRef(0)
  const frameRotation = useRef(0)
  const rotation = useRef()
  const myAxisX = new THREE.Vector3(0, 1, 0);
  const myAxisY = new THREE.Vector3(1, 0, 0);

  const positionStart = useRef()
  const positionTravel = useRef([0, 0, 0])
  console.log(scene.children[0].rotation)
  useFrame(({ clock }) => {
    // Recode the logic. THe 3d is not working use the 2d dataset. Normalize it
    // THen Create a hard limit That it can not pass like orthographic camera.
    // If it is at that limit just don't update. THe hard limit is only for the rotation

    // const rotateDistance = leftConstant.current ? 
    // leftConstant.current.map((position, idx) => leftCurrent.current[idx] - position) : []

    // const positionDistance = rightConstant.current ? 
    // rightConstant.current.map((position, idx) => rightCurrent.current[idx] - position) : []
    // // console.log(delta)
    // if(positionDistance.length) {
    //   // camera.position.x = positionConstant.current[0] + positionDistance[0]*100
    //   if(framePosition.current % 10 === 0){
    //     framePosition.current = 0
    //     tweenPosition.current?.invalidate()
    //     // Use sigmoid or another function to squish the axes to 0 - 1 / -1 - 1 / -0.5 - 0.5
    //     tweenPosition.current = gsap.to(camera.position, {
    //       x: (positionConstant.current[0] + positionDistance[0]*100),
    //       duration: 5, ease: CustomEase.create("custom", "M0,0,C0.083,0.294,0.027,1.461,0.2,1.184,0.314,1,0.752,1,1,1")
    //     })
    //   }
    // }
    // else {
    //   tweenPosition.current?.kill()
    //   positionConstant.current[0] = camera.position.x
    // }
    // if(rotateDistance.length){
    //   if(frameRotation.current % 10 === 0){
    //     frameRotation.current = 0
    //     tweenRotation.current?.invalidate()
    //     tweenRotation.current?.kill()
        
    //     rotation.current = new THREE.Vector3(
    //       scene.children[0].rotation.x,
    //       scene.children[0].rotation.y,
    //       scene.children[0].rotation.z,
    //     )
    //     tweenRotation.current = gsap.to(
    //       rotation.current, {
    //       x: (rotationConstant.current[0] + rotateDistance[1]*50),
    //       y: (rotationConstant.current[1] - rotateDistance[0]*50),
    //       duration: 5, ease: CustomEase.create("custom", "M0,0,C0.083,0.294,0.027,1.461,0.2,1.184,0.314,1,0.752,1,1,1")
    //     })
    //     console.log(rotation.current)
    //     // camera.lookAt(scene.children[0])
    //   }
    //   if(rotation.current){
    //     scene.children[0].setRotationFromAxisAngle(myAxisX, rotation.current.x)
    //     scene.children[0].setRotationFromAxisAngle(myAxisY, rotation.current.y)
    //   }
    // }else {
    //   tweenRotation.current?.kill()
    //   rotationConstant.current[0] = scene.children[0].rotation.x
    //   rotationConstant.current[1] = scene.children[0].rotation.y
    // }
    // framePosition.current++
    // frameRotation.current++

    const rotateDistance = leftConstant.current ? 
    leftConstant.current.map((position, idx) => leftCurrent.current[idx] - position) : []

    const positionDistance = rightConstant.current ? 
    rightConstant.current.map((position, idx) => rightCurrent.current[idx] - position) : []
    if(positionDistance.length){
      // console.log(clock.oldTime - clock.startTime)
      if(!positionStart.current){
        positionStart.current = clock.oldTime
      }
      if(clock.oldTime - positionStart.current > 1000){
        // recalculate
        positionTravel.current = [
          positionDistance.current[0] / 2,
          positionDistance.current[0] / 2,
          positionDistance.current[0] / 2,
        ]
      }
    }
  })
  return (
    <></>
  )
}
