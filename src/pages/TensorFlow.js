import styled from 'styled-components';
import * as handDetection from '@tensorflow-models/hand-pose-detection';
import { VERSION } from "@mediapipe/hands";
// import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs-backend-webgl"
import "@tensorflow/tfjs-backend-cpu"
import { useEffect, useRef, useContext } from 'react';
import { HandContext } from '../hooks/HandContext'

export const TensorFlow = () => {
  const video = useRef()
  const canvas = useRef()
  const count = useRef(2)
  const streamRef = useRef()
  const {
    leftConstant,
    rightConstant,
    leftCurrent,
    rightCurrent
  } = useContext(HandContext)

  const distanceIsLess = (nodes, group) => {
    const distance = []
    for(let i = 1; i < 5; i++){
      const node = group * 4 + i
      distance.push((nodes[node].x - nodes[0].x)**2 + (nodes[node].y - nodes[0].y)**2)
    }
    for(let i = 0; i < 3; i++){
      if(distance[i] > distance[i+1])return false
    }
    return true
  }

  const isOpen = (data) => {
    const hands = {}
    for(const obj of data){
      let hand = true
      for(let i = 0; i < 5; i++){
        if(!distanceIsLess(obj.keypoints, i)){
          hand = false
          break;
        }
      }
      hands[obj.handedness] = hand
    }
    if(!hands["Left"])hands["Left"] = false
    if(!hands["Right"])hands["Right"] = false
    return hands
  }

  const startWebcam = async () => {
    const detector = await handDetection.createDetector("MediaPipeHands",{
      runtime: 'mediapipe',
      modelType: "full",
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}`,
      maxHands: 2
    })

    const predictWebcam = () => {
      detector.estimateHands(video.current, {
        flipHorizontal: true
      }).then(hands => {
        const controls = isOpen(hands)
        if(!controls.Left){
          leftCurrent.current = []
          leftConstant.current = []
        }
        else{
          const obj = hands.find(obj => obj.handedness === "Left")
          if(!leftConstant.current.length)leftConstant.current = [
            obj.keypoints3D[0].x,
            obj.keypoints3D[0].y,
            obj.keypoints3D[0].z
          ]
          leftCurrent.current = [
            obj.keypoints3D[0].x,
            obj.keypoints3D[0].y,
            obj.keypoints3D[0].z
          ]
        }
        if(!controls.Right){
          rightCurrent.current = []
          rightConstant.current = []
        }
        else{
          const obj = hands.find(obj => obj.handedness === "Right")
          if(!rightConstant.current.length)rightConstant.current = [
            obj.keypoints3D[0].x,
            obj.keypoints3D[0].y,
            obj.keypoints3D[0].z
          ]
          rightCurrent.current = [
            obj.keypoints3D[0].x,
            obj.keypoints3D[0].y,
            obj.keypoints3D[0].z
          ]
        }
        console.log({rightConstant, rightCurrent, leftConstant, leftCurrent})
      })
      .catch(err => console.log(err))
      if(video?.current?.srcObject)window.requestAnimationFrame(predictWebcam)
    }
    predictWebcam()
  }

  const stopVideo = () => {
    const stream = video?.current?.captureStream() || streamRef.current;
    const tracks = stream.getTracks();
    for (var i = 0; i < tracks.length; i++) {
      tracks[i].stop();
      stream.removeTrack(tracks[i])
    }
    if(!video?.current?.srcObject)return
    video.current.srcObject = null;
  }
  

  const startVideo = async () => {
    if(!!(video.current.srcObject))return
    try{
      if(!!!(navigator.mediaDevices.getUserMedia))throw new Error('media device is not supported.');
      const stream = await navigator.mediaDevices.getUserMedia({video: true})
      streamRef.current = stream
      console.log(stream)
      if(!video.current.srcObject)video.current.srcObject = stream
      video.current.addEventListener("loadeddata", startWebcam)
      window.stream = stream
    } catch(err){
      stopVideo()
      if(count.current){
        startVideo();
        count.current--
      }else console.log(err)
    }
  }

  useEffect(() => {
    startVideo()
    return () => {
      count.current = 2
      stopVideo()
    }
  }, [])

  return (
    <Container>
      <div className="container">
        <button onClick={() => startVideo()}>Start Logic</button>
        <button onClick={() => stopVideo()}>End Logic</button>
        <video className="input_video" ref={video} onLoad={e => console.log(e)} autoPlay >
          <source src="/small.mp4" type='video/mp4' />
        </video>
        <canvas className="output_canvas" width="100vw" height="100vh" ref={canvas}></canvas>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position:fixed;
  top:-9999px;
  opacity:0;
  visibility: hidden;
  video {
    display: block;
    width: 100vw;
    height: 100vh;
  }
  button.removed{
    user-select: none;
    opacity: 0.3;
  }
  .camView {
    position: relative;
    float: left;
    width: calc(100% - 20px);
    margin: 10px;
    cursor: pointer;
  }

  .camView p {
    position: absolute;
    padding: 5px;
    background-color: rgba(255, 111, 0, 0.85);
    color: #FFF;
    border: 1px dashed rgba(255, 255, 255, 0.7);
    z-index: 2;
    font-size: 12px;
  }

  .highlighter {
    background: rgba(0, 255, 0, 0.25);
    border: 1px dashed #fff;
    z-index: 1;
    position: absolute;
  }

`
