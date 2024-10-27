import { useState, useRef, useEffect } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";

const useFaceMesh = () => {
    const [resolvedFile, setResolvedFile] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const [clickedFeature, setClickedFeature] = useState(null);

    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    const faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
    });

    useEffect(() => {
        faceMesh.onResults(onResultsFaceMesh);
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setResolvedFile(reader.result);
        if (file) reader.readAsDataURL(file);
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

    const analyzeImage = async () => {
        const img = imgRef.current;
        if (img && imageLoaded) {
            try {
                const resizedCanvas = resizeImage(img, 420, 420);
                await faceMesh.send({ image: resizedCanvas });
            } catch (error) {
                console.error("FaceMesh error:", error);
            }
        } else {
            console.error("Image reference is not valid or loaded.");
        }
    };

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

                circles.push({ x, y, radius, feature });
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
                    setClickedFeature(circle.feature);
                }
            });
        };
    };

    const onResultsFaceMesh = (results) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks) {
            results.multiFaceLandmarks.forEach((landmarks) => {
                context.drawImage(results.image, 0, 0, 100, 100);
                drawNoseEyesLips(canvas, context, landmarks);
            });
        }
    };

    return {
        resolvedFile,
        handleImageUpload,
        imgRef,
        canvasRef,
        analyzeImage,
        imageLoaded,
        setImageLoaded,
        clickedFeature,
    };
};

export default useFaceMesh;
