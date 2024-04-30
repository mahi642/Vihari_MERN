import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/CSS/AdminDasboard.css";
import AgentNavbar from "../components/UI/AgentNavbar";
import { useGetAgentBusesQuery, useDeleteBusMutation } from '../Slices/agentApiSlice'
import Loader from '../components/Loader/Loader';

const AgentBuses = () => {
    const [Buses, setAllBuses] = useState([]);
    const getAgentId = () => {
        const agentId = localStorage.getItem('agentId');
        return agentId;
    }

    const agentId = localStorage.getItem('agentId');
    console.log(agentId);

    const { data: BusData, isLoading, refetch } = useGetAgentBusesQuery(agentId);

    const [deleteBus] = useDeleteBusMutation();

    useEffect(() => {
        if (BusData) {
            setAllBuses(BusData.buses);
            console.log(BusData.buses);
        }
    }, [BusData]);


    const handleDeleteBus = async (busId) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this bus?');
            if (!confirmed) {
                return;
            }
            await deleteBus(busId).unwrap();
            alert("Bus deleted successfully");
            await refetch();
        } catch (error) {
            console.error("Error deleting bus:", error);
        }
    };


    if (isLoading) return <Loader />;
    return (
        <div>
            <AgentNavbar />
            <div>
                <h1>Buses Details</h1>
            </div>
            <Link to="/agent/addbus">
                <button className="addnew btn btn-success" type="button" style={{ fontSize: '15px' }}>
                    <i className="fa fa-user-plus"></i>&nbsp; Add New Bus
                </button>
            </Link>
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
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Buses.map((bus) => (
                        <tr key={bus._id} className='bus-row'>
                            <td>
                                <img
                                    src={`http://localhost:4000/${bus.Imageurl.replace(/\\/g, '/').replace('backend/', '')}`}
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
                            <td style={{ display: 'flex', flexDirection: 'column' ,gap: '7px'}}>

                                <Link to={`/getUserDetails/${bus._id}`}>
                                    <button className="btn btn-success" style={{ textDecoration: 'none', fontSize: '13px', padding: '5px', backgroundColor: 'blue', color: 'white', borderRadius: '3px' }}> Bookings</button>
                                </Link>

                                <Link to={`/agent/editbus/${bus._id}`}>
                                    <button className="btn btn-success" style={{ fontSize: '13px' }}> Edit Bus</button>
                                </Link>


                                {/* written now */}





                                <button
                                    type="button" style={{ fontSize: '13px',width:'65px',marginLeft:'4px'}}
                                    className="delete-bus-btn btn btn-danger"
                                    data-bus-id={bus.id}
                                    onClick={() => handleDeleteBus(bus._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AgentBuses;
