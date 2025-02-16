import React from "react";
import {Box} from "@mui/material";
import LoadingTextComponent from "./loading-text-component.tsx";

const LoadingResultsComponent: React.FC = () => {
    return(
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5
            }}
            className='animate__animated animate__fadeIn'
        >
            <img
                src='src/assets/laresAi/SVG/laresAi%20-%20pensando.svg'
                alt='laresAi'
                style={{ width: '230px', padding: '2px' }}
                className='animate__animated animate__pulse animate__infinite'
            />
            <LoadingTextComponent/>
        </Box>
    )
}

export default LoadingResultsComponent;