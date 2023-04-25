import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { YearWeekDayGroup } from '../components/YearWeekDayGroup'
import { useContext, useEffect, useState, Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { MotionCamera } from '../components/MotionCamera'
import { TensorFlow } from '../components/TensorFlow'
import { MenuContext } from '../hooks/MenuHook'
import { ButtonStyle } from './ButtonStyle'
import { useProgress } from '@react-three/drei'
import { Loading } from '../components/Loading'

export const Github = ({name, year, success, setTaskComplete}) => {
  const [convertedData, setConvertedData] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000)
  }, [])
  const params = useParams()
  if(typeof name !== "string")name = params.name
  if(typeof year !== "string")year = params.year

  // Tensor Logic - Change to Context
  const [tensor, setTensor] = useState(false)
  const {show} = useContext(MenuContext)
  const [redirect, setRedirect] = useState(false)

  const {progress} = useProgress()

  useEffect(() => {
    console.log(progress)
  }, [progress])
  
  
  useEffect(() => {
    const converter = require("../converter/Github")
    fetch(`/.netlify/functions/github?name=${name}&year=${year}`)
    .then(response => response.json())
    .then(response => {
      setConvertedData(converter.convert(response))
    })
  }, [name, year])
  return (
    <>
    {
      tensor && 
      <TensorFlow />
    }
    {
      show &&
      <ButtonStyle />
    }
    {
      redirect && <Navigate to={"/item"} state={{
        name:name,
        year:year,
        website:"GitHub",
        download:true
      }}/>
    }
    <Suspense fallback={<Loading progress={progress} />}>
      {!isLoading &&
      <Canvas className={'canvas' + (success? " success": "")}>
        {tensor ? <MotionCamera />: <OrbitControls />}
        <OrbitControls />
        {convertedData && <YearWeekDayGroup
          convertedData={convertedData}
          username={name} year={year}
          website="github"
          setTensor={setTensor}
          tensor={tensor}
          setRedirect={setRedirect}
          success={success}
          setTaskComplete={setTaskComplete}
        />}
      </Canvas>
      }
    </Suspense>
    </>
  )
}
