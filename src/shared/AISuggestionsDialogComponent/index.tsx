import React from "react";
import {Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import StepperComponent from "./StepperComponent";

interface AISuggestionsDialogComponentProps {
    open: boolean;
    onClose: () => void;
}

const AISuggestionsDialogComponent: React.FC<AISuggestionsDialogComponentProps> = (props: AISuggestionsDialogComponentProps) => {
    const {open, onClose} = props;

    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogContent>
                <DialogTitle
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    className='animate__animated animate__fadeIn'

                >
                    <Typography
                        fontFamily={'Lexend'}
                        fontWeight={'bold'}
                        fontSize={'3rem'}
                    >
                        LaresAI
                    </Typography>
                </DialogTitle>
                <StepperComponent
                    closeModal={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}

export default AISuggestionsDialogComponent;