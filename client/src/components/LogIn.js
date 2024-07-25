// // import '../logIn.css'
// // import { CLIENT_COMPRESS } from 'mysql/lib/protocol/constants/client';
// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import '../LogIn.css'

// const LogIn = () => {

//   // const [users, setUsers] = useState([]);
//   const [isNewUser, setIsNewUser] = useState(false);
//   const [isExist, setIsExist] = useState(false);
//   const [isFetching, setIsFetching] = useState(false);
//   const [needNewpassword, setNeedNewpassword] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [user, setUser] = useState({
//     id: "",
//     email: "",
//     password: ""
//   });


//   const searchUser = async () => {
//     let resData = [];
//     try {

//       setIsFetching(true);
//       const response = await fetch(`http://localhost:8080/users/email/${user.email}`);
//       if (!response.ok&&!response.status === 404) {//&&!response.status == 404
//         throw new Error('Did not receive expected data');
//       }
//       resData = await response.json();
//       // setUsers(resData);
//       setFetchError(null);
//     } catch (error) {
//       setFetchError(error.message);
//     } finally {
//       setIsFetching(false);
//       return resData;
//     }
//   }

//   const searchPassword = async (id) => {
//     let resData = [];
//     try {

//       setIsFetching(true);
//       const response = await fetch(`http://localhost:8080/passwords/${id}`);
//       if (!response.ok&&!response.status === 404) {
//         throw new Error('Did not receive expected data');
//       }
//       resData = await response.json();
//       // setUsers(resData);
//       setFetchError(null);
//     } catch (error) {
//       setFetchError(error.message);
//     } finally {
//       setIsFetching(false);
//       return resData;
//     }
//   }

//   const resetUser = () => {
//     setUser({
//       id: "",
//       email: "",
//       password: ""
//     })
//     setIsBlocked(false)
//   }

//   const handleOnChange = (event, type) => {
//     setUser({
//       ...user,
//       [type]: event.target.value
//     })
//   }

//   const handlenewPassword = async () => {
//     try {
//       setIsFetching(true);
//       const response = await fetch('http://localhost:8080/passwords', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: user.id,
//           password: user.password
//         })
//       });
//       if (!response.ok) {
//         throw new Error('Failed to create new password');
//       }
//       console.log('The password created successfully');
//       setFetchError(null);
//       setNeedNewpassword(false);
//       resetUser();
//     } catch (error) {
//       setFetchError(error.message);
//     } finally {
//       setIsFetching(false);
//     }
//   }

//   const handleSubmit = async () => {

//     let retData = await searchUser();
//     console.log(retData);
//     // console.log(users);
//     if (retData.length > 0) {
//       if (!retData[0].isBlocked) {
//         let resdata = await searchPassword(retData[0]._id);
//         if (resdata.length > 0 && resdata[0].password === user.password) {
//           setUser({
//             ...user,
//             id: retData[0]._id
//           });
//           const currentDate = new Date();
//           const ninetyDaysLater = new Date(resdata[0].createdAt);
//           ninetyDaysLater.setDate(currentDate.getDate() + 90);
//           if (ninetyDaysLater > currentDate) {
//             console.log("The password is still valid");
//             const userToStorage = {
//               id: retData[0]._id,
//               userName: retData[0].userName,
//               email: retData[0].email,
//               address: retData[0].address,
//               phone: retData[0].phone,
//               isAdmin: retData[0].isAdmin,
//               isBlocked: retData[0].isBlocked
//             }
//             localStorage.setItem('usersInLS', JSON.stringify([userToStorage]));
//             setIsExist(true);
//           } else {
//             console.log("The password is no longer valid");
//             setNeedNewpassword(true);
//           }
//         } else {
//           setIsNewUser(true);
//           resetUser();
//         }
//       } else {
//         setIsBlocked(true);
//       }
//     } else {
//       setIsNewUser(true);
//       resetUser();
//     }
//   }

//   if (!needNewpassword && isExist) {
//     return (
//       <Navigate to={`../users/${user.id}/home`} />
//     )
//   }
//   else if (fetchError) {
//     return (
//       <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
//     )
//   }
//   else if (isFetching) {
//     return (
//       <div className="ring">Loading
//         <span></span>
//       </div>
//     )
//   }
//   else {
//     return (
//       <div className='login'>
//         <div className='login-background'></div>
//         {isBlocked && <div><p>you are a blocked user</p>
//           <button onClick={resetUser}>ok</button>
//         </div>}
//         <form >
//           <label>Enter an email:</label>
//           <input
//             type="email"
//             name="email"
//             onChange={(event) => handleOnChange(event, 'email')}
//             required
//           />

//           <label>Enter a password:</label>
//           <input
//             type="text"
//             name="password"
//             onChange={(event) => handleOnChange(event, 'password')}
//             required
//           />

//           {isNewUser && <p>User does not exist</p>}
//           {needNewpassword && <p>Password is no longer valid please enter a new password</p>}
//           {needNewpassword && <button type="button" className='newPassword' onClick={handlenewPassword}>update</button>}

//           {!needNewpassword && <button type="button" className='submit' onClick={handleSubmit}>login</button>}
//           <p><i>don't have an account? click to <Link to="/register" >SIGN UP!</Link></i></p>
//         </form>
//       </div>
//     )
//   }


// }

// export default LogIn








// import '../logIn.css'
// import { CLIENT_COMPRESS } from 'mysql/lib/protocol/constants/client';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../LogIn.css'

const LogIn = () => {

  // const [users, setUsers] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [needNewpassword, setNeedNewpassword] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: ""
  });


  const searchUser = async () => {
    let resData = [];
    try {

      setIsFetching(true);
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        }),
    });

    if (!response.ok) {
        throw new Error('login faild');
    }

     resData = await response.json();
    console.log(resData);






      // const response = await fetch(`http://localhost:8080/users/email/${user.email}`);
      // if (!response.ok&&!response.status === 404) {//&&!response.status == 404
      //   throw new Error('Did not receive expected data');
      // }
      // resData = await response.json();
      // setUsers(resData);
      setFetchError(null);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
      return resData;
    }
  }

  // const searchPassword = async (id) => {
  //   let resData = [];
  //   try {

  //     setIsFetching(true);
  //     const response = await fetch(`http://localhost:8080/passwords/${id}`);
  //     if (!response.ok&&!response.status === 404) {
  //       throw new Error('Did not receive expected data');
  //     }
  //     resData = await response.json();
  //     // setUsers(resData);
  //     setFetchError(null);
  //   } catch (error) {
  //     setFetchError(error.message);
  //   } finally {
  //     setIsFetching(false);
  //     return resData;
  //   }
  // }

  const resetUser = () => {
    setUser({
      id: "",
      email: "",
      password: ""
    })
    setIsBlocked(false)
  }

  const handleOnChange = (event, type) => {
    setUser({
      ...user,
      [type]: event.target.value
    })
  }

  const handlenewPassword = async () => {
    try {
      setIsFetching(true);
      const response = await fetch('http://localhost:8080/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          password: user.password
        })
      });
      if (!response.ok) {
        throw new Error('Failed to create new password');
      }
      console.log('The password created successfully');
      setFetchError(null);
      setNeedNewpassword(false);
      resetUser();
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsFetching(false);
    }
  }
const handleSubmit = async () => {

    let retData = await searchUser();
    console.log(retData);
    // console.log(users);
    if (retData.token !="") {
          setUser({
            ...user,
            id: retData._id
          });
          const currentDate = new Date();
            const userToStorage = {
              id: retData._id,
              userName: retData.userName,
              email: retData.email,
              address: retData.address,
              phone: retData.phone,
              isAdmin: retData.isAdmin,
              isBlocked: retData.isBlocked,
              token: retData.token
            }
            localStorage.setItem('usersInLS', JSON.stringify([userToStorage]));
            setIsExist(true);
        } else {
          setIsNewUser(true);
          resetUser();
        }
  }

  if (!needNewpassword && isExist) {
    return (
      <Navigate to={`../users/${user.id}/home`} />
    )
  }
  else if (fetchError) {
    return (
      <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
    )
  }
  else if (isFetching) {
    return (
      <div className="ring">Loading
        <span></span>
      </div>
    )
  }
  else {
    return (
      <div className='login'>
        <div className='login-background'></div>
        {isBlocked && <div><p>you are a blocked user</p>
          <button onClick={resetUser}>ok</button>
        </div>}
        <form >
          <label>Enter an email:</label>
          <input
            type="email"
            name="email"
            onChange={(event) => handleOnChange(event, 'email')}
            required
          />

          <label>Enter a password:</label>
          <input
            type="text"
            name="password"
            onChange={(event) => handleOnChange(event, 'password')}
            required
          />

          {isNewUser && <p>User does not exist</p>}
          {needNewpassword && <p>Password is no longer valid please enter a new password</p>}
          {needNewpassword && <button type="button" className='newPassword' onClick={handlenewPassword}>update</button>}

          {!needNewpassword && <button type="button" className='submit' onClick={handleSubmit}>login</button>}
          <p><i>don't have an account? click to <Link to="/register" >SIGN UP!</Link></i></p>
        </form>
      </div>
    )
  }


}

export default LogIn
