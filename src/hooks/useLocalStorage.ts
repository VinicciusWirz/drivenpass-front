export default function useLocalStorage(key: string, value?: any) {
  const readLocal = localStorage.getItem(key);
  if (key && value) {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }
  if (readLocal) {
    return JSON.parse(readLocal);
  } else {
    return null;
  }
}
