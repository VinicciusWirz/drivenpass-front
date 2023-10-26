import { styled } from "styled-components";

export default function ItemInformation({
  item,
  handleChangeModal,
  handleDelete,
}: {
  item: any;
  handleChangeModal: any;
  handleDelete: any;
}) {
  const { title, id, ...rest } = item;

  return (
    <ModalStyle>
      <TopicStyle>
        <h6>{title}</h6>
        {Object.keys(rest).map((i) => (
          <div key={i}>
            <p>{formatKey(i)}</p>
            <span>{rest[i]}</span>
          </div>
        ))}
      </TopicStyle>
      <FooterStyle>
        <BackBtn onClick={handleChangeModal}>◄</BackBtn>
        <DeleteBtn onClick={() => handleDelete(id)}>+</DeleteBtn>
      </FooterStyle>
    </ModalStyle>
  );
}

function formatKey(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

const ModalStyle = styled.div`
  height: 100%;
`;

const TopicStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
    span {
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

const DeleteBtn = styled.button`
  background: #f52424;
  color: white;

  transform: rotate(-45deg);
`;
