import styled from 'styled-components';
import * as handDetection from '@tensorflow-models/hand-pose-detection';
import { Hands, HAND_CONNECTIONS, VERSION } from "@mediapipe/hands";
import { Camera } from '@mediapipe/camera_utils';
// import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs-backend-webgl"
import "@tensorflow/tfjs-backend-cpu"
import { useEffect, useRef } from 'react';

export const TensorFlow = () => {
  const video = useRef()
  const canvas = useRef()
  const count = useRef(1)

  const onResults = (results) => {
    console.log(results)
  }

  // const hands = new Hands({locateFile: (file) => {
  //   return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}`;
  // }})

  // hands.setOptions({
    //   maxNumHands: 2,
    //   modelComplexity: 1,
    //   minDetectionConfidence: 0.5,
    //   minTrackingConfidence: 0.5
    // })
    // hands.onResults(onResults)

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
        console.log(hands)
      })
      window.requestAnimationFrame(predictWebcam)
    }
    predictWebcam()
  }

  const startVideo = () => {
    console.log("working")
    video.current.srcObject = null
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
      video.current.srcObject = stream
      video.current.addEventListener("loadeddata", startWebcam)
    },
    err => {
      if(count.current){
        startVideo();
        count.current--
      }else console.log(err)
    }
    )
  }
  
  useEffect(() => {
    startVideo()
  }, [])





  // const video = useRef()
  // const liveView = useRef()
  // const enableWebcamButton = useRef()
  // const count = useRef(1)
  // const model = useRef(false)
  // const children = useRef([])

  // const getUserMediaSupported = () => {
  //   return !!(navigator.mediaDevices &&
  //     navigator.mediaDevices.getUserMedia);
  // }

  // useEffect(() => {
  //   cocoSsd.load()
  //   .then((loadModel) => {
  //     model.current = loadModel
  //     enableWebcamButton.current.classList.remove('removed');
  //   })
  // }, [])

  // const predictWebcam = (e) => {
  //   model.current.detect(video.current)
  //   .then((predictions) => {
  //     for(let i = 0; i < children.current.length; i++){
  //       liveView.current.removeChild(children.current[i])
  //     }
  //     children.current.splice(0)

  //     for(let n = 0; n < predictions.length; n++){
  //       if(predictions[n].score > 0.66){
  //         const p = document.createElement('p');
  //         p.innerText = predictions[n].class  + ' - with ' 
  //             + Math.round(parseFloat(predictions[n].score) * 100) 
  //             + '% confidence.';
  //         p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
  //             + (predictions[n].bbox[1] - 10) + 'px; width: ' 
  //             + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

  //         const highlighter = document.createElement('div');
  //         highlighter.setAttribute('class', 'highlighter');
  //         highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
  //             + predictions[n].bbox[1] + 'px; width: ' 
  //             + predictions[n].bbox[2] + 'px; height: '
  //             + predictions[n].bbox[3] + 'px;';

  //         liveView.current.appendChild(highlighter);
  //         liveView.current.appendChild(p);
  //         children.current.push(highlighter);
  //         children.current.push(p);
  //       }
  //     }
  //     window.requestAnimationFrame(predictWebcam)
  //   })
  // }

  // const constraints = {
  //   video: true
  // }

  // const startVideo = (e) => {
  //   if(!model.current){//model
  //     return
  //   }
  //   if(!e.target.disabled) e.target.disabled = true
  //   video.current.srcObject = null
  //   navigator.mediaDevices.getUserMedia(constraints)
  //   .then(stream => {
  //     video.current.srcObject = stream
  //     video.current.addEventListener("loadeddata", predictWebcam)
  //   },
  //   err => {
  //     if(count.current){
  //       startVideo(e);
  //       count.current--
  //     }else console.log(err)
  //   }
  //   )
  // }



  return (
    <Container>
      {/* <div id="liveView" className="camView" ref={liveView}>
        <button id="webcamButton" className="removed" ref={enableWebcamButton} onClick={getUserMediaSupported() ? startVideo : (e) => console.log("nope")}>Enable Webcam</button>
        <video id="webcam" autoPlay muted width="640" height="480" ref={video} src=""></video>
      </div> */}
      <div className="container">
        <video className="input_video" ref={video} autoPlay muted width="640" height="480"></video>
        <canvas className="output_canvas" width="1280px" height="720px" ref={canvas}></canvas>
      </div>
    </Container>
  )
}

const Container = styled.div`
  video {
    display: block;
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
