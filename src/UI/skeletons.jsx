import CardImage from "./Products/CardImage";
import BackButton from "../UI/BackButton";
export function ListOfProductSkeleton() {
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

export function ProductSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-dvw p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        {/* Imagen del producto */}
        <div className="bg-gray-700 h-64 flex items-center justify-center animate-pulse">
          <CardImage />
        </div>

        {/* Contenido de la card */}
        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white animate-pulse"></h2>
            <p className="text-gray-300 animate-pulse"></p>
          </div>

          {/* Detalles del producto */}
          <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg animate-pulse">
            <div>
              <p className="text-sm text-gray-400">Precio</p>
              <p className="text-2xl font-bold text-blue-400 "></p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium
                bg-green-900/30 text-green-400 border border-green-400/30"
            ></span>
          </div>

          {/* Botones */}
          <div className="flex justify-between pt-4 border-t border-gray-700">
            <BackButton />
            <button className="disable px-6 py-2 rounded-lg text-white transition-colors bg-blue-600 hover:bg-blue-700">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
