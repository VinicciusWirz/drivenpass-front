import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import Header from "../components/Header";
import AuthContext from "../contexts/auth.context";
import useUserCount from "../hooks/api/useUserInfo";
import { AuthDataType } from "../types";

export default function HomePage() {
  const { authData } = useContext<AuthDataType | any>(AuthContext);
  const [count, setCount] = useState({
    Credential: 0,
    Note: 0,
    Card: 0,
    Wifi: 0,
    License: 0,
  });

  const { userCount, userCountLoading, getUserCount } = useUserCount();

  useEffect(() => {
    if (authData) {
      getUserCount(authData.token.token);
    }
  }, [authData]);

  useEffect(() => {
    if (userCount) {
      setCount(userCount || null);
    }
  }, [userCountLoading]);

  return (
    <>
      {userCountLoading && (
        <LoadingModalStyle>
          <div>Loading...</div>
        </LoadingModalStyle>
      )}
      <ContainerStyle>
        <Header />

        <section>
          <ul>
            <li>
              <Link to="/credentials">
                Credenciais <button>{count.Credential}</button>
              </Link>
            </li>
            <li onClick={() => toast("ainda não implementado")}>
              Notas Seguras <button>0</button>
            </li>
            <li onClick={() => toast("ainda não implementado")}>
              Cartões <button>0</button>
            </li>
            <li onClick={() => toast("ainda não implementado")}>
              Senhas de Wi-fi <button>0</button>
            </li>
            <li onClick={() => toast("ainda não implementado")}>
              Licenças <button>0</button>
            </li>
          </ul>
        </section>
      </ContainerStyle>
    </>
  );
}

const LoadingModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #7c7c7c7b;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > section {
    width: 100%;
    display: flex;
    flex-direction: column;
    ul {
      padding-top: 15px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 16px;
      padding-right: 16px;
      li,
      a {
        text-decoration: none;
        color: black;
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        button {
          background: #005985;
          border: none;
          border-radius: 50%;
          width: 21px;
          height: 21px;
          color: white;
        }
      }
    }
  }
`;
