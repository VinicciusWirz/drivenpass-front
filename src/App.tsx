import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "styled-components";
import { AuthProvider } from "./contexts/auth.context";
import { CredentialsPage } from "./pages/CredentialsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  return (
    <PageStyle>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/credentials" element={<CredentialsPage/>} />
            <Route path="/" element={<></>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer position="top-left" />
    </PageStyle>
  );
}

const PageStyle = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
