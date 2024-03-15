import { useEffect, useState } from "react";
import { Input } from "./components/forms/Input.jsx";

function App() {
  return (
    <div className="container my-3">
      <EditTitle></EditTitle>
      <div style={{ height: "300vh" }}></div>
    </div>
  );
}

function EditTitle() {
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [y, setY] = useState("");

  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setY(window.scrollY);
    });
  });
  return (
    <div className="vstack gap-2">
      <div>Scroll: {y}</div>
      <Input
        placeholder="Modifier le titre"
        value={title}
        onChange={setTitle}
      ></Input>
      <Input
        placeholder="Prenom"
        value={firstname}
        onChange={setFirstname}
      ></Input>
    </div>
  );
}
export default App;
