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
                <div className={className} style={{ width: '200px', height: '200px' }}>
                    <img
                        ref={imgRef}
                        src={resolvedFile}
                        alt="Uploaded face"
                        style={{ display: 'none' }}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{ width: '100%', height: '100%', border: '1px solid black' }}
                        className="face-mesh-canvas"
                    ></canvas>
                </div>
            )}
        </div>
    );
};

export default FaceMeshView;
