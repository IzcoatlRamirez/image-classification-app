import React from "react";
import { Box } from "@mui/material";
import UploadFile from "../components/UploadFile";
import SearchResult from "../components/SearchResult";

function MainPage() {
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <Box sx={{ mt: "7rem", ml: "15rem" }}>
        <UploadFile />
      </Box>
    </div>
  );
}

export default MainPage;
