// /* eslint-disable no-undef */
// import { useState, useRef } from "react";
// import FaceMeshView from "../../components/faceMash/FaceMeshViwe.jsx";
//
// const TestReport = () => {
//   const [resolvedFile, setResolvedFile] = useState("");
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const imgRef = useRef(null);
//   const canvasRef = useRef(null);
//
//   const faceMesh = new FaceMesh({
//     locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
//   });
//
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => setResolvedFile(reader.result);
//     if (file) {
//       reader.readAsDataURL(file);
//       setImageLoaded(false);
//     }
//   };
//
//   const resizeImage = (img, maxWidth, maxHeight) => {
//     const canvas = document.createElement("canvas");
//     let width = img.width;
//     let height = img.height;
//
//     if (width > height) {
//       if (width > maxWidth) {
//         height = Math.round((height *= maxWidth / width));
//         width = maxWidth;
//       }
//     } else {
//       if (height > maxHeight) {
//         width = Math.round((width *= maxHeight / height));
//         height = maxHeight;
//       }
//     }
//
//     canvas.width = width;
//     canvas.height = height;
//     canvas.getContext("2d").drawImage(img, 0, 0, width, height);
//
//     return canvas;
//   };
//
//   const analyzeImage = async () => {
//     const img = imgRef.current;
//     if (img && imageLoaded) {
//       try {
//         const resizedCanvas = resizeImage(img, 648, 900);
//         await faceMesh.send({ image: resizedCanvas });
//       } catch (error) {
//         console.error("FaceMesh error:", error);
//       }
//     }
//   };
//
//   const drawNoseEyesLips = (canvas, context, landmarks) => {
//     const points = {
//       nose: [1, 2, 5, 6, 10, 11, 195, 197],
//       leftEye: [33],
//       rightEye: [362, 263],
//       lips: [61, 409],
//     };
//
//     const whiteCircleIndices = [10, 151, 234, 93]; // Specific indices for white circles
//     const colors = {
//       nose: "#FF4C4C",
//       leftEye: "#4C4CFF",
//       rightEye: "#4CFF4C",
//       lips: "#FF69B4",
//     };
//
//     const circles = []; // Array to store circle data for click detection
//
//     const drawCircles = (indices, color, feature) => {
//       indices.forEach((index) => {
//         const point = landmarks[index];
//         const x = point.x * canvas.width;
//         const y = point.y * canvas.height;
//         const radius = 8; // Adjusted for visibility
//
//         // Draw circle
//         context.beginPath();
//         context.arc(x, y, radius, 0, 2 * Math.PI);
//         context.fillStyle = color;
//         context.fill();
//
//         // Store each circle’s data for click detection
//         circles.push({ x, y, radius, feature, index });
//       });
//     };
//
//     // Draw each feature’s circles
//     Object.entries(points).forEach(([feature, indices]) => {
//       drawCircles(indices, colors[feature], feature);
//     });
//
//     // Draw white circles separately
//     drawCircles(whiteCircleIndices, "#FFFFFF", "whiteCircle");
//
//     // Add click detection for all circles
//     canvas.onclick = (event) => {
//       const rect = canvas.getBoundingClientRect();
//       const scaleX = canvas.width / rect.width;
//       const scaleY = canvas.height / rect.height;
//       const x = (event.clientX - rect.left) * scaleX;
//       const y = (event.clientY - rect.top) * scaleY;
//
//       circles.forEach((circle) => {
//         const dx = x - circle.x;
//         const dy = y - circle.y;
//         if (dx * dx + dy * dy <= circle.radius * circle.radius) {
//           console.log(`Circle detected at feature: ${circle.feature}, index: ${circle.index}`);
//           alert(`${circle.feature} point ${circle.index} clicked!`);
//         }
//       });
//     };
//   };
//
//   const onResultsFaceMesh = (results) => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);
//
//     if (results.multiFaceLandmarks) {
//       results.multiFaceLandmarks.forEach((landmarks) => {
//         const imgElement = imgRef.current;
//         const canvasWidth = imgElement.naturalWidth;
//         const canvasHeight = imgElement.naturalHeight;
//
//         // Set canvas size to match the image
//         canvas.width = canvasWidth;
//         canvas.height = canvasHeight;
//
//         // Draw the image on the canvas
//         context.drawImage(results.image, 0, 0, canvasWidth, canvasHeight);
//
//         // Draw facial landmarks with nose, eyes, lips, and white circles
//         drawNoseEyesLips(canvas, context, landmarks);
//       });
//     }
//   };
//
//   faceMesh.onResults(onResultsFaceMesh);
//
//   return (
//       <div className="">
//         <h1>Face Mesh Scanner</h1>
//         {/*<button onClick={analyzeImage}>Analyze Image</button>*/}
//         <p>Upload an image of your face to analyze with FaceMesh and display the results.</p>
//
//         {!resolvedFile && (
//             <div className="upload-section">
//               <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="file-input"
//               />
//             </div>
//         )}
//         <FaceMeshView onClick={(point)=>console.log(point)} className={""} imageSrc={} />
//         {/*{resolvedFile && (*/}
//         {/*    <div className="image-preview" style={{ width: '300px', height: '400px' }}>*/}
//         {/*      <img*/}
//         {/*          ref={imgRef}*/}
//         {/*          src={resolvedFile}*/}
//         {/*          alt="Uploaded face"*/}
//         {/*          style={{ display: 'none' }}*/}
//         {/*          onLoad={() => {*/}
//         {/*            setImageLoaded(true);*/}
//         {/*            const imgElement = imgRef.current;*/}
//         {/*            const canvas = canvasRef.current;*/}
//         {/*            canvas.width = imgElement.naturalWidth;*/}
//         {/*            canvas.height = imgElement.naturalHeight;*/}
//         {/*          }}*/}
//         {/*      />*/}
//         {/*      <canvas*/}
//         {/*          ref={canvasRef}*/}
//         {/*          width="648"*/}
//         {/*          height="900"*/}
//         {/*          style={{ width: '648px', height: '900px', border: '1px solid black' }}*/}
//         {/*          className="face-mesh-canvas"*/}
//         {/*      ></canvas>*/}
//         {/*    </div>*/}
//         {/*)}*/}
//       </div>
//   );
// };
//
// export default TestReport;
import React, { useState } from "react";
import FaceMeshView from "../../components/faceMash/FaceMeshViwe.jsx";

const FaceMeshContainer = () => {
  const [base64Image, setBase64Image] = useState(""); // State for storing base64 image

  // Handle image upload and convert to base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="container">
        {!base64Image && (
            <div className="upload-section">
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
              />
            </div>
        )}

        {base64Image && (
            <FaceMeshView
                imageSrc={base64Image}
                className=""
                onClick={(point) => console.log(point)}
            />
        )}
      </div>
  );
};

export default FaceMeshContainer;
