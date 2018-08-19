import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Badge } from 'reactstrap';
import { POST_NONE, POST_SUCCEEDED, POST_ERRORED } from './App'

const bodyIsValid = (body) => body.length >= 10 && body.length <= 140;

const canSubmit = (name, title, body) => name.length > 0 && title.length > 0 && bodyIsValid(body)

export default class NewPost extends Component {
  componentWillUnmount() {
    this.props.clearMessage();
  }

  render() {
    let {name, title, body, 
      submitStatus, nameChanged, titleChanged,
      bodyChanged, clearMessage, handleSubmit } = this.props;
    
    return <Form>
    <FormGroup>
      <Label for="username">Name</Label>
      <Input onChange={(evt) => nameChanged(evt.target.value)} name="UserId" id="username" placeholder="Username" value={name} />
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input onChange={(evt) => titleChanged(evt.target.value)} name="title" id="title" placeholder="Title" value={title} />
    </FormGroup>
    <FormGroup>
      <Label for="body">Body</Label>
      <Input onChange={(evt) => bodyChanged(evt.target.value)} type="textarea" name="text"
        value={body}
        id="body"
      />
      <Badge color={bodyIsValid(body) ? "success" : "danger"}>{body.length}</Badge>
    </FormGroup>
    <Button disabled={!canSubmit(name, title, body)} onClick={handleSubmit}>
      Submit
  </Button>
    <Alert isOpen={submitStatus === POST_ERRORED} color="danger">Oh noes! Something went wrong with your post!</Alert>
    <Alert isOpen={submitStatus === POST_SUCCEEDED} color="success">Yay! You made a post!</Alert>
  </Form>
  }
}