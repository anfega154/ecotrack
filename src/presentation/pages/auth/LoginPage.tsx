import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
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
