import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../data/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch {
      setError("Error al iniciar sesión con Google");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 vw-100"
      style={{ backgroundColor: "#374151", overflow: "hidden" }}
    >
      <div
        className="row g-0 w-100 h-100 justify-content-center align-items-center"
        style={{ maxWidth: "none", margin: 0 }}
      >
        <div className="col-md-6 col-12 p-0 h-100">
          <img
            src="https://i.pinimg.com/1200x/7d/b2/72/7db2721e8362fa167200981b1e243277.jpg"
            alt="login visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className="col-md-6 col-12 d-flex align-items-center justify-content-center bg-dark text-white h-100 p-5"
        >
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <div className="d-flex align-items-center mb-4">
              <Leaf className="text-success me-2" size={40} />
              <h2 className="fw-bold mb-0">EcoTrack</h2>
            </div>

            <h5 className="mb-4">Inicia sesión en tu cuenta</h5>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control bg-secondary border-0 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control bg-secondary border-0 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="alert alert-danger py-2 text-center">{error}</div>
              )}

              <button
                type="submit"
                className="btn btn-success w-100 py-2 fw-semibold"
              >
                Iniciar sesión
              </button>

              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="mx-3 text-muted">o</span>
                <hr className="flex-grow-1" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn btn-outline-light w-100 py-2 fw-semibold d-flex align-items-center justify-content-center"
              >
                <svg
                  className="me-2"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continuar con Google
              </button>

              <div className="text-center mt-4">
                <Link
                  to="#"
                  className="text-muted text-decoration-none d-block mb-2"
                >
                 <span className="text-white">¿Olvidaste tu contraseña?</span>{" "}
                </Link>
                <p className="text-muted">
                  <span className="text-white">¿No tienes una cuenta?</span>{" "}
                  <Link
                    to="/register"
                    className="text-success fw-bold text-decoration-none"
                  >
                    Regístrate aquí
                  </Link>
                </p>
                <small className="text-secondary">
                  <Link to="#" className="text-decoration-none me-2">
                    Términos de uso
                  </Link>
                  ·
                  <Link to="#" className="text-decoration-none ms-2">
                    Política de privacidad
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
