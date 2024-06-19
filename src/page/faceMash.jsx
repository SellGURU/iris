import ButtonPrimary from "../components/button/buttonPrimery.jsx";

/ eslint-disable no-undef /;
import {useEffect} from "react";
import {useRef} from "react";
import {CustCamera, CustFaceMash} from "../utility/camera";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import ButtonSecondary from "../components/button/buttonSecondary.jsx";
import {IoCameraOutline} from "react-icons/io5";
import {LuUploadCloud} from "react-icons/lu";
import {TabsCustume} from "../components/tabs/tabs.jsx";
import {useLocalStorage} from "@uidotdev/usehooks";

const FaceMesh = () => {

    const [isCameraStart, setIsCameraStart] = useState(false);

    // let cameraStarted = false;
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
    let canvasCtx, canvasWidth, canvasHeight, greenCtx, redCtx, blueCtx, tmpcontext = null;
    let persistent = false;
    useEffect(() => {
        canvasCtx = out2.current.getContext("2d");
        canvasWidth = out2.current.width;
        canvasHeight = out2.current.height;
        greenCtx = green.current.getContext("2d");
        redCtx = red.current.getContext("2d");
        blueCtx = blue.current.getContext("2d");

        tmpcontext = tmpCanvasRef.current.getContext("2d");
        // size of image that captured in final result
        tmpCanvasRef.current.height=420
        tmpCanvasRef.current.width=420

        console.log(tmpCanvasRef.current.height)
    }, []);
    const onResultsFaceMesh = (results) => {
        let landmarks;
        const img = document.createElement("img");

        document.body.classList.add("loaded");

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, out2.current.width, out2.current.height);
        canvasCtx.drawImage(results.image, 0, 0, out2.current.width, out2.current.height);
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

                tmpcontext.drawImage(greenImage, 0, 0);
                greenLandmarksData = JSON.stringify(landmarks);
                const greenImageData = tmpCanvasRef.current.toDataURL("image/png");

                globalGreenImages.unshift(greenImageData);
                globalGreens.unshift(greenImageData);
                console.log(globalGreenImages[0])
                if (globalGreenImages.length > 5) globalGreenImages.pop();
                if (globalGreens.length > 1) globalGreens.pop();

                if (globalGreenImages.length === 5) {
                    globalDataNotSent = true;
                }
            }
            // console.log("globalBlueLandmarks:",globalBlueLandmarks)
            // console.log("globalRedLandmarks:",globalRedLandmarks)
            // console.log("globalGreenLandmarks:",globalGreenLandmarks)
            if (pose === "left" && persistent) {
                globalBlueLandmarks = landmarks;
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
                console.log(redImageData)
                globalRedImages.unshift(redImageData);
                globalReds.unshift(redImageData);

                if (globalRedImages.length > 5) globalRedImages.pop();
                if (globalReds.length > 1) globalReds.pop();

                if (globalRedImages.length === 5) {
                    globalDataNotSent = true;
                }
            }
            // console.log(pose === "finished" && persistent)
            // if (pose === "finished" && persistent) {
                // console.log("if start")
                if (
                    globalGreenLandmarks &&
                    globalBlueLandmarks &&
                    globalRedLandmarks
                ) {
                    console.log(
                        "All image and landmarks data have been captured and sent for processing."
                    );
                    console.log("finish")
                    analyzeFacemesh();
                    globalFinished = true;
                }
            // }

            results.multiFaceLandmarks.forEach((landmarks) => {
                drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
                    color: colour, lineWidth: 1,
                });
            });
        }
        if (globalGreenLandmarks) {
            landmarks = JSON.parse(greenLandmarksData);
            drawConnectors(greenCtx, landmarks, FACEMESH_TESSELATION, {
                color: "#7CFC00", lineWidth: 1,
            });
        }

        if (globalData.globalBlueLandmarks) {
            landmarks = JSON.parse(blueLandmarksData);
            drawConnectors(blueCtx, landmarks, FACEMESH_TESSELATION, {
                color: "#64B4FF", lineWidth: 1,
            });
        }

        if (globalRedLandmarks) {
            landmarks = JSON.parse(redLandmarksData);
            drawConnectors(redCtx, landmarks, FACEMESH_TESSELATION, {
                color: "#FF503C", lineWidth: 1,
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
        setIsCameraStart(true)
        const constraints = {
            video: {
                width: 420, height: 420,
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
        // cameraStarted = true;
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
        const d14 = Math.sqrt(Math.pow(x4 - x1, 2) + Math.pow(y4 - y1, 2) + Math.pow(z4 - z1, 2));
        const d23 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2) + Math.pow(z3 - z2, 2));

        const distance = (d14 + d23) / 2;
        // console.log("distance", distance);

        // Confidence, it depends on roll and yaw angles
        const xr = landmark[133].x; // Roll angle between inner corner of the eyes
        const yr = landmark[133].y;
        const xl = landmark[362].x;
        const yl = landmark[362].y;
        const rollDistance = Math.sqrt(Math.pow(xr - xl, 2) + Math.pow(yr - yl, 2));
        const rollAngle = Math.atan2(landmark[362].z - landmark[133].z, rollDistance);
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
        const yawDistance = Math.sqrt(Math.pow(x6 - x5, 2) + Math.pow(y6 - y5, 2) + Math.pow(z6 - z5, 2));
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
        const pitchDistance = Math.sqrt(Math.pow(x8 - x7, 2) + Math.pow(y8 - y7, 2) + Math.pow(z8 - z7, 2));
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
    const navigate = useNavigate();
    const [access, setAccess] = useLocalStorage("token");

    function analyzeFacemesh() {
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
        xhr.setRequestHeader(
            "Authorization",
            `Bearer ${access}`
        );
        xhr.onerror = function () {
            console.log(xhr.responseText);
        };
        xhr.onload = function (e) {
            if (this.readyState === 4) {
                console.log("Response received from server");
                let response = JSON.parse(e.target.responseText);
                console.log(response);

                if (e.target.status !== 200) {
                    console.log("Error with request, please try another image or contact support if the problem persists.")
                } else {
                    // results.classList.remove("hidden");
                    // resultsRow.classList.remove('hidden');
                    // imageResultRow.classList.remove('hidden');
                    // currentAnalysisResultCard.classList.remove('hidden');
                    // imageAnalysisResultCard.classList.remove("hidden");
                    // el("reset-all-poses").classList.remove("hidden");
                    console.log("response.success",response.success)
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
        fileData.append('error_threshold', 10);
        fileData.append("gender", "masculine");
        console.log(globalGreenImages[0])
        fileData.append("frontal_current", globalGreenImages[0].split(",")[1]);
        fileData.append("left_side_current", globalBlueImages[0].split(",")[1]);
        fileData.append("right_side_current", globalRedImages[0].split(",")[1]);
        xhr.send(fileData);
    }

    return (<>
        <div className={"h-[110px]"}></div>
        <div className={"flex flex-col gap-4 pb-5 items-center justify-center"}>
            <h1 className={"text-3xl font-medium"}>Face Scanner</h1>
            <p className={"text-lg font-normal"}>Please provide scans of your face from the left, right, and front to
                ensure a complete analysis.</p>
            {/*<TabsCustume/>*/}
        </div>
        <div className={"flex items-center justify-center gap-4"}>

            <div className="flex items-center justify-center gap-10 rounded-md">
                <div
                    className=" all-poses-auto ">
                    <video
                        className="cam-preview video-cam hidden"
                        id="video-cam"
                        ref={video2}
                        width="660px"
                        height="550px"
                        autoPlay
                    ></video>
                </div>
                <div
                    className=" all-poses-auto bg-[#D9D9D9]  w-[660px] h-[550px] rounded-md flex items-center justify-center ">

                    <img src={"/image/cameraPluse.svg"} className={`${isCameraStart ? "hidden" : ""}`}
                         alt="camera"/>
                    <canvas
                        className={`cam-preview rounded-md ${isCameraStart ? "" : "hidden"}`}
                        id="output2"
                        ref={out2}
                        width="660px"
                        height="550px"
                    ></canvas>

                </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-4">
                <div
                    className="all-poses-auto flex-col  w-[230px] h-[174px] bg-[#D9D9D9] rounded-md flex items-center justify-center">
                    <div className={"w-full p-4"}><h1>1.Front</h1></div>


                    <canvas id="green" ref={green} height="130px" width="230px"
                            className={`${isCameraStart ? "" : "hidden"}`}></canvas>
                    <img src={"/image/front.svg"} className={`${isCameraStart ? "hidden" : ""}`} alt="front pose"/>
                </div>
                <div
                    className="all-poses-auto flex-col w-[230px] h-[174px] bg-[#D9D9D9] rounded-md flex items-center justify-center">
                    <div className={"w-full p-4"}><h1>2.Left</h1></div>

                    <canvas id="blue" ref={blue} height="130px" width="230px"
                            className={` ${isCameraStart ? "" : "hidden"}  `}></canvas>
                    <img src={"/image/right.svg"} className={`${isCameraStart ? "hidden" : ""}`} alt="front pose"/>

                </div>
                <div
                    className="all-poses-auto flex-col w-[230px] h-[174px] bg-[#D9D9D9] rounded-md flex items-center justify-center">
                    <div className={"w-full p-4"}><h1>3.Right</h1></div>

                    <canvas className={` ${isCameraStart ? "" : "hidden"}  border-10`} id="red" ref={red}
                            height="130px" width="230px"></canvas>
                    <img src={"/image/left.svg"} className={`${isCameraStart ? "hidden" : ""}`} alt="front pose"/>

                </div>
            </div>

        </div>
        <div className={"flex items-center justify-center py-10"}>
            <div className={"flex items-center justify-center flex-col gap-5 "}>
                <div className={"flex items-center justify-center gap-5 w-[660px]"}>
                    <ButtonPrimary onClick={() => img_source_select()}>
                        <IoCameraOutline/>
                        LIVE SCAN
                    </ButtonPrimary>
                    <ButtonSecondary onClick={() => navigate('/faceMashFile')}>
                        <LuUploadCloud/>
                        upload picture
                    </ButtonSecondary>
                </div>
                <Link className={" text-base font-normal text-[#544BF0] "} to={"#"}>
                    How to scan face?
                </Link>
            </div>
            <div className={"flex items-center justify-center flex-col gap-5 w-[229px]"}></div>
        </div>


    </>);
};

export default FaceMesh;
