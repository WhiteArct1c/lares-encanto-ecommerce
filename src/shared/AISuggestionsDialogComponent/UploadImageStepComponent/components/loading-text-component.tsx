import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import "animate.css";

const loadingPhrases = [
    "Alinhando os pixels perfeitos...",
    "Revisando o catálogo...",
    "Tirando as medidas dos móveis...",
    "Ajustando os acabamentos...",
    "Comparando texturas...",
    "Aguardando a IA pensar..."
];

const LoadingTextComponent: React.FC = () => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [fadeClass, setFadeClass] = useState("animate__fadeIn");

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeClass("animate__fadeOut");

            setTimeout(() => {
                setCurrentPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
                setFadeClass("animate__fadeIn");
            }, 500); // Tempo para a animação de fadeOut terminar
        }, 2000); // Tempo total de exibição da frase antes de trocar

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <Typography
                variant="h6"
                className={`animate__animated ${fadeClass}`}
                sx={{ fontWeight: "bold", color: "#555" }}
            >
                {loadingPhrases[currentPhraseIndex]}
            </Typography>
        </Box>
    );
};

export default LoadingTextComponent;
