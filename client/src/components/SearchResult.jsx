import { Typography, Link } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useState, useEffect} from "react";

function SearchResult({data}) {
  const [titulo,setTitulo] = useState("")
  const [url,setUrl] = useState("")
  const [msg,setMsg] = useState("")

  useEffect(() => {
    // Llamar a la función de búsqueda cuando se cargue el componente
    if (data.clase) {
      console.log(data.clase);
      searchWikipedia(data.clase)
    }
  }, [data.clase]);
  
  const searchWikipedia = async (query) => {
    try {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&format=json&origin=*`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error en la solicitud a Wikipedia: ${response.status}`);
      }

      const data = await response.json();
      if (data[1].length > 0) {
        setTitulo(data[1][0])
        setUrl(data[3][0])
        setMsg("Consulta mas informacion en:")

      } else {
        setText("No se encontró información en Wikipedia para esta predicción.");
      }
    } catch (error) {
      console.error("Error al buscar en Wikipedia", error);
      setText("Error al buscar en Wikipedia");
    }
    }


  return (
    <>
      <Typography variant="h2">
          {data.clase}
      </Typography>
      <div>
        {titulo}
      </div>
      <div>
        <Typography sx={{color: pink['A400']}}>{msg}</Typography>
        <Link href={url} target="_blank">{url}</Link>
      </div>
    </>
  );
}

export default SearchResult;
