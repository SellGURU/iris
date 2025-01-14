// The Tour component provides a step-by-step guide for users to follow during the face scan process.
// It uses useNavigate from react-router-dom to navigate between routes and useLocalStorage from @uidotdev/usehooks to manage the visibility state of the tour.
// The component maintains the current step using the useState hook and updates it as the user progresses through the tour.
// The handleNext function increments the current step, while the handleSkip function hides the tour and navigates to the face camera page.
// The getStepContent function returns the content for each step of the tour based on the current step number, including instructions, images, and notes.
// The component renders the content of the current step inside a centered container, providing users with visual and textual instructions to complete the face scan.


import {useState} from "react";
import {StepInstructions} from "./StepInstructions";
import {useNavigate,useSearchParams} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";

export const Tour = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
     const [isShowTour,setIsShowTour] = useLocalStorage("tour")
    const [searchParams,] = useSearchParams();
    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSkip = () => {
        setIsShowTour(false)
        navigate(`/facecamera?gender=${searchParams.get("gender")}&patientId=${searchParams.get("patientId")}`);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return (
                    <StepInstructions
                        step="1"
                        text=" Click 'Start Scan' to open your camera and capture a well-lit and clear image, or use 'Upload Image' to select a recent photo from your gallery."
                        image={'image/stepone.png'}
                        note="Note: Remove glasses, ensure the subject's face is clear of hair, use a neutral background, and maintain good lighting for optimal results."
                        onNext={handleNext}
                        onBack={() =>{
                            setCurrentStep(currentStep - 1);
                        }}                        
                        onSkip={handleSkip}
                    />
                );
            case 2:
                return (
                    <StepInstructions
                        step="2"
                        text={` Position the subject's head in the frame and instruct them to slightly move their face until the mesh goes green. If you only want to scan the front of the subject's face, select the "Single pose" button above the camera area.`}
                        image={'image/tour.png'}
                        note="Note: The scan takes approximately 3 seconds. Maintain position and hold still for each side of the scan.  "
                        onNext={handleNext}
                        onSkip={handleSkip}
                        onBack={() =>{
                            setCurrentStep(currentStep - 1);
                        }}                        
                    />
                );
            case 3:
                return (
                    <StepInstructions
                        step="3"
                        text=" Repeat the process for the left and right sides of the subject's face. The scanner will capture each side and indicate completion with a checkmark on the right sidebar."
                        image={'image/newTour3.png'}
                        note="Note: To rescan any side, press the rescan button and remove the scan to start again."
                        onNext={handleNext}
                        onSkip={handleSkip}
                        onBack={() =>{
                            setCurrentStep(currentStep - 1);
                        }}                        
                    />
                );
            case 4:
                return (
                    <StepInstructions
                        step="4"
                        text="Once all poses are completed successfully, press the 'Finish' button to begin processing and preparing the report."
                        image={'image/tour4.png'}
                        note="Note: You can also perform a new scan, and all records will be saved in your scan library."
                        onNext={() => {
                            setIsShowTour(false)
                            navigate(`/facecamera?gender=${searchParams.get("gender")}&patientId=${searchParams.get("patientId")}`)
                        }}
                        onBack={() =>{
                            setCurrentStep(currentStep - 1);
                        }}
                        onSkip={handleSkip}
                    />
                );
            // case 5:
            //     return (
            //         <StepInstructions
            //             step="5"
            //             text="Once the scan is finished, you can download the results as a PDF or share them with others."
            //             image={'image/tour-5.svg'}
            //             note="Note: You can also perform a new scan, and all records will be saved in your scan history."
            //             onNext={() => {
            //                 setIsShowTour(false)
            //                 navigate("/facecamera")
            //             }}
            //             onSkip={handleSkip}
            //         />
            //     );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-[75vh] ">
            {getStepContent(currentStep)}
        </div>
    );
};
