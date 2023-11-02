import { Typography } from "@mui/material";
import { useState } from "react";

function SearchResult({data}) {
  const [text,setText] = useState("Edita este componente para mostrar el resultado para buscar la prediccion en internet para ofrecer informacion")

  //data es la rediccion
  //aqui buscamos en wikipedia
  const SearchWikipedia=(data)=>{
    // usamos settext para guardar el resultado de la busqueda 
    // setText(resultadoBusqueda)
  }

  return (
    <>
      <Typography variant="h2">
          {data.clase}
      </Typography>
      <div>
        {text}
      </div>
    </>
  );
}

export default SearchResult;
