import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './homepage.css';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      isbn: '',
      title: '',
      author: '',
      description: '',
      published_year: '',
      price: '',
        genre:''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isbn, title, author, description, published_year, price, genre } = this.state;

    axios.post('/api/book', { isbn, title, author, description, published_year,price, genre })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { isbn, title, author, description, published_year, price, genre } = this.state;
    return (
      <div>
          <header className="app-header">Totango Bookstore
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>

          </header>
        <div class="container">
          <h2> Add Book </h2>

            <div class="panel-body">
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="isbn">ISBN:</label>
                  <input type="text" class="form-control" name="isbn" value={isbn} onChange={this.onChange} placeholder="ISBN" />
                </div>
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                </div>
                <div class="form-group">
                  <label for="author">Author:</label>
                  <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
                </div>
                <div class="form-group">
                  <label for="description">Description:</label>
                  <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
                </div>
                <div class="form-group">
                  <label for="published_date">Published Date:</label>
                  <input type="number" class="form-control" name="published_year" value={published_year} onChange={this.onChange} placeholder="Published Year" />
                </div>
                <div class="form-group">
                  <label for="price">Price:</label>
                  <input type="text" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
                </div>
                <div class="form-group">
                  <label for="author">Genre:</label>
                  <input type="text" class="form-control" name="genre" value={genre} onChange={this.onChange} placeholder="Genre" />
                </div>


                <button type="submit" class="btn btn-default">Submit</button>
              </form>
            </div>
          </div>

      </div>
    );
  }
}

export default Create;
