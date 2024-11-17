/* eslint-disable no-undef */
import { useState, useRef } from "react";

const TestReport = () => {
  const [resolvedFile, setResolvedFile] = useState(""); // For storing the base64 image data
  const [imageLoaded, setImageLoaded] = useState(false); // Track when the image is fully loaded
  const imgRef = useRef(null); // Ref to the image element
  const canvasRef = useRef(null); // Ref to the canvas element for showing face mesh results

  const faceMesh = new FaceMesh({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
  });

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setResolvedFile(reader.result); // Save the base64 image data to state
    if (file) {
      reader.readAsDataURL(file); // Convert the uploaded image to base64 format
      setImageLoaded(false); // Reset the image loaded flag until the image fully loads
    }
  };

  const resizeImage = (img, maxWidth, maxHeight) => {
    const canvas = document.createElement("canvas");
    let width = img.width;
    let height = img.height;

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
    const img = imgRef.current;
    if (img && imageLoaded) {
      try {
        const resizedCanvas = resizeImage(img, 648, 900);
        await faceMesh.send({ image: resizedCanvas }); // Send resized image to FaceMesh
      } catch (error) {
        console.error("FaceMesh error:", error);
      }
    } else {
      console.error("Image reference is not valid or loaded.");
    }
  };

  // Updated function to draw facial landmarks with click detection
  const drawNoseEyesLips = (canvas, context, landmarks) => {
    const points = {
      nose: [1, 2, 5, 6, 195, 197],
      leftEye: [33],
      rightEye: [362, 263],
      lips: [61, 409],
    };
    const colors = {
      nose: "#FF4C4C",
      leftEye: "#4C4CFF",
      rightEye: "#4CFF4C",
      lips: "#FF69B4",
    };
    const circles = [];

    const drawCircles = (indices, color, feature) => {
      indices.forEach((index) => {
        const point = landmarks[index];
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        const radius = 3;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();

        circles.push({ x, y, radius, feature, index });
      });
    };

    Object.entries(points).forEach(([feature, indices]) =>
        drawCircles(indices, colors[feature], feature)
    );

    canvas.onclick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      circles.forEach((circle) => {
        const dx = x - circle.x;
        const dy = y - circle.y;
        if (dx * dx + dy * dy <= circle.radius * circle.radius) {
          alert(`${circle.feature} point ${circle.index} clicked!`);
        }
      });
    };
  };

  // Function to handle face mesh results
  const onResultsFaceMesh = (results) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks) {
      results.multiFaceLandmarks.forEach((landmarks) => {
        const imgElement = imgRef.current;
        const canvasWidth = imgElement.naturalWidth;
        const canvasHeight = imgElement.naturalHeight;

        // Adjust the canvas dimensions based on the uploaded image dimensions
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Draw the resized image on the canvas with consistent dimensions
        context.drawImage(results.image, 0, 0, canvasWidth, canvasHeight);
        drawNoseEyesLips(canvas, context, landmarks); // Draw the facial landmarks
      });
    }
  };

  faceMesh.onResults(onResultsFaceMesh);

  return (
      <div className="container">
        <h1>Face Mesh Scanner</h1>
        <button onClick={analyzeImage}>Analyze Image</button>
        <p>Upload an image of your face to analyze with FaceMesh and display the results.</p>

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

        {resolvedFile && (
            <div className="image-preview" style={{ width: '300px', height: '400px' }}>
              <img
                  ref={imgRef}
                  src={resolvedFile}
                  alt="Uploaded face"
                  style={{ display: 'none' }} // Hide the image element; only use it to get dimensions
                  onLoad={() => {
                    setImageLoaded(true);
                    const imgElement = imgRef.current;
                    const canvas = canvasRef.current;
                    canvas.width = imgElement.naturalWidth;
                    canvas.height = imgElement.naturalHeight;
                  }}
              />
              <canvas
                  ref={canvasRef}
                  width="648"
                  height="900"
                  style={{ width: '648px', height: '900px', border: '1px solid black' }} // Scaled display size
                  className="face-mesh-canvas"
              ></canvas>
            </div>
        )}
      </div>
  );
};

export default TestReport;
