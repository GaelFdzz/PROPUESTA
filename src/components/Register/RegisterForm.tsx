import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [predefinedQuestions, setPredefinedQuestions] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [step, setStep] = useState(1); // Paso 1: Datos básicos, Paso 2: Preguntas de seguridad
  const [form, setForm] = useState({
    name: ''
  })

  const navigate = useNavigate();

  // Traer preguntas de seguridad predefinidas
  useEffect(() => {
    axios.get("http://localhost:3000/auth/predefined-questions")
      .then((response) => {
        setPredefinedQuestions(response.data);
      })
      .catch((error) => {
        setError("Error al cargar las preguntas de seguridad");
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (step === 1) {
        // Validar datos básicos
        if (!name || !email || !password) {
          setError("Por favor, completa todos los campos.");
          return;
        }

        setStep(2); // Cambiar al paso 2 para seleccionar preguntas de seguridad
      } else if (step === 2) {
        // Validar que se hayan seleccionado 3 preguntas y respuestas
        if (selectedQuestions.length !== 3 || answers.length !== 3) {
          setError("Por favor, selecciona y responde 3 preguntas de seguridad.");
          return;
        }

        // Registrar al usuario
        const response = await axios.post("http://localhost:3000/users/createUser", {
          name,
          email,
          password,
          securityAnswer: answers,
        });

        alert("Registro exitoso!");
        navigate("/login"); // Redirigir al login
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Error al registrar el usuario");
      console.error(error);
    }
  };

  const handleQuestionSelection = (questionId: number) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
    } else {
      if (selectedQuestions.length < 3) {
        setSelectedQuestions([...selectedQuestions, questionId]);
      } else {
        setError("Solo puedes seleccionar 3 preguntas.");
      }
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
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
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Registro
        </h2>
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Bienvenido! <p>{form.name}{''}</p> 
        </h3>
        {error && (
          <div className="mb-4 text-red-500 text-center font-medium">
            {error}
          </div>
        )}
        {step === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ingresa tu nombre"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setForm({...form, name: e.target.value});
                }}
              />
            </div>
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
              <p className="mr-2">¿Ya tienes una cuenta?</p> <Link className="font-bold text-blue-600" to={"/login"}>¡Inicia sesión!</Link>
            </span>
          </>
        )}

        {step === 2 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Selecciona y responde 3 preguntas de seguridad</h3>
            {predefinedQuestions.map((question) => (
              <div key={question.id} className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleQuestionSelection(question.id)}
                  />
                  {question.question}
                </label>
                {selectedQuestions.includes(question.id) && (
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Respuesta"
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    required
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-amber-300 text-black font-bold py-2 px-4 rounded-md shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-amber-300"
        >
          {step === 1 ? "Siguiente" : "Registrarse"}
        </button>
      </form>
    </div>
  );
}

export default Register;