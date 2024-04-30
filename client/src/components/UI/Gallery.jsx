import React from 'react';
import '../CSS/Gallery.css';
import { Link } from 'react-router-dom';

const Gallery = () => {
    const destinations = [
        { name: 'Mumbai', image: '../Mumbai.jpg' },
        { name: 'Chennai', image: '../Chennai.jpg' },
        { name: 'Delhi', image: '../Delhi.jpg' },
        { name: 'Hyderabad', image: '../Hyderabad.jpg' },
        { name: 'Goa', image: '../Goa.jpg' },
        { name: 'Bangalore', image: '../Bangalore.jpg' },
    ];
    return (
        <section id="gallery" className="gallery">
            <div className="container gallery-container">
                <div className="gallery-details">
                    <div className="gallary-header text-center">
                        <h2>Top Destination Places in INDIA</h2>
                    </div>
                    <div className="gallery-box">
                        <div className="gallery-content">
                            <div className="filtr-container">
                                <div className="row">
                                    {/* First Row */}
                                    <div className="col-md-6">
                                        <div className="filtr-item">
                                            <img src={destinations[0].image} alt={destinations[0].name} />
                                            <div className="item-title">
                                                <Link to=" " style={{textDecoration:"none"}}>{destinations[0].name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="filtr-item">
                                            <img src={destinations[1].image} alt={destinations[0].name} />
                                            <div className="item-title">
                                                <Link to=" " style={{textDecoration:"none"}}>{destinations[1].name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* Second Row */}
                                    <div className="col-md-4">
                                        <div className="filtr-item">
                                            <img src={destinations[2].image} alt={destinations[0].name} />
                                            <div className="item-title">
                                                <Link to=" " style={{textDecoration:"none"}}>{destinations[2].name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: '500px' }}>
                                        <div className="filtr-item">
                                            <img src={destinations[3].image} alt={destinations[0].name} />
                                            <div className="item-title">
                                                <Link to=" " style={{textDecoration:"none"}}>{destinations[3].name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: '500px' }}>
                                        <div className="filtr-item">
                                            <img src={destinations[4].image} alt={destinations[0].name} />
                                            <div className="item-title">
                                                <Link to=" " style={{textDecoration:"none"}}>{destinations[4].name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8" style={{ marginLeft: '380px', marginTop: '-500px' }}>
                                        <div className="filtr-item">
                                            <img src={destinations[5].image} alt={destinations[0].name} />
                                            <div className="item-title">
                                                <Link to=" " style={{textDecoration:"none"}}>{destinations[5].name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;