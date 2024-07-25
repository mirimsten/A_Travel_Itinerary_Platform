import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddTrip from './AddTrip';
import TripItem from './TripItem';
import Trip from './Trip';

const ITEMS_PER_PAGE = 5;

const ListTrips = () => {
    const id = JSON.parse(localStorage.getItem('usersInLS'))[0].id;
    const [trips, setTrips] = useState([]);
    const [addTrip, setAddTrip] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [country, setCountry] = useState("");
    const [page, setPage] = useState(0);
    const [filterType, setFilterType] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [sortCriteria, setSortCriteria] = useState("");
    const [userName, setUserName] = useState("");
    const [move, setMove] = useState(false);
    const [trip, setTrip] = useState({});
    const [trigger, setTrigger] = useState(false);

    const API_URL = "http://localhost:8080/trips";

    useEffect(() => {
        getFromServer({ type: filterType, value: filterValue, sortBy: sortCriteria, offset: page * ITEMS_PER_PAGE });
    }, [trigger, trip, page, filterType, filterValue, sortCriteria]);
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

    // useEffect(() => {
    //     getFromServer({ offset: page * ITEMS_PER_PAGE });
    // }, [page]);

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

    //קיימת בעיה: במעבר עמוד הסינונים מתבטלים

    const getFromServer = async ({ type = "", value = "", sortBy = "", limit = ITEMS_PER_PAGE, offset = 0 } = {}) => {
        try {
            let query = `?limit=${limit}&offset=${offset}`;
            switch (type) {
                case "":
                    break;
                case "country":
                    query += `&country=${value}`;
                    break;
                case "myTrips":
                    query += `&userId=${value}`;
                    break;
                default:
                    break;
            }

            if (sortBy) {
                query += `&sortBy=${sortBy}`;
            }

            setIsFetching(true);
            console.log(query);
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

    // const filterBy = async (filter) => {
    //     console.log(trips);
    //     switch (filter) {
    //         case 'allTrips':
    //             await getFromServer();
    //             break;
    //         case 'country':
    //             await getFromServer({ type: "country", value: country });
    //             break;
    //         case 'myTrips':
    //             await getFromServer({ type: "myTrips", value: id });
    //             break;
    //         default:
    //             await getFromServer();
    //     }
    // }

    // const sortBy = (criteria) => {
    //     getFromServer({ sortBy: criteria });
    // };

    const filterBy = (filter) => {
        setPage(0); // Reset page to 0 when applying a new filter
        switch (filter) {
            case 'allTrips':
                setFilterType("");
                setFilterValue("");
                break;
            case 'country':
                setFilterType("country");
                setFilterValue(country);
                console.log(country);
                break;
            case 'myTrips':
                setFilterType("myTrips");
                setFilterValue(id);
                break;
            default:
                setFilterType("");
                setFilterValue("");
        }
    };

    const sortBy = (criteria) => {
        setSortCriteria(criteria);
        setPage(0); // Reset page to 0 when applying a new sort
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

    const addTripToState = (newTrip) => {
        console.log(newTrip);
        // setTrips((prevTrips) => [newTrip, ...prevTrips]);
        setTrips((prevTrips) => [...prevTrips, newTrip[0]]);
        //setPage(0);
        setTrigger(prev => !prev);
        setAddTrip(false);
    };

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
            <AddTrip id={id} addTripToState={addTripToState} />
        )
    } else if (move) {
        return <Trip id={id} trips={trips} setTrips={setTrips} setMove={setMove} trip={trip} setTrip={setTrip} userName={userName}/>
    }
    else {
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
                    {trips.length > 0 && trips.map((trip) => (
                        <TripItem key={trip._id} trip={trip} setMove={setMove} setTrip={setTrip} setUserName={setUserName} userName={userName}/>
                    ))}
                </ol>
                {trips.length === 0 && <p>nothing else</p>}
                <div>
                    <button onClick={prevPage} disabled={page === 0}>Previous</button>
                    <button onClick={nextPage} disabled={trips.length < ITEMS_PER_PAGE}>Next</button>
                </div>
            </div>
        )
    }
}

export default ListTrips
// updatetrip={updatetrip} deletetrip={deletetrip}