import { Camera } from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
export const CustCamera = (video2, faceMesh) => {
  const camera = new Camera(video2, {
    onFrame: async () => {
      await faceMesh.send({ image: video2 });
    },
    width: 420,
    height: 420,
  });
  return camera;
};
export const CustFaceMash = () => {
  const result = new FaceMesh({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`;
    },
  });
  return result;
};
