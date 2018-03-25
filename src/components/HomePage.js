import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import './homepage.css';
import axios from 'axios';

// Start App

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }


    componentDidMount() {
        axios.get('/api/book')
            .then(res => {
                this.setState({ books: res.data });
                console.log(this.state.books);
            });
    }

    render() {
        return <div>
            <header className="app-header"> Totango Bookstore <h5 color="#999999"> Sharon Cohen </h5>

                <h4 color="white"><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Book</Link></h4>

            </header>


            <div className="app-card-list" id="app-card-list">

                {
                    Object
                        .keys(this.state.books)
                        .map(key => <Card key={key} index={key} details={this.state.books[key]}/>)
                }
            </div>
        </div>
    }
}

class InfoButton extends React.Component {
    render() {
        return (
           <div>
               <Button className="button"><i className="fa fa-chevron-right"></i> <Link className="infobutton" to={`/show/${this.props.id}`} >Full Details</Link></Button>{' '}
           </div>
        )
    }
}


class CardBody extends React.Component {
    render() {
        return (
            <div className="card-body">

                <h2>{this.props.title}</h2>
                <p className="body-content">{this.props.isbn}</p>

                <p className="body-content">{this.props.author}</p>

                <InfoButton id={this.props.id} />
            </div>
        )
    }
}

class Card extends React.Component {
    render() {
        return (
            <article className="card">
                <CardBody title={this.props.details.title} author={this.props.details.author} id={this.props.details._id} isbn={this.props.details.isbn} />
            </article>
        )
    }
}

export default HomePage;



