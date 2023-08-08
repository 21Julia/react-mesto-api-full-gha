import React from 'react';

function Spinner() {
  return (
    <div className="loading">
      <p className="loading__container">Загрузка...<span className="loading__span"></span></p>
    </div>
  );
};

export default Spinner;
