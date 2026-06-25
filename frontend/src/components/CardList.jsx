import { useState } from 'react';
import api from '../api';
import Card from './Card';

function CardList({ list, board, onRefresh }) {
  const [newCardTitle, setNewCardTitle] = useState('');
  const [adding, setAdding] = useState(false);

  const addCard = async () => {
    if (!newCardTitle.trim()) return;
    await api.post('/cards', { list_id: list.id, title: newCardTitle, position: list.cards?.length || 0 });
    setNewCardTitle('');
    setAdding(false);
    onRefresh();
  };

  const deleteList = async () => {
    await api.delete(`/lists/${list.id}`);
    onRefresh();
  };

  return (
    <div className="list">
      <div className="list-header">
        <h3>{list.name}</h3>
        <button className="del-btn" onClick={deleteList}>×</button>
      </div>
      <div className="list-cards">
        {list.cards?.map(card => (
          <Card key={card.id} card={card} board={board} lists={board.lists} onRefresh={onRefresh} />
        ))}
      </div>
      {adding ? (
        <div className="add-card-form">
          <input autoFocus value={newCardTitle} onChange={e => setNewCardTitle(e.target.value)}
            placeholder="Card title..." onKeyDown={e => e.key === 'Enter' && addCard()} />
          <div className="add-card-actions">
            <button onClick={addCard}>Add</button>
            <button onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-card-btn" onClick={() => setAdding(true)}>+ Add Card</button>
      )}
    </div>
  );
}

export default CardList;
