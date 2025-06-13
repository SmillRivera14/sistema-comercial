import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductImage from "../components/ProductImage";

export default function Product() {
  const { id } = useParams();
  const { products, loading } = useContext(ProductContext);
  const [selected, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  useEffect(() => {
    // esto hace que sea necesario tener un producto previamente cargado, para solucionar eso debería llamar a la API
    const foundProduct = products.find((element) => element.id == id);
    setSelectedProduct(foundProduct);
  }, [products, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-400">Cargando producto...</div>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-400">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen min-w-dvw p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        {/* Imagen del producto */}
        <div className="bg-gray-700 h-64 flex items-center justify-center">
          <ProductImage src={selected.url} alt={products.nombre} />
        </div>

        {/* Contenido de la card */}
        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">{selected.nombre}</h2>
            <p className="text-gray-300">{selected.descripcion}</p>
          </div>

          {/* Detalles del producto */}
          <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg">
            <div>
              <p className="text-sm text-gray-400">Precio</p>
              <p className="text-2xl font-bold text-blue-400">
                ${selected.precio}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selected.stock > 0
                  ? "bg-green-900/30 text-green-400 border border-green-400/30"
                  : "bg-red-900/30 text-red-400 border border-red-400/30"
              }`}
            >
              {selected.stock > 0 ? `Stock: ${selected.stock}` : "Agotado"}
            </span>
          </div>

          {/* Botones */}
          <div className="flex justify-between pt-4 border-t border-gray-700">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors"
            >
              Volver
            </button>
            <button
              disabled={selected.stock <= 0}
              className={`px-6 py-2 rounded-lg text-white transition-colors ${
                selected.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 cursor-not-allowed text-gray-400"
              }`}
            >
              {selected.stock > 0 ? "Comprar ahora" : "No disponible"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
