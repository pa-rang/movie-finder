import React from 'react';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  componentDidMount() {
    this.getMovie()
      .then(res => this.setState({movies: res, isLoading: false}))
      .catch(err => console.log(err));
  }

  getMovie = async () => {
    const response = await fetch('/api/movies');
    const body = await response.json();
    console.log('body', body);
    return body;
  }

  render() {
    const { isLoading, movies } = this.state;
    return(
      <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="Loader_text">Loading...</span>
        </div>
      ) : (
        <div className='movies'>
          <h1>Movie Search Result</h1>
          {movies.items.map((movie, index) => (
            <Movie
              key={index}
              id={index}
              title={movie.title}
              image={movie.image}
              pubDate={movie.pubDate}
              director={movie.diretor}
              actor={movie.actor}
              userRating={movie.userRating}
            />
          ))}
        </div>
      )}
    </section>
    );
  }
}

export default App;
