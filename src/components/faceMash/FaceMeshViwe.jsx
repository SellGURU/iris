import React, { useEffect, useState } from "react";
import useFaceMesh from "../../hooks/useFaceMash.js";
import ClipLoader from "react-spinners/ClipLoader";
const FaceMeshView = ({ imageSrc,onClick,width="500px",height="500px",...props }) => {
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
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    })
    return (
        <div className="container rounded-lg">
            {resolvedFile ? (
                <div {...props} style={{ width: width,borderRadius:'16px', height: height }}>
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
                        className="face-mesh-canvas cursor-pointer"
                    ></canvas>
                    {isLoading &&
                        <div className="absolute top-0 w-full flex justify-center items-center h-full">
                            <ClipLoader></ClipLoader>
                        </div>
                    }
                </div>
            ):
                <>
                    <ClipLoader></ClipLoader>
                </>
            }
            
        </div>
    );
};

export default FaceMeshView;
