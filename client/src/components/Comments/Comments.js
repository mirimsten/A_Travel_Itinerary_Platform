import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentItem from './CommentItem';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useParams } from 'react-router-dom';

// userId:
//   tripId:
//   content:
//   imageUrl

const Comments = () => {

    const { tripId } = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [commentsToAdd, setCommentsToAdd] = useState({ content: "", imageUrl: "" });
    const [adding, setAdding] = useState(false);
    const usersInLS = localStorage.getItem('usersInLS');
    const user = usersInLS ? JSON.parse(usersInLS)[0] : {};
    const API_URL = "http://localhost:8080/comments";

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setIsFetching(true);
                const response = await fetch(`${API_URL}/trip/${tripId}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }

                const data = await response.json();
                setComments(data);
            } catch (error) {
                setFetchError(error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchComments();
    }, [tripId]);

    const addComment = async () => {
        try {
            setIsFetching(true);
            const addNewComment = {
                userId: user.id,
                tripId: tripId,
                content: commentsToAdd.content,
                imageUrl: commentsToAdd.imageUrl
            };
            console.log(user);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addNewComment),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();
            setComments((prevComments) => [...prevComments, json[0]]);

        } catch (error) {
            setFetchError(error.message);
        } finally {
            setAdding(false);
            setIsFetching(false);
        }
    };

    const updateComment = async (commentUpdate) => {
        try {
            setIsFetching(true);
            await fetch(`${API_URL}/${commentUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentUpdate)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                let json = response.json();
                console.log(json);
                setComments(comments.map((comment) =>
                    comment._id === commentUpdate._id ? { ...commentUpdate } : comment))
            })

        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    const deleteComment = async (idToDelete) => {
        try {
            setIsFetching(true);
            await fetch(`${API_URL}/${idToDelete}`, {
                method: 'DELETE',
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                // let json = response.json();
                // console.log(json);
                setComments(comments.filter((comment) =>
                    comment._id !== idToDelete))
            })
        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Go back one page
    };

    if (isFetching) {
        return <p>Loading...</p>;
    } else if (fetchError) {
        return <p>ERROR: {fetchError.toString()}</p>;
    } else {
        return (
            <div className='comments'>
                {adding?(<>
                <input
                    type="text"
                    placeholder="Add Comment content"
                    onChange={(event) => setCommentsToAdd({ ...commentsToAdd, content: event.target.value })} />
                <input
                    type="file"
                    placeholder="Upload a photos"
                    onChange={(event) => setCommentsToAdd({ ...commentsToAdd, imageUrl: event.target.value })} />
                    <button onClick={addComment}><IoIosAddCircleOutline /></button>
                    </>):(<>
                <h2>Comments:</h2>
                <button onClick={() => setAdding(true)}>+</button>
                < ol >
                    {
                        comments.length && comments.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} updateComment={updateComment} deleteComment={deleteComment} user={user} />
                        ))
                    }
                </ol >
                <button onClick={handleGoBack}>Go Back to the trip</button>
                </>)}
            </div>
        );
    }
};

export default Comments;
// userId:
//   tripId:
//   content:
//   imageUrl