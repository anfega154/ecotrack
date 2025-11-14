import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 vw-100"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/de/a5/58/dea558e009dd2f9436040c330339b027.jpg')",
      }}
    >
      <div className="flex flex-col items-center justify-center px-8 py-10 rounded-2xl backdrop-blur-md bg-white/70 shadow-2xl max-w-lg">

        <h1 className="text-9xl font-extrabold text-green-700 mb-2 drop-shadow-md">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          ¡Ups! Página no encontrada 🌿
        </h2>

        <p className="text-gray-800 mb-8">
          La página que buscas no existe, fue movida o cambió su dirección.
        </p>

        <Link
          to="/dashboard"
          className="flex flex-col items-center justify-center px-8 py-10 rounded-2xl backdrop-blur-md bg-white/70 shadow-2xl max-w-lg"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
