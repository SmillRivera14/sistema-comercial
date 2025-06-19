//Averiguar cómo estoy recorriendo los errores
function BuildDetailedErrorMessage(res, data) {
  const status = res.status || "Unknown";
  const statusText = res.statusText || "";
  const url = res.url || "URL desconocida";
  
  let title = "";
  if (data && typeof data === "object") {
    title = data.title || "";
  }

  // Imprimir detalles en consola para depurar
  // console.log(`URL: ${url}`);
  // console.log(`Status: ${status} - ${statusText}`);
  // console.log(`Title: ${title}`);
  
  try {
    const headersArray = [...res.headers.entries()];
    console.log("Headers:", headersArray);
  } catch (e) {
    console.log("No se pudieron leer los headers. ", e);
  }

  let errorMessage = `Error ${status}: ${title || statusText || "Sin mensaje"}\nURL: ${url}`;

  return errorMessage.trim();
}

export async function Get(page=1,target="Productos"){
  try {
      const res =await fetch(`https://localhost:7252/api/${target}?pageNumber=${page}&pageSize=10`)
      
      const data = await res.json()

     if(!res.ok){
      const errorMessage = BuildDetailedErrorMessage(res,data);
      console.error("Error en Get: ", data);
      throw new Error(errorMessage);
    }

  return data
  } catch (error) {
    console.error("Error en el fetch de Get ", error);
    throw error
  }
}

export async function GetByID(id,target) {
  try {
    const res = await fetch(`https://localhost:7252/api/${target}/${id}`)
    const data = await res.json()

    if(!res.ok){
      const errorMessage = BuildDetailedErrorMessage(res,data);
      console.error("Error en GetByID: ", data);
      throw new Error(errorMessage);
    }
    return data
  } catch (error) {
    console.log("getByID dice:\n ", error.message);
    throw error
  }
}

export async function Update(target="Productos",object){
  try {
        const res = await fetch(`https://localhost:7252/api/${target}/${object.id}`,
          {
          headers:{"Content-Type": "application/json"},
          method:"PUT",
          body:JSON.stringify(object)
        });

        const data = await res.json();

        if(!res.ok){
          const errorMessage = BuildDetailedErrorMessage(res,data)
          console.error("Error en Update: ", data);
          throw new Error (errorMessage)
        }

        return data;
  } catch (error) {
    console.error("Error en el fetch: ", error);
  }
}


