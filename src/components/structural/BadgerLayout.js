import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import { AuthContext } from '../contexts/AuthContexts';

function BadgerLayout(props) {
    const { loggedIn, setLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
      fetch('https://www.cs571.org/s23/hw6/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'X-CS571-ID': 'bid_5213ece1083c3d09bef9' 
        }
      })
        .then(response => {
          if (response.ok) {
            setLoggedIn(false);
          } else {
            alert('Logout failed, please try again later.');
          }
        })
        .catch(error => {
          alert('Logout failed, please try again later.');
          console.error(error);
        });
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {loggedIn ? (
                          <Nav.Link as={Link} to="logout" onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                          <>
                            <Nav.Link as={Link} to="login">Login</Nav.Link>
                            <Nav.Link as={Link} to="register">Register</Nav.Link>
                          </>
                        )}
                          <NavDropdown title="Chatrooms">
                            {props.chatrooms.map( (chatroom, index) => {
                              return (
                                <NavDropdown.Item as={Link} to={`chatrooms/${chatroom}`} key = {index}>
                                  {chatroom}
                                </NavDropdown.Item>
                              )
                            })}
                          </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                <Outlet />
            </div>
        </div>
    );
}

export default BadgerLayout;
