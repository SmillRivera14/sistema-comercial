import { useNavigate } from "react-router-dom";

export default function Back() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <button
      onClick={handleBack}
      className="px-6 py-2 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors"
    >
      Volver
    </button>
  );
}
