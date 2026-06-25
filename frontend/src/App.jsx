import { useState, useEffect } from 'react';
import api from './api';
import Board from './components/Board';
import './App.css';

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => { fetchBoards(); }, []);

  const fetchBoards = async () => {
    const res = await api.get('/boards');
    setBoards(res.data);
    if (res.data.length > 0 && !selectedBoard) setSelectedBoard(res.data[0]);
  };

  const createBoard = async () => {
    if (!newBoardName.trim()) return;
    const res = await api.post('/boards', { name: newBoardName });
    setBoards([...boards, res.data]);
    setSelectedBoard(res.data);
    setNewBoardName('');
  };

  const deleteBoard = async (id) => {
    await api.delete(`/boards/${id}`);
    const updated = boards.filter(b => b.id !== id);
    setBoards(updated);
    setSelectedBoard(updated[0] || null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗂 Kanban Board</h1>
        <div className="board-controls">
          <input value={newBoardName} onChange={e => setNewBoardName(e.target.value)}
            placeholder="New board name..." onKeyDown={e => e.key === 'Enter' && createBoard()} />
          <button onClick={createBoard}>+ Board</button>
        </div>
        <nav className="board-nav">
          {boards.map(b => (
            <span key={b.id} className={`board-tab ${selectedBoard?.id === b.id ? 'active' : ''}`}
              onClick={() => setSelectedBoard(b)}>
              {b.name}
              <button className="del-btn" onClick={e => { e.stopPropagation(); deleteBoard(b.id); }}>×</button>
            </span>
          ))}
        </nav>
      </header>
      <main>
        {selectedBoard
          ? <Board key={selectedBoard.id} board={selectedBoard} onRefresh={fetchBoards} />
          : <div className="empty">Create a board to get started!</div>}
      </main>
    </div>
  );
}

export default App;