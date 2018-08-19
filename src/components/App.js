import React, { Component } from 'react';
//import logo from '../logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { submit, getContent } from '../utilities';
import NewPost from './NewPost';
import PostList from './PostList';
import {Button} from 'reactstrap'
import './App.css';

export const POST_NONE = 0;
export const POST_SUCCEEDED = 1;
export const POST_ERRORED = -1;
export const ENDPOINT_URL = "https://jsonplaceholder.typicode.com/posts";
export const BATCH_LENGTH = 10;

class App extends Component {
  state = {
    name: "",
    title: "",
    body: "",
    posts: [],
    submitStatus: POST_NONE,
    getFailed: false,
    hasMore: true
  }
  //ACTIONS
  handleSuccess = (data) => {
    const newData = this.state.posts.concat(data)
    if(data.length < BATCH_LENGTH){
      this.setState({hasMore: false});
    }
    this.setState({ posts: newData });
  }

  handleFailure = (status) => {
    this.setState({getFailed: true, hasMore: false});
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

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Hey There!</h1>
            <Link className="home-link" to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/new">
              <Button>New Post</Button>
            </Link>
          </header>
          <Route exact path="/" render={() => (
            <PostList
              posts={this.state.posts}
              hasMore={this.state.hasMore}
              getFailed={this.state.getFailed}
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
