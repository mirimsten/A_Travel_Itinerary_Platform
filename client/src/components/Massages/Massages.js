import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MassageItem from './MassageItem';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useParams } from 'react-router-dom';


const Massages = () => {

    const { tripId } = useParams();
    const navigate = useNavigate();
    const [Massages, setMassages] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [MassagesToAdd, setMassagesToAdd] = useState({ content: "", isRead: false });
    const [adding, setAdding] = useState(false);
    const usersInLS = localStorage.getItem('usersInLS');
    const user = usersInLS ? JSON.parse(usersInLS)[0] : {};
    const API_URL = "http://localhost:8080/massages";
    //const API_URL = `http://localhost:8080//${user._id}/massages`
    useEffect(() => {
        const fetchMassages = async () => {
            try {
                setIsFetching(true);
                const response = await fetch(`${API_URL}/userId/${user.id}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }

                const data = await response.json();
                setMassages(data);
            } catch (error) {
                setFetchError(error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchMassages();
    }, []);//??? מה להשים פה

    const addMassage = async () => {
        try {
            setIsFetching(true);
            const addNewMassage = {
                userId: user.id,
                content: MassagesToAdd.content,
                isRead: MassagesToAdd.isRead
            };
            console.log(user);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addNewMassage),
            });

            if (!response.ok) {
                throw new Error('Did not receive expected data');
            }

            const json = await response.json();
            setMassages((prevMassages) => [...prevMassages, json[0]]);

        } catch (error) {
            setFetchError(error.message);
        } finally {
            setAdding(false);
            setIsFetching(false);
        }
    };

    const updateMassage = async (MassageUpdate) => {
        try {
            setIsFetching(true);
            await fetch(`${API_URL}/${MassageUpdate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(MassageUpdate)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Did not receive expected data');
                }
                let json = response.json();
                console.log(json);
                setMassages(Massages.map((Massage) =>
                    Massage._id === MassageUpdate._id ? { ...MassageUpdate } : Massage))
            })

        } catch (error) {
            setFetchError(error);
        } finally {
            setIsFetching(false);
        }
    }
    const deleteMassage = async (idToDelete) => {
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
                setMassages(Massages.filter((Massage) =>
                    Massage._id !== idToDelete))
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
            <div className='Massages'>

                {adding ? (<>
                    <input
                        type="text"
                        placeholder="Add Massage content"
                        onChange={(event) => setMassagesToAdd({ ...MassagesToAdd, content: event.target.value })} />
                    <input
                        type="text"
                        placeholder="Add user id"
                        onChange={(event) => setMassagesToAdd({ ...MassagesToAdd, userId: event.target.value })} />

                    <button onClick={addMassage}><IoIosAddCircleOutline /></button>
                </>) : (<>
                    <h2>Massages:</h2>
                    {user.isAdmin && <button onClick={() => setAdding(true)}>+</button>}
                    < ol >
                        {
                            Massages.length && Massages.map((Massage) => (
                                <MassageItem key={Massage._id} Massage={Massage} updateMassage={updateMassage} deleteMassage={deleteMassage} user={user} />
                            ))
                        }
                    </ol >
                    {/* <button onClick={handleGoBack}>Go Back to the trip</button> */}
                </>)}
            </div>
        );
    }
};

export default Massages;