/ eslint-disable no-undef /;
import { useState, useRef } from "react";

const TestReport = () => {
  const [resolvedFile, setResolvedFile] = useState(""); // For storing the base64 image data
  const [imageLoaded, setImageLoaded] = useState(false); // Track when the image is fully loaded
  const imgRef = useRef(null); // Ref to the image element
  const canvasRef = useRef(null); // Ref to the canvas element for showing face mesh results

  const faceMesh = new FaceMesh({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`;
    },
  });


  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setResolvedFile(reader.result); // Save the base64 image data to state
    };
    if (file) {
      reader.readAsDataURL(file); // Convert the uploaded image to base64 format
      setImageLoaded(false); // Reset the image loaded flag until the image fully loads
    }
  };
  const resizeImage = (img, maxWidth, maxHeight) => {
    const canvas = document.createElement("canvas");
    let width = img.width;
    let height = img.height;
    // Resize to maintain aspect ratio within maxWidth and maxHeight
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height *= maxWidth / width));
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width *= maxHeight / height));
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);

    return canvas;
  };
  // Function to analyze the uploaded image with face mesh
  const analyzeImage = async () => {
    const img = imgRef.current; // Get the image element from the reference
    if (img && imageLoaded) {
      try {
        const resizedCanvas = resizeImage(img, 420, 420); // Restrict dimensions to 640x640 max
        console.log("tes ",resizedCanvas);

        await faceMesh.send({ image: resizedCanvas }); // Send resized image to FaceMesh
      } catch (error) {
        console.error("FaceMesh error:", error); // Catch and log any errors
      }
    } else {
      console.error("Image reference is not valid or loaded.");
    }
  };
// Updated function to add click detection for circles
  const drawNoseEyesLips = (canvas, context, landmarks) => {
    // Define nose, left eye, right eye, and lips points
    const nosePoints = [1, 2, 5, 6, 195, 197];
    const leftEyePoints = [33, ];
    const rightEyePoints = [362, 263, ];
    const lipsPoints = [61,  409, ];

    // Array to store circle positions and radii for click detection
    const circles = [];

    // Helper function to draw circles on specified points and store them for click detection
    const drawCircles = (points, color, feature) => {
      points.forEach((index) => {
        const point = landmarks[index];
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        const radius = 3;

        // Draw the circle
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();

        // Store circle details for click detection
        circles.push({ x, y, radius, feature, index });
      });
    };

    // Draw nose points in red
    drawCircles(nosePoints, "#FF4C4C", "nose");

    // Draw left eye points in blue
    drawCircles(leftEyePoints, "#4C4CFF", "leftEye");

    // Draw right eye points in green
    drawCircles(rightEyePoints, "#4CFF4C", "rightEye");

    // Draw lips points in pink
    drawCircles(lipsPoints, "#FF69B4", "lips");

    // Add click event listener to canvas
    canvas.onclick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check if the click is within any of the circles
      circles.forEach((circle) => {
        const dx = x - circle.x;
        const dy = y - circle.y;
        if (dx * dx + dy * dy <= circle.radius * circle.radius) {
          // Circle was clicked; trigger an action based on the feature type
          if (circle.feature === "nose") {
            alert(`Nose point ${circle.index} clicked!`);
          } else if (circle.feature === "leftEye") {
            alert(`Left eye point ${circle.index} clicked!`);
          } else if (circle.feature === "rightEye") {
            alert(`Right eye point ${circle.index} clicked!`);
          } else if (circle.feature === "lips") {
            alert(`Lips point ${circle.index} clicked!`);
          }
        }
      });
    };
  };

// Update your results handler to call drawNoseEyesLips instead of the full face pattern
  const onResultsFaceMesh = (results) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    if (results.multiFaceLandmarks) {
      results.multiFaceLandmarks.forEach((landmarks) => {
        context.drawImage(results.image, 0, 0, 100, 100); // Draw the input image resized to 100x100
        drawNoseEyesLips(canvas, context, landmarks); // Only draw the nose, eyes, and lips pattern
      });
    }
  };

// Add this function to the face mesh results handler
//   const onResultsFaceMesh = (results) => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//     if (results.multiFaceLandmarks) {
//       results.multiFaceLandmarks.forEach((landmarks) => {
//         context.drawImage(results.image, 0, 0, canvas.width, canvas.height); // Draw the result image
//         drawFacePattern(canvas, context, landmarks); // Call the function to draw the pattern
//       });
//     }
//   };

  // Simplified function to handle face mesh results and display them on a single canvas
//   const onResultsFaceMesh = (results) => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     context.save(); // Save the current state of the canvas
//     context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//     context.drawImage(results.image, 0, 0, canvas.width, canvas.height); // Draw the processed image on the canvas

//     // If face landmarks are found, draw them on the canvas
//     if (results.multiFaceLandmarks) {
//       results.multiFaceLandmarks.forEach((landmarks) => {
//         drawConnectors(context, landmarks, FACEMESH_TESSELATION, {
//           color: "#FFDBAC", // Light tan color for face mesh
//           lineWidth: 1,
//         });
//       });
//     }

//     context.restore(); // Restore the canvas state
//   };
// const onResultsFaceMesh = (results) => {
//   const canvas = canvasRef.current;
//   const context = canvas.getContext("2d");

//   context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

//   context.drawImage(results.image, 0, 0, canvas.width, canvas.height);

//   // Draw the landmarks
// //   if (results.multiFaceLandmarks) {
// //     results.multiFaceLandmarks.forEach((landmarks) => {
// //       const outerLipLandmarkIndices = [
// //         61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 78, 191,
// //         80, 81, 82,
// //       ];
// //       const innerLipLandmarkIndices = [
// //         78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 78,
// //       ];

// //       // Function to draw filled lips
// //       const drawFilledLips = (context, indices, landmarks, color) => {
// //         context.beginPath();
// //         context.moveTo(
// //           landmarks[indices[0]].x * canvas.width,
// //           landmarks[indices[0]].y * canvas.height
// //         );
// //         indices.forEach((index) => {
// //           const landmark = landmarks[index];
// //           context.lineTo(landmark.x * canvas.width, landmark.y * canvas.height);
// //         });
// //         context.closePath();
// //         context.fillStyle = color;
// //         context.fill();
// //       };

// //       // Draw and fill the outer and inner lips
// //       drawFilledLips(context, outerLipLandmarkIndices, landmarks, "#FF6666"); // Outer lips in red
// //       drawFilledLips(context, innerLipLandmarkIndices, landmarks, "#FF9999"); // Inner lips in a lighter red
// //     });
// //   }
// if (results.multiFaceLandmarks) {
//         results.multiFaceLandmarks.forEach((landmarks) => {
//             context.drawImage(results.image, 0, 0, canvas.width, canvas.height); // Draw the result image
//             drawFacePattern(context, landmarks); // Call the function to draw the pattern
//         });
//     }


// };
//   // Function to draw connectors for face mesh landmarks on the canvas
//   const drawConnectors = (context, landmarks, connections, style) => {
//     context.strokeStyle = style.color;
//     context.lineWidth = style.lineWidth;
//     for (let i = 0; i < connections.length; i++) {
//       const from = landmarks[connections[i][0]];
//       const to = landmarks[connections[i][1]];
//       context.beginPath();
//       context.moveTo(
//         from.x * canvasRef.current.width,
//         from.y * canvasRef.current.height
//       );
//       context.lineTo(
//         to.x * canvasRef.current.width,
//         to.y * canvasRef.current.height
//       );
//       context.stroke();
//     }
//   };
  faceMesh.onResults(onResultsFaceMesh);
  return (
      <>
        <div className="container">
          <h1>Face Mesh Scanner</h1>
          <button onClick={analyzeImage}>Analyze Image</button>
          <p>
            Upload an image of your face to analyze with FaceMesh and display the
            results.
          </p>

          {/* Image Upload Section */}
          {!resolvedFile && (
              <div className="upload-section">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                />
              </div>
          )}

          {/* Show the uploaded image and the canvas for results */}
          {resolvedFile && (
              <div className="image-preview">
                {/* Image is displayed for the user */}
                <img
                    ref={imgRef}
                    src={resolvedFile}
                    width="100"
                    height={"100"}
                    alt="Uploaded face"
                    onLoad={() => {
                      setImageLoaded(true);
                      const imgElement = imgRef.current;
                      const canvas = canvasRef.current;
                      canvas.width = imgElement.naturalWidth;
                      canvas.height = imgElement.naturalHeight;
                    }}
                />
                {/* Canvas is used to display the face mesh results */}
                <canvas
                    ref={canvasRef}
                    width="150"
                    height="150"
                    className="face-mesh-canvas"
                ></canvas>
              </div>
          )}
        </div>
      </>
  );
};

export default TestReport;
