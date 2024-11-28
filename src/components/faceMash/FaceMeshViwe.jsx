/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import useFaceMesh from "../../hooks/useFaceMash.js";
import ClipLoader from "react-spinners/ClipLoader";
const FaceMeshView = ({ imageSrc,dataValues,onClick,width="500px",height="500px",...props }) => {
    const [colors,setColors] = useState({
        nose: "#FFFFFF",
        lips: "#FFFFFF",
        cheeks:"#FFFFF",
        chin:"#FFFFFF",
        forehead:"#FFFFFF",
        eyebrows:"#FFFFFF"
    })
    const {
        resolvedFile,
        imgRef,
        canvasRef,
        analyzeImage,
        imageLoaded,
        setImageLoaded,
    } = useFaceMesh(imageSrc,onClick,colors);

    useEffect(() => {
        if (imageLoaded) {
            analyzeImage();
        }
    }, [imageLoaded, analyzeImage]);
    const [isLoading,setIsLoading] = useState(true)
    const resolveColorFormData = (category) => {
        let values = []
        dataValues.filter(el => el.category == category).forEach(e => {
            if(e.side){
                values.push(e.side.left.problematic)
            }else {
                values.push(e.problematic)
            }
        })
        if(values.filter((el) =>el == true).length > 0){
            return "#e30b2c"
        }
        return '#FFFFFF'
        // console.log(values.)
    }
    useEffect(() => {
        // resolveColorFormData("nose")
        if(!isLoading){
            setColors(
            {
                nose:  resolveColorFormData("nose"),
                lips:resolveColorFormData("lips"),
                cheeks:resolveColorFormData("cheeks"),
                chin:resolveColorFormData("chin"),
                forehead:resolveColorFormData("forehead"),
                eyebrows:resolveColorFormData("eyebrows")
            }
            )

        }
    },[isLoading])
    useEffect(() => {
        if(dataValues.length > 0){
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
            
        }
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
