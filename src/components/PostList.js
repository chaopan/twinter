import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getContent } from '../utilities';
import InfiniteScroll from 'react-infinite-scroller'
import { ENDPOINT_URL, BATCH_LENGTH } from './App';
const Post = ({ user, title, body }) => (
  <Card>
    <CardBody>
    <CardSubtitle>{user}</CardSubtitle>
      <CardTitle>{title}</CardTitle>
      
      <CardText>{body}</CardText>
    </CardBody>
  </Card>
);

export default class PostList extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  loadMore = (page) => {
    const start = this.props.posts.length;
    const contentPromise = getContent(`${ENDPOINT_URL}?_start=${start}&_limit=${BATCH_LENGTH}`);
    contentPromise.then(this.props.handleSuccess, this.props.handleFailure)
  }

  render() {
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          initialLoad
          loadMore={this.loadMore}
          hasMore={this.props.hasMore}
          loader={<div className='loader' key={0}>Loading...</div>}
        >
          {this.props.posts.map((post, index) => {
            return <Post
              key={index}
              user={post.userId}
              title={post.title}
              body={post.body}
            />
          })}


        </InfiniteScroll>


          {this.props.getFailed && <div>
            oh noes!
          </div>}

      </div>
    )
  }
}