import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import AuthContext from "../contexts/auth.context";
import { AuthDataType } from "../types";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.split("/")[1];

  const { authData } = useContext<AuthDataType | any>(AuthContext);
  useEffect(() => {
    if (!authData) {
      navigate("/login");
    }
  }, [authData]);

  type PageLocationKeys = "credentials";

  const pageLocation: Record<PageLocationKeys, string> = {
    credentials: "credenciais",
  };

  const pageName: string =
    page === "credentials" ? pageLocation[page] : "senhas";

  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <HeaderStyle>
        <Link to="/">DrivenPass</Link>
        <div onClick={logout}>Logout</div>
      </HeaderStyle>
      <PageTitleStyle>
        <h3>Minhas {pageName}</h3>
      </PageTitleStyle>
    </>
  );
}

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  height: 25px;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px 15px;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: black;
  }
  div {
    cursor: pointer;
  }
`;

const PageTitleStyle = styled.div`
  padding-top: 25px;
  h3 {
    background: #005985;
    padding: 10px 16px;
    width: 100%;
    color: white;
  }
`;
