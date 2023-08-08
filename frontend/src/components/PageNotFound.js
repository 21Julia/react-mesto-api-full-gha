import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <h3 className="not-found__subtitle">Страница не найдена</h3>
      <p className="not-found__text">Ой, здесь ничего нет!</p>
      <Link className="not-found__button button" to="/">Назад</Link>
    </div>
  );
};

export default PageNotFound;
