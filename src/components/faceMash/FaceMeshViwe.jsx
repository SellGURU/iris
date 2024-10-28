import React, { useEffect } from "react";
import useFaceMesh from "../../hooks/useFaceMash.js";

const FaceMeshView = ({ imageSrc,className,onClick }) => {
    const {
        resolvedFile,
        imgRef,
        canvasRef,
        analyzeImage,
        imageLoaded,
        setImageLoaded,
    } = useFaceMesh(imageSrc,onClick);

    useEffect(() => {
        if (imageLoaded) {
            analyzeImage();
        }
    }, [imageLoaded, analyzeImage]);

    return (
        <div className="container">
            {resolvedFile && (
                <div className="image-preview" style={{ width: '600px', height: '900px' }}>
                    <img
                        ref={imgRef}
                        src={resolvedFile}
                        alt="Uploaded face"
                        style={{ display: 'none' }}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{ width: '600px', height: '900px', border: '1px solid black' }}
                        className="face-mesh-canvas"
                    ></canvas>
                </div>
            )}
        </div>
    );
};

export default FaceMeshView;
