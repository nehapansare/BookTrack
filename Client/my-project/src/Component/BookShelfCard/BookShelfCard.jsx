import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ _id, title, author, cover, year, language, rating, genres }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-60 transform transition duration-300 hover:scale-105">
      <img src={cover} alt={title} className="w-full h-72 object-contain rounded-md" />
      <div className="mt-3 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600"><strong>Author:</strong> {author}</p>
        <p className="text-sm text-gray-600"><strong>Year:</strong> {year}</p>
        <p className="text-sm text-gray-600"><strong>Language:</strong> {language}</p>
        <p className="text-sm text-gray-600"><strong>Genres:</strong> {genres}</p>
        <p className="text-sm text-yellow-500 font-bold">⭐ {rating}</p>

        {/* Link to book details page */}
        <div className="mt-3 flex justify-center">
          <Link to={`/book/${_id}`} state={{ title, author, cover, year, language, rating, genres }}>
            <button className="bg-[#A7F1A8] text-black font-semibold px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300">
              Borrow
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
