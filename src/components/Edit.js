import React, { Component } from 'react';
import axios from 'axios';
import {Container} from 'reactstrap';
import './homepage.css';

import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      });
  }

  onChange = (e) => {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isbn, title, author, description, published_year, price, genre } = this.state.book;

    axios.put('/api/book/'+this.props.match.params.id, { isbn, title, author, description, published_year, price, genre })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
        <div>
        <header className="app-header">Totango Bookstore

          <h4><Link to={`/show/${this.state.book._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Book Details</Link></h4>
        </header>
      <div class="container">

          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">ISBN:</label>
                <input type="text" class="form-control" name="isbn" value={this.state.book.isbn} onChange={this.onChange} placeholder="ISBN" />
              </div>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.book.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.book.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.book.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="published_date">Published Date:</label>
                <input type="number" class="form-control" name="published_year" value={this.state.book.published_year} onChange={this.onChange} placeholder="Published Year" />
              </div>
              <div class="form-group">
                <label for="publisher">Price</label>
                <input type="text" class="form-control" name="price" value={this.state.book.price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div class="form-group">
                <label for="publisher">Genre</label>
                <input type="text" class="form-control" name="genre" value={this.state.book.genre} onChange={this.onChange} placeholder="Genre" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
      </div>
        </div>
    );
  }
}

export default Edit;
