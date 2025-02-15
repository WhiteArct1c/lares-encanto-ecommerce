import React from "react";
import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
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
            <DialogTitle
                component="h2"
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Typography
                    fontFamily={'Public Sans'}
                    fontWeight={'bold'}
                    fontSize={35}
                >
                    LARES AI
                </Typography>
            </DialogTitle>
            <DialogContent>
                <StepperComponent/>
            </DialogContent>
        </Dialog>
    );
}

export default AISuggestionsDialogComponent;