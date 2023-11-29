import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Form.css';

function NoteEditor ( {addTask} ) {

  const [titulo, setTitulo]= useState('')
  const [contenido, setContenido] = useState('')

  const handleSend = () => {
    //Creamos un nuevo objeto 
    const newTask = {
      id: uuidv4(),
      titulo: titulo,
      contenido: contenido,
    };

    addTask(newTask);
    setTitulo('');
    setContenido('');
    
  };

  const agregar = () =>{
    handleSend()
  }

  return (
    <div
      onSubmit={handleSend}>
      <input
        className='input-todo'
        type='titulo'
        placeholder="Titulo"
        name="titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        className='input-todo'
        type='contenido'
        placeholder="Contenido"
        name="contenido"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />
      <button className='button-todo' onClick={agregar}>
        Añadir Nota
      </button>
    </div>
  );
}

export default NoteEditor;