import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import CreationForm from "../components/CreationForm";
import Header from "../components/Header";
import ItemInformation from "../components/ItemInformation";
import ItemListing from "../components/ItemListing";
import AuthContext from "../contexts/auth.context";
import useCredentials from "../hooks/api/useCredentials";
import useCredentialsCreate from "../hooks/api/useCredentialsCreate";
import useCredentialsRemove from "../hooks/api/useCredentialsRemove";
import { AuthDataType, Credential } from "../types";

export function CredentialsPage() {
  const { authData } = useContext<AuthDataType | any>(AuthContext);
  const token: string = authData?.token?.token;
  const navigate = useNavigate();
  const { credentials, credentialsLoading, getCredentials } = useCredentials();
  const [creationForm, setCreationForm] = useState<Credential | null>(null);
  const { postCredentialsCreate, credentialsCreateLoading } =
    useCredentialsCreate();

  const { deleteCredentialsRemove, credentialsRemoveLoading } =
    useCredentialsRemove();
  const [credentialsList, setCredentialsList] = useState<
    {
      id: number;
      title: string;
      url: string;
      username: string;
      password: string;
    }[]
  >([]);
  const [credentialModalInfo, setCredentialModalInfo] = useState<{
    id: number;
    title: string;
    url: string;
    username: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    if (authData) {
      getCredentials(authData.token.token);
    }
  }, [authData]);

  useEffect(() => {
    if (!credentialsLoading) {
      setCredentialsList(credentials);
    }
  }, [credentialsLoading]);

  function handleChangeModal(id?: number) {
    const object = credentialsList.find((c) => c.id === id);
    if (!id || !object) {
      setCredentialModalInfo(null);
    }
    setCredentialModalInfo(
      object as {
        id: number;
        title: string;
        url: string;
        username: string;
        password: string;
      }
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (creationForm) {
      try {
        const response = await postCredentialsCreate(token, creationForm);
        setCredentialsList([
          ...credentialsList,
          { id: response.id, ...creationForm },
        ]);
        setCreationForm(null);
        toast("Credencial criada.");
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.response?.status);
      }
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCredentialsRemove(token, id);
      toast("Credencial deletada.");
      const filteredArray = credentialsList.filter((c) => c.id !== id);
      setCredentialsList(filteredArray);
      handleChangeModal();
      setCreationForm(null);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  }

  const modalsOn = creationForm || credentialModalInfo;

  const loading =
    credentialsRemoveLoading || credentialsLoading || credentialsCreateLoading;

  return (
    <>
      {loading && (
        <LoadingModalStyle>
          <div>Loading...</div>
        </LoadingModalStyle>
      )}

      <ContainerStyle>
        <Header />
        <section>
          <ul>
            {!credentialsLoading && !modalsOn
              ? credentialsList?.map(({ id, title }) => (
                  <ItemListing
                    id={id}
                    key={id}
                    title={title}
                    setModal={handleChangeModal}
                  />
                ))
              : ""}
            {credentialModalInfo && (
              <ItemInformation
                item={credentialModalInfo}
                handleChangeModal={handleChangeModal}
                handleDelete={handleDelete}
              />
            )}
            {creationForm && (
              <CreationForm
                setCreationForm={setCreationForm}
                creationForm={creationForm}
                handleSubmit={handleSubmit}
                loading={credentialsCreateLoading}
              />
            )}
          </ul>
        </section>
        {!credentialsLoading && !modalsOn ? (
          <FooterStyle>
            <BackBtn onClick={() => navigate(-1)}>◄</BackBtn>
            <AddBtn
              onClick={() =>
                setCreationForm({
                  title: "",
                  password: "",
                  url: "",
                  username: "",
                })
              }
            >
              +
            </AddBtn>
          </FooterStyle>
        ) : (
          ""
        )}
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

const FooterStyle = styled.footer`
  width: 100vw;
  position: fixed;
  padding: 20px;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 50px;
    height: 50px;
    font-size: 30px;
    font-weight: 700;
    line-height: 24px;
    border-radius: 50%;
    border: none;
    text-align: center;
  }
`;

const BackBtn = styled.button`
  background: #e0e0e0;
`;

const AddBtn = styled.button`
  background: #005985;
  color: white;
`;
