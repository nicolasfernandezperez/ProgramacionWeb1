import '../styles/Todo.css';

function Note({ id, titulo, contenido, deleteTask }) { 

  return (
    <div className='notaSingle'>
      <h2>Nota {id}</h2>  
      {titulo} <br />
      {contenido}
      <div>
        <button onClick={deleteTask}>Borrar</button>
      </div>
    </div>
  )
}

export default Note
