import React from "react";
import FileUploadArea from "./FileUploadArea";

interface UploadImageStepComponentProps {}

const UploadImageStepComponent: React.FC<UploadImageStepComponentProps> = () => {

    const handleFileUpload = (files: File[]) => {
        console.log(files);
    }

    return (
        <>
            <FileUploadArea
                maxSizeMB={10}
                onDrop={handleFileUpload}
            />
        </>
    );
}

export default UploadImageStepComponent;