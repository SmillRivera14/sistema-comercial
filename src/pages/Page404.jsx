import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="flex flex-col items-center justify-center bg-red-800 px-6 py-10 text-center rounded-lg">
      <div className="max-w-md bg-red-700 p-8 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-extrabold text-red-500 mb-6">404</h1>
        <p className="text-xl font-semibold mb-4">Page Not Found</p>
        <img
          src="https://media1.tenor.com/m/MYZgsN2TDJAAAAAC/this-is.gif"
          alt="this is fine"
          className="w-72 h-auto mx-auto rounded-lg shadow-md mb-6"
        />
        <p className="mb-6">
          Oops! It seems the page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
