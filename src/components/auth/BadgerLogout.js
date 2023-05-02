import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

export default function BadgerLogout() {
    const { setLoggedIn, setUser } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                'X-CS571-ID': 'bid_5213ece1083c3d09bef9'
            },
            credentials: "include"
        }).then(res => {
            if (res.ok) {
                setLoggedIn(false); // update the authentication status
                setUser(null);
            } else {
                console.error("Logout failed");
            }
        })
    }, [setLoggedIn, setUser]);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
