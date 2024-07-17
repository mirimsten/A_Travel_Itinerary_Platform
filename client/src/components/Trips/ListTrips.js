import React, { useEffect, useState, useRef } from 'react';
import {useParams} from 'react-router-dom';
import AddTrip from './AddTrip';
import TripItem from './TripItem';

const ITEMS_PER_PAGE = 5;

const ListTrips = () => {
    const {id} = useParams();
    const [trips, setTrips] = useState([]);
    const [addTrip, setAddTrip] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [page, setPage] = useState(0);

    const API_URL = "http://localhost:8080/trips";
    // useEffect(() => {
    //     const usersInLS = localStorage.getItem('usersInLS');
    //     id.current = usersInLS ? JSON.parse(usersInLS)[0].id : null;
    //     fetch(`${API_URL}`, {
    //         method: "GET",
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setTrips(data))
    //         .catch((error) => setFetchError(error));
    // }, [])

    useEffect(() => {
        getFromServer({ offset: page * ITEMS_PER_PAGE });
    }, [page]);

    const [country, setCountry] = useState("");

    const handleChangeCountry = (event) => {
        setCountry(event.target.value)
    }

    // const addPost = async (title) => {
    //     try {
    //         setIsFetching(true);
    //         const addNewPost = {
    //             user_id: id.current,
    //             title: title,
    //             body: "fill the body of post"
    //         };
    //         const response = await fetch(API_URL, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(addNewPost),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Did not receive expected data');
    //         }

    //         const json = await response.json();
    //         console.log(json);
    //         setPosts((prevPosts) => [...prevPosts, json[0]]);
    //     } catch (error) {
    //         setFetchError(error.message);
    //     } finally {
    //         setIsFetching(false);
    //     }
    // }

    const getFromServer = async ({ type = "", value = "", sortBy = "", limit = ITEMS_PER_PAGE, offset = 0 } = {}) => {
        try {
            let query = `?limit=${limit}&offset=${offset}`;
            switch (type) {
                case "":
                    break;
                case "country":
                    query += `&?country=${value}`;
                    break;
                case "myTrips":
                    query += `&?userId=${value}`;
                    break;
                default:
                    break;
            }

            if (sortBy) {
                query += `&sortBy=${sortBy}`;
            }

            setIsFetching(true);
            const response = await fetch(`${API_URL}${query}`);
            if (!response.ok && response.status !== 404) {
                throw new Error('Did not receive expected data');
            }
            const resData = await response.json();
            setFetchError(null);
            setTrips(resData);
        } catch (error) {
            setFetchError(error.message);
            return [];
        } finally {
            setIsFetching(false);
        }
    };

    const filterBy = async (filter) => {
        console.log(trips);
        switch (filter) {
            case 'allTrips':
                await getFromServer();
                break;
            case 'country':
                await getFromServer({ type: "country", value: country });
                break;
            case 'myTrips':
                await getFromServer({ type: "myTrips", value: id });
                break;
            default:
                await getFromServer();
        }
    }

    const sortBy = (criteria) => {
        getFromServer({ sortBy: criteria });
    };

    const nextPage = () => {
        if (trips.length === ITEMS_PER_PAGE) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };
    //האם בטיחותי שהמזהה נמצא בURL
    //לשאול אם עדיף לשמור את התמונות בדרייב
    //מה עדיף: לשלוף פעם אחת את כל הטיולים ואז לסנן לפי הצורך==שליפה אחת או שלשלוף כל פעם מהשרת לפי הסינון הדרוש.
    if (isFetching) {
        return (
            <p>Loading...</p>
        )
    } else if (fetchError) {
        return (
            <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
        )
    } else if (addTrip) {
        return (
            <AddTrip />
        )
    } else {
        return (
            <div>
                <div className='trips'>
                    <div>
                        <label htmlFor="searchCountry">Search by country:</label>
                        <input
                            type="text"
                            placeholder="Search by country"
                            onChange={(event) => handleChangeCountry(event)}
                            name="country"
                            id="searchCountry"
                        />
                        <button onClick={() => filterBy("country")}>Q</button>
                    </div>
                    <div>
                        <button onClick={() => filterBy("allTrips")}>all trips</button>
                    </div>
                    <div>
                        <button onClick={() => filterBy("myTrips")}>my trips</button>
                    </div>
                    <div>
                        <button onClick={() => sortBy("likes")}>by likes</button>
                    </div>
                    <button onClick={() => setAddTrip(true)}>+</button>
                </div>
                <ol>
                    {trips.length && trips.map((trip) => (
                        <TripItem key={trip.id} trip={trip} id={id} />
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListTrips
// updatetrip={updatetrip} deletetrip={deletetrip}