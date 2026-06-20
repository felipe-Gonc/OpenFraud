import { useState } from "react";
import InputPerso from "../components/InputPerso";
import logo from "../assets/Design sem nome (2)-remove-bg-io.png";
import api from "../services/api";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const navigate = useNavigate();

const handLogin = async () => {
  try {
    if (!email || !password) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }

    await api.post("/api/auth/login", {
      email,
      password,
    });

    navigate("/");
  } catch (error) {
    toast.error("Email ou senha inválidos");
  }
};

  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center">
      <div className="border-2 border-gray-200 bg-zinc-100 flex rounded-2xl w-full max-w-4xl h-150 shadow-2xl">
        <div className="hidden md:flex flex-1">
          <div className="flex w-full h-full flex-col items-center">
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src={logo}
                className="w-52 drop-shadow-lg hover:scale-105 transition duration-300"
              />
              <h2 className="bebas-neue-regular text-6xl -mt-4">OpenFraud</h2>

              <p className="montserrat text-sm text-gray-500 mt-2">
                Se está estranho, a gente estranha junto.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-2xl bg-white shadow-md">
          <div className="p-5 flex flex-col w-full h-full">
            <div>
              <h1 className="bebas-neue-regular text-6xl">Login</h1>
              <p className="montserrat text-xl text-gray-400">
                Bem vindo de volta
              </p>
            </div>

            <div className="flex flex-col justify-center h-full">
              <div className="">
                <InputPerso
                  input="E-mail"
                  placeHolder="Digite seu email"
                  value={email as string}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
                <InputPerso
                  input="Senha"
                  placeHolder="Digite sua senha"
                  value={password as string}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />{" "}
                <button
                  className="oswald py-3 border-2 bg-black text-xl mt-5 cursor-pointer text-white w-full rounded-xl hover:bg-white hover:text-black hover:border-black transition-all duration-300 active:scale-95"
                  onClick={() => handLogin()}
                >
                  ENTRAR
                </button>
                <p className="montserrat text-center mt-3 text-gray-500">
                  Não possui conta?{" "}
                  <a
                    href="/signin"
                    className="font-semibold text-black hover:underline"
                  >
                    Cadastre-se
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
