/ eslint-disable no-undef /;
export const CustCameraT = (image, faceMesh) => {
  // Here, the "camera" function is not needed for an image. Instead, we just send the image to the faceMesh.
  const analyzeImage = async () => {
    // Send the image directly to faceMesh
    await faceMesh.send({ image });
  };

  return { analyzeImage }; // Return the analyze function so you can call it externally
};

export const CustFaceMashT = () => {
  const faceMesh = new FaceMesh({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`;
    },
  });

  // Set up the face mesh to return landmarks without any specific drawing
  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  return faceMesh;
};
