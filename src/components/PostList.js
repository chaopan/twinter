import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller'
import LoadingIcon from '../images/three-dots.svg'

const Post = ({ user, title, body, className }) => (
  <Card className={className}>
    <CardBody>
    <CardSubtitle className="post-user">{user}</CardSubtitle>
      <CardTitle className="post-title">{title}</CardTitle> 
      <CardText className="post-body">{body}</CardText>
    </CardBody>
  </Card>
);

const Loader = () => {
  return <Post 
    key={-1}
    className="post loader" 
    title={<img src={LoadingIcon} width="30" alt="Loading..."/>}
    />
}

const Failure = () => {
  return <Post 
    className="post failure"
    title={<span>Oh Noes! Something went wrong. Try <a href="">refreshing the page</a>.</span>}
  />
}

export default class PostList extends Component {
  render() {
    return (
      <div className='post-page'>
        <InfiniteScroll
          pageStart={0}
          initialLoad
          loadMore={this.props.loadMore}
          hasMore={this.props.hasMore}
          loader={<Loader key={-1}/>}
          className='scroll-container'
        >
          {this.props.posts.map((post, index) => {
            return <Post
              key={index}
              className="post"
              user={post.userId}
              title={post.title}
              body={post.body}
            />
          })}
          {this.props.getFailed && <Failure key={-2}/>}
        </InfiniteScroll>


          

      </div>
    )
  }
}