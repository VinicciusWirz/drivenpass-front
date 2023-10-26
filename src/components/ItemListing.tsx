export default function ItemListing({
  title,
  id,
  setModal,
}: {
  title: string;
  id: number;
  setModal: React.Dispatch<React.SetStateAction<any>>;
}) {
  return <li onClick={() => setModal(id)}>{title}</li>;
}
