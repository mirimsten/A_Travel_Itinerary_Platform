import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import '../Register.css'

const Register = () => {

    const API_URL = "http://localhost:8080/users";
    const [users, setUsers] = useState([]);
    // const [finallRediseration, setFinallRediseration] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [homePage, setHomePage] = useState(false);
    const [wrong, setWrong] = useState('');
    const [verifyPassword, setVerifyPassword] = useState("");
    const [addUser, setAddUser] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        password: ""
    })

    const searchUser = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(`${API_URL}/email/${addUser.email}`);
            if (!response.ok && response.status !== 404) {
                throw new Error('Did not receive expected data');
            }
            const resData = await response.json();
            setFetchError(null);
            return resData;
        } catch (error) {
            setFetchError(error.message);
            return [];
        } finally {
            setIsFetching(false);
        }
    };

    const handleChangeOnObject = (event, type) => {
        setAddUser({
            ...addUser,
            [type]: event.target.value
        })
    }

    const handleChangeVerifyPassword = (event) => {
        setVerifyPassword(event.target.value);
    }

    const handlePostPassword = async (id) => {
        try {
            console.log(id);
            const response = await fetch('http://localhost:8080/passwords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: id,
                    password: addUser.password
                }),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data222');
            }

            const json = await response.json();
            console.log(json);
            // setFinallRediseration(true);
        } catch (error) {
            setFetchError(error.message);
        }
    }

    const addToLS = (user) => {
        localStorage.setItem('usersInLS', JSON.stringify(user));
        handlePostPassword(user[0]._id);
        setHomePage(true);
    };

    const handlePostUser = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: addUser.name,
                    email: addUser.email,
                    address: addUser.address,
                    phone: addUser.phone
                }),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data😜');
            }

            const json = await response.json();
            console.log(json);
            addToLS(json);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setIsFetching(false);
        }
    };

    const handleOnSubmit = async () => {
        if (addUser.password !== verifyPassword) {
            setWrong("ERROR: Try again");
        } else {
            const foundUsers = await searchUser();
            setUsers(foundUsers);
            if (foundUsers.length === 0) {
                await handlePostUser();
            } else {
                setWrong("ERROR: Try again");
            }
        }
    };

    if (homePage) {
        return <Navigate to={'/home'} />
    }
    else if (isFetching) {
        return (
            <p>Loading...</p>
        )
    } else if (fetchError) {
        return (
            <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
        )
    } else {
        return (
            <div className='register'>
                <div className='register-background'></div>
                {/* {finallRediseration && <Navigate to="/finallRegister" />} */}
                {/* <p>Hello, please fill out the form</p> */}
                <form >
                    <label>Enter your name:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={(event) => handleChangeOnObject(event, 'name')}
                        required
                    />

                    <label>Enter your email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(event) => handleChangeOnObject(event, 'email')}
                        required
                    />

                    <label>Enter your address:</label>
                    <input
                        type="text"
                        name="street"
                        onChange={(event) => handleChangeOnObject(event, 'address')}
                        required
                    />

                    <label>Enter your phone:</label>
                    <input
                        type="text"
                        name="phone"
                        onChange={(event) => handleChangeOnObject(event, 'phone')}
                        required
                    />

                    <label>Enter a password:</label>
                    <input
                        type="text"
                        name="password"
                        onChange={(event) => handleChangeOnObject(event, 'password')}
                        required
                    />

                    <label>Enter a verify-password:</label>
                    <input
                        type="text"
                        name="verifyPassword"
                        onChange={handleChangeVerifyPassword}
                        required
                    />

                    {(wrong !== '') && <p>{wrong}</p>}

                    <button type="button" className='submit' onClick={handleOnSubmit}>submit</button>
                    <p><i>already have an account? <Link to="/logIn">LOG IN!</Link></i></p>
                </form>
            </div>
        )
    }
}

export default Register