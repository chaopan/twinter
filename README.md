This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

npm start
localhost:3000

Implement a basic Twitter clone. There should be two pages, with some way to navigate between them. The “Home” page must make a call to an API to retrieve a list of posts (username, title, body) and render a list of those posts or display an error message if the API call fails. The “Post” page should include a text input for their username and a text input for their post content, as well as a button to submit the post. The post content text input must be validated to be >= 10 characters an <= 140 characters, with a visual way to inform the user if their input is not valid. When the submit button is clicked an API call should be made to create the new post, with the UI updated to reflect if it was successful or not. The code that’s making the API calls must have at least one unit test. In order to simulate API response failures, you can just disable wifi on your laptop or disable networking in your browser’s developer tools.

 
API endpoints:

GET https://jsonplaceholder.typicode.com/posts

POST https://jsonplaceholder.typicode.com/posts, with body in the format below:

{

            "userId": 2,

            "title": "This is a post title",

            "body": "This is the body of a post. Let’s pretend it’s something interesting."

}

Example of what the visual state might look like:

https://lh4.googleusercontent.com/Rby_tU_XRzzm3Vd6hTzJMIPOKc3TtrMXsO47ifCimHAHznS1Yt66DwXhosgE9ZOS6UrrnCz6r4V4wZPpedtfvKgpSUcgMidYXTYWmIyzEGMx1kUo6i-fzpRnsGPkbZHHbGvCgwaG

Bonus considerations:

Animations
Infinite scroll capability for Home page list of posts
Functional UI test