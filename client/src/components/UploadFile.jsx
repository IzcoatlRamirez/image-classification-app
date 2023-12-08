import React, { useState, useRef } from "react";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Box, Button, Typography } from "@mui/material";
import Notification from "./Notification";
import SearchResult from "./SearchResult";


const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Para almacenar la URL de la imagen
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [predict, setPredict] = useState("");

  const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // Mostrar la imagen en la interfaz
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    handleSnackbarOpen(); // mostramos que se subio el archivo
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    // Mostrar la imagen en la interfaz
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(droppedFile);

    handleSnackbarOpen(); // mostramos que se subio el archivo
  };

  const handleButtonClick = () => {
    // Abre el cuadro de diálogo de selección de archivo cuando se hace clic en el botón
    fileInputRef.current.click();
  };

  const handleFileSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(`${URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        //convertimos la respuesta a json
        const data = await response.json();
        setPredict(data);
      } catch (error) {
        console.error("Error de red", error);
      }
    }
  };
  const handleRemoveFile = () => {
    setFile(null);
    setImageUrl(null);

    // Reinicia el valor del input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ maxWidth: 350, minWidth: 350 }}>
        {/* <div style={{ maxWidth: 350, minWidth: 350 }}>
          <Typography
            variant="h5"
            align="center"
            style={{ marginBottom: "1rem", color: "white" }}
          >
            <div className="custom-font" style={{ marginBottom: "0.5rem" }}>
              Bienvenido
            </div>
            <div className="custom-font">Carga tu imagen aqui</div>
          </Typography>
        </div> */}

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          style={{
            border: "2px dashed #aaa",
            padding: "20px",
            textAlign: "center",
            color: "white",
            maxWidth: 350,
            minHeight: 350,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {imageUrl ? (
            <div>
              <img
                src={imageUrl}
                alt="Imagen seleccionada"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          ) : (
            <React.Fragment>
              <FileOpenIcon
                sx={{ color: "#aaa", ml: "40%", mt: "6rem", fontSize: 56 }}
              />
              <Typography>Arrastra una foto aquí</Typography>
            </React.Fragment>
          )}
        </div>

        <Box sx={{ display: "flex", flexDirection: "row", mt: 1, gap: 1 }}>
          <Button variant="outlined" onClick={handleFileSubmit}>
            Subir
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Seleccionar Archivo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>

        <Notification
          open={snackbarOpen}
          handleClose={handleSnackbarClose}
          message="Imagen seleccionada"
          severity="success"
        />
      </div>

      <Box sx={{ ml: "5rem", color: "white" }}>
        <SearchResult data={predict}></SearchResult>
      </Box>
    </div>
  );
};

export default UploadFile;
