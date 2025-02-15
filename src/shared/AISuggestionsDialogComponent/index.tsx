import React from "react";
import {Dialog, DialogContent} from "@mui/material";
import StepperComponent from "./StepperComponent";

interface AISuggestionsDialogComponentProps {
    open: boolean;
    onClose: (value: string) => void;
}

const AISuggestionsDialogComponent: React.FC<AISuggestionsDialogComponentProps> = (props: AISuggestionsDialogComponentProps) => {
    const {open, onClose} = props;

    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogContent>
                <StepperComponent/>
            </DialogContent>
        </Dialog>
    );
}

export default AISuggestionsDialogComponent;