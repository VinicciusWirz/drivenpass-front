import { styled } from "styled-components";

export default function CreationForm({
  setCreationForm,
  creationForm,
  handleSubmit,
  loading,
}: {
  setCreationForm: any;
  creationForm: any;
  handleSubmit: any;
  loading: boolean;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCreationForm({ ...creationForm, [e.target.name]: e.target.value });
  }

  return (
    <ModalStyle>
      <FormStyle onSubmit={handleSubmit}>
        <h6>Cadastro</h6>
        {Object.keys(creationForm).map((i) => (
          <label key={i}>
            {formatKey(i)}
            <input
              required
              disabled={loading}
              type={i}
              onChange={handleChange}
              name={i}
              value={creationForm[i]}
            />
          </label>
        ))}
        <AddBtn type="submit" disabled={loading}>
          ✓
        </AddBtn>
      </FormStyle>
      <FooterStyle>
        <BackBtn onClick={() => setCreationForm(null)}>◄</BackBtn>
        <AddBtn onClick={handleSubmit} disabled={loading}>
          ✓
        </AddBtn>
      </FooterStyle>
    </ModalStyle>
  );
}

function formatKey(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

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
  background: #55d872;
  color: white;
`;

const ModalStyle = styled.div`
  height: 100%;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 26px;
  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    input {
      padding: 5px;
    }
  }
  button {
    opacity: 0;
  }
`;
