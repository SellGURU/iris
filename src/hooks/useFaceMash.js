/* eslint-disable no-undef */
import { useState, useRef, useEffect } from "react";

const useFaceMesh = (initialImageSrc = null,onClickHandler,colorsData) => {
    const [resolvedFile, setResolvedFile] = useState(initialImageSrc || "");
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    // Initialize FaceMesh
    const faceMesh = useRef(
        new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
        })
    ).current;

    useEffect(() => {
        faceMesh.onResults(onResultsFaceMesh);
        if (initialImageSrc) {
            setResolvedFile(initialImageSrc); // Set the initial image if provided
        }
    }, [initialImageSrc,colorsData]);

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => setResolvedFile(reader.result);
    //     if (file) {
    //         reader.readAsDataURL(file);
    //         setImageLoaded(false);
    //     }
    // };

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
                const resizedCanvas = resizeImage(img, 648, 900);
                await faceMesh.send({ image: resizedCanvas });
            } catch (error) {
                console.error("FaceMesh error:", error);
            }
        }
    };

    const drawNoseEyesLips = (canvas, context, landmarks) => {
        const points = {
            nose: [197],
            chin:[200],
            cheeks:[50],
            forehead:[10],
            eyebrows:[300],
            // "Philtral Column":[280],
            // leftEye: [33],
            // Eye: [362],
            lips: [61],
        };
// , 151, 234, 93
        const whiteCircleIndices = [];
        // const colors = {
        //     nose: "#FFFFFF",
        //     // Eye: "#FFFFFF",
        //     lips: "#FFFFFF",
        //     cheeks:"#FFFFF",
        //     chin:"#FFFFFF",
        //     forehead:"#FFFFFF",
        //     eyebrows:"#FFFFFF"
        // };
        const colors=colorsData

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

        Object.entries(points).forEach(([feature, indices]) => {
            drawCircles(indices, colors[feature], feature);
        });

        drawCircles(whiteCircleIndices, "#FFFFFF", "whiteCircle");

        canvas.onclick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            circles.forEach((circle) => {
                const dx = x - circle.x;
                const dy = y - circle.y;
                if (dx * dx + dy * dy <= circle.radius * circle.radius) {
                    onClickHandler(circle.feature)
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
                const imgElement = imgRef.current;
                const canvasWidth = imgElement.naturalWidth;
                const canvasHeight = imgElement.naturalHeight;

                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                context.drawImage(results.image, 0, 0, canvasWidth, canvasHeight);
                drawNoseEyesLips(canvas, context, landmarks);
            });
        }
    };

    return {
        resolvedFile,
        imgRef,
        canvasRef,
        analyzeImage,
        imageLoaded,
        setImageLoaded,
    };
};

export default useFaceMesh;
