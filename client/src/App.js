import React from 'react';
import Movie from './Movie';
import './App.css';
import Search from './components/search';



class App extends React.Component {

  state = {
    isLoading: true,
    movies: [],
    searchValue: "",
  };

  handleOnChange = e => {
    this.setState({ searchValue: e.target.value })
  }

  handleSearch = () => {
    this.getMovie(this.state.searchValue)
      .then(res => this.setState({ movies: res, isLoading: false }))
      .catch(err => console.log(err));
    console.log("this.state.searchValue", this.state.searchValue);
  };

  getMovie = async (searchInput) => {
    console.log("searchInput", searchInput);
    const response = await fetch(`/api/movies?query=${searchInput}`);
    const body = response.json();
    console.log("body", body);
    return body;
  };

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        <div className='search-box'>
          <Search
            handleOnChange={this.handleOnChange}
            handleSearch={this.handleSearch}
          />
        </div>
        {isLoading ? (
          <div className="loader">
            <span className="Loader_text">영화를 검색하세용</span>
          </div>
        ) : (
            <div>
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
            </div>
          )}
      </section>
    );
  }
}

export default App;
