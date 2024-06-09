import { useEffect } from "react";
import "./App.css";
import { useRef } from "react";
import { CustCamera, CustFaceMash } from "./utility/camera";
import { FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { useState } from "react";
function App() {
  let cameraStarted = false;
  const video2 = useRef("video-cam");
  const out2 = useRef();
  const green = useRef();
  const blue = useRef();
  const red = useRef();
  const tmpCanvasRef = useRef(document.createElement("canvas"));
  const [globalData, setGlobalData] = useState({
    globalGreenLandmarks: null,
    globalBlueLandmarks: null,
    globalRedLandmarks: null,
    globalGreenImages: [],
    globalBlueImages: [],
    globalRedImages: [],
    globalGreens: [],
    globalBlues: [],
    globalReds: [],
    globalDataNotSent: false,
    globalFinished: false,
    greenLandmarksData: null,
    blueLandmarksData: null,
    redLandmarksData: null,
    globalPreviousPose: 0,
  });
  let {
    globalGreenLandmarks,
    globalBlueLandmarks,
    globalRedLandmarks,
    globalGreenImages,
    globalBlueImages,
    globalRedImages,
    globalGreens,
    globalBlues,
    globalReds,
    globalDataNotSent,
    globalFinished,
    greenLandmarksData,
    blueLandmarksData,
    redLandmarksData,
  } = globalData;
  let canvasCtx,
    canvasWidth,
    canvasHeight,
    greenCtx,
    redCtx,
    blueCtx,
    tmpcontext = null;
  let persistent = false;
  useEffect(() => {
    canvasCtx = out2.current.getContext("2d");
    canvasWidth = out2.current.width;
    canvasHeight = out2.current.height;
    greenCtx = green.current.getContext("2d");
    redCtx = red.current.getContext("2d");
    blueCtx = blue.current.getContext("2d");
    tmpcontext = tmpCanvasRef.current.getContext("2d");
  }, []);
  const onResultsFaceMesh = (results) => {
    let landmarks;
    const img = document.createElement("img");

    document.body.classList.add("loaded");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, out2.current.width, out2.current.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      out2.current.width,
      out2.current.height
    );
    greenCtx.clearRect(0, 0, green.current.width, green.current.height);
    greenCtx.drawImage(img, 0, 0, green.current.width, green.current.height);
    blueCtx.clearRect(0, 0, blue.current.width, blue.current.height);
    blueCtx.drawImage(img, 0, 0, blue.current.width, blue.current.height);
    redCtx.clearRect(0, 0, red.current.width, red.current.height);
    redCtx.drawImage(img, 0, 0, red.current.width, red.current.height);

    if (results.multiFaceLandmarks) {
      const landmarks = results.multiFaceLandmarks[0];
      let pose = null;
      let colour = "#ACA685"; //skin
      persistent = false;

      if (globalFinished) {
        pose = null;
        colour = "#ACA685"; //skin
        persistent = false;
      } else {
        pose = check_pose(landmarks);
        persistent = isPersistent(pose);
      }

      switch (pose) {
        case "frontal":
          colour = "#7CFC00"; //lime
          break;
        case "left":
          colour = "#64B4FF"; //shiny_blue
          break;
        case "right":
          colour = "#FF503C"; //shiny_red
          break;
        case "finished":
          colour = "#FFFF00"; //yellow
          break;
        default:
          colour = "#ACA685"; //skin
      }

      if (pose === "frontal" && persistent) {
        globalGreenLandmarks = landmarks;
        const greenImage = results.image;
        // tmpcontext.drawImage(greenImage, 0, 0);
        greenLandmarksData = JSON.stringify(landmarks);
        const greenImageData = tmpCanvasRef.current.toDataURL("image/png");

        globalGreenImages.unshift(greenImageData);
        globalGreens.unshift(greenImageData);

        if (globalGreenImages.length > 5) globalGreenImages.pop();
        if (globalGreens.length > 1) globalGreens.pop();

        if (globalGreenImages.length === 5) {
          globalDataNotSent = true;
        }
      }

      if (pose === "left" && persistent) {
        globalData.globalBlueLandmarks = landmarks;
        // setGlobalData((lastItem) => ({
        //   ...lastItem,
        //   globalBlueLandmarks: landmarks,
        // }));
        const blueImage = results.image;
        tmpcontext.drawImage(blueImage, 0, 0);
        blueLandmarksData = JSON.stringify(landmarks);
        const blueImageData = tmpCanvasRef.current.toDataURL("image/png");

        globalBlueImages.unshift(blueImageData);
        globalBlues.unshift(blueImageData);

        if (globalBlueImages.length > 5) globalBlueImages.pop();
        if (globalBlues.length > 1) globalBlues.pop();

        if (globalBlueImages.length === 5) {
          globalDataNotSent = true;
        }
      }

      if (pose === "right" && persistent) {
        globalRedLandmarks = landmarks;
        const redImage = results.image;
        tmpcontext.drawImage(redImage, 0, 0);
        redLandmarksData = JSON.stringify(landmarks);
        const redImageData = tmpCanvasRef.current.toDataURL("image/png");

        globalRedImages.unshift(redImageData);
        globalReds.unshift(redImageData);

        if (globalRedImages.length > 5) globalRedImages.pop();
        if (globalReds.length > 1) globalReds.pop();

        if (globalRedImages.length === 5) {
          globalDataNotSent = true;
        }
      }

      // if (pose === "finished" && persistent) {
      //   if (
      //     globalGreenLandmarks &&
      //     globalBlueLandmarks &&
      //     globalRedLandmarks &&
      //     globalDataNotSent
      //   ) {
      //     console.log(
      //       "All image and landmarks data have been captured and sent for processing."
      //     );
      //     globalDataNotSent = false;
      //     globalFinished = true;
      //   }
      // }

      results.multiFaceLandmarks.forEach((landmarks) => {
        drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
          color: colour,
          lineWidth: 1,
        });
      });
    }
    if (globalGreenLandmarks) {
      landmarks = JSON.parse(greenLandmarksData);
      drawConnectors(greenCtx, landmarks, FACEMESH_TESSELATION, {
        color: "#7CFC00",
        lineWidth: 1,
      });
    }

    if (globalData.globalBlueLandmarks) {
      landmarks = JSON.parse(blueLandmarksData);
      drawConnectors(blueCtx, landmarks, FACEMESH_TESSELATION, {
        color: "#64B4FF",
        lineWidth: 1,
      });
    }

    if (globalRedLandmarks) {
      landmarks = JSON.parse(redLandmarksData);
      drawConnectors(redCtx, landmarks, FACEMESH_TESSELATION, {
        color: "#FF503C",
        lineWidth: 1,
      });
    }

    canvasCtx.restore();

    // setGlobalData({
    //   globalGreenLandmarks,
    //   globalBlueLandmarks,
    //   globalRedLandmarks,
    //   globalGreenImages,
    //   globalBlueImages,
    //   globalRedImages,
    //   globalGreens,
    //   globalBlues,
    //   globalReds,
    //   globalDataNotSent,
    //   globalFinished,
    //   greenLandmarksData,
    //   blueLandmarksData,
    //   redLandmarksData,
    // });
  };
  const faceMesh = CustFaceMash();
  faceMesh.onResults(onResultsFaceMesh);

  function img_source_select() {
    const constraints = {
      video: {
        width: 420,
        height: 420,
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        window.stream = stream;
        if (video2) video2.current.srcObject = stream;
      })
      .catch((e) => {
        console.log("camera error:", e);
      });

    start();
  }
  function start() {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    console.log(video2);
    const camera = CustCamera(video2.current, faceMesh);
    if (video2) camera.start();
    cameraStarted = true;
  }

  const check_pose = (landmark) => {
    // Check frontal view
    const x1 = landmark[33].x;
    const y1 = landmark[33].y;
    const z1 = landmark[33].z;
    const x2 = landmark[133].x;
    const y2 = landmark[133].y;
    const z2 = landmark[133].z;
    const x3 = landmark[362].x;
    const y3 = landmark[362].y;
    const z3 = landmark[362].z;
    const x4 = landmark[263].x;
    const y4 = landmark[263].y;
    const z4 = landmark[263].z;
    const d14 = Math.sqrt(
      Math.pow(x4 - x1, 2) + Math.pow(y4 - y1, 2) + Math.pow(z4 - z1, 2)
    );
    const d23 = Math.sqrt(
      Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) + Math.pow(z3 - z2, 2)
    );

    const distance = (d14 + d23) / 2;
    // console.log("distance", distance);

    // Confidence, it depends on roll and yaw angles
    const xr = landmark[133].x; // Roll angle between inner corner of the eyes
    const yr = landmark[133].y;
    const xl = landmark[362].x;
    const yl = landmark[362].y;
    const rollDistance = Math.sqrt(Math.pow(xr - xl, 2) + Math.pow(yr - yl, 2));
    const rollAngle = Math.atan2(
      landmark[362].z - landmark[133].z,
      rollDistance
    );
    const confidence = 1 - Math.abs(rollAngle) + 0.05; // The greater the angle, the less confidence

    // Inner corner of the eyes in canvas coordinates
    const X1 = xr * canvasWidth;
    const Y1 = yr * canvasHeight;
    const X2 = xl * canvasWidth;
    const Y2 = yl * canvasHeight;
    drawEyeLines(X1, Y1, X2, Y2);

    // Estimate the yaw angle between points 2 and 168 (bottom of nose and nose bridge)
    const x5 = landmark[2].x;
    const y5 = landmark[2].y;
    const z5 = landmark[2].z;
    const x6 = landmark[168].x;
    const y6 = landmark[168].y;
    const z6 = landmark[168].z;
    const yawDistance = Math.sqrt(
      Math.pow(x6 - x5, 2) + Math.pow(y6 - y5, 2) + Math.pow(z6 - z5, 2)
    );
    const yawAngle = Math.atan2(z6 - z5, yawDistance); // Between 0.10 and 0.20 is frontal looking

    if (yawAngle > 0.1 && yawAngle < 0.2 && confidence > 0.98) return "frontal";
    // See if person is looking down. If so, return "finished" so the mesh goes yellow
    if (yawAngle < -0.1 && confidence > 0.95) return "finished";

    // If we are here, it is not a front looking pose
    // Estimate the pitch angle to determine head turning left or right
    // Point 2 bottom of the nose and point 4 top of the nose
    const x7 = landmark[2].x;
    const y7 = landmark[2].y;
    const z7 = landmark[2].z;
    const x8 = landmark[4].x;
    const y8 = landmark[4].y;
    const z8 = landmark[4].z;
    const pitchDistance = Math.sqrt(
      Math.pow(x8 - x7, 2) + Math.pow(y8 - y7, 2) + Math.pow(z8 - z7, 2)
    );
    const pitchAngle = Math.atan2(x8 - x7, pitchDistance);
    // console.log("pitchAngle", pitchAngle);
    // console.log(pitchAngle >= 0.1 && pitchAngle <= 0.2);
    // Pitch angle between 0.10 and 0.15 for blue (looking right)
    // Pitch angle between -0.10 and -0.20 for red (looking left)
    if (pitchAngle >= 0.1 && pitchAngle <= 0.2) return "left";
    if (pitchAngle >= -0.2 && pitchAngle <= -0.1) return "right";

    return null;
  };

  const isPersistent = (pose) => {
    if (pose === globalData.globalPreviousPose) {
      globalData.globalPoseCounter++;
    } else {
      globalData.globalPoseCounter = 1;
      // state dosent update
      globalData.globalPreviousPose = pose;
    }
    return globalData.globalPoseCounter > 50;
  };
  const drawEyeLines = (x1, y1, x2, y2) => {
    // Set the line color and width of line 1 then line 2
    const ctx = canvasCtx;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, y1);
    ctx.lineTo(canvasWidth - 10, y1);
    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, y2);
    ctx.lineTo(canvasWidth - 10, y2);
    ctx.stroke();
  };
  useEffect(() => {}, [globalData]);
  return (
    <>
      <div className="all-poses-auto mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-grid">
        <video
          className="cam-preview video-cam"
          id="video-cam"
          ref={video2}
          width="420px"
          height="420px"
          autoPlay
        ></video>
      </div>
      <div class="all-poses-auto mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-grid">
        <canvas
          class="cam-preview"
          id="output2"
          ref={out2}
          width="420px"
          height="420px"
        ></canvas>
      </div>
      <div class="all-poses-auto mdl-color--black mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
        <canvas id="green" ref={green} height="300px" width="300px"></canvas>
      </div>
      <div class="all-poses-auto mdl-color--black mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
        <canvas id="blue" ref={blue} height="300px" width="300px"></canvas>
      </div>
      <div class="all-poses-auto mdl-color--black mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
        <canvas id="red" ref={red} height="300px" width="300px"></canvas>
      </div>
      <button
        type="submit"
        class="img-source-selector-cam mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
        id="select-camera-btn0"
        onClick={() => img_source_select()}
      >
        Use Camera
      </button>
    </>
  );
}

export default App;
