import styled from 'styled-components';
import * as handDetection from '@tensorflow-models/hand-pose-detection';
import { VERSION } from "@mediapipe/hands";
// Import backend tensorflow dependencies 
import "@tensorflow/tfjs-backend-webgl"
import "@tensorflow/tfjs-backend-cpu"
import { useContext, useEffect, useMemo, useRef} from 'react';
import { HandContext } from '../hooks/HandContext'

export const TensorFlow = () => {
  const streamRef = useRef()
  const {
    leftConstant,
    rightConstant,
    leftCurrent,
    rightCurrent
  } = useContext(HandContext)
  const video = useRef()
  const canvas = useRef()
  const detector = useRef()
  const size = useRef()

  // Cache tensor and prevent rerendering
  const tensor = useMemo(() => {return {
    // Logic to calculate distance between wrist and other endpoints
    distanceIsLess: (nodes, group) => {
      const distance = []
      for(let i = 1; i < 5; i++){
        const node = group * 4 + i
        distance.push((nodes[node].x - nodes[0].x)**2 + (nodes[node].y - nodes[0].y)**2)
      }
      for(let i = 0; i < 3; i++){
        if(distance[i] > distance[i+1])return false
      }
      return true
    },

    // Logic to check if hands are open
    isOpen: (data) => {
      const hands = {}
      for(const obj of data){
        let hand = true
        for(let i = 0; i < 5; i++){
          if(!tensor.distanceIsLess(obj.keypoints, i)){
            hand = false
            break;
          }
        }
        hands[obj.handedness] = hand
      }
      if(!hands["Left"])hands["Left"] = false
      if(!hands["Right"])hands["Right"] = false
      return hands
    },
    
    // Logic to start ML logic and update data
    predictWebcam: () => {
      // Start detector
      detector.current.estimateHands(video.current, {
        flipHorizontal: true
      }).then(hands => {
        // Check if hands are open
        const controls = tensor.isOpen(hands)
        if(!controls.Left){
          leftCurrent.current = []
          leftConstant.current = []
        }
        else{
          // Update neccesary data for movement
          const obj = JSON.parse(JSON.stringify(hands.find(obj => obj.handedness === "Left")))
          if(!leftConstant.current.length)leftConstant.current = [
            -(obj.keypoints[0].x / size.current.x - 0.5) * 2,
            (obj.keypoints[0].y / size.current.y - 0.5) * 2,
          ]
          leftCurrent.current = [
            -(obj.keypoints[0].x / size.current.x - 0.5) * 2,
            (obj.keypoints[0].y / size.current.y - 0.5) * 2,
          ]
        }
        if(!controls.Right){
          rightCurrent.current = []
          rightConstant.current = []
        }
        else{
          const obj = JSON.parse(JSON.stringify(hands.find(obj => obj.handedness === "Right")))
          if(!rightConstant.current.length)rightConstant.current = [
            -(obj.keypoints[0].x / size.current.x - 0.5) * 2,
            (obj.keypoints[0].y / size.current.y - 0.5) * 2,
          ]
          rightCurrent.current = [
            -(obj.keypoints[0].x / size.current.x - 0.5) * 2,
            (obj.keypoints[0].y / size.current.y - 0.5) * 2,
          ]
        }
      })
      .catch(err => console.log(err))
      // Run function again
      if(video?.current?.srcObject)window.requestAnimationFrame(tensor.predictWebcam)
    },

    // Logic to initialize MediaPipe ML hand detector 
    startWebcam: async () => {
      size.current = {
        x: video.current.videoWidth,
        y: video.current.videoHeight
      }
      detector.current = await handDetection.createDetector("MediaPipeHands",{
        runtime: 'mediapipe',
        modelType: "full",
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}`,
        maxHands: 2
      })

      tensor.predictWebcam()
    },
    
    // Logic to stop webcam streaming
    stopVideo: () => {
      const stream = video?.current?.captureStream() || streamRef.current;
      const tracks = stream ? stream.getTracks() : [];
      for (var i = 0; i < tracks.length; i++) {
        tracks[i].stop();
        stream.removeTrack(tracks[i])
      }
      if(!video?.current?.srcObject)return
      video.current.srcObject = null;
    },
    
    // Logic to start webcam streaming and run ML detector
    startVideo: async () => {
      if(!!(video.current.srcObject))return
      try{
        if(!!!(navigator.mediaDevices.getUserMedia))throw new Error('media device is not supported.');
        const stream = await navigator.mediaDevices.getUserMedia({video: true})
        streamRef.current = stream
        if(!video.current.srcObject)video.current.srcObject = stream
        video.current.addEventListener("loadeddata", tensor.startWebcam)
        window.stream = stream
      } catch(err){
        console.log(err)
      }
    },

    // Logic to update size constant
    resize: (e) => {
      size.current = {
        x: video.current ? video.current.videoWidth : e.target.innerWidth,
        y: video.current ? video.current.videoHeight : e.target.innerHeight
      }
      // Reset position
      leftConstant.current = []
      rightConstant.current = []
    }
  }}, [leftConstant, rightConstant, leftCurrent, rightCurrent])

  useEffect(() => {
    // Logic to update size
    window.addEventListener("resize", tensor.resize)

    // Start hand detection
    tensor.startVideo()
    return () => {
      // Stop streaming
      tensor.stopVideo()

      // Cleanup event listener
      window.removeEventListener("resize", tensor.resize)
    }
  }, [tensor])

  return (
    // Container of video for getting streaming data
    <Container>
      <div className="container">
        <video className="input_video" ref={video} autoPlay ></video>
        <canvas className="output_canvas" width="100vw" height="100vh" ref={canvas}></canvas>
      </div>
    </Container>
  )
}

// CSS
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

