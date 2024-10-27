import { useState, useRef, useEffect } from "react";

const useFaceMesh = (initialImageSrc = null) => {
    const [resolvedFile, setResolvedFile] = useState(initialImageSrc || "");
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    // eslint-disable-next-line no-undef
    const faceMesh = useRef(new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
    })).current;

    useEffect(() => {
        faceMesh.onResults(onResultsFaceMesh);
        if (initialImageSrc) {
            setResolvedFile(initialImageSrc); // Set the initial image if provided
        }
    }, [initialImageSrc]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setResolvedFile(reader.result);
        if (file) {
            reader.readAsDataURL(file);
            setImageLoaded(false);
        }
    };

    const analyzeImage = async () => {
        const img = imgRef.current;
        if (img && imageLoaded) {
            try {
                await faceMesh.send({ image: img });
            } catch (error) {
                console.error("FaceMesh error:", error);
            }
        }
    };

    const drawNoseEyesLips = (canvas, context, landmarks) => {
        const points = {
            nose: [1, 2, 5, 6,10,11, 195, 197],
            leftEye: [33],
            rightEye: [362, 263],
            lips: [61, 409],

        };
        const colors = {
            nose: "#FF4C4C",
            leftEye: "#4C4CFF",
            rightEye: "#4CFF4C",
            lips: "#FF69B4",
            forehead: "#FF69B4",
        };

        Object.entries(points).forEach(([feature, indices]) => {
            indices.forEach((index) => {
                const point = landmarks[index];
                const x = point.x * canvas.width;
                const y = point.y * canvas.height;
                const radius = 3;

                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI);
                context.fillStyle = colors[feature];
                context.fill();
            });
        });
    };

    const onResultsFaceMesh = (results) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks) {
            results.multiFaceLandmarks.forEach((landmarks) => {
                const imgElement = imgRef.current;
                const canvasWidth = imgElement.naturalWidth;
                const canvasHeight = imgElement.naturalHeight;

                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                context.drawImage(imgElement, 0, 0, canvasWidth, canvasHeight);
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
    };
};

export default useFaceMesh;
