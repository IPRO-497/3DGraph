import React from 'react'
import { useThree } from '@react-three/fiber'
import { STLExporter } from "three/examples/jsm/exporters/STLExporter"

export const BlockMesh = () => {
  const { scene } = useThree()
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
    console.log(exporter)
    saveArrayBuffer(exporter, "SufyansBlock.stl")
    // exporter.parse(
    //   scene
    // )
  }
  return (
    <mesh onClick={download}>
      <boxGeometry />
      <meshBasicMaterial color="red"/>
    </mesh>
  )
}
