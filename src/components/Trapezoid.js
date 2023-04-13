import { useEffect, useRef} from 'react'
import { useControls } from 'leva'

export const Trapezoid = () => {
  const geometry = useRef()
  const controls = useControls("base", {
    color: "#494a56"
  })
  useEffect(() => {
    geometry.current.computeVertexNormals()
  }, [])
  return (
    <mesh position={[-0.251, 0.001, -0.251]} scale={[1.01, 1, 1.01]}>
      <bufferGeometry attach="geometry" ref={geometry} center>
        <bufferAttribute
        attach="attributes-position"
        count={36}
        itemSize={3}
        array={
          new Float32Array([
          0 - 2.5, -2, 0 - 1,
          53 / 2 + 2.5, -2, 0 - 1,
          53 / 2 + 2.5, -2, 3.5 + 1,
          53 / 2 + 2.5, -2, 3.5 + 1,
          0 - 2.5, -2, 3.5 + 1,
          0 - 2.5, -2, 0 - 1,
          53 / 2, 0, 3.5,
          53 / 2, 0, 0,
          0, 0, 0,
          0, 0, 0,
          0, 0, 3.5,
          53 / 2, 0, 3.5,
          0 - 2.5, -2, 0 - 1,
          0, 0, 0,
          53 / 2, 0, 0,
          53 / 2, 0, 0,
          53 / 2 + 2.5, -2, 0 - 1,
          0 - 2.5, -2, 0 - 1,
          53 / 2, 0, 3.5,
          0, 0, 3.5,
          0 - 2.5, -2, 3.5 + 1,
          0 - 2.5, -2, 3.5 + 1,
          53 / 2 + 2.5, -2, 3.5 + 1,
          53 / 2, 0, 3.5,
          0, 0, 3.5,
          0, 0, 0,
          0 - 2.5, -2, 0 - 1,
          0, 0, 3.5,
          0 - 2.5, -2, 0 - 1,
          0 - 2.5, -2, 3.5 + 1,
          53 / 2 + 2.5, -2, 0 - 1,
          53 / 2, 0, 0,
          53 / 2, 0, 3.5,
          53 / 2 + 2.5, -2, 3.5 + 1,
          53 / 2 + 2.5, -2, 0 - 1,
          53 / 2, 0, 3.5,
        ])}
      />
      </bufferGeometry>
      <meshBasicMaterial color={controls.color} />
    </mesh>
  )
}
