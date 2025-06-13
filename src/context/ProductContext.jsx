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

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        const data = await Get(paginaActual);
        setProductos(data.result);
        setTotalPaginas(data.pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [paginaActual]);

  return (
    <ProductContext.Provider
      value={{
        // valores a compartir
        products,
        totalPaginas,
        paginaActual,
        setPaginaActual,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
