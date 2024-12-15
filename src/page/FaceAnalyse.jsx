import Servise from "./modal/service.jsx";
/ eslint-disable no-undef /;
import { useContext, useEffect, useReducer } from "react";
import { useRef } from "react";
import { CustCamera, CustFaceMash } from "../utility/camera";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { publish } from "../utility/event.js";
import { IoCameraOutline } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import { TabsCustume } from "../components/tabs/tabs.jsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import { AiFillCheckSquare } from "react-icons/ai";
import { ProgressbarCustom } from "../components/progressbar/index.jsx";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link2 from "@mui/material/Link";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { updateLocalPatientIHistoty } from "../utility/updateLocalPatientIHistoty.js";
import { PatientContext } from "../context/context.jsx";
import { IoRefresh } from "react-icons/io5";
import { LoadingReports } from "./loadingReports.jsx";
import { Button } from "symphony-ui";
import Permision from "./modal/Permision.jsx";
import Analytics from "../api/analytics.js";
const FaceAnalyse = () => {
  const [isShowFaceGuide, setIsShowFaceGuide] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showPermision, setShowPermision] = useState(false);
  const navigate = useNavigate();
  // const sex = useSelector(selectSex);
  // const id = useSelector(selectPatientID);
  // const errorThreshold = useSelector(selectErrorThreshold);
  // const dispatch = useDispatch();
  const appContext = useContext(PatientContext);
  const {
    patientID,
    sex,
    errorThreshold,
    setPdf,
    setFile,
    setPhoto,
    photo,
    addPatient,
  } = useContext(PatientContext);
  const [serviceMode, setServiceMode] = useState("empty");
  useEffect(() => {
    if (!appContext.package.getPackage().isExist()) {
      setShowService(true);
      publish("openModal");
      setServiceMode("empty");
    } else if (!appContext.package.getPackage().isActive()) {
      setShowService(true);
      publish("openModal");
      setServiceMode("ziroBundle");
    }
  });
  const [, forceUpdate] = useReducer((x) => x + 1, 1);
  const [isCameraStart, setIsCameraStart] = useState(false);
  const [status, setStatus] = useState("multi");
  const [resolvedFile, setResolvedFile] = useState("");
  const [iscomplete, setIscomplete] = useState(false);
  const tabs = [
    { state: "multi", label: "All poses" },
    { state: "one", label: "Single pose" },
  ];
  // let cameraStarted = false;
  const sendToAnalyze = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://iris.ainexus.com/api/v1/analyze", true);
    toast.loading("pending ...");
    xhr.onload = function (e) {
      // console.log(e)
      let response = JSON.parse(e.target.responseText);
      let result = document.getElementById("result");
      let resultHtmldiv = document.createElement("div");
      let resultLink = document.createElement("a");
      resultHtmldiv.appendChild(resultLink);
      // resultLink.innerHTML = "View Detailed Report";
      resultLink.href = "golden_ratios/" + response["request_id"];
      resultLink.target = "_blank";
      resultHtmldiv.innerHTML += "&emsp;";
      let resultHtml = document.createElement("a");
      resultHtmldiv.appendChild(resultHtml);
      resultHtml.innerHTML = "Download Report HTML File";
      resultHtml.href = "data:text/html;base64," + response["html_file"];
      resultHtml.download = "golden_ratios.html";
      resultHtmldiv.innerHTML += "<br><br>";
      setPdf("data:text/html;base64," + response["html_file"]);
      setPhoto(resolvedFile);
      const responce = {
        id: patientID,
        sex: sex,
        errorThreshold: errorThreshold,
        photo: photo,
        htmlId: response["request_id"],
        comment: [],
      };
      updateLocalPatientIHistoty(responce);
      console.log("face mash");
      navigate("/result");
      // result.append(resultHtmldiv);
      toast.dismiss();
    };
    let fileData = new FormData();
    fileData.append("error_threshold", errorThreshold);
    fileData.append("gender", sex);
    fileData.append("frontal_current", resolvedFile.split(",")[1]);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    xhr.send(fileData);
  };
  // useEffect(() => {
  //     if(resolvedFile!= ''){
  //         console.log(resolvedFile)
  //         sendToAnalyze()
  //     }
  // },[resolvedFile])
  const video2 = useRef("video-cam");
  const out2 = useRef();
  const out3 = useRef();
  const out4 = useRef();
  const out5 = useRef();
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
    IsglobalDataSend: false,
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
    canvasCtx3,
    canvasWidth3,
    canvasHeight3,
    canvasCtx4,
    canvasCtx5,
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

    canvasCtx3 = out3.current.getContext("2d");
    canvasWidth3 = out3.current.width;
    canvasHeight3 = out3.current.height;

    canvasCtx4 = out4.current.getContext("2d");
    canvasCtx5 = out5.current.getContext("2d");

    greenCtx = green.current.getContext("2d");
    redCtx = red.current.getContext("2d");
    blueCtx = blue.current.getContext("2d");

    tmpcontext = tmpCanvasRef.current.getContext("2d");
    // size of image that captured in final result
    tmpCanvasRef.current.height = 420;
    tmpCanvasRef.current.width = 420;
  });
  useEffect(() => {
    // in first load didn't start the camera
    if (isCameraStart) start();
    setGlobalData({
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
      IsglobalDataSend: false,
    });
    globalFinished = false;
    toast.dismiss();
  }, [status]);
  const onResultsFaceMesh = (results) => {
    let landmarks;
    const img = document.createElement("img");

    document.body.classList.add("loaded");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, out2.current?.width, out2.current?.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      out2?.current?.width,
      out2?.current?.height
    );

    if (!globalGreenLandmarks) {
      canvasCtx3.save();
      canvasCtx3.clearRect(0, 0, out3.current?.width, out3.current?.height);
      canvasCtx3.drawImage(
        results.image,
        0,
        0,
        out3?.current?.width,
        out3?.current?.height
      );
    }
    // console.log("!globalBlueLandmarks", !globalBlueLandmarks)
    if (!globalBlueLandmarks) {
      canvasCtx4.save();
      canvasCtx4.clearRect(0, 0, out4.current?.width, out4.current?.height);
      canvasCtx4.drawImage(
        results.image,
        0,
        0,
        out4?.current?.width,
        out4?.current?.height
      );
    }

    if (!globalRedLandmarks) {
      canvasCtx5.save();
      canvasCtx5.clearRect(0, 0, out5.current?.width, out5.current?.height);
      canvasCtx5.drawImage(
        results.image,
        0,
        0,
        out5?.current?.width,
        out5?.current?.height
      );
    }

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
        setGlobalData((prv) => ({ ...prv, globalGreenLandmarks: landmarks }));
        const greenImage = results.image;

        tmpcontext.drawImage(greenImage, 0, 0);
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
        globalBlueLandmarks = landmarks;
        setGlobalData((prv) => ({ ...prv, globalBlueLandmarks: landmarks }));

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
        setGlobalData((prv) => ({ ...prv, globalRedLandmarks: landmarks }));

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

      if (status === "one") {
        if (globalGreenLandmarks && globalGreenImages && !globalFinished) {
          console.log("one");
          console.log("finish");
          globalData.IsglobalDataSend = true;
          setIscomplete(true);
          // analyzeFacemesh();
          globalFinished = true;
        }
      } else {
        if (
          globalGreenLandmarks &&
          globalGreenImages &&
          globalBlueLandmarks &&
          globalBlueImages &&
          globalRedImages &&
          globalRedLandmarks &&
          !globalFinished
        ) {
          console.log(
            "All image and landmarks data have been captured and sent for processing."
          );
          console.log("finish");
          globalData.IsglobalDataSend = true;
          // analyzeFacemesh();
          setIscomplete(true);
          globalFinished = true;
        }
      }

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

    if (globalBlueLandmarks) {
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

  const img_source_select = () => {
    setIsCameraStart(true);
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
  };

  const start = () => {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    const camera = CustCamera(video2.current, faceMesh);
    if (video2) camera.start();
  };

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

    if (status === "multi") {
      if (pitchAngle >= 0.1 && pitchAngle <= 0.2) return "left";
      if (pitchAngle >= -0.2 && pitchAngle <= -0.1) return "right";
    }

    return null;
  };
  const [startTimer, setStarttimer] = useState(false);
  const [startTimer2, setStarttimer2] = useState(false);
  const [startTimer3, setStarttimer3] = useState(false);
  const isPersistent = (pose) => {
    if (globalData.globalPoseCounter <= 3) {
      setStarttimer(false);
      setStarttimer2(false);
      setStarttimer3(false);
    }
    if (globalData.globalPoseCounter == 4) {
      if (pose == "frontal") {
        setStarttimer(true);
      }
      if (pose == "left") {
        setStarttimer2(true);
      }
      if (pose == "right") {
        setStarttimer3(true);
      }
    }
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
  const [access] = useLocalStorage("token");

  const analyzeFacemesh = () => {
    let poseText = "frontal";
    // let currentAnalysisResultCard;
    let currentFaceSymmetryResult;
    // let imageResultRow;
    let innerBottom;
    let innerTop;
    let results;
    let imageAnalysisResultCard;

    console.log("Sending files for analysis");

    let xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      // `${loc.protocol}//${loc.hostname}:${loc.port}/api/v1/analyze`,
      "https://iris.ainexus.com/api/v1/analyze",
      true
    );
    // toast.loading("pending ...")

    xhr.setRequestHeader("Authorization", `Bearer ${access}`);
    xhr.onerror = function () {
      console.log(xhr.responseText);
    };
    xhr.onload = function (e) {
      if (this.readyState === 4) {
        console.log("Response received from server");
        appContext.package.usePackage();
        let response = JSON.parse(e.target.responseText);
        let result = document.getElementById("result");
        let resultHtmldiv = document.createElement("div");
        let resultLink = document.createElement("a");
        resultHtmldiv.appendChild(resultLink);
        // resultLink.innerHTML = "View Detailed Report";
        resultLink.href = "golden_ratios/" + response["request_id"];
        resultLink.target = "_blank";
        resultHtmldiv.innerHTML += "&emsp;";
        let resultHtml = document.createElement("a");
        resultHtmldiv.appendChild(resultHtml);
        resultHtml.innerHTML = "Download Report HTML File";
        resultHtml.href = "data:text/html;base64," + response["html_file"];
        resultHtml.download = "golden_ratios.html";
        resultHtmldiv.innerHTML += "<br><br>";
        result.append(resultHtmldiv);

        setPdf("data:text/html;base64," + response["html_file"]);
        setPhoto(globalGreenImages[0]);
        setFile(response["request_id"]);
        const patient = {
          id: patientID,
          sex: sex,
          errorThreshold: errorThreshold,
          htmlId: response["request_id"],
          photo: globalGreenImages[0],
        };
        addPatient(patient);
        updateLocalPatientIHistoty(patient);
        navigate("/result");
        if (e.target.status !== 200) {
          // toast.dismiss()
          if (e.target.status == 401) {
            toast.loading("Unauthorized...");
          }
          console.log(
            "Error with request, please try another image or contact support if the problem persists."
          );
        } else {
          // results.classList.remove("hidden");
          // resultsRow.classList.remove('hidden');
          // imageResultRow.classList.remove('hidden');
          // currentAnalysisResultCard.classList.remove('hidden');
          // imageAnalysisResultCard.classList.remove("hidden");
          // el("reset-all-poses").classList.remove("hidden");
          if (response.success == true) {
            toast.dismiss();

            toast.success("successes ...");
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
              resultHtml.href =
                "data:text/html;base64," + response["html_file"];
              resultHtml.download = "golden_ratios.html";
              resultHtmldiv.innerHTML += "<br><br>";
              // innerTop.append(resultHtmldiv);
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
    fileData.append("error_threshold", errorThreshold);
    fileData.append("gender", sex);
    fileData.append("frontal_current", globalGreenImages[0].split(",")[1]);
    if (status === "multi") {
      // fileData.append("left_side_current", globalBlueImages[0].split(",")[1]);
      // fileData.append("right_side_current", globalRedImages[0].split(",")[1]);
    } else {
      fileData.append("left_side_current", "");
      fileData.append("right_side_current", "");
    }
    xhr.send(fileData);
    // navigate("/loadingreport")
    setIsLoadingResult(true);
  };
  let [partyId] = useLocalStorage("partyid");
  const analyzeFacemesh2 = () => {
    // toast.loading("pending ...")
    Analytics.analyticsImage({
      patient_id: patientID,
      error_threshold: errorThreshold,
      gender: sex,
      frontal_current: globalGreenImages[0].split(",")[1],
      party_id: partyId,
    }).then((res) => {
      console.log(res);
      if (res.data.data) {
        appContext.package.usePackage();
        setPdf("data:text/html;base64," + res.data.data.html_file);
        setPhoto(globalGreenImages[0]);
        setFile(res.data.data.request_id);
        const patient = {
          id: patientID,
          sex: sex,
          errorThreshold: errorThreshold,
          htmlId: res.data.data.request_id,
          photo: globalGreenImages[0],
        };
        addPatient(patient);
        updateLocalPatientIHistoty(patient);
        navigate("/result");
      }
    });
    setIsLoadingResult(true);
  };
  const calculatePercent = () => {
    let percent = {
      left: false,
      right: false,
      front: false,
    };
    if (globalBlueLandmarks) percent.left = true;
    if (globalRedLandmarks) percent.right = true;
    if (globalGreenLandmarks) percent.front = true;
    return percent;
  };

  const refreshPic = (picState) => {
    if (picState === "green") {
      // let greenCtx = green.current.getContext("2d");
      // setGlobalData((prv) => ({...prv, globalGreenLandmarks: null, globalGreenImages: []}))
      // forceUpdate()
      // greenCtx.clearRect(0, 0, green.current.width, green.current.height);
      // greenCtx.save()
    }
    if (picState === "red") {
      // setGlobalData((prv) => ({...prv, globalRedLandmarks: null, globalRedImages: []}))
    }
    if (picState === "blue") {
      // globalBlueLandmarks = null
      // setGlobalData((prv) => ({...prv, globalBlueLandmarks: null, globalBlueImages: []}))
    }
  };
  return (
    <>
      <div className={`${!isLoadingResult && "hidden"}`}>
        <LoadingReports />
      </div>
      <div
        className={` ${
          isLoadingResult && " !hidden "
        } scale-50 mt-[-230px] min-[1220px]:scale-[60%] min-[1220px]:mt-[-185px] min-[1380px]:scale-[70%] min-[1380px]:mt-[-145px] min-[1530px]:scale-[75%] min-[1530px]:mt-[-100px] min-[1700px]:scale-[80%] min-[1700px]:mt-[-80px] min-[2000px]:scale-[100%] min-[2000px]:mt-[0px] fixed w-full`}
      >
        <div
          className={`flex flex-col gap-4 pb-5 pt-10 items-center justify-center `}
        >
          <div className="px-12 mt-[-20px] w-full flex justify-start">
            <Breadcrumbs aria-label="breadcrumb">
              <Link2 underline="hover" className="text-primary-color" href="/">
                Home
              </Link2>
              <Typography className="text-primary-color">
                Face Scanner
              </Typography>
            </Breadcrumbs>
          </div>
          <h1 className={"text-3xl font-medium"}>Face Scanner</h1>
          <p className={"text-lg font-normal"}>
            Please provide scans of the client's face from the left, right, and
            front to ensure a complete analysis.
          </p>

          <TabsCustume tabs={tabs} setState={setStatus} state={status} />
        </div>
        <div className={"flex items-center justify-center gap-4"}>
          <div className="flex items-center justify-center gap-10 rounded-md">
            <div className=" all-poses-auto ">
              <video
                className="cam-preview video-cam hidden"
                id="video-cam"
                ref={video2}
                width="660px"
                height="550px"
                autoPlay
              ></video>
            </div>

            <div className=" all-poses-auto bg-[#D9D9D9] relative  w-[660px] h-[550px] rounded-md flex items-center justify-center ">
              <img
                src={"/image/cameraPluse.svg"}
                className={`${isCameraStart ? "hidden" : ""}`}
                alt="camera"
              />
              <canvas
                className={`cam-preview rounded-md ${
                  isCameraStart ? "" : "hidden"
                }`}
                id="output2"
                ref={out2}
                width="660px"
                height="550px"
              ></canvas>
              {isCameraStart && startTimer3 && !globalRedLandmarks ? (
                <div className=" absolute z-40 w-full  top-5 right-0 flex justify-center items-center  ">
                  <div
                    style={{ background: "rgba(255, 255, 255, 0.5)" }}
                    className={
                      "flex justify-between px-3 py-2 rounded-xl items-center w-5/6"
                    }
                  >
                    <h1>
                      The left side of your face is being scanned.
                      <span className="font-medium"> Please hold still.</span>
                    </h1>
                    <CountdownCircleTimer
                      isPlaying
                      size={50}
                      strokeWidth={6}
                      duration={3}
                      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                      colorsTime={[5, 3, 2, 0]}
                    >
                      {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                  </div>
                </div>
              ) : undefined}
              {isCameraStart && startTimer2 && !globalBlueLandmarks ? (
                <div className=" absolute z-40 w-full  top-5 right-0 flex justify-center items-center  ">
                  <div
                    style={{ background: "rgba(255, 255, 255, 0.5)" }}
                    className={
                      "flex justify-between px-3 py-2 rounded-xl items-center w-5/6"
                    }
                  >
                    <h1>
                      The right side of your face is being scanned.
                      <span className="font-medium"> Please hold still.</span>
                    </h1>
                    <CountdownCircleTimer
                      isPlaying
                      size={50}
                      strokeWidth={6}
                      duration={3}
                      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                      colorsTime={[5, 3, 2, 0]}
                    >
                      {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                  </div>
                </div>
              ) : undefined}
              {isCameraStart && startTimer && !globalGreenLandmarks ? (
                <div className=" absolute z-40 w-full  top-5 right-0 flex justify-center items-center  ">
                  <div
                    style={{ background: "rgba(255, 255, 255, 0.5)" }}
                    className={
                      "flex justify-between px-3 py-2 rounded-xl items-center w-5/6"
                    }
                  >
                    <h1>
                      The front side of your face is being scanned.
                      <span className="font-medium"> Please hold still.</span>
                    </h1>
                    <CountdownCircleTimer
                      isPlaying
                      size={50}
                      strokeWidth={6}
                      duration={3}
                      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                      colorsTime={[5, 3, 2, 0]}
                    >
                      {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                  </div>
                </div>
              ) : undefined}
              {isCameraStart && status !== "one" && (
                <ProgressbarCustom percent={calculatePercent()} />
              )}
              {status == "one" && globalGreenLandmarks && (
                <div className=" absolute z-40 w-full  top-5 right-0 flex justify-center items-center  ">
                  <div
                    className={
                      "flex animate-zooming text-[white] bg-[#07A10499] justify-between px-3 py-2 rounded-xl items-center w-11/12"
                    }
                  >
                    <h1>All poses of your face were scanned successfully</h1>
                  </div>
                </div>
              )}
              {status == "multi" &&
                globalGreenLandmarks &&
                globalBlueLandmarks &&
                globalRedLandmarks && (
                  <div className=" absolute z-40 w-full  top-5 right-0 flex justify-center items-center  ">
                    <div
                      className={
                        "flex animate-zooming text-[white] bg-[#07A10499] justify-between px-3 py-2 rounded-xl items-center w-11/12"
                      }
                    >
                      <h1>All poses of your face were scanned successfully</h1>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="flex items-center justify-start h-[550px] flex-col gap-4">
            <div className="all-poses-auto relative flex-col  w-[230px] h-[174px] bg-[#D9D9D9] rounded-md flex items-center justify-center">
              <div className={"w-full absolute top-1 p-4"}>
                <h1>1. Front</h1>
              </div>
              {globalGreenLandmarks && (
                <AiFillCheckSquare
                  className={
                    "absolute -top-2 w-7 h-7 rounded-2xl text-[#544BF0] -right-2"
                  }
                />
              )}

              <div className="relative">
                {/* {isCameraStart && globalGreenLandmarks ?
                            (
                                <div onClick={() => refreshPic("green")}
                                     className={"bg-white rounded-full z-50  absolute bottom-5 right-3 p-1 border border-[#544BF0] flex items-center justify-center"}>
                                    <IoRefresh className={"block w-7 h-7  "}/>
                                </div>
                            ) : ""
                        } */}

                {globalGreenLandmarks && !isShowFaceGuide ? (
                  <img
                    className="absolute w-[230px] h-[130px]"
                    src={globalGreenImages[0]}
                  ></img>
                ) : undefined}
                <canvas
                  className={`cam-preview absolute top-0 rounded-md ${
                    isCameraStart && startTimer ? "visible" : "invisible"
                  }   ${
                    isCameraStart && !globalGreenLandmarks ? "" : "hidden"
                  }`}
                  id="output3"
                  ref={out3}
                  width="230px"
                  height="130px"
                ></canvas>
                {isShowFaceGuide && (
                  <img
                    className={
                      "absolute  top-0 rounded-md z-30 w-[230px] h-[130px]"
                    }
                    src={globalGreenImages[1]}
                  />
                )}
                <canvas
                  id="green"
                  ref={green}
                  height="130px"
                  width="230px"
                  className={`${
                    isCameraStart
                      ? "opacity-40 invisible relative z-10 "
                      : "hidden"
                  }`}
                ></canvas>
                {isCameraStart && startTimer && !globalGreenLandmarks ? (
                  <div className="w-full absolute top-0 opacity-60 h-full takePhotoAnimation rotate-[180deg] bg-black "></div>
                ) : undefined}
              </div>
              {/* <img src={"/image/front.svg"} className={`${startTimer ||globalGreenLandmarks? "hidden" : "absolute top-10"}`}
                                 alt="front pose"/> */}
            </div>
            <div
              className={`all-poses-auto relative flex-col w-[230px] h-[174px] bg-[#D9D9D9] rounded-md flex items-center justify-center ${
                status === "multi" ? "" : "hidden"
              }`}
            >
              <div className={"w-full absolute top-1 p-4"}>
                <h1>2. Right</h1>
              </div>
              {globalBlueLandmarks && (
                <AiFillCheckSquare
                  className={
                    "absolute -top-2 w-7 h-7 rounded-2xl text-[#544BF0] -right-2"
                  }
                />
              )}

              <div className="relative">
                {/* {isCameraStart && globalBlueLandmarks ?
                                    (
                                        <div onClick={() => refreshPic("blue")}
                                             className={"bg-white rounded-full z-50  absolute bottom-5 right-3 p-1 border border-[#544BF0] flex items-center justify-center"}>
                                            <IoRefresh className={"block w-7 h-7  "}/>
                                        </div>
                                    ) : ""
                                } */}

                {globalBlueLandmarks && !isShowFaceGuide ? (
                  <img
                    className="absolute w-[230px] h-[130px]"
                    src={globalBlueImages[0]}
                  ></img>
                ) : undefined}
                <canvas
                  className={`cam-preview absolute top-0 rounded-md ${
                    isCameraStart && startTimer2 ? "visible" : "invisible"
                  }  ${isCameraStart && !globalBlueLandmarks ? "" : "hidden"}`}
                  id="output4"
                  ref={out4}
                  width="230px"
                  height="130px"
                ></canvas>
                {isShowFaceGuide && (
                  <img
                    className={
                      "absolute top-0 rounded-md z-30 w-[230px] h-[130px]"
                    }
                    src={globalBlueImages[1]}
                  />
                )}

                <canvas
                  id="blue"
                  ref={blue}
                  height="130px"
                  width="230px"
                  className={` ${
                    isCameraStart
                      ? "opacity-40 invisible relative z-10"
                      : "hidden"
                  }  `}
                ></canvas>
                {isCameraStart && startTimer2 && !globalBlueLandmarks ? (
                  <div className="w-full absolute top-0 opacity-60 h-full takePhotoAnimation rotate-[180deg] bg-black "></div>
                ) : undefined}
              </div>

              {/* <img src={"/image/left.svg"} className={`${startTimer2 || globalBlueLandmarks? "hidden" : " absolute top-10"} `}
                                 alt="front pose"/> */}
            </div>
            <div
              className={`all-poses-auto relative flex-col w-[230px] h-[174px] bg-[#D9D9D9] rounded-md flex items-center justify-center ${
                status === "multi" ? "" : "hidden"
              }`}
            >
              {globalRedLandmarks && (
                <AiFillCheckSquare
                  className={
                    "absolute -top-2 w-7 h-7 rounded-2xl text-[#544BF0] -right-2"
                  }
                />
              )}
              <div className={"w-full absolute top-1 p-4"}>
                <h1>3. Left</h1>
              </div>

              <div className="relative">
                {/* {isCameraStart && globalRedLandmarks ?
                            (
                                <div onClick={() => refreshPic("red")}
                                     className={"bg-white rounded-full z-50  absolute bottom-5 right-3 p-1 border border-[#544BF0] flex items-center justify-center"}>
                                    <IoRefresh className={"block w-7 h-7  "}/>
                                </div>
                            ) : ""
                        } */}

                {globalRedLandmarks && !isShowFaceGuide ? (
                  <img
                    className="absolute w-[230px] h-[130px]"
                    src={globalRedImages[0]}
                  ></img>
                ) : undefined}
                <canvas
                  className={`cam-preview absolute top-0 rounded-md ${
                    isCameraStart && startTimer3 ? "visible" : "invisible"
                  }  ${isCameraStart && !globalRedLandmarks ? "" : "hidden"}`}
                  id="output5"
                  ref={out5}
                  width="230px"
                  height="130px"
                ></canvas>

                <canvas
                  className={` ${
                    isCameraStart
                      ? "opacity-40 invisible relative z-10"
                      : "hidden"
                  }  border-10`}
                  id="red"
                  ref={red}
                  height="130px"
                  width="230px"
                ></canvas>
                {isCameraStart && startTimer3 && !globalRedLandmarks ? (
                  <div className="w-full absolute top-0 opacity-60 h-full takePhotoAnimation rotate-[180deg] bg-black "></div>
                ) : undefined}
              </div>
              {isShowFaceGuide && (
                <img
                  className="absolute top-0 z-50 w-[230px] h-[130px]"
                  src={globalRedImages[0]}
                ></img>
              )}

              {/* <img src={"/image/right.svg"} className={`${startTimer3 || globalRedLandmarks? "hidden" : " absolute top-10"} `}
                                 alt="front pose"/> */}
            </div>
          </div>
        </div>
        <div className={"flex w-full items-start justify-center py-6"}>
          <div
            className={
              "flex items-center w-full justify-center flex-col gap-5 "
            }
          >
            <div className={"flex items-center justify-center gap-5 w-full"}>
              {/* <ButtonPrimary className={"disabled:bg-[#bebebe] !text-xl !px-8 !py-3 rounded-xl"}
                                           disabled={isCameraStart}
                                           onClick={() => img_source_select()}>
                                <IoCameraOutline/>
                                LIVE SCAN
                            </ButtonPrimary> */}
              {iscomplete ? (
                <>
                  <Button
                    onClick={() => {
                      // analyzeFacemesh()
                      analyzeFacemesh2();
                    }}
                    theme="iris-large"
                  >
                    <img className="mr-2" src="./image/print.svg"></img>
                    Print or Save
                  </Button>
                  <Button
                    onClick={() => {
                      setIsCameraStart(false);
                      setGlobalData({
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
                        IsglobalDataSend: false,
                      });
                      setStarttimer(false);
                      setStarttimer2(false);
                      setStarttimer3(false);
                      setIscomplete(false);
                      // setTimeout(() => {
                      //     img_source_select()
                      // }, 1000);
                    }}
                    theme="iris-secondary-large"
                  >
                    <div className="flex justify-center items-center w-[150px]">
                      <img className="mr-2" src="./image/redo.svg" alt="" />
                      Rescan
                    </div>
                  </Button>
                </>
              ) : (
                <Button
                  disabled={isCameraStart}
                  onClick={() => {
                    // img_source_select()
                    publish("openModal");
                    setShowPermision(true);
                  }}
                  theme="iris-large"
                >
                  <IoCameraOutline size={"24px"} className="mr-2" />
                  Start Scan
                </Button>
              )}

              {status == "one" ? (
                // <ButtonSecondary
                //     ClassName={"!bg-[#E8E7F7] !text-[#544BF0] border-none !py-3 !text-xl disabled:bg-gray-200 disabled:!text-gray-400"}
                //     disabled={isCameraStart} onClick={() => {
                //     navigate('/faceMashFile')
                // }}>
                //     <input disabled className="w-full invisible top-0 absolute h-full"
                //            onChange={(e) => {
                //                var file = e.target.files[0];
                //                var reader = new FileReader();
                //                reader.onloadend = function () {
                //                    setResolvedFile(reader.result)
                //                }
                //                reader.readAsDataURL(file);
                //            }} id="upload-file" type="file"></input>
                //     <LuUploadCloud/>
                //     Upload Image
                // </ButtonSecondary>
                <>
                  {iscomplete ? (
                    <>
                      {/* <Button onClick={() => {
                                        setIsCameraStart(false)
                                        setGlobalData({
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
                                            IsglobalDataSend: false
                                        })           
                                        setStarttimer(false) 
                                        setIscomplete(false)                            
                                        // setTimeout(() => {
                                        //     img_source_select()
                                        // }, 1000);
                                    }} theme="iris-secondary-large">
                                        <div className="flex justify-center items-center w-[150px]">
                                            <img className="mr-2" src="./icons/redo.svg" alt="" />
                                            Rescan
                                        </div>
                                    </Button> */}
                    </>
                  ) : (
                    <>
                      <input
                        accept=".png"
                        className="w-full invisible top-0 absolute h-full"
                        onChange={(e) => {
                          var file = e.target.files[0];
                          var reader = new FileReader();
                          reader.onloadend = function () {
                            setResolvedFile(reader.result);
                            setGlobalData({
                              ...globalData,
                              globalGreenImages: [reader.result],
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                        id="upload-file"
                        type="file"
                      ></input>
                      <Button
                        onClick={() => {
                          navigate("/faceMashFile");
                          // document.getElementById("upload-file").click()
                        }}
                        disabled={isCameraStart}
                        theme="iris-secondary-large"
                      >
                        <LuUploadCloud className="mr-2" />
                        Upload Image
                      </Button>
                    </>
                  )}
                </>
              ) : undefined}
            </div>
            {/* <ButtonPrimary onClick={() => navigate("/PatientInformation")}>Setting</ButtonPrimary> */}
            <Link
              className={" text-base font-normal text-[#544BF0] "}
              to={"/tour"}
            >
              How to scan a face?
            </Link>
            <div id="result"></div>
          </div>
          {/* <div className={"flex invisible items-center mt-3 justify-center flex-col gap-5 w-[229px]"}>
                        <div onClick={() => setIsShowFaceGuide((!isShowFaceGuide))} className="flex items-center">
                            <input checked={isShowFaceGuide} id="disabled-checked-checkbox" type="checkbox" value=""
                                   className="w-4 h-4 text-blue-600 focus:!bg-blue-700 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 "/>
                            <label htmlFor="disabled-checked-checkbox"
                                   className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                show face guide
                            </label>
                        </div>

                    </div> */}
        </div>
      </div>
      {showService && (
        <div className="w-full top-0 absolute z-[60] flex justify-center items-center h-full">
          <Servise
            mode={serviceMode}
            backAction={() => {
              setShowService(false);
              navigate("/");
              publish("closeModal");
            }}
            renewAction={() => {
              publish("closeModal");
              navigate("/payment");
            }}
          ></Servise>
        </div>
      )}
      {showPermision && (
        <div className="w-full scale-50 top-0 fixed z-[60] flex justify-center items-center h-full">
          <Permision
            onAllow={() => {
              img_source_select();
              setShowPermision(false);
              publish("closeModal");
            }}
            onDeny={() => {
              setShowPermision(false);
              publish("closeModal");
            }}
          ></Permision>
        </div>
      )}
    </>
  );
};
export default FaceAnalyse;
