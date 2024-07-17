import React from 'react'

const Trip = () => {

  return (
    <div>
        <p>hello one trip</p>
    </div>
  );
}

export default Trip






// const updatePost = async (postUpdate) => {
//     try {
//         setIsFetching(true);
//         await fetch(`${API_URL}/${postUpdate.id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(postUpdate)
//         }).then((response) => {
//             if (!response.ok) {
//                 throw new Error('Did not receive expected data');
//             }
//             let json = response.json();
//             console.log(json);
//             setPosts(posts.map((post) =>
//                 post.id === postUpdate.id ? { ...postUpdate } : post))
//         })

//     } catch (error) {
//         setFetchError(error);
//     } finally {
//         setIsFetching(false);
//     }
// }

// const deletePost = async (idToDelete) => {
//     try {
//         setIsFetching(true);
//         await fetch(`${API_URL}/${idToDelete}`, {
//             method: 'DELETE',
//         }).then((response) => {
//             if (!response.ok) {
//                 throw new Error('Did not receive expected data');
//             }
//             // let json = response.json();
//             // console.log(json);
//             setPosts(posts.filter((post) =>
//                 post.id !== idToDelete))
//         })
//     } catch (error) {
//         setFetchError(error);
//     } finally {
//         setIsFetching(false);
//     }
// }


