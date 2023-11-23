import '../styles/Todo.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function ToDo({ id, title, note, completed, completeToDo, deleteToDo }) { 

  return (
    <div className={completed ? "todo-container completed" : "todo-container"}>
      <div 
        className="todo-title"
        onClick={() => completeToDo(id)}>
        {title}
      </div>
      <div 
        className="todo-note"
        onClick={() => completeToDo(id)}> 
        {note}
      </div>
      <div 
        className="todo-icon-container"
        onClick={() => deleteToDo(id)}>
        <AiOutlineCloseCircle className="todo-icon" />
      </div>
    </div>
  )
}

export default ToDo
