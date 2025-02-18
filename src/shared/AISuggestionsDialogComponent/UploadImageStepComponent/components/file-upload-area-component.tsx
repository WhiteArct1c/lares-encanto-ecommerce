import React from "react";
import { useCallback } from "react";
import {FileRejection, useDropzone} from "react-dropzone";
import { Box, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {toast} from "react-toastify";

interface FileUploadAreaProps {
    maxSizeMB: number;
    onDrop: (file: File[]) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({maxSizeMB, onDrop}) => {
    const maxSize = maxSizeMB * 1024 * 1024; // Convertendo MB para bytes

    const handleDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (rejectedFiles.length > 0) {
                toast.error("Apenas arquivos JPG, JPEG e PNG são permitidos.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else if (onDrop) {
                onDrop(acceptedFiles);
            }
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        maxSize,
        multiple: true,
        accept: { "image/jpeg": [], "image/jpg": [], "image/png": [] },
    });

    return (
        <Box
            {...getRootProps()}
            sx={{
                width: '500px',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: "2px dashed #90caf9",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                transition: "border 0.3s ease-in-out",
                "&:hover": { borderColor: "#42a5f5" },
            }}
        >
            <input {...getInputProps()} />
            <InsertDriveFileIcon
                sx={{ fontSize: 50, color: "#90caf9", marginBottom: "10px" }}
            />
            <Typography variant="body1">
                {isDragActive ? "Solte o arquivo aqui..." : "Arraste e solte imagens de móveis ou clique para selecionar"}
            </Typography>
            <Typography variant="caption" color="textSecondary">
                Apenas JPG, JPEG e PNG - Tamanho máximo: {maxSizeMB}MB
            </Typography>
        </Box>
    );
};

export default FileUploadArea;