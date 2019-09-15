import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import { getGenres } from "../fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "genre.name", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "12" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const deletedMovie = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: deletedMovie });
  };

  handleLike = m => {
    const likedMovies = [...this.state.movies];
    const index = likedMovies.indexOf(m);
    likedMovies[index] = { ...likedMovies[index] };
    likedMovies[index].liked = !likedMovies[index].liked;
    this.setState({ movies: likedMovies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = sortedColumn => {
    // const sortedColumn = { ...this.state.sortColumn };
    // if (sortedColumn.path === yol)
    //   sortedColumn.order =
    //     this.state.sortColumn.order === "asc" ? "desc" : "asc";
    // else {
    //   sortedColumn.path = yol;
    //   sortedColumn.order = "asc";
    // }
    this.setState({ sortColumn: sortedColumn });
  };
  render() {
    const { length: total } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;

    if (total === 0) return <p>no movie to display</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-2 my-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedGenre={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary my-2">
            New Movie
          </Link>
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          {/* since we r going to use pageSize multiple times we store it in the state */}
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
