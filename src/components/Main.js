import React from 'react';
import './Main.css';
import About from './About.js';
import Footer from './Footer.js';
import Header from './Header.js';
import NewsCardList from './NewsCardList.js';
import SearchForm from './SearchForm.js';

function Main() {
  const defaultNews = [
    {
      _id: 1,
      title: 'Национальное достояние – парки',
      date: '2 августа, 2019',
      text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складыв...',
      source: 'Лента.ру',
      image: 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1477469639_vodnaya_dlad.jpg',
      link: 'https://yandex.ru',
    },
    {
      _id: 2,
      title: 'Лесные огоньки: история одной фотографии',
      date: '2 августа, 2019',
      text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складыв...',
      source: 'Медуза',
      image: 'https://i.artfile.ru/1920x1080_811362_[www.ArtFile.ru].jpg',
      link: 'https://yandex.ru',
    },
    {
      _id: 3,
      title: 'Национальное достояние – парки',
      date: '2 августа, 2019',
      text: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складыв...',
      source: 'Медиазона',
      image: 'https://im0-tub-ru.yandex.net/i?id=bef4d4940ffc3779fe7e84b76c44685b&ref=rim&n=33&w=286&h=188',
      link: 'https://yandex.ru',
    },
  ];

  function showMore() {  
  };

  return (
    <div className="main">
      <Header
        loggedIn={false}
        isMain={true}
        isLight={true}
      />
      <SearchForm />
      <NewsCardList
        title="Результаты поиска"
        news = {defaultNews}
        onShowMore={showMore}
      />
      <About />
      <Footer />
    </div>
  );
}

export default Main;