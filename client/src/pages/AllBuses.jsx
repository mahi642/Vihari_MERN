import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/CSS/AdminDasboard.css";
import AdminNavbar1 from "../components/UI/AdminNavbar";
import { useGetAllBusesQuery } from '../Slices/agentApiSlice'
import Loader from '../components/Loader/Loader';

const AllBuses = () => {
    const [Buses, setAllBuses] = useState([]);

    const { data: BusData, isLoading } = useGetAllBusesQuery();

    useEffect(() => {
        if (BusData) {
            const updatedBusdata = BusData.buses.map(bus => ({
                ...bus,
                Imageurl: bus.Imageurl.replace(/^.*backend\\/i, "") // Remove "backend\" from the beginning of the Imageurl
            }))
            setAllBuses(updatedBusdata);
        }
    }, [BusData]);

    if (isLoading) return <Loader />;
    return (
        <div>
            <AdminNavbar1 />
            <div>
                <h1>Buses Details</h1>
            </div>
            <hr />

            <table className="table" style={{ padding: '5px' }}>
                <thead>
                    <tr>
                        <th scope="col">Bus Image</th>
                        <th scope="col">Bus Name</th>
                        <th scope="col">Source Name</th>
                        <th scope="col">Destination name</th>
                        <th scope="col">Departure Time</th>
                        <th scope="col">Arrival Time</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Bus Type</th>
                        <th scope="col">Fare (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {Buses.map((bus) => (
                        <tr key={bus._id} className='bus-row'>
                            <td>
                                <img
                                    src={`http://localhost:4000/${bus.Imageurl}`}
                                    alt=""
                                    style={{ height: '80px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{bus.trname}</td>
                            <td>{bus.srcname}</td>
                            <td>{bus.destname}</td>
                            <td>{bus.deptime}</td>
                            <td>{bus.arrtime}</td>
                            <td>{bus.durtime}</td>
                            <td>{bus.btype}</td>
                            <td>₹{bus.tktprice}</td>
                            <td style={{ display: 'flex', flexDirection: 'column' }}>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllBuses;
