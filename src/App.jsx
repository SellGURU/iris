import { useEffect } from "react";
import "./App.css";
import { useRef } from "react";
function App() {
  const video2 = useRef("video-cam");
  const out2 = useRef();
  const green = useRef();
  const blue = useRef();
  const red = useRef();
  let canvasCtx,
    canvasWidth,
    canvasHeight = null;
  useEffect(() => {
    canvasCtx = out2.current.getContext("2d");
    canvasWidth = out2.current.width;
    canvasHeight = out2.current.height;
  }, []);
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
        console.log("camera error:",e);
      });

    // start();
  }
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
