import Logo from './components/Logo';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import Buscador from './components/Buscador'
import { useState } from 'react';
import './App.css';

function App() {
  const [palabra, setPalabra] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const searchNote = (text) => {
    setPalabra(text);
  }

  const filtrada = tasks.filter((note) =>
    note.titulo.toLowerCase().startsWith(palabra.toLowerCase()));

    return (
      <div className="App">
        <div className='Logo'><Logo></Logo></div>
        <div className='EditorListaContainer'>
          <div className='Editor'>
            <NoteEditor addTask={addTask} />
          </div>
          <div className='Buscador'>
          <Buscador onSearch={searchNote}/>
        </div>
          <div className='listaNotas'>
            <NoteList tasks={filtrada} deleteTask={deleteTask}/>
          </div>
        </div>
      </div>
    );
}

export default App;