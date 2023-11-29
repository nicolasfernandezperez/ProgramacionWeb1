import React, { useRef } from "react";
import '../styles/noteBuscador.css'; 

function NoteBuscador({ onSearch }) {
  const inputRef = useRef(null);

  const handleSearch = () => {
    const searchTerm = inputRef.current.value;
    console.log('Valor del input:', searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="notaSingle">
      <h1>Buscador de Notas</h1>
      <div className="buscador">
        <input
          type="text"
          ref={inputRef}
          onChange={handleSearch}
          placeholder="Buscar notas por título..."
        />
      </div>
    </div>
  );
}



export default NoteBuscador;
