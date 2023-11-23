import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Form.css';

function FormToDo(props) {

  const [input, setInput] = useState('');
  const [note, setNote] = useState('');

  const handleChangeNote = (event) => {
    setNote(event.target.value);
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleSend = (event) => {
    //Para que no se vuelva a cargar la página al enviar el formulario
    event.preventDefault(); 

    //Creamos un nuevo objeto 
    const newTask = {
      id: uuidv4(),
      title: input,
      note: note,
      completed: false
    }

    //Se lo pasaremos al componente padre ListToDo cuando se envía, tenemos que pasar onSumbit(nombre estándar) como prop desde ListToDo.
    props.onSubmit(newTask);
  };

  return (
    <form 
      className='form-todo'
      onSubmit={handleSend}>
      <input
        className='input-todo'
        type='title'
        name="title"
        onChange={handleChange}
      />
      <input
        className='input-todo'
        type='note'
        name="note"
        onChange={handleChangeNote}
      />
      <button className='button-todo'>
        Añadir Nota
      </button>
    </form>
  );
}

export default FormToDo;