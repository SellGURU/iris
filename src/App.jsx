import "./App.css";

function App() {

// --------------
let el = (x) => document.getElementById(x);
let fileList = {
  frontal: {
    currImage: null,
    baseImage: null,
  },
  left_side: {
    currImage: null,
  },
  right_side: {
    currImage: null,
  },
};
let player = null;
let dialog = el("dialog");
let poses = [
  "Frontal Neutral Pose",
  "Left Side - Look to your right",
  "Right Side - Look to your left",
];
let pose_list = ["frontal", "left_side", "right_side"];
let stopLoop = false;
let templates = null;
let timer = null;
// let errorThreshold = el("error-threshold").value;
let selectedSex = "feminine";
if (screen.width > 840) {
  if (el("select-all-poses")) {
    el("select-all-poses").classList.remove("hidden");
  }
}
let cameraStarted = false;
let allPosesSelected = false;


/* Use if you whant to close modal when click outside of modal window */
window.onclick = function (event) {
  "use strict";

  if (event.target == dialog) {
    // modal.style.display = "none";
    dialog.close();
    stopLoop = true;
    if (timer != null) {
      window.clearInterval(timer);
    }
    resetPoseSelection();
    el("modal-player")
      .srcObject.getVideoTracks()
      .forEach((track) => track.stop());
  }
};

window.onkeydown = function (event) {
  "use strict";

  if (timer != null && event.target == document.body) {
    // modal.style.display = "none";
    dialog.close();
    stopLoop = true;
    if (timer != null) {
      window.clearInterval(timer);
    }
    resetPoseSelection();
    el("modal-player")
      .srcObject.getVideoTracks()
      .forEach((track) => track.stop());
  }
};



// function submitThreshold(){
//     if (el('error-threshold').value < 0 || el('error-threshold').value > 10) {
//         alert("Too high or too low threshold value. Please enter value between 0 and 10.")
//     } else {
//         errorThreshold = el('error-threshold').value;
//         el('error-threshold').setAttribute('disabled', true);
//         el('edit-threshold').classList.remove('hidden');
//         el('submit-threshold').classList.add('hidden');
//         el("select-all-poses").removeAttribute('disabled');
//         el("select-each-pose").removeAttribute('disabled');
//         el("analyze-all-btn").removeAttribute('disabled');
//         let analyzeBtns = Array.from(document.getElementsByClassName("analyze-btn"));
//         analyzeBtns.forEach(function (element) {
//             element.removeAttribute('disabled');
//         });
//     }
// }

// function editThreshold() {
//     el('error-threshold').removeAttribute('disabled');
//     el('edit-threshold').classList.add('hidden');
//     el('submit-threshold').classList.remove('hidden');
//     el("select-all-poses").setAttribute('disabled', true);
//     el("select-each-pose").setAttribute('disabled', true);
//     el("analyze-all-btn").setAttribute('disabled', true);
//     let analyzeBtns = Array.from(document.getElementsByClassName("analyze-btn"));
//     analyzeBtns.forEach(function (element) {
//         element.setAttribute('disabled', true);
//     });
// }

// when click to btn all pose
function poseCaptureChoice(btnClicked) {
  // console.log("poseCaptureChoice");
  if (btnClicked.id == "select-each-pose") {
    el("img-source0").classList.remove("hidden");
    el("img-source-selector-text0").classList.remove("hidden");
    el("select-camera-btn0").classList.remove("hidden");
    el("select-all-poses").classList.add("hidden");
    el("select-each-pose").classList.add("hidden");

    el("pose-selector-text-div").classList.add("hidden");
    el("all-poses-selector").classList.add("hidden");
    el("pose-select-spacer").classList.add("hidden");

    el("single-pose-reset-div").classList.remove("hidden");
    el("single-pose-reset").classList.remove("hidden");
  } else {
    el("select-all-poses").classList.add("hidden");
    el("select-each-pose").classList.add("hidden");
    el("pose-selector-text-div").classList.add("hidden");
    el("all-poses-selector").classList.add("hidden");
    el("pose-select-spacer").classList.add("hidden");

    el("video-select-div").classList.remove("hidden");
    el("select-poses-reset-div").classList.remove("hidden");
    el("select-poses-reset").classList.remove("hidden");

    allPosesSelected = true;

    // console.log("cam-select-text", el('cam-select').value);
    if (el("cam-select-text").value !== "") {
      start();
    } else {
      // source camera
      navigator.mediaDevices
        .enumerateDevices()
        .then(gotDevices)
        .catch(handleError);
    }
  }
}

// to resat all the state
// function resetPoseSelection() {
//     let poseSelect = Array.from(document.getElementsByClassName('img-source-selector'));
//     poseSelect.forEach(function (element) {
//         element.classList.add('hidden');
//     });
//     let poseText = Array.from(document.getElementsByClassName('img-source-selector-text'));
//     poseText.forEach(function (element) {
//         element.classList.add('hidden');
//     });
//     let poseSpacer = Array.from(document.getElementsByClassName('img-source-selector-spacer'));
//     poseSpacer.forEach(function (element) {
//         element.classList.add('hidden');
//     });
//     el('select-all-poses').classList.remove('hidden');
//     el('select-each-pose').classList.remove('hidden');
//     el('all-poses-selector').classList.remove('hidden');
//     el('pose-selector-text-div').classList.remove('hidden');
//     el('pose-select-spacer').classList.remove('hidden');
//     el('select-poses-reset').classList.add('hidden');
//     el('select-poses-reset-div').classList.add('hidden');
//     el('analyze-all-btn').classList.add('hidden');
//     el('reset-all-poses').classList.add('hidden');
//     el('single-pose-reset-div').classList.add('hidden');

//     stopLoop = false;

//     // i = 0;
//     // function loop() {
//     //     if (i < poses.length) {
//     let btnClicked = {'id': 'select-reset-btn0'};
//     resetSelection(btnClicked);
//     //         i++;
//     //         loop();
//     //     }
//     // }
//     // loop();

//     let camSelectStart = Array.from(document.getElementsByClassName('cam-selector-start'));
//     camSelectStart.forEach(function (element) {
//         element.classList.add('hidden');
//     });

//     let allPosesAuto = Array.from(document.getElementsByClassName('all-poses-auto'));
//     allPosesAuto.forEach(function (element) {
//         element.classList.add('hidden');
//     });

//     if (window.stream) {
//         window.stream.getTracks().forEach(track => {
//             track.stop();
//         });
//     }
//     camera.stop();
//     cameraStarted = false;
//     allPosesSelected = false;
// }


// for camera
function gotDevices(deviceInfos) {
  const videoSelect = el("video-select");
  const videoSelectList = el("video-select-list");
  selectors = [videoSelect];
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map((select) => select.value);
  selectors.forEach((select) => {
    while (select.getElementsByTagName("ul").firstChild) {
      select.removeChild(select.firstChild);
    }
  });

  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement("li");
    option.setAttribute("data-val", deviceInfo.deviceId);
    option.classList.add("mdl-menu__item");
    if (deviceInfo.kind === "videoinput") {
      option.innerHTML = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelectList.appendChild(option);
      getmdlSelect.init("#video-select");
    } else {
      console.log("Some other kind of source/device: ", deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (
      Array.prototype.slice
        .call(select.childNodes)
        .some((n) => n.value === values[selectorIndex])
    ) {
      select.value = values[selectorIndex];
    }
  });
}
// for camera
function gotStream(stream) {
  window.stream = stream; // make stream available to console
  if (allPosesSelected) {
    el("video-cam").srcObject = stream;
  } else {
    player.srcObject = stream;
  }
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}
// to start the camera and mash the face
function unhideAutoCapture() {
  let allPosesAuto = Array.from(
    document.getElementsByClassName("all-poses-auto")
  );
  allPosesAuto.forEach(function (element) {
    element.classList.remove("hidden");
  });
}


// start the camera
function start() {
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const videoSelect = el("cam-select");
  const videoSource = videoSelect.value;
  console.log(videoSource);
  const constraints = {
    video: {
      width: 420,
      height: 420,
    },
    deviceId: videoSource ? { exact: videoSource } : undefined,
  };
  console.log("constraints", constraints);
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
  if (allPosesSelected) {
    unhideAutoCapture();
    camera.start();
  }
  cameraStarted = true;
}


String.prototype.toTitle = function () {
  return this.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
};

// javascript_faceMesh.js
// Copyright 2023 Marcos A Rodrigues, AI Nexus Inc. All rights reserved.
// Marcos A Rodrigues FECIT Anno Domini 2023.

const video2 = document.getElementById("video-cam");
const out2 = document.getElementById("output2");
console.log("out2", out2);

// const controlsElement2 = document.getElementById('control2');
const canvasCtx = out2.getContext("2d");
const canvasWidth = out2.width;
const canvasHeight = out2.height;
// var shutter            = document.getElementById("shutter");

const green = document.getElementById("green");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const greenCtx = green.getContext("2d");
const redCtx = red.getContext("2d");
const blueCtx = blue.getContext("2d");

// const fpsControl = new FPS();
// const spinner = document.querySelector('.loading');
// spinner.ontransitionend = () => {
//   spinner.style.display = 'none';
// };

var tmpcanvas = document.createElement("canvas");
tmpcanvas.width = canvasWidth;
tmpcanvas.height = canvasHeight;
var tmpcontext = tmpcanvas.getContext("2d");
var greenImageData = null;
var blueImageData = null;
var redImageData = null;
var greenLandmarksData = null;
var blueLandmarksData = null;
var redLandmarksData = null;
var greenLandmarks = null;
var redLandmarks = null;
var blueLandmarks = null;

//Re-initalize in case we reload the page
var globalBlueImages = [];
var globalGreenImages = [];
var globalRedImages = [];
var globalGreenLandmarks = null;
var globalRedLandmarks = null;
var globalBlueLandmarks = null;
var globalGreens = [];
var globalBlues = [];
var globalReds = [];

let pose = null;
let colour = "#ACA685"; //skin
let persistent = false;
var globalDataNotSent = true;
var globalFinished = false;
let globalPreviousPose = null;
let globalPoseCounter = 0;

function onResultsFaceMesh(results) {
  let landmarks;
  var img = document.createElement("img");
  // img.src = 'static/images/black.png'; //black background for the mesh thumbnails

  document.body.classList.add("loaded");
  // fpsControl.tick();

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, out2.width, out2.height);
  canvasCtx.drawImage(results.image, 0, 0, out2.width, out2.height);
  greenCtx.clearRect(0, 0, green.width, green.height);
  greenCtx.drawImage(img, 0, 0, green.width, green.height);
  blueCtx.clearRect(0, 0, blue.width, blue.height);
  blueCtx.drawImage(img, 0, 0, blue.width, blue.height);
  redCtx.clearRect(0, 0, red.width, red.height);
  redCtx.drawImage(img, 0, 0, red.width, red.height);

  if (results.multiFaceLandmarks) {
    //get landmarks for the current (first) face
    const landmarks = results.multiFaceLandmarks[0];
    if (globalFinished == true) {
      pose = null;
      colour = "#ACA685"; //skin
      persistent = false;
    } else {
      pose = check_pose(landmarks);
      persistent = isPersistent(pose);
    }

    if (pose == null) colour = "#ACA685"; //skin
    if (pose == "frontal") colour = "#7CFC00"; //lime
    if (pose == "left") colour = "#64B4FF"; //shiny_blue
    if (pose == "right") colour = "#FF503C"; //shiny_red
    if (pose == "finished") colour = "#FFFF00"; //yellow

    if (pose == "frontal" && persistent) {
      globalGreenLandmarks = results.multiFaceLandmarks[0];
      greenLandmarks = results.multiFaceLandmarks[0];
      let greenImage = results.image;
      //freeze current image and landmarks
      tmpcontext = tmpcanvas.getContext("2d");
      tmpcontext.drawImage(greenImage, 0, 0);
      greenImageData = tmpcanvas.toDataURL("image/png"); // Get the base64 string of the image
      greenLandmarksData = JSON.stringify(greenLandmarks); // Convert the landmarks object to JSON string

      globalGreenImages.unshift(greenImageData); // Add image data URL to the beginning of the images array
      globalGreens.unshift(greenImageData);
      // Remove the last element of the images array if it has more than 5 elements
      if (globalGreenImages.length > 5) {
        globalGreenImages.pop();
      } //max 5
      if (globalGreens.length > 1) {
        globalGreens.pop();
      } //max 1
      if (globalGreenImages.length == 5) {
        // playShutterSound();
        pose = null; //just to stop the shutter playing in short sequence
        persistent = isPersistent(pose);
        globalDataNotSent = true;
      }
    }
    if (pose == "left" && persistent) {
      globalBlueLandmarks = results.multiFaceLandmarks[0];
      blueLandmarks = results.multiFaceLandmarks[0];
      let blueImage = results.image;
      //keep current pose
      tmpcontext = tmpcanvas.getContext("2d");
      tmpcontext.drawImage(blueImage, 0, 0);
      blueImageData = tmpcanvas.toDataURL("image/png"); // Get the base64 string of the image
      blueLandmarksData = JSON.stringify(blueLandmarks); // Convert the landmarks object to JSON string

      globalBlueImages.unshift(blueImageData); // Add image data URL to the beginning of the images array
      globalBlues.unshift(blueImageData);
      // Remove the last element of the images array if it has more than 5 elements
      if (globalBlueImages.length > 5) {
        globalBlueImages.pop();
      }
      if (globalBlues.length > 1) {
        globalBlues.pop();
      }
      if (globalBlueImages.length == 5) {
        // playShutterSound();
        pose = null; //just to stop the shutter playing in short sequence
        persistent = isPersistent(pose);
        globalDataNotSent = true;
      }
    }
    if (pose == "right" && persistent) {
      globalRedLandmarks = results.multiFaceLandmarks[0];
      redLandmarks = results.multiFaceLandmarks[0];
      let redImage = results.image;
      //keep current pose
      tmpcontext = tmpcanvas.getContext("2d");
      tmpcontext.drawImage(redImage, 0, 0);
      redImageData = tmpcanvas.toDataURL("image/png"); // Get the base64 string of the image
      redLandmarksData = JSON.stringify(redLandmarks); // Convert the landmarks object to JSON string

      globalRedImages.unshift(redImageData); // Add image data URL to the beginning of the images array
      globalReds.unshift(redImageData);
      // Remove the last element of the images array if it has more than 5 elements
      if (globalRedImages.length > 5) {
        globalRedImages.pop();
      }
      if (globalReds.length > 1) {
        globalReds.pop();
      }
      if (globalRedImages.length == 5) {
        // playShutterSound();
        pose = null; //just to stop the shutter playing in short sequence
        persistent = isPersistent(pose);
        window.globalDataNotSent = true;
      }
    }
    if (pose == "finished" && persistent) {
      if (
        globalGreenLandmarks &&
        globalBlueLandmarks &&
        globalRedLandmarks &&
        globalDataNotSent
      ) {
        // playShutterSound();
        //send all image and landmark data to python for processing
        // globalGreenLandmarks = globalGreenLandmarks
        // globalBlueLandmarks  = globalBlueLandmarks
        // globalRedLandmarks   = globalRedLandmarks
        // send_data_to_python();
        analyzeFacemesh();
        console.log(
          "All image and landmarks data have been captured and sent for processing."
        );
        pose = null;
        persistent = isPersistent(pose);
        globalDataNotSent = false; //do not sent it again unless new data is captured
        globalFinished = true;
      }
    }
    //draw live mesh
    console.log("FACEMESH_TESSELATION", FACEMESH_TESSELATION);
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(
        //main display mesh
        canvasCtx,
        landmarks,
        FACEMESH_TESSELATION,
        { color: colour, lineWidth: 1 }
      );
    }
  }
  //draw the persistent colourful meshes at the bottom
  if (globalGreenLandmarks) {
    landmarks = JSON.parse(greenLandmarksData);
    drawConnectors(greenCtx, landmarks, FACEMESH_TESSELATION, {
      color: (colour = "#7CFC00"),
      lineWidth: 1,
    });
  }
  if (globalBlueLandmarks) {
    landmarks = JSON.parse(blueLandmarksData);
    drawConnectors(blueCtx, landmarks, FACEMESH_TESSELATION, {
      color: (colour = "#64B4FF"),
      lineWidth: 1,
    });
  }
  if (globalRedLandmarks) {
    landmarks = JSON.parse(redLandmarksData);
    drawConnectors(redCtx, landmarks, FACEMESH_TESSELATION, {
      color: (colour = "#FF503C"),
      lineWidth: 1,
    });
  }
  canvasCtx.restore();
}

const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`;
  },
});
faceMesh.onResults(onResultsFaceMesh);

const camera = new Camera(video2, {
  onFrame: async () => {
    await faceMesh.send({ image: video2 });
  },
  width: 420,
  height: 420,
});


// check pose the face
function check_pose(landmark) {
  //check frontal view:
  x1 = landmark[33].x;
  y1 = landmark[33].y;
  z1 = landmark[33].z;
  x2 = landmark[133].x;
  y2 = landmark[133].y;
  z2 = landmark[133].z;
  x3 = landmark[362].x;
  y3 = landmark[362].y;
  z3 = landmark[362].z;
  x4 = landmark[263].x;
  y4 = landmark[263].y;
  z4 = landmark[263].z;
  d14 = Math.sqrt(
    Math.pow(x4 - x1, 2) + Math.pow(y4 - y1, 2) + Math.pow(z4 - z1, 2)
  );
  d23 = Math.sqrt(
    Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) + Math.pow(z3 - z2, 2)
  );
  distance = (d14 + d23) / 2;

  //confidence, it depends on roll and yaw angles
  xr = landmark[133].x; //roll angle between inner corner of the eyes
  yr = landmark[133].y;
  xl = landmark[362].x;
  yl = landmark[362].y;
  roll_distance = Math.sqrt(Math.pow(xr - xl, 2) + Math.pow(yr - yl, 2));
  roll_angle = Math.atan2(landmark[362].z - landmark[133].z, roll_distance);
  confidence = 1 - Math.abs(roll_angle) + 0.05; //the greater the angle, the less confidence

  //inner corner of the yes in canvas coordinates
  X1 = xr * canvasWidth;
  Y1 = yr * canvasHeight;
  X2 = xl * canvasWidth;
  Y2 = yl * canvasHeight;
  drawEyeLines(X1, Y1, X2, Y2);

  //estimate the yaw angle between points 2 and 168 (bottom of nose and nose bridge)
  //point 9 is on top of nose bridge, these points are to be roughly aligned in z
  x1 = landmark[2].x;
  y1 = landmark[2].y;
  z1 = landmark[2].z;
  x2 = landmark[168].x;
  y2 = landmark[168].y;
  z2 = landmark[168].z;
  yaw_distance = Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
  yaw_angle = Math.atan2(z2 - z1, yaw_distance); //between 0.10 and 0.20 is frontal looking
  //console.log("roll angle, yaw angle", roll_angle, yaw_angle)
  if (yaw_angle > 0.1 && yaw_angle < 0.2 && confidence > 0.98) return "frontal";
  //see if person looking down. If so, return finished so the mesh goes yellow
  if (yaw_angle < -0.1 && confidence > 0.95) return "finished";

  //if we are here, it is not a front looking pose
  //estimate the pitch angle to determine head turning left or right
  //point 2 bottom of the nose and point 4 top of the nose
  x1 = landmark[2].x;
  y1 = landmark[2].y;
  z1 = landmark[2].z;
  x2 = landmark[4].x;
  y2 = landmark[4].y;
  z2 = landmark[4].z;
  pitch_distance = Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
  pitch_angle = Math.atan2(x2 - x1, pitch_distance);

  //pitch_angle between 0.10 and 0.15 for blue (looking right)
  //pitch_angle between -0.10 and -0.20 for red (looking left)
  //console.log("pitch", pitch_angle)
  if ((pitch_angle >= 0.1) & (pitch_angle <= 0.2)) return "left"; //. confidence:' + confidence;
  if ((pitch_angle >= -0.2) & (pitch_angle <= -0.1)) return "right"; // confidence:' + confidence;
  return null;
}

function isPersistent(pose) {
  if (pose == globalPreviousPose) {
    globalPoseCounter++;
  } else {
    globalPoseCounter = 1;
    globalPreviousPose = pose;
  }
  //Return true if the counter is greater than a certain time, false otherwise
  return globalPoseCounter > 50;
}

function drawEyeLines(x1, y1, x2, y2) {
  var ctx = canvasCtx;
  x1 = 10;
  x2 = canvasWidth - 10;
  // Set the line color and width of line 1 then line 2
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
}

function analyzeFacemesh() {
  let poseText = "frontal";

  // let currentAnalysisResultCard;
  let currentFaceSymmetryResult;
  // let imageResultRow;
  let innerBottom;
  let innerTop;
  let results;
  let resultsRow;
  let imageAnalysisResultCard;

  // currentAnalysisResultCard = el('all-poses-current-analysis-result-card');
  currentFaceSymmetryResult = el("all-poses-current-face-symmetry-result");
  // imageResultRow = el('all-poses-image-result-row');
  resultsRow = el("all-poses-results-row");
  imageAnalysisResultCard = el("all-poses-image-analysis-result-card");
  innerBottom = el("all-poses-dt-inner-bottom");
  innerTop = el("all-poses-dt-inner-top");
  results = el("all-poses-dt-results");

  currentFaceSymmetryResult.innerHTML = "";
  innerBottom.innerHTML = "";
  innerTop.innerHTML = "";

  while (innerBottom.firstChild) {
    innerBottom.removeChild(innerBottom.firstChild);
  }

  console.log("Sending files for analysis");

  let xhr = new XMLHttpRequest();
  let loc = window.location;
  xhr.open(
    "POST",
    `${loc.protocol}//${loc.hostname}:${loc.port}/api/v1/analyze`,
    true
  );
  xhr.onerror = function () {
    alert(xhr.responseText);
  };
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      console.log("Response received from server");
      let response = JSON.parse(e.target.responseText);
      console.log(response);

      if (e.target.status !== 200) {
        currentFaceSymmetryResult.innerHTML +=
          "Error with request, please try another image or contact support if the problem persists.";
      } else {
        results.classList.remove("hidden");
        // resultsRow.classList.remove('hidden');
        // imageResultRow.classList.remove('hidden');
        // currentAnalysisResultCard.classList.remove('hidden');
        imageAnalysisResultCard.classList.remove("hidden");
        el("reset-all-poses").classList.remove("hidden");

        if (response.success == true) {
          if (response.html_file != null) {
            let resultHtmldiv = document.createElement("div");
            let resultLink = document.createElement("a");
            resultHtmldiv.appendChild(resultLink);
            resultLink.innerHTML = "View Detailed Report";
            resultLink.href = "golden_ratios/" + response["request_id"];
            resultLink.target = "_blank";
            resultHtmldiv.innerHTML += "&emsp;";
            let resultHtml = document.createElement("a");
            resultHtmldiv.appendChild(resultHtml);
            resultHtml.innerHTML = "Download Report HTML File";
            resultHtml.href = "data:text/html;base64," + response["html_file"];
            resultHtml.download = "golden_ratios.html";
            resultHtmldiv.innerHTML += "<br><br>";
            innerTop.append(resultHtmldiv);
          }
          if (response["montage"] != null) {
            let resultMontage = document.createElement("img");
            innerBottom.appendChild(resultMontage);
            resultMontage.style.width = "100%";
            //resultMontage.src = "static/images/montage.jpg?" + now;
            resultMontage.src =
              "data:image/png;base64," + response["base64montage"];
          } else {
            let baseFaceDeteced = response["baseFaceDetected"];
            let currFaceDeteced = response["currFaceDetected"];
            if (baseFaceDeteced == false || currFaceDeteced == false) {
              innerBottom.innerHTML =
                "A face could not be detected in your baseline image, please try another image.";
            }
          }
          // if (response.pose_analysis.length > 0) {
          //     response.pose_analysis.forEach((pose) => {
          //         if (pose.current_image_analysis != null) {
          //         currentFaceSymmetryResult.innerHTML += "<strong>SYMMETRY:</strong>";
          //         currentFaceSymmetryResult.innerHTML += "<pre style='font-family: Helvetica,Arial,sans-serif'>" + JSON.stringify(pose.current_image_analysis.symmetry, null, 2) + "</pre>";
          //         currentFaceSymmetryResult.innerHTML += "<strong>MEASUREMENTS:</strong>";
          //         currentFaceSymmetryResult.innerHTML += "<pre style='font-family: Helvetica,Arial,sans-serif'>" + JSON.stringify(pose.current_image_analysis.measurements, null, 2) + "</pre>";
          //         } else {
          //             currentFaceSymmetryResult.innerHTML += '<strong>POSE: ' + pose.pose_name.split("_").join(" ").toUpperCase() + "</strong><br><br>";
          //             currentFaceSymmetryResult.innerHTML += "Unable to detect a face in the image provided. Please choose another image."
          //         }
          //     });
          // }
        }
        console.log("All done");
      }
    }
  };
  let fileData = new FormData();
  // fileData.append("error_threshold", errorThreshold);
  fileData.append("gender", selectedSex);
  fileData.append(poseText + "_current", globalGreenImages[0].split(",")[1]);
  xhr.send(fileData);
}



// --------------

  return (
    <>
      <div
        class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50"
        id="side-nav"
      >
        <header class="demo-drawer-header">
          <a href="https://www.ainexushealthcare.com">
            <img src="/static/images/AIN-Site-logo.png" class="demo-avatar" />
          </a>
        </header>
        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          <a class="mdl-navigation__link" href="/v1">
            <i
              class="mdl-color-text--blue-grey-400 material-icons"
              role="presentation"
            >
              home
            </i>
            Home
          </a>
          <a class="mdl-navigation__link" href="help">
            <i
              class="mdl-color-text--blue-grey-400 material-icons"
              role="presentation"
            >
              help
            </i>
            Help
          </a>
          {/* <!-- <a class="mdl-navigation__link" href="samples"><i class="mdl-color-text--blue-grey-400 material-icons"
            role="presentation">photo_library</i>Samples</a> --> */}
        </nav>
      </div>
      <main
        class="mdl-layout__content mdl-color--grey-100"
        style="flex: 1 0 auto;"
      >
        <dialog id="dialog" class="mdl-dialog">
          <h6 class="mdl-dialog__title" id="capture-title">
            Capture Poses
          </h6>
          <div class="mdl-dialog__content">
            <p id="capture-text">
              Click 'Start' when you are ready to begin capturing the required
              poses
            </p>
            <h6 class="hidden" id="capture-instruction"></h6>
            <h1 class="hidden" id="modal-count"></h1>
            <video
              class="hidden cam-preview"
              id="modal-player"
              autoplay
            ></video>
          </div>
          <div class="mdl-dialog__actions">
            <button
              type="submit"
              class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
              id="modal-capture-btn"
              onClick={captureStart()}
            >
              Start
            </button>
          </div>
        </dialog>

        <div class="hidden cam-selector-start mdl-cell mdl-cell--8-col mdl-grid"></div>
        <div
          class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"
          id="algo-detection-header"
        >
          <h5>AI Nexus Healthcare Iris Analysis</h5>
        </div>
        <div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <h7>
            <strong>Error Threshold (%)</strong>
          </h7>
          <p>
            Adjust the error threshold betwenen 0-10% for differences between
            calculated ratios versus golden ratios.
          </p>
        </div>
        <div class="all-poses-select mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <div class="mdl-cell mdl-cell--3-col mdl-grid">
            <input
              class="mdl-textfield__input"
              type="number"
              id="error-threshold"
              min="0"
              max="10"
              value="10"
              required
              disabled
            />
          </div>
          <button
            type="submit"
            class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="edit-threshold"
            onClick={editThreshold(this)}
          >
            Edit
          </button>
          <button
            type="submit"
            class="hidden mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="submit-threshold"
            onClick={submitThreshold(this)}
          >
            Submit
          </button>
        </div>
        <div class="mdl-cell mdl-cell--4-col mdl-grid"></div>
        <div class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <h7>
            <strong>Sex Selector</strong>
          </h7>
          <p>Choose the sex of the subject in the image.</p>
        </div>
        <div class="all-poses-select mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <label
            class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            for="feminine"
          >
            <input
              type="radio"
              id="feminine"
              class="mdl-radio__button"
              name="gender-options"
              value="1"
              checked
            />
            <span class="mdl-radio__label">Feminine</span>
          </label>
          <label
            class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            for="masculine"
          >
            <input
              type="radio"
              id="masculine"
              class="mdl-radio__button"
              name="gender-options"
              value="2"
            />
            <span class="mdl-radio__label">Masculine</span>
          </label>
          <button
            type="submit"
            class="hidden mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="edit-sex"
            onClick={editSex(this)}
          >
            Edit
          </button>
          <button
            type="submit"
            class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="submit-sex"
            onClick={submitSex(this)}
          >
            Submit
          </button>
        </div>
        <div
          class="mdl-cell mdl-cell--4-col mdl-grid"
          id="pose-select-spacer"
        ></div>
        <div
          class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
          id="pose-selector-text-div"
        >
          <h7>
            <strong>Pose Selector</strong>
          </h7>
          <p>
            To get all poses automatically in sequence on Desktop click 'All
            Poses', Otherwise for single frontal pose click 'Single Pose'
          </p>
        </div>
        <div
          class="all-poses-select mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
          id="all-poses-selector"
        >
          <button
            type="submit"
            class="hidden mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="select-all-{poses"
            onClick={poseCaptureChoice(this)}
            disabled
          >
            All Poses
          </button>
          <button
            type="submit"
            class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="select-each-{pose"
            onClick={poseCaptureChoice(this)}
            disabled
          >
            Single Pose
          </button>
          <button
            type="submit"
            class="hidden mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="analyze-all-btn"
            onClick={analyzeAll(this)}
          >
            Analyze All
          </button>
        </div>
        <div class="mdl-cell mdl-cell--4-col mdl-grid"></div>
        <div
          class="hidden all-poses-select cam-selector-start mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
          id="video-select-div"
        >
          <div
            class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select"
            id="video-select"
          >
            <input
              type="text"
              value=""
              class="mdl-textfield__input"
              id="cam-select-text"
              onChange={start()}
              placeholder="Select..."
              readonly
            />
            <input type="hidden" value="" name="cam-select" id="cam-select" />
            <i class="mdl-icon-toggle__label material-icons">
              keyboard_arrow_down
            </i>
            <label for="cam-select" class="mdl-textfield__label">
              Video Source
            </label>
            <ul
              for="cam-select"
              class="mdl-menu mdl-menu--bottom-left mdl-js-menu"
              id="video-select-list"
            ></ul>
          </div>
        </div>
        <div
          class="hidden mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
          id="reset-all-poses"
        >
          <button
            type="submit"
            class="mdl-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="all-poses-reset"
            onClick={resetAllPoses()}
          >
            Take Another Measurement
          </button>
        </div>
        <div
          class="hidden mdl-color--white mdl-shadow--2dp mdl-cell--4-col mdl-cell mdl-grid"
          id="select-poses-reset-div"
        >
          <button
            type="submit"
            class="hidden mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="select-poses-reset"
            onClick={resetPoseSelection(this)}
          >
            RESET ALL
          </button>
        </div>
        <div class="hidden cam-selector-start mdl-cell mdl-cell--8-col mdl-grid"></div>
        <div class="hidden all-poses-auto mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-grid">
          <video
            class="cam-preview"
            id="video-cam"
            width="420px"
            height="420px"
            autoplay
          ></video>
        </div>
        <div class="hidden all-poses-auto mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-grid">
          <canvas
            class="cam-preview"
            id="output2"
            width="420px"
            height="420px"
          ></canvas>
        </div>
        <div class="hidden all-poses-auto mdl-color--black mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <canvas id="green" height="300px" width="300px"></canvas>
        </div>
        <div class="hidden all-poses-auto mdl-color--black mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <canvas id="blue" height="300px" width="300px"></canvas>
        </div>
        <div class="hidden all-poses-auto mdl-color--black mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <canvas id="red" height="300px" width="300px"></canvas>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/face_mesh.js"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"></script>
        <script src="app_v1.js"></script>
        <div
          class="hidden img-source-selector-text mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
          id="img-source-selector-text0"
        >
          <h7>
            <strong>Pose 1: Frontal Neutral Pose</strong>
          </h7>
          <p>Look straight at camera without making any facial expressions</p>
        </div>
        <div class="hidden img-source-selector-spacer mdl-cell--8-col mdl-grid"></div>
        <div
          class="hidden img-source-selector mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
          id="img-source0"
        >
          <button
            type="submit"
            class="hidden img-source-selector-cam mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="select-camera-btn0"
            onClick={img_source_select(this)}
          >
            Use Camera
          </button>
          <button
            type="submit"
            class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="select-upload-btn0"
            onClick={img_source_select(this)}
          >
            Select Image
          </button>
          <button
            type="submit"
            class="hidden mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="select-reset-btn0"
            onClick={resetSelection(this)}
          >
            Reset Selection
          </button>
        </div>
        <div
          class="hidden mdl-color--white mdl-shadow--2dp mdl-cell--4-col mdl-cell mdl-grid"
          id="single-pose-reset-div"
        >
          <button
            type="submit"
            class="hidden mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
            id="single-pose-reset"
            onClick={resetPoseSelection(this)}
          >
            RESET ALL
          </button>
        </div>
        <div class="hidden camera-start0 mdl-cell mdl-cell--1-col mdl-grid"></div>
        <div class="hidden camera camera-start0 demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <div class="mdl-card__title mdl-card--expand">
            <h6>Camera View</h6>
          </div>
          <div class="mdl-card__title" id="camImage0">
            <video class="cam-preview" id="player0" autoplay></video>
          </div>
          <div class="mdl-card__supporting-text" id="cam-upload-text0">
            Preview your webcam here
          </div>
          <div
            class="hidden mdl-card__supporting-text cam-countdown-text"
            id="cam-countdown-text0"
          >
            Capturing image in... <br />
            <h3 class="count" id="count0"></h3>
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <button
              class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
              id="capture-btn0"
              onClick={captureImageTimed(this)}
            >
              Capture
            </button>
          </div>
        </div>
        <div class="hidden camera-start0 mdl-cell mdl-cell--2-col mdl-grid"></div>
        <div class="hidden camera camera-start0 demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <div class="mdl-card__title mdl-card--expand">
            <h6>Captured Image</h6>
          </div>
          <div class="mdl-card__title">
            <canvas
              class="capture-canvas"
              id="canvas0"
              width="420"
              height="420"
            ></canvas>
          </div>
          <div class="hidden mdl-card__supporting-text" id="cam-capture-text0">
            If you are happy with this image, click 'Use Image' below
          </div>
          <div
            class="hidden mdl-card__actions mdl-card--border"
            id="use-capture0"
          >
            <button
              class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
              id="use-capture-btn0"
              onClick={useImage(this)}
            >
              Use Image
            </button>
          </div>
        </div>
        <div class="hidden camera-start0 mdl-cell mdl-cell--1-col mdl-grid"></div>
        {/* <!-- <div class="hidden upload-start0 mdl-cell mdl-cell--4-col mdl-grid"></div> --> */}
        <div class="hidden upload-start0 mdl-cell mdl-cell--1-col mdl-grid"></div>
        <div class="hidden upload upload-start0 demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <div class="mdl-card__title mdl-card--expand">
            <h6>Current Image</h6>
          </div>
          <div class="mdl-card__title" id="currImage0">
            <img
              class="upload-placeholder"
              src="/static/images/upload-placeholder.png"
              id="image-picked0"
              width="512"
              height="512"
            />
          </div>
          <div class="mdl-card__supporting-text" id="curr-upload-text0">
            Upload an image of your face here (frontal view)
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <form
              role="form"
              enctype="multipart/form-data"
              method="POST"
              id="upload-form0"
            >
              <div class="form-group">
                <input
                  id="upload-file0"
                  type="file"
                  accept="image/*"
                  onChange={showPicked(this)}
                />
              </div>
              <div id="file-list-display0"></div>
            </form>
          </div>
        </div>
        <div class="hidden upload-start0 mdl-cell mdl-cell--2-col mdl-grid"></div>
        <div class="hidden upload upload-start0 demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
          <div class="mdl-card__title mdl-card--expand">
            <h6>Baseline Image</h6>
          </div>
          <div class="mdl-card__title" id="baseImage0">
            <img
              class="upload-placeholder"
              src="/static/images/upload-placeholder.png"
              id="base-image-picked0"
            />
          </div>
          <div class="mdl-card__supporting-text" id="base-upload-text0">
            OPTIONALLY: Upload a baseline image of your face here (frontal view)
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <form
              role="form"
              enctype="multipart/form-data"
              method="POST"
              id="base-upload-form0"
            >
              <div class="form-group">
                <input
                  id="base-upload-file0"
                  type="file"
                  accept="image/*"
                  onChange={showPicked(this)}
                />
              </div>
              <div id="base-file-list-display0"></div>
            </form>
          </div>
        </div>
        <div class="hidden upload-start0 mdl-cell mdl-cell--1-col mdl-grid"></div>
        <div
          class="hidden mdl-cell mdl-cell--12-col mdl-grid upload-start0 buttons-row"
          id="buttons-row-0"
        >
          <div
            class="hidden predict-card upload-start0 mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
            id="predict-card0"
          >
            <button
              type="submit"
              class="analyze-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
              id="analyze-{btn0"
              onClick={analyze(this)}
              disabled
            >
              Analyze
            </button>
            <button
              type="submit"
              class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
              id="clear-btn0"
              onClick={reset(this)}
            >
              Clear
            </button>
          </div>
        </div>
        <div
          class="hidden mdl-cell mdl-cell--12-col mdl-grid"
          id="results-row-0"
        >
          <div
            class="hidden classifier-results demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
            id="current-analysis-result-card-0"
          >
            <div
              class="mdl-card__title mdl-card--expand"
              id="current-analysis-result-card-title-0"
            >
              <div class="outer">
                <div id="current-image-analysis-0">
                  <h5>Current Image Face Symmetry Analysis</h5>
                  <div
                    class="symmetry-result"
                    id="current-face-symmetry-result-0"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="mdl-card__supporting-text"
              id="current-analysis-result-card-supporting-text-0"
            ></div>
            <div class="mdl-card__actions mdl-card--border">
              Current Image Analysis
            </div>
          </div>
          <div
            class="hidden classifier-results demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
            id="baseline-analysis-result-card-0"
          >
            <div
              class="mdl-card__title mdl-card--expand"
              id="baseline-analysis-result-card-title-0"
            >
              <div class="outer">
                <div id="baseline-image-analysis-0">
                  <h5>Baseline Image Face Symmetry Analysis</h5>
                  <div
                    class="symmetry-result"
                    id="baseline-face-symmetry-result-0"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="mdl-card__supporting-text"
              id="baseline-analysis-result-card-supporting-text-0"
            ></div>
            <div class="mdl-card__actions mdl-card--border">
              Baseline Image Analysis
            </div>
          </div>
          <div class="hidden mdl-cell mdl-cell--4-col mdl-grid"></div>
          <div
            class="hidden classifier-results demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
            id="trend-analysis-result-card-"
          >
            <div
              class="mdl-card__title mdl-card--expand"
              id="trend-analysis-result-card-title="
            >
              <div class="outer">
                <div id="trend-analysis-">
                  <h5>Face Symmetry Trend Analysis</h5>
                  <div
                    class="symmetry-result"
                    id="trend-face-symmetry-result-"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="mdl-card__supporting-text"
              id="trend-analysis-result-card-supporting-text-"
            ></div>
            <div class="mdl-card__actions mdl-card--border">Trend Analysis</div>
          </div>
        </div>
        <div
          class="hidden mdl-cell mdl-cell--12-col mdl-grid"
          id="image-result-row-0"
        >
          <div
            class="hidden classifier-results demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"
            id="image-analysis-result-card-0"
          >
            <div
              class="hidden mdl-card__title mdl-card--expand dt-results"
              id="dt-results-0"
            >
              <div class="outer">
                <div class="inner-top">
                  <h6>Here is our analysis of your image(s):</h6>
                  <div id="dt-inner-top-0"></div>
                </div>
                <div class="dt-inner-bottom" id="dt-inner-bottom-0"></div>
              </div>
            </div>
            <div class="mdl-card__supporting-text" id="dt-top-result-0"></div>
            <div class="mdl-card__actions mdl-card--border">Image Analysis</div>
          </div>
        </div>
        <div
          class="hidden mdl-cell mdl-cell--12-col mdl-grid"
          id="analyze-all-poses-row"
        >
          <div class="img-source-selector-text mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid">
            <h7>
              <strong>All Poses</strong>
            </h7>
            <p>Analyze current images for all 3 poses</p>
          </div>
          <div
            id="analyze-all-poses-btn-container"
            class="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
          >
            <button
              type="submit"
              class="analyze-btn mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
              id="analyze-all-poses-{btn"
              onClick={analyze(this)}
              disabled
            >
              Analyze All Poses
            </button>
          </div>
          <div class="mdl-cell mdl-cell--4-col mdl-grid"></div>
        </div>
        <div
          class="hidden mdl-cell mdl-cell--12-col mdl-grid"
          id="all-poses-results-row"
        >
          <div
            class="hidden classifier-results demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
            id="all-poses-current-analysis-result-card"
          >
            <div
              class="mdl-card__title mdl-card--expand"
              id="all-poses-current-analysis-result-card-title"
            >
              <div class="outer">
                <div id="all-poses-current-image-analysis">
                  <h5>Current Image Face Symmetry Analysis</h5>
                  <div
                    class="symmetry-result"
                    id="all-poses-current-face-symmetry-result"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="mdl-card__supporting-text"
              id="all-poses-current-analysis-result-card-supporting-text"
            ></div>
            <div class="mdl-card__actions mdl-card--border">
              Current Image Analysis
            </div>
          </div>
          <div
            class="hidden classifier-results demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
            id="all-poses-baseline-analysis-result-card"
          >
            <div
              class="mdl-card__title mdl-card--expand"
              id="all-poses-baseline-analysis-result-card-title"
            >
              <div class="outer">
                <div id="all-poses-baseline-image-analysis">
                  <h5>Baseline Image Face Symmetry Analysis</h5>
                  <div
                    class="symmetry-result"
                    id="all-poses-baseline-face-symmetry-result"
                  >
                    Baseline images are not analysed for all poses
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mdl-card__supporting-text"
              id="all-poses-baseline-analysis-result-card-supporting-text"
            ></div>
            <div class="mdl-card__actions mdl-card--border">
              Baseline Image Analysis
            </div>
          </div>
          <div class="hidden mdl-cell mdl-cell--4-col mdl-grid"></div>
          <div
            class="hidden classifier-results demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-grid"
            id="all-poses-trend-analysis-result-card"
          >
            <div
              class="mdl-card__title mdl-card--expand"
              id="all-poses-trend-analysis-result-card-title"
            >
              <div class="outer">
                <div id="all-poses-trend-analysis">
                  <h5>Face Symmetry Trend Analysis</h5>
                  <div
                    class="symmetry-result"
                    id="all-poses-trend-face-symmetry-result"
                  >
                    Trend analysis is not peformed for all poses
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mdl-card__supporting-text"
              id="all-poses-trend-analysis-result-card-supporting-text"
            ></div>
            <div class="mdl-card__actions mdl-card--border">Trend Analysis</div>
          </div>
        </div>
        <div
          class="hidden classifier-results mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"
          id="all-poses-image-analysis-result-card"
        >
          <div
            class="hidden mdl-card__title mdl-card--expand dt-results"
            id="all-poses-dt-results"
          >
            <div class="outer">
              <div class="inner-top">
                <h6>Here is our analysis of your image(s):</h6>
                <div id="all-poses-dt-inner-top"></div>
              </div>
              <div class="dt-inner-bottom" id="all-poses-dt-inner-bottom"></div>
            </div>
          </div>
          <div
            class="mdl-card__supporting-text"
            id="all-poses-dt-top-result"
          ></div>
          <div class="mdl-card__actions mdl-card--border">
            Image Analysis Results
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
