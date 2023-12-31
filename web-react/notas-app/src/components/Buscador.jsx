import { useRef } from 'react';

function Search({onSearch}) {
  let inputRef = useRef(null);

  const handleSearch = () => {
    let searchTerm = inputRef.current.value;
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

export default Search;