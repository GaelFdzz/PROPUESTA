import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [securityQuestions, setSecurityQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<any[]>([]);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false); // Estado para el spinner
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Activar spinner

        try {
            if (step === 1) {
                const response = await axios.post("http://localhost:3000/auth/login", {
                    email,
                    password,
                });

                setSecurityQuestions(response.data.securityQuestions);
                setStep(2);
            } else if (step === 2) {
                const allAnswersProvided = securityQuestions.every((question) => {
                    const answer = answers.find((a) => a.questionId === question.questionId);
                    return answer && answer.answer.trim() !== "";
                });

                if (!allAnswersProvided) {
                    setError("Por favor, responde todas las preguntas de seguridad.");
                    setLoading(false);
                    return;
                }

                const response = await axios.post("http://localhost:3000/auth/validate-security", {
                    email,
                    securityAnswers: answers,
                });

                localStorage.setItem("token", response.data.token);
                alert("Login exitoso!");
                navigate("/");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Error al iniciar sesión");
        } finally {
            setLoading(false); // Desactivar spinner
        }
    };

    const handleSecurityAnswerChange = (questionId: number, answer: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            const index = updatedAnswers.findIndex((a) => a.questionId === questionId);
            if (index !== -1) {
                updatedAnswers[index].answer = answer;
            } else {
                updatedAnswers.push({ questionId, answer });
            }
            return updatedAnswers;
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 selection:bg-amber-300/50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Iniciar Sesión
                </h2>
                {error && (
                    <div className="mb-4 text-red-500 text-center font-medium">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingresa tu correo electrónico"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <span className="flex mb-3">
                            <p className="mr-2">¿No tienes una cuenta?</p>
                            <Link className="font-bold text-blue-600" to={"/register"}>
                                ¡Regístrate!
                            </Link>
                        </span>
                    </>
                )}

                {step === 2 && securityQuestions.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Responde las preguntas de seguridad</h3>
                        {securityQuestions.map((question) => (
                            <div key={question.questionId} className="mb-4">
                                <label className="block text-sm text-gray-600">{question.question}</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) =>
                                        handleSecurityAnswerChange(question.questionId, e.target.value)
                                    }
                                    required
                                />
                            </div>
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-amber-300 text-black font-bold py-2 px-4 rounded-md shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-amber-300 disabled:opacity-50 flex justify-center items-center"
                    disabled={loading} // Deshabilita el botón si está cargando
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                            ></path>
                        </svg>
                    ) : (
                        step === 1 ? "Iniciar Sesión" : "Validar Respuestas"
                    )}
                </button>
            </form>
        </div>
    );
}

export default Login;
