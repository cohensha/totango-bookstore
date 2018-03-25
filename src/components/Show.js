import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import './homepage.css';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Show extends Component {

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

  delete(id){
    console.log(id);
    axios.delete('/api/book/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
        <div>
                <header className="app-header">Totango Bookstore
                  <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4></header>

            <Container className="container">
               <Row> <Col><h2> {this.state.book.title}</h2></Col>
               </Row>


              <Row>
                <h3>ISBN: </h3>
              </Row>
              <Row>
                <p>{this.state.book.isbn}</p>
              </Row>
              <Row>
                <h3>Author: </h3>
              </Row>
              <Row>
                <p>{this.state.book.author}</p>
              </Row>

              <Row>
                <h3>Description: </h3>
              </Row>

              <Row>
                <p>{this.state.book.description}</p>
              </Row>

              <Row>
                <h3>Published Date: </h3>
              </Row>

              <Row>
                <p>{this.state.book.published_year}</p>

              </Row>

              <Row>
                <h3>Price: </h3>

              </Row>
              <Row>
                <p>{this.state.book.price}</p>

              </Row>

              <Row>
                <h3>Genre: </h3>

              </Row>
              <Row>
                <p>{this.state.book.genre}</p>

              </Row>


              <Button className="button"><Link to={`/edit/${this.state.book._id}`} id="editlink">Edit</Link></Button>&nbsp;
              <Button className="button" onClick={this.delete.bind(this, this.state.book._id)} class="btn btn-danger">Delete</Button>

            </Container>
        </div>
    );
  }
}

export default Show;
