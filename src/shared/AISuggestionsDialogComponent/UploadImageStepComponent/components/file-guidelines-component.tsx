import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

const FileGuidelinesComponent: React.FC = () => {
    return (
        <Box sx={{ padding: "10px", maxWidth: "400px", margin: "auto" }}>
            <Box
                sx={{
                    backgroundColor: "#6e6e6e", // Cinza pastel
                    borderRadius: "8px",
                    padding: "10px",
                    position: "relative",
                    width: '350px',
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        left: "-10px",
                        top: "15px",
                        width: "0",
                        height: "0",
                        borderStyle: "solid",
                        borderWidth: "10px 15px 10px 0",
                        borderColor: "transparent #6e6e6e transparent transparent",
                    },
                }}
            >
                <Grid container >
                    {/* Coluna da Esquerda - O que NÃO fazer */}
                    <Grid item xs>
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ffffff", marginBottom: "4px", textAlign: 'center'}}>
                            O que NÃO enviar ❌
                        </Typography>
                        <List dense>
                            {["Fotos que não são de móveis", "Baixa qualidade", " Móvel desenquadrado", "Arquivo muito grande"].map((text, index) => (
                                <ListItem key={index} sx={{ paddingY: 0 }}>
                                    <ListItemIcon sx={{ minWidth:"auto" }}>
                                        <CloseIcon sx={{ color: "red", fontSize: 18 }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} primaryTypographyProps={{ variant: "caption", sx: { color: "#ffffff" } }} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Coluna da Direita - O que enviar */}
                    <Grid item xs>
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ffffff", marginBottom: "4px", textAlign: 'center' }}>
                            O que ENVIAR ✅
                        </Typography>
                        <List dense>
                            {["Imagem de um móvel", "Imagem nítida", "Móvel centralizado", "Resolução adequada"].map((text, index) => (
                                <ListItem key={index} sx={{ paddingY: 0 }}>
                                    <ListItemIcon sx={{ minWidth:"auto" }}>
                                        <CheckIcon sx={{ color: "#55EC18A8", fontSize: 18 }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} primaryTypographyProps={{ variant: "caption", sx: { color: "#ffffff" } }} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default FileGuidelinesComponent;
