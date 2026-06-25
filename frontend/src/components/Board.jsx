import { useState, useEffect } from 'react';
import api from '../api';
import CardList from './CardList';

function Board({ board, onRefresh }) {
  const [boardData, setBoardData] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3498db');

  useEffect(() => { fetchBoard(); }, [board.id]);

  const fetchBoard = async () => {
    const res = await api.get(`/boards/${board.id}`);
    setBoardData(res.data);
  };

  const addList = async () => {
    if (!newListName.trim()) return;
    await api.post('/lists', { board_id: board.id, name: newListName, position: boardData?.lists?.length || 0 });
    setNewListName('');
    fetchBoard();
  };

  const addMember = async () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    await api.post('/members', { board_id: board.id, name: newMemberName, email: newMemberEmail });
    setNewMemberName(''); setNewMemberEmail('');
    fetchBoard();
  };

  const addTag = async () => {
    if (!newTagName.trim()) return;
    await api.post('/tags', { board_id: board.id, name: newTagName, color: newTagColor });
    setNewTagName('');
    fetchBoard();
  };

  if (!boardData) return <div>Loading...</div>;

  return (
    <div className="board">
      <div className="board-sidebar">
        <div className="sidebar-section">
          <h3>Members</h3>
          {boardData.members?.map(m => (
            <div key={m.id} className="member-chip">{m.name}</div>
          ))}
          <input placeholder="Name" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} />
          <input placeholder="Email" value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} />
          <button onClick={addMember}>+ Member</button>
        </div>
        <div className="sidebar-section">
          <h3>Tags</h3>
          {boardData.tags?.map(t => (
            <span key={t.id} className="tag-chip" style={{ background: t.color }}>{t.name}</span>
          ))}
          <input placeholder="Tag name" value={newTagName} onChange={e => setNewTagName(e.target.value)} />
          <input type="color" value={newTagColor} onChange={e => setNewTagColor(e.target.value)} />
          <button onClick={addTag}>+ Tag</button>
        </div>
      </div>
      <div className="board-lists">
        {boardData.lists?.map(list => (
          <CardList key={list.id} list={list} board={boardData} onRefresh={fetchBoard} />
        ))}
        <div className="add-list">
          <input value={newListName} onChange={e => setNewListName(e.target.value)}
            placeholder="New list name..." onKeyDown={e => e.key === 'Enter' && addList()} />
          <button onClick={addList}>+ Add List</button>
        </div>
      </div>
    </div>
  );
}

export default Board;