import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../data/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles, Shield } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: "", color: "" };
    if (pass.length < 6) return { strength: 1, label: "Débil", color: "#ef4444" };
    if (pass.length < 10) return { strength: 2, label: "Media", color: "#f59e0b" };
    return { strength: 3, label: "Fuerte", color: "#10b981" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    if (password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch {
      setError("Error al registrarse con Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 vw-100"
      style={{ 
        backgroundColor: "#0f172a", 
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          animation: "pulse 8s ease-in-out infinite",
          pointerEvents: "none"
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        .input-focus-ring {
          transition: all 0.3s ease;
        }
        .input-focus-ring:focus {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
          border-color: #10b981 !important;
        }
        .btn-hover-lift {
          transition: all 0.3s ease;
        }
        .btn-hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        .btn-hover-lift:active {
          transform: translateY(0);
        }
        .password-strength-bar {
          transition: all 0.3s ease;
        }
      `}</style>

      <div
        className="row g-0 w-100 h-100 justify-content-center align-items-center"
        style={{ maxWidth: "none", margin: 0, position: "relative", zIndex: 1 }}
      >
        <div className="col-md-6 col-12 p-0 h-100 position-relative animate-slideInRight order-md-2">
          <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
            <img
              src="https://i.pinimg.com/736x/23/4e/89/234e8910a9ab9feb5f439dc54141262b.jpg"
              alt="register visual"
              className="img-fluid h-100 w-100"
              style={{ objectFit: "cover", filter: "brightness(0.8)" }}
            />
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.35) 100%)",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "85%",
              maxWidth: "400px"
            }}>
              <div className="text-white text-center mb-3">
                <Sparkles size={32} className="mb-2" style={{ opacity: 0.95 }} />
                <h4 className="fw-bold" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                  Comienza tu viaje verde
                </h4>
              </div>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                {[
                  { icon: "🌱", text: "Rastrea hábitos" },
                  { icon: "📊", text: "Ve tu progreso" },
                  { icon: "🏆", text: "Gana logros" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-3 d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                    <small className="fw-semibold">{item.text}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-md-6 col-12 d-flex align-items-center justify-content-center text-white h-100 p-5 animate-fadeInUp order-md-1"
          style={{ backgroundColor: "#1e293b", overflowY: "auto" }}
        >
          <div style={{ maxWidth: "440px", width: "100%" }}>
            <div className="d-flex align-items-center mb-2">
              <div className="p-2 rounded-3" style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}>
                <Leaf className="text-success" size={36} />
              </div>
              <h2 className="fw-bold mb-0 ms-3">EcoTrack</h2>
            </div>
            
            <p className="mb-4" style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
              <Shield size={14} className="me-1" />
              Tu compromiso con el planeta empieza aquí
            </p>

            <h4 className="mb-1 fw-bold text-white">Crea tu cuenta</h4>
            <p className="mb-4" style={{ color: "#cbd5e1" }}>Únete a la comunidad eco-consciente</p>

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>
                  <Mail size={16} className="me-2" />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control input-focus-ring border-0 text-white py-3"
                  style={{ 
                    backgroundColor: "#334155",
                    borderRadius: "0.75rem",
                    fontSize: "0.95rem"
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>
                  <Lock size={16} className="me-2" />
                  Contraseña
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control input-focus-ring border-0 text-white py-3"
                    style={{ 
                      backgroundColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "0.95rem",
                      paddingRight: "3rem"
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute"
                    style={{ 
                      right: "0.5rem", 
                      top: "50%", 
                      transform: "translateY(-50%)",
                      color: "#94a3b8"
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="d-flex gap-1 mb-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className="password-strength-bar flex-grow-1"
                          style={{
                            height: "4px",
                            borderRadius: "2px",
                            backgroundColor: passwordStrength.strength >= level ? passwordStrength.color : "#334155"
                          }}
                        />
                      ))}
                    </div>
                    <small style={{ color: passwordStrength.color, fontSize: "0.8rem" }}>
                      Seguridad: {passwordStrength.label}
                    </small>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>
                  <CheckCircle2 size={16} className="me-2" />
                  Confirmar contraseña
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control input-focus-ring border-0 text-white py-3"
                    style={{ 
                      backgroundColor: "#334155",
                      borderRadius: "0.75rem",
                      fontSize: "0.95rem",
                      paddingRight: "3rem"
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="btn btn-link position-absolute"
                    style={{ 
                      right: "0.5rem", 
                      top: "50%", 
                      transform: "translateY(-50%)",
                      color: "#94a3b8"
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword.length > 0 && (
                  <small 
                    className="d-flex align-items-center mt-2"
                    style={{ 
                      color: password === confirmPassword ? "#10b981" : "#ef4444",
                      fontSize: "0.8rem"
                    }}
                  >
                    {password === confirmPassword ? (
                      <>
                        <CheckCircle2 size={14} className="me-1" />
                        Las contraseñas coinciden
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} className="me-1" />
                        Las contraseñas no coinciden
                      </>
                    )}
                  </small>
                )}
              </div>

              {error && (
                <div 
                  className="alert d-flex align-items-center py-3 mb-3" 
                  style={{ 
                    backgroundColor: "rgba(239, 68, 68, 0.15)", 
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "0.75rem",
                    color: "#fca5a5"
                  }}
                >
                  <AlertCircle size={18} className="me-2 flex-shrink-0" />
                  <span style={{ fontSize: "0.9rem" }}>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-success w-100 py-3 fw-semibold btn-hover-lift mb-3"
                style={{ 
                  borderRadius: "0.75rem",
                  fontSize: "1rem"
                }}
              >
                {isLoading ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creando cuenta...
                  </span>
                ) : (
                  "Crear cuenta gratis"
                )}
              </button>

              <div className="d-flex align-items-center my-4">
                <hr className="flex-grow-1" style={{ borderColor: "#475569", opacity: 0.5 }} />
                <span className="mx-3" style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>o regístrate con</span>
                <hr className="flex-grow-1" style={{ borderColor: "#475569", opacity: 0.5 }} />
              </div>

              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={isLoading}
                className="btn w-100 py-3 fw-semibold d-flex align-items-center justify-content-center btn-hover-lift"
                style={{
                  backgroundColor: "#334155",
                  color: "white",
                  border: "1px solid #475569",
                  borderRadius: "0.75rem"
                }}
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

              <p className="text-center mt-3 mb-4" style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>
                Al registrarte, aceptas nuestros{" "}
                <Link to="#" className="text-success text-decoration-none">Términos</Link>
                {" "}y{" "}
                <Link to="#" className="text-success text-decoration-none">Política de Privacidad</Link>
              </p>

              <hr style={{ borderColor: "#475569", opacity: 0.3, margin: "2rem 0" }} />

              <p className="text-center mb-0" style={{ fontSize: "0.95rem" }}>
                <span style={{ color: "#e2e8f0" }}>¿Ya tienes una cuenta?</span>{" "}
                <Link
                  to="/login"
                  className="text-success fw-semibold text-decoration-none"
                >
                  Inicia sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
