import React, { Component } from 'react'
import { Row, Col } from "../../components/Grid"
import { BookList, BookListItem } from "../../components/BookList"
import axios from "axios"
import RemoveBookBtn from '../../components/RemoveBookBtn'


class Saved extends Component {
  state = {
    savedBooks: [],
    initialized: true
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    axios.get("/api/books")
      .then(res => {
        this.setState({ savedBooks: res.data })
      })
      .catch((err => console.log(err)))
  }

  deleteFromDB = id => {
    console.log(id);

    axios.delete(`/api/books/${id}`)
      .then( () => {
        alert('Book Deleted');
        this.getBooks();
        
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Row>
          <Col size="md-12">
            {this.state.savedBooks.length > 0 ?
              <BookList>
                {this.state.savedBooks.map(book => {
                  console.log(book)
                  return (
                    <div>
                      <BookListItem
                        key={book._id}
                        authors={book.authors}
                        title={book.title}
                        synopsis={book.synopsis}
                        link={book.link}
                        thumbnail={book.thumbnail}
                      />
                      <br/>
                      <p>
                      <RemoveBookBtn
                        onClick={() => this.deleteFromDB(book._id)}
                      />
                      </p>
                    </div>
                  )

                })}
              </BookList>
              :
              <div><h1>No results yet!</h1></div>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default Saved