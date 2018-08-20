import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Badge } from 'reactstrap';
import { POST_SUCCEEDED, POST_ERRORED, POST_PENDING } from './App'
import LoadingIcon from '../images/three-dots.svg'
//validation
const nameIsValid = (name) => name.length > 0;
const bodyIsValid = (body) => body.length >= 10 && body.length <= 140;
const titleIsValid = (title) => title.length > 0;
const canSubmit = (name, title, body, submitStatus) => (
  nameIsValid(name) && 
  titleIsValid(title) && 
  bodyIsValid(body) &&
  submitStatus !== POST_PENDING
)

export default class NewPost extends Component {
  componentWillUnmount() {
    this.props.clearMessage();
  }

  render() {
    let { name, title, body, submitStatus, 
      nameChanged, titleChanged, bodyChanged, 
      handleSubmit } = this.props;

    return <div className="form-page">
      <Form className="form">
        <FormGroup>
          <Label for="username">Name</Label>
          <Input 
            invalid={!nameIsValid(name)}
            valid={nameIsValid(name)}
            onChange={(evt) => nameChanged(evt.target.value)} 
            name="UserId"
            id="username"
            placeholder="Username"
            value={name}
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input 
            invalid={!titleIsValid(title)}
            valid={titleIsValid(title)}
            onChange={(evt) => titleChanged(evt.target.value)} 
            name="title"
            id="title"
            placeholder="Title"
            value={title}
          />
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input 
            invalid={!bodyIsValid(body)}
            valid={bodyIsValid(body)}
            id="body"
            className="form-body"
            onChange={(evt) => bodyChanged(evt.target.value)}
            type="textarea"
            name="text"
            value={body}
          />
          <Badge className="counter" color={bodyIsValid(body) ? "success" : "danger"}>{body.length}</Badge>
        </FormGroup>
        <Button className="form-submit" disabled={!canSubmit(name, title, body, submitStatus)} onClick={handleSubmit}>
          {submitStatus === POST_PENDING ? <img src={LoadingIcon} width="30" alt="Loading..."/> : "Submit"}
        </Button>
        <Alert className="alert-fail" isOpen={submitStatus === POST_ERRORED} color="danger">
          Oh noes! Something went wrong with your post!
        </Alert>
        <Alert className="alert-success" isOpen={submitStatus === POST_SUCCEEDED} color="success">Yay! You made a post!</Alert>
        
      </Form>
    </div>
  }
}