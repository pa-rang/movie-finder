import React from 'react';

function Movie({ title, image, pubDate, director, actor, userRating }) {
    return(
        <div className="movie">
            <div className="movie_poster">
                <img src={image} alt={title} title={title} />
            </div>
            <div className="movie_data">
                <h3 className="movie_title">{title}</h3>
                <h5 className="movie_director">{director}</h5>
                <div className="movie_date">{pubDate}</div>
                <p className="movie_actor">{actor}</p>
                <div className="movie_userRating">{userRating}</div>
            </div>
        </div>
    );
}

export default Movie;