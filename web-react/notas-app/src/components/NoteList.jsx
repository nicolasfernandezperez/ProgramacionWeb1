
import Note from "./Note";
import "../styles/List.css";

function NoteList({ tasks, deleteTask }) {
  return (
    <div className="notas">
      {tasks.map((task, index) => (
        <Note
          key={task.id}
          id={index}
          titulo={task.titulo}
          contenido={task.contenido}
          deleteTask={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
}


export default NoteList;