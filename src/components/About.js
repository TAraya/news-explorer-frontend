import React from 'react';
import './About.css';
import photo from '../images/alex_photo.jpg';

function About() {
  return (
    <section className="about">
      <img className="about__photo" src={photo} alt="Фото автора"/>
      <div className="about__info">
        <h2 className="about__header">Об авторе</h2>
        <p className="about__description">
          Привет! Меня зовут Александр, я студент факультета веб-разработки Яндекс.Практикума.
        </p>
        <p className="about__description">
          В процессе обучения были получены навыки адаптивной верстки, современной Frontend разработки и основы Backend разработки.
          Ключевые технологии: HTML, CSS, JavaScript, Node.js, React.js, Express.js, NoSQL.
        </p>
      </div>
    </section>
  );
}

export default About;