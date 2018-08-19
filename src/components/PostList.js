import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getContent } from '../utilities';
import { ENDPOINT_URL } from './App';
const Post = ({user, title, body}) => (
  <Card>
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{user}</CardSubtitle>
      <CardText>{body}</CardText>
    </CardBody>
  </Card>
);

export default class PostList extends Component {
  componentDidMount(){
    console.log('componentDidMount');
        //TODO: make this GET occur earlier
    const contentPromise = getContent(ENDPOINT_URL);
    contentPromise.then(this.props.handleSuccess, this.props.handleFailure)
  }

  render(){
    return (
      <div>
        {this.props.posts.map((post, index) => {
          return <Post
            key={index}
            user={post.userId}
            title={post.title}
            body={post.body}
          />
        })}
      </div>
    )
  }
}