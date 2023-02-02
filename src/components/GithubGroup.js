import { ContributionGraph } from "./ContributionGraph"
import { Trapezoid } from "./Trapezoid"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useThree } from '@react-three/fiber'
  const model = useRef()
  const { scene } = useThree()
  useEffect(() => {
    const group = model.current
    const box = new THREE.Box3().setFromObject(group);
    const xOffset = box.getCenter(new THREE.Vector3(0,0,0)).x
    group.position.x -= xOffset
    scene.remove(box)
  }, [scene])

  return (
    <group scale={0.25} ref={model}>
      <ContributionGraph data={convertedData} />
      <Trapezoid />
    </group>
  )
}
