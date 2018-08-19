import React, { Component } from 'react';
//import logo from '../logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { submit, getContent } from '../utilities';
import NewPost from './NewPost';
import PostList from './PostList';
import './App.css';

export const POST_NONE = 0;
export const POST_SUCCEEDED = 1;
export const POST_ERRORED = -1;
export const ENDPOINT_URL = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    name: "",
    title: "",
    body: "",
    posts: [],
    submitStatus: POST_NONE
  }
  //ACTIONS
  handleSuccess = (data) => {
    this.setState({ posts: data });
  }

  handleFailure = (status) => {
    console.log('handleFailure', status);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    submit(
      ENDPOINT_URL,
      JSON.stringify({
        "userId": this.state.name,
        "title": this.state.title,
        "body": this.state.body
      })
    ).then(this.postSucceeded, this.postFailed);
  }

  postSucceeded = (response) => {
    this.setState({ submitStatus: POST_SUCCEEDED, name: "", title: "", body: "" });
  }

  postFailed = (error) => {
    this.setState({ submitStatus: POST_ERRORED });
  }

  nameChanged = (val) => {
    this.setState({ name: val });
  }

  titleChanged = (val) => {
    this.setState({ title: val });
  }

  bodyChanged = (val) => {
    this.setState({ body: val });
  }

  clearMessage = (vl) => {
    this.setState({submitStatus: POST_NONE});
  }


  componentDidMount() {
    //TODO: make this GET occur earlier
    const contentPromise = getContent(ENDPOINT_URL);
    contentPromise.then(this.handleSuccess, this.handleFailure)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Poop</h1>
            <Link to="/">Home</Link>
            <Link to="/new">New Post</Link>
          </header>
          <Route exact path="/" render={() => (
            <PostList
              posts={this.state.posts}
              //actions
              handleSuccess={this.handleSuccess}
              handleFailure={this.handleFailure}
            />
          )} />

          <Route path="/new" onChange={()=>{console.log('change')}} render={() => (
            <NewPost
              name={this.state.name}
              title={this.state.title}
              body={this.state.body}
              submitStatus={this.state.submitStatus}
              //actions
              titleChanged={this.titleChanged}
              bodyChanged={this.bodyChanged}
              nameChanged={this.nameChanged}
              postSucceeded={this.postSucceeded}
              postFailed={this.postFailed}
              handleSubmit={this.handleSubmit}
              clearMessage={this.clearMessage}
            />
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
