import { Typography, Link } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useState, useEffect} from "react";

function SearchResult({data}) {
  const [url,setUrl] = useState("")
  const [abrir_en,setAbrir] = useState("")
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
        setUrl(data[3][0])
        setAbrir("abrir en otra pestaña")
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
          <Typography sx={{color: pink['A400']}}>{msg}</Typography>
        <iframe src = {url} width="800" height="600" frameborder="0"></iframe><br></br>
        <Link href={url} target="_blank">{abrir_en}</Link>
      </div>
    </>
  );
}

export default SearchResult;