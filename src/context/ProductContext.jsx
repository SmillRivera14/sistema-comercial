import { useEffect, createContext, useState } from "react";
import { Get } from "../API/Get";

//crear el contexto
export const ProductContext = createContext();

// crear un provedor de contexto
export function ProductProvider({ children }) {
  // agregar estados y funciones a compartir
  const [products, setProductos] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await Get(paginaActual);
        setProductos(data.result);
        setTotalPaginas(data.pages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [paginaActual]);

  return (
    <ProductContext.Provider
      value={{
        products,
        totalPaginas,
        paginaActual,
        setPaginaActual,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
