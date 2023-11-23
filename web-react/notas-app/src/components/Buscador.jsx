import { useState } from 'react';

function Search(props) {

    const [search, setSearch] = useState('');

    const handleChange = (event) => {
      setSearch(event.target.value);
    }
  
    const handleSend = (event) => {
      //Para que no se vuelva a cargar la página al enviar el formulario
      event.preventDefault();  
      
      
      //Se lo pasaremos al componente padre ListToDo cuando se envía, tenemos que pasar onSumbit(nombre estándar) como prop desde ListToDo.
      props.onSubmit(search);
    };
  
    return (
      <form 
        className='form-todo'
        onSubmit={handleSend}>
        <input
          className='input-search'
          type='search'
          name="search"
          onChange={handleChange}
        />
        <button className='button-search'>
          Buscar Nota
        </button>
      </form>
    );
  }
  
  export default Search;