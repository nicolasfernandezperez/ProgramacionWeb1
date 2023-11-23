import Logo from './components/Logo';
import NoteList from './components/NoteList';

import './App.css';

function App() {
  return (
    <div className="App">
      <Logo/>
      <div className="todo-list">
        <h1>Mis Notas</h1>
        
        <NoteList />
      </div>
    </div>
  );
}

export default App;