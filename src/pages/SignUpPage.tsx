import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import useSignUp from "../hooks/api/useSignUp";
import useToken from "../hooks/useToken";

export default function SignUpPage() {
  const [form, setForm] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const token = useToken();

  const navigate = useNavigate();

  const { signUpLoading, signUp } = useSignUp();

  if (token) navigate("/");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password, confirmPassword } = form;
    if (email === "" || password === "" || confirmPassword === "") {
      toast.error("Preencha os campos.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Senhas não são iguais.");
      return;
    }
    try {
      await signUp(email, password);
      navigate("/login")
      toast('Usuário registrado com sucesso!');
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
            disabled={signUpLoading}
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
            disabled={signUpLoading}
          />
        </label>
        <label>
          Confirme sua senha
          <input
            placeholder="Confirme sua senha"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={signUpLoading}
          />
        </label>
        <button type="submit" disabled={signUpLoading}>
          Registrar
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          disabled={signUpLoading}
        >
          {"< Voltar"}
        </button>
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
