// components/ErrorMessage.jsx
const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center">
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold">Error al cargar los productos</h2>
        <p className="text-sm mt-2">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
