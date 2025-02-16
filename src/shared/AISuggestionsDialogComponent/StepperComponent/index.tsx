import React, { Suspense, useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import PresentationStepComponent from "../PresentationStepComponent";
import UploadImageStepComponent from "../UploadImageStepComponent";
import SelectResultsStepComponent from "../SelectResultsStepComponent";
import LoadingResultsComponent from "../UploadImageStepComponent/components/loading-results-component.tsx";
import {useNavigate} from "react-router-dom";

interface StepperComponentProps {
    closeModal: () => void;
}

const StepperComponent: React.FunctionComponent<StepperComponentProps> = ({closeModal}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [finishedTimeout, setFinishedTimeout] = useState<boolean>(false);
    const navigate = useNavigate();

    const steps = ["Upload de imagem", "Escolha o resultado"];

    const isStepSkipped = (step: number) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = new Set<number>();
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDislike = () => {
        handleBack();
    };

    const handleLike = () => {
        navigate('/products/1');
        closeModal();
    };

    useEffect(() => {
        const id = setTimeout(() => {
            setFinishedTimeout(true);
        }, 5000);
        return () => clearTimeout(id);
    }, []);

    return (
        <>
            {!finishedTimeout && <PresentationStepComponent />}
            {finishedTimeout && (
                <Box sx={{ width: "100%" }} className="animate__animated animate__fadeIn">
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: { optional?: React.ReactNode } = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    {activeStep === 0 ? (
                        <>
                            <UploadImageStepComponent nextStep={handleNext} />
                        </>
                    ) : activeStep === 1 ? (
                        <Box
                            sx={{
                                width: "500px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Suspense fallback={<LoadingResultsComponent />}>
                                <SelectResultsStepComponent
                                    imageUrl="/src/assets/cadeira_ergo_flex.png"
                                    name="Cadeira Ergo Flex"
                                    onDislike={handleDislike}
                                    onLike={handleLike}
                                />
                            </Suspense>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            )}
        </>
    );
};

export default StepperComponent;
