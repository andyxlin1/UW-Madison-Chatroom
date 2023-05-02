import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { Button } from "react-bootstrap";

function BadgerMessage(props) {
  const { loggedIn, user } = useContext(AuthContext);

  const dt = new Date(props.created);

  const handleDelete = () => {
    fetch(
      `https://cs571.org/s23/hw6/api/chatroom/${props.chatroomName}/messages/${props.id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-CS571-ID": "bid_5213ece1083c3d09bef9",
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        alert("Successfully deleted the post!");
        props.loadMessages();
      })
      .catch((error) => {
        alert("Failed to delete post. Please try again later.");
        console.error(error);
      });
  };

  return (
    <>
      <h2>{props.title}</h2>
      <sub>
        Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </sub>
      <br />
      <br />
      <i>{props.poster}</i>
      {loggedIn && user === props.poster && (
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      )}
      <p>{props.content}</p>
    </>
  );
}

export default BadgerMessage;
