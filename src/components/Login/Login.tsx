import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [securityQuestions, setSecurityQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<any[]>([]);
    const [step, setStep] = useState(1); // Paso 1: Validar email y contraseña, Paso 2: Mostrar preguntas
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (step === 1) {
                // Primer paso: validar email y contraseña
                const response = await axios.post("http://localhost:3000/auth/login", {
                    email,
                    password,
                });

                const { securityQuestions } = response.data;
                setSecurityQuestions(securityQuestions); // Guarda las preguntas
                setStep(2); // Cambiamos al paso 2 para mostrar preguntas de seguridad
            } else if (step === 2) {
                // Validar que todas las respuestas estén completas
                const allAnswersProvided = securityQuestions.every((question) => {
                    const answer = answers.find((a) => a.questionId === question.questionId);
                    return answer && answer.answer.trim() !== "";
                });

                if (!allAnswersProvided) {
                    setError("Por favor, responde todas las preguntas de seguridad.");
                    return;
                }

                // En el segundo paso, validamos las respuestas de seguridad
                const response = await axios.post("http://localhost:3000/auth/validate-security", {
                    email,
                    securityAnswers: answers,
                });

                const { token } = response.data;
                localStorage.setItem("token", token); // Guarda el token
                alert("Login exitoso!");
                navigate("/"); // Redirige al dashboard
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Error al iniciar sesión");
            console.error(error);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
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
                            <p className="mr-2">¿No tienes una cuenta?</p> <Link className="font-bold text-blue-600" to={"/register"}>¡Registrate!</Link>
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
                    className="w-full bg-amber-300 text-black font-bold py-2 px-4 rounded-md shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-amber-300"
                >
                    {step === 1 ? "Iniciar Sesión" : "Validar Respuestas"}
                </button>
            </form>
        </div>
    );
}

export default Login;