import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../context/User/userContext';

const BusNav = () => {
  const {searchDetails,updateSearch} = useContext(userContext)
  const [srcname, setSrcname] = useState(searchDetails.srcname);
  const [destname, setDestname] = useState(searchDetails.destname);
  const [journeyDate, setJourneyDate] = useState(searchDetails.date);

  const handleSearch = () => {
    // Add your logic to handle bus ticket search based on the entered information
     if(srcname!=='' && destname!==''&& journeyDate!==''){
        updateSearch(srcname,destname,journeyDate)
   }
    // Add logic to process the search (e.g., redirect to a search results page)

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container" style={{padding:'1%'}}>
        <Link className="navbar-brand " style={{fontSize:'17px'}} to='/'>Home</Link>

        <div className="navbar-collapse">
          <div className="navbar-nav">
            <span className="nav-item bus-nav-item  mx-5">
              <input
                type="text"
                className="form-control bus-nav-input"
                value={srcname}
                onChange={(e) => setSrcname(e.target.value)}
                placeholder="Enter source"
              />
            </span>
            <span className="nav-item bus-nav-item  mx-5">
              <input
                type="text"
                className="form-control bus-nav-input"
                value={destname}
                onChange={(e) => setDestname(e.target.value)}
                placeholder="Enter destination"
              />
            </span>
            <span className="nav-item bus-nav-item  mx-5">
              <input
                type="date"
                className="form-control bus-nav-input"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
              />
            </span>
            <span className="nav-item mx-5">
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                style={{fontSize:'15px',color:'whitesmoke'}}
              >
                Modify search
              </button>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BusNav;
