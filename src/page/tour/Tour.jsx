import {useState} from "react";
// import tour1 from "image/tour-1.svg";
// import tour2 from "image/tour-2.svg";
// import tour3 from "image/tour-3.svg";
// import tour4 from "image/tour-4.svg";
// import tour5 from "image/tour-5.svg";
import {StepInstructions} from "./StepInstructions";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";

export const Tour = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
     const [isShowTour,setIsShowTour] = useLocalStorage("tour")
    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSkip = () => {
        setIsShowTour(false)
        navigate("/facecamera");
    };

    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return (
                    <StepInstructions
                        step="1"
                        text="  Click on 'LIVE SCAN' to open your camera and capture a selfie, or use the 'Upload Picture' button next to it to choose a photo from your gallery."
                        image={'image/tour-1.svg'}
                        note="Note: Please remove glasses, ensure your face is clear of hair, and maintain good lighting for the best results."
                        onNext={handleNext}
                        onSkip={handleSkip}
                    />
                );
            case 2:
                return (
                    <StepInstructions
                        step="2"
                        text=" Keep your head directly in front of the camera and allow the scanner to scan your face following the guide grid."
                        image={'image/tour-2.svg'}
                        note="Note: The scan may take approximately 5 seconds."
                        onNext={handleNext}
                        onSkip={handleSkip}
                    />
                );
            case 3:
                return (
                    <StepInstructions
                        step="3"
                        text="Repeat the process for the left and right sides of your face. The scanner will capture each side and indicate completion with a checkmark on the right sidebar."
                        image={'image/tour-3.svg'}
                        note="Note: If you only want to scan the front side of your face, select the One Pose button above the camera area."
                        onNext={handleNext}
                        onSkip={handleSkip}
                    />
                );
            case 4:
                return (
                    <StepInstructions
                        step="4"
                        text="The next step will start automatically after the first scan is completed. Simply follow the grid and hold your position for 5 seconds to scan other sides of your face."
                        image={'image/tour-4.svg'}
                        note="Note: If you are in the wrong position and the scanner cannot recognize you properly, the box will turn red and an error will appear at the bottom. Adjust your position to align with the grid, and the scanner will start scanning your next position."
                        onNext={handleNext}
                        onSkip={handleSkip}
                    />
                );
            case 5:
                return (
                    <StepInstructions
                        step="5"
                        text="Once the scan is finished, you can download the results as a PDF or share them with others."
                        image={'image/tour-5.svg'}
                        note="Note: You can also perform a new scan, and all records will be saved in your scan history."
                        onNext={() => {
                            setIsShowTour(false)
                            navigate("/facecamera")
                        }}
                        onSkip={handleSkip}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            {getStepContent(currentStep)}
        </div>
    );
};
