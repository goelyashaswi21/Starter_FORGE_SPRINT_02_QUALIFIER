import { useState } from 'react';
import api from '../api';

function Card({ card, board, lists, onRefresh }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.due_date || '');
  const [selectedTags, setSelectedTags] = useState(card.tags?.map(t => t.id) || []);
  const [selectedMembers, setSelectedMembers] = useState(card.members?.map(m => m.id) || []);

  const isOverdue = dueDate && new Date(dueDate) < new Date();

  const saveCard = async () => {
    await api.put(`/cards/${card.id}`, {
      title, description, due_date: dueDate || null,
      tag_ids: selectedTags, member_ids: selectedMembers
    });
    setExpanded(false);
    onRefresh();
  };

  const moveCard = async (newListId) => {
    await api.put(`/cards/${card.id}`, { list_id: newListId });
    onRefresh();
  };

  const deleteCard = async () => {
    await api.delete(`/cards/${card.id}`);
    onRefresh();
  };

  const toggleTag = (id) => setSelectedTags(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  const toggleMember = (id) => setSelectedMembers(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  return (
    <div className={`card ${isOverdue ? 'overdue' : ''}`}>
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <span>{card.title}</span>
        <button className="del-btn" onClick={e => { e.stopPropagation(); deleteCard(); }}>×</button>
      </div>
      <div className="card-chips">
        {card.tags?.map(t => <span key={t.id} className="tag-chip" style={{ background: t.color }}>{t.name}</span>)}
        {card.members?.map(m => <span key={m.id} className="member-chip">{m.name}</span>)}
        {dueDate && <span className={`due-chip ${isOverdue ? 'overdue' : ''}`}>📅 {dueDate}</span>}
      </div>
      {expanded && (
        <div className="card-detail" onClick={e => e.stopPropagation()}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={3} />
          <label>Due Date: <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></label>
          <div className="detail-section">
            <strong>Move to:</strong>
            {lists?.filter(l => l.id !== card.list_id).map(l => (
              <button key={l.id} className="move-btn" onClick={() => moveCard(l.id)}>{l.name}</button>
            ))}
          </div>
          <div className="detail-section">
            <strong>Tags:</strong>
            {board.tags?.map(t => (
              <label key={t.id}>
                <input type="checkbox" checked={selectedTags.includes(t.id)} onChange={() => toggleTag(t.id)} />
                <span className="tag-chip" style={{ background: t.color }}>{t.name}</span>
              </label>
            ))}
          </div>
          <div className="detail-section">
            <strong>Members:</strong>
            {board.members?.map(m => (
              <label key={m.id}>
                <input type="checkbox" checked={selectedMembers.includes(m.id)} onChange={() => toggleMember(m.id)} />
                {m.name}
              </label>
            ))}
          </div>
          <div className="card-actions">
            <button onClick={saveCard}>Save</button>
            <button onClick={() => setExpanded(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;