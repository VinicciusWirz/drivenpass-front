import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import AuthContext from "../contexts/auth.context";
import useSignIn from "../hooks/api/useSignIn";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthDataType } from "../types";

export default function LoginPage() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const { setAuthData, authData } = useContext<AuthDataType | any>(AuthContext);
  const navigate = useNavigate();
  const { signInLoading, signIn } = useSignIn();

  useEffect(() => {
    if (authData) {
      navigate("/");
    }
  }, [authData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = form;
    if (email === "" || password === "") {
      toast.error("Preencha os campos.");
      return;
    }

    try {
      const data = await signIn(email, password);
      toast("Login realizado com sucesso!");
      await useLocalStorage("auth", data);
      setAuthData(data);
    } catch (error: AxiosError | any) {
      if (typeof error.response.data.message === typeof []) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <ContainerStyle>
      <h1>DrivenPass</h1>
      <FormStyle onSubmit={handleSubmit}>
        <label>
          Usuário (e-mail)
          <input
            placeholder="digite seu e-mail"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={signInLoading}
          />
        </label>
        <label>
          Senha
          <input
            placeholder="digite sua senha"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            disabled={signInLoading}
          />
        </label>
        <button type="submit" disabled={signInLoading}>
          Acessar
        </button>
        <Link to="/signup">Ainda não tem uma conta?</Link>
      </FormStyle>
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  label {
    display: flex;
    gap: 5px;
    flex-direction: column;
    align-items: center;
  }
`;
