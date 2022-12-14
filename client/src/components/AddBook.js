import React, { Component } from "react";
import { graphql } from'@apollo/client/react/hoc';
import { flowRight as compose} from 'lodash';
import { getAuthorsQuery , addBookMutation , getBooksQuery} from '../queries/queries';

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: '',
        genre: '',
        authorId: ''
    };
}

  displayAuthors() {
    let data= this.props.getAuthorsQuery;
    if(data.loading){
      return <option disabled>LOADING!!!</option>
    }else{
      return (data.authors.map((author=>{
        return(<option key={author.id} value={author.name}>{author.name}</option>)
      })))
    }
  }

  submitForm(e){
    e.preventDefault()
    this.props.addBookMutation({
        variables: {
            name: this.state.name,
            genre: this.state.genre,
            authorId: this.state.authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
    });
}
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <input
          type="text"
           onChange={(e) => this.setState({ authorId: e.target.value })}
           />
            {this.displayAuthors()}
          
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
) (AddBook);
