import React from 'react';
import Movie from './Movie';
import './App.css';
import Search from './components/search';



class App extends React.Component {

  state = {
    isLoading: true,
    movies: [],
    searchValue: "",
    page: 1
  };

  handlePrevClick = () => {
    this.setState(prevState => ({
      page: prevState.page - 1,
    }));
  };
  
  handleNextClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // this.handleSearch (); 
    // state 변경시 호출하는 life cycle function 이용할 것.
  };

  handleOnChange = e => {
    this.setState({ searchValue: e.target.value })
  }

  handleSearch = () => {
    console.log('handlePage:', this.state.page);
    this.getMovie(this.state.searchValue, this.state.page)
      .then(res => this.setState({ movies: res, isLoading: false }))
      .catch(err => console.log(err));
    console.log("this.state.searchValue", this.state.searchValue);
  };

  getMovie = async (searchInput, page) => {
    const response = await fetch(`/api/movies?query=${searchInput}&page=${page}`);
    const body = response.json();
    return body;
  };

  render() {
    console.log(this.state.page);
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        <div className='search-box'>
          <Search
            handleOnChange={this.handleOnChange}
            handleSearch={this.handleSearch}
            />
        </div>
        <button className="prev" onClick={this.handlePrevClick}>이전</button>
        <button className="next" onClick={this.handleNextClick}>다음</button>
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
