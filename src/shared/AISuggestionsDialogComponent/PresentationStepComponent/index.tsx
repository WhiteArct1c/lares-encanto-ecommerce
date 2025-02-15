import React from "react";
import {Box} from "@mui/material";

interface PresentationStepComponentProps {}

const PresentationStepComponent: React.FC<PresentationStepComponentProps> = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: 5 }}>
            <img src='src/assets/laresAi/SVG/laresAI-normal.svg' alt='laresAi' style={{ width: '200px' }} />
        </Box>
    );
}

export default PresentationStepComponent;