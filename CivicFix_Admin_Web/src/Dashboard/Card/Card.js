import React from 'react';
import './Card.css';

function Card({ title, count, iconn }) {
  return (
    <div className="card">
      <div className="icon">{iconn}</div>
      <p className="title">{title}</p>
      <p className="count">{count}</p>
    </div>
  );
}

export default Card;
