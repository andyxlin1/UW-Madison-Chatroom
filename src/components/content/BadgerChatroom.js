import React, { useEffect, useState, useContext } from "react"
import { Button, Form } from "react-bootstrap"
import BadgerMessage from "./BadgerMessage"
import { AuthContext } from "../contexts/AuthContexts"

export default function BadgerChatroom(props) {
  const { loggedIn} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadMessages = () => {
    fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
      headers: {
        "X-CS571-ID": "bid_5213ece1083c3d09bef9"
      }
    }).then(res => res.json()).then(json => {
      setMessages(json.messages)
    })
  };

  useEffect(() => {
    loadMessages()
  }, [props]);

  const handlePost = () => {
    if (!title || !content) {
      alert("You must provide both a title and content!");
      return;
    }

    fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CS571-ID": "bid_5213ece1083c3d09bef9",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        content
      })
    })
      .then(() => {
        alert("Successfully posted!");
        setTitle("");
        setContent("");
        loadMessages();
      })
      .catch(error => {
        alert("Failed to post. Please try again later.");
        console.error(error);
      });
  };

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {!loggedIn && <p>You must be logged in to post!</p>}
      {loggedIn && (
        <Form>
          <Form.Group>
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Post Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handlePost}>Create Post</Button>
        </Form>
      )}
      <hr />
      {messages.length > 0 ? (
        <>
          {messages.map(message => {
            return (
              <BadgerMessage
                key={message.id}
                id={message.id}
                title={message.title}
                poster={message.poster}
                content={message.content}
                created={message.created}
                loadMessages={loadMessages}
                chatroomName={message.chatroom}
              />
            );
          })}
        </>
      ) : (
        <>
          <p>There are no messages in this chatroom yet!</p>
        </>
      )}
    </>
  );
}
