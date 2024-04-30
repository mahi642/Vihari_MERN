import React, { useState, useEffect } from 'react';
import AgentAvatar from '../Assets/Agent_avatar.jpg';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/UI/AdminNavbar';
import { useGetAllAgentsQuery, useAcceptAgentMutation, useRejectAgentMutation, useBlockAgentMutation, useUnblockAgentMutation } from "../Slices/adminApiSlice";
import Loader from '../components/Loader/Loader';

const AllAgents = () => {
    const [agents, setAgents] = useState([]);
    const { data: agentData, isLoading, refetch } = useGetAllAgentsQuery();
    const [acceptAgent] = useAcceptAgentMutation();
    const [rejectAgent] = useRejectAgentMutation();
    const [blockAgent] = useBlockAgentMutation();
    const [unblockAgent] = useUnblockAgentMutation();
    const [selectedAgentId, setSelectedAgentId] = useState(null);

    useEffect(() => {
        if (agentData) {
            setAgents(agentData.agents);
        }
    }, [agentData]);

    const handleAccept = async (agentId) => {
        try {
            await acceptAgent(agentId).unwrap();
            refetch();
        } catch (error) {
            console.error("Error accepting agent:", error);
        }
    };

    const handleReject = async (agentId) => {
        try {
            const confirmed = window.confirm('Are you sure you want to reject this agent?');
            if (!confirmed) {
                return;
            }
            await rejectAgent(agentId).unwrap();
            alert("Agent rejected successfully");
            await refetch();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleBlock = async (agentId) => {
        try {
            await blockAgent(agentId).unwrap();
            refetch();
        } catch (error) {
            console.error("Error blocking agent:", error);
        }
    };

    const handleUnblock = async (agentId) => {
        try {
            await unblockAgent(agentId).unwrap();
            refetch();
        } catch (error) {
            console.error("Error unblocking agent:", error);
        }
    };

    if (isLoading) return <Loader />;

    const renderAgentActions = (agent) => {
        if (agent.flag === 0) {
            return (
                <>
                    <button
                        type="button"
                        className="accept-agent-btn btn btn-success"
                        style={{ fontSize: '15px' }}
                        data-agent-id={agent.id}
                        onClick={() => handleAccept(agent._id)}
                    >
                        Accept
                    </button>
                    <button
                        type="button"
                        className="reject-agent-btn btn btn-danger"
                        style={{ fontSize: '15px' }}
                        data-agent-id={agent.id}
                        onClick={() => handleReject(agent._id)}
                    >
                        Reject
                    </button>
                    <a style={{ textDecoration: 'none', fontSize: '15px', padding: '5px', backgroundColor: 'blue', color: 'white', borderRadius: '3px' }}
                        href={`http://localhost:4000/${agent.document ? agent.document.replace(/^.*backend\\/i, "") : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handlePdfLinkClick(agent._id)}
                    >
                        Show
                    </a>
                </>
            );
        } else if (agent.blocked) {
            return (
                <button
                    type="button"
                    className="unblock-agent-btn btn btn-info"
                    style={{ fontSize: '15px' }}
                    data-agent-id={agent.id}
                    onClick={() => handleUnblock(agent._id)}
                >
                    Unblock
                </button>
            );
        } else {
            return (
                <button
                    type="button"
                    className="block-agent-btn btn btn-warning"
                    style={{ fontSize: '15px' }}
                    data-agent-id={agent.id}
                    onClick={() => handleBlock(agent._id)}
                >
                    Block
                </button>
            );
        }
    };

    const handlePdfLinkClick = (agentId) => {
        setSelectedAgentId(agentId === selectedAgentId ? null : agentId);
    };

    return (
        <div>
            <AdminNavbar />
            <div>
                <h1>Agent Details</h1>
            </div>
            <hr />
            {agents.length === 0 && (<h1>No Agents Found</h1>)}
            {agents.map((agent, index) => (
                <div className="row col-md-12 justify-content-center" key={agent._id}>
                    <div className="col-md-1"></div>
                    <div className="col-md-10" id={`user-item-${agent._id}`}>
                        <div className="item-container">
                            <div className="item-image col-md-3">
                                <img
                                    className="img-thumbnail item-image"
                                    src={AgentAvatar}
                                    style={{ width: '200px' }}
                                    alt="Cannot display"
                                />
                            </div>
                            <div className="item-content col-md-6 userdetails">
                                <div>
                                    <h3>Agent {index + 1}</h3>
                                </div>
                                <div>
                                    <p>Agency Name: {agent.agentName}</p>
                                </div>
                                <div>
                                    <p>Agency Email: {agent.email}</p>
                                </div>
                            </div>
                            <div className="col-md-1" style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                {renderAgentActions(agent)}

                            </div>

                            {/* {selectedAgentId === agent._id && agent.document && (
                                <iframe
                                    src={`http://localhost:4000/${agent.document.replace(/^.*backend\\/i, "")}`}
                                    title={`PDF Viewer - Agent ${agent._id}`}
                                    style={{ width: '100%', height: '500px', border: '1px solid #ddd', marginTop: '10px' }}
                                ></iframe>
                            )} */}
                        </div>
                        <div>
                            <hr />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllAgents;
