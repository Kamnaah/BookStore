import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import  BookList  from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          List Of Books
          <BookList />
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}
