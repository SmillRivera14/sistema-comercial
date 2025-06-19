import { useContext } from "react";
import Products from "../components/ListOfProducts";
import { ProductContext } from "../context/ProductContext";
import ShoppingCart from "../../public/ShppingCart";
import LinkedinImage from "../../public/LinkedIn";

export default function Home() {
  const { totalPaginas, paginaActual, setPaginaActual } =
    useContext(ProductContext);

  return (
    <div className="h-screen flex flex-col">
      {/* Header moderno */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center ">
          <div className="flex items-center space-x-2">
            <ShoppingCart />
            <h1 className="text-xl font-bold text-white hidden sm:block">
              Sistema Comercial
            </h1>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow p-6">
        {/* Título decorado */}
        <div className="mb-10 flex justify-center flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Sistema Comercial
          </h1>

          <p className="text-gray-400 max-w-2xl ">
            Descubre nuestra amplia selección de productos de calidad al mejor
            precio
          </p>
        </div>

        <Products />

        <div className="mt-8 flex justify-center items-center gap-2 text-gray-700 flex-wrap">
          <button
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>

          {paginaActual > 3 && (
            <>
              <button
                onClick={() => setPaginaActual(1)}
                className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
              >
                1
              </button>
              <span className="px-2">...</span>
            </>
          )}

          {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter(
              (num) =>
                num === paginaActual ||
                num === paginaActual - 1 ||
                num === paginaActual + 1
            )
            .map((num) => (
              <button
                key={num}
                onClick={() => setPaginaActual(num)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  paginaActual === num
                    ? "bg-green-700 text-white font-bold"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ))}

          {paginaActual < totalPaginas - 2 && (
            <>
              <span className="px-2">...</span>
              <button
                onClick={() => setPaginaActual(totalPaginas)}
                className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
              >
                {totalPaginas}
              </button>
            </>
          )}

          <button
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50"
            onClick={() =>
              setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
            }
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </main>

      {/* Footer elegante */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sistema Comercial.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Desarrollado por</span>
            <a
              href="https://www.linkedin.com/in/smill-rivera-diaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
            >
              <LinkedinImage />
              Smill Rivera
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
