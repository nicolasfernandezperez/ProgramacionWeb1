import { useState } from 'react';
import NoteEditor from "./NoteEditor";
import Note from "./Note";
import Buscador from "./Buscador";
import "../styles/List.css";

function ListToDo() {

  const [tasks, setTasks] = useState([]);
  const palabra = "";

  const addTask = (task) => {
    //trim() quita los espacios del principio y final, y verifica que no esté vacía.
    if (task.title.trim()) {
      task.title = task.title.trim();
      //Concatena la tarea nueva a las ya existentes al principio, con "..." lo pasamos de array a objetos individuales, por eso lo concatena. Al final sería [...tasks, task]
      const updatedTasks = [task, ...tasks];
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const searchNote = (search) =>{
    palabra = search;
  } 

  return (
    <>
      <Buscador onSubmit={searchNote}/>
      <NoteEditor onSubmit={addTask} />
      <div className='list-todo-container'>
        {
          tasks.map((task) => 

            <Note
              key={task.id}
              id={task.id}
              title={task.title}
              note={task.note}
              completed={task.completed}
              deleteToDo={deleteTask}
              completeToDo={completeTask}
            />
          )
        }
      </div>
    </>
  );
}

export default ListToDo;