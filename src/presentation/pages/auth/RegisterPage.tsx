import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../data/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Firebase register error:", err);

      const firebaseErrors: Record<string, string> = {
        "auth/email-already-in-use": "El correo ya está registrado. Inicia sesión o usa otro correo.",
        "auth/invalid-email": "Correo inválido. Verifica el formato.",
        "auth/weak-password": "La contraseña es demasiado débil. Usa al menos 6 caracteres.",
      };

      const message =
        firebaseErrors[err?.code] ??
        `Error al registrarse (${err?.code ?? "unknown"}): ${err?.message ?? "Error desconocido"}`;

      setError(message);
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
            src="https://i.pinimg.com/736x/23/4e/89/234e8910a9ab9feb5f439dc54141262b.jpg"
            alt="register visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6 col-12 d-flex align-items-center justify-content-center bg-dark text-white h-100 p-5">
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <div className="d-flex align-items-center mb-4">
              <Leaf className="text-success me-2" size={40} />
              <h2 className="fw-bold mb-0">EcoTrack</h2>
            </div>

            <h5 className="mb-4">Crea tu cuenta</h5>

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control bg-secondary border-0 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control bg-secondary border-0 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Confirmar contraseña</label>
                <input
                  type="password"
                  className="form-control bg-secondary border-0 text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger py-2 text-center">{error}</div>
              )}

              <button
                type="submit"
                className="btn btn-success w-100 py-2 fw-semibold"
              >
                Registrarse
              </button>

              <div className="text-center mt-4">
                <p className="text-muted">
                  <span className="text-white">¿Ya tienes una cuenta?</span>{" "}
                  <Link
                    to="/login"
                    className="text-success fw-bold text-decoration-none"
                  >
                    Inicia sesión
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

export default RegisterPage;
