import React, { useEffect } from "react";
import useFaceMesh from "../../hooks/useFaceMash.js";

const FaceMeshView = ({ imageSrc }) => {
    const {
        resolvedFile,
        handleImageUpload,
        imgRef,
        canvasRef,
        analyzeImage,
        imageLoaded,
        setImageLoaded,
    } = useFaceMesh(imageSrc);

    useEffect(() => {
        if (imageLoaded) {
            analyzeImage();
        }
    }, [imageLoaded, analyzeImage]);

    return (
        <div className="container">
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
