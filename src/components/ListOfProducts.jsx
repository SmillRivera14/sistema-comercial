import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductImage from "./ProductImage";

export default function Products() {
  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-xl p-4 space-y-3 border border-gray-700"
          >
            <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            to={`/search/${product.id}`}
            className="block h-full bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
          >
            {/* Placeholder para imagen del producto */}
            <div className="bg-gray-700 rounded-lg mb-4 h-40 flex items-center justify-center group-hover:bg-gray-600 transition-colors">
              <ProductImage src={product.url} alt={product.nombre} />
            </div>

            <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {product.nombre}
            </h2>

            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {product.descripcion}
            </p>

            <div className="flex justify-between items-end">
              <span className="font-bold text-blue-400 text-lg">
                ${product.precio}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  product.stock > 0
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
