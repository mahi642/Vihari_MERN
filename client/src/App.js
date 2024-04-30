
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import PrivateRoute from './privateroutes/PrivateRoutes'
import UserState from './context/User/UserState';
import Layout from './components/UI/Layout';

import Tours from './pages/Tours';

import AddBus from './pages/AddBus';
import AllBuses from './pages/AllBuses';
import EditBus from './pages/EditBus';
import AllUsers from './pages/AllUsers';
import AddUser from './pages/AddUser';
import About from './pages/About';
import Gallery from './components/UI/Gallery';

import BusList from './components/UI/BusList';

import AddTour from './pages/AddTour';
import AllTours from './pages/AllTours';
import EditTour from './pages/EditTour';
import TourDetails from './pages/TourDetails';
import TourPlaces from './pages/TourPlaces';
import AddPlace from './pages/AddPlace';
import BusState from './context/bus/BusState';
import PassengerDetails from './components/UI/PassengerDetails';
import BookTour from './pages/BookTour';
import Contact from './pages/Contact';
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AdminAnnouncementForm from './pages/Announcements';
import AdminHome from './pages/AdminHome';
import AgentHome from './pages/AgentHome';
import AgentSignUp from './pages/AgentSignUp';
import AgentBuses from "./pages/agentBuses";
import AllAgents from "./pages/AllAgents";
import AgentProfile from "./pages/agentProfile";
import EditAgentProfile from "./pages/editAgentProfile";
import Approval from "./pages/Approval";
import AgentLogin from './pages/AgentLogin';
import GetUsersByBusId from './pages/GetUsersByBusId';
import GetUsersByTourId from './pages/GetUsersByTourId';
function App() {
  return (
    <div className="App">
      <BusState>
      <UserState>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Home/>}/>
          <Route exact path='/login' element={ <Login/>}/>
          <Route exact path='/layout' element={ <Layout/>}/>
          <Route exact path='/tours' element={<Tours/>}/>
          <Route exact path='/Gallery' element={<Gallery/>}/>
          <Route exact  path='/buses' element={<BusList/>}/>
          <Route exact path='/agentSignUp' element={<AgentSignUp/>}/>
          <Route exact path='/agentLogin' element={<AgentLogin/>}/>
          <Route exact  path='/passengers' element={<PassengerDetails/>}/>

              <Route exact path="/agent/allbuses" element={<AgentBuses />} />
              <Route exact path="/admindb/allusers" element={<AllUsers />} />
              <Route exact path="/agent/alltours" element={<AllTours />} />
              <Route exact path="/agent/addbus" element={<AddBus />} />
              <Route exact path="/agent/agentProfile" element={<AgentProfile />} />
              <Route exact path='/agent/editAgentProfile' element={<EditAgentProfile />} />
              <Route exact path="/admindb/adduser" element={<AddUser />} />
              <Route exact path="/agent/addtour" element={<AddTour />} />
              <Route
                exact
                path="/admindb/addplace/:id"
                element={<AddPlace />}
              />
              <Route exact path ="/admindb/allbuses" element={<AllBuses />} />
              <Route exact path="/admindb/editbus/:id" element={<EditBus />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/admindb/adminhome" element={<AdminHome />} />
              <Route exact path="/admindb/edittour/:id" element={<EditTour />} />
              <Route exact path="/admindb/opentour/:id" element={<TourDetails />}/>
              <Route exact path="/agent/edittour/:id" element={<EditTour />} />
              <Route exact path="/agent/opentour/:id"
                element={<TourDetails />}
              />
              <Route exact path = "/tourplaces/:id" element={<TourPlaces />} />
              <Route
                exact
                path="/admindb/booktour/:id"
                element={<BookTour />}
              />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/profile" element={<PrivateRoute role={"user"}><Profile /></PrivateRoute>} />
              <Route exact path="/agentSignUp" element={<AgentSignUp />} />
              <Route exact path="/agentLogin" element={<AgentLogin />} />
             <Route exact path = "/waitForApproval" element = {<Approval/>}/>
              <Route
                exact
                path="/profile/editUserProfile"
                element={<EditProfile />}
              />

          <Route exact path='/agent/allbuses' element={<AllBuses/>} />
          <Route exact path='/admindb/allusers' element={<AllUsers/>} />
          <Route exact path='/admindb/allagents' element={<AllAgents/>} />
          <Route exact path='/agent/alltours' element={<AllTours/>}/>
          <Route exact path='/agent/addbus' element={<AddBus/>}/>
          <Route exact path='/admindb/adduser' element={<AddUser/>}/>
          <Route exact path='/agent/addtour' element={<AddTour/>}/>
          <Route exact path='/agent/addplace/:id' element={<AddPlace/>}/>
          <Route exact path="/agent/editbus/:id" element={ <EditBus/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/admindb/adminhome' element={<AdminHome/>}/>
          <Route exact path='/agent/agenthome' element={<PrivateRoute role="agent"><AgentHome /></PrivateRoute>}/>
          <Route exact path="/agent/edittour/:id" element={ <EditTour/>}/>
          <Route exact path="/agent/opentour/:id" element={ <TourDetails/>}/>
          <Route exact path='/admindb/booktour/:id' element={ <BookTour/>}/>
          <Route exact path='/contact' element={ <Contact/>}/>
          <Route exact path='/admindb/announcements' element={ <AdminAnnouncementForm/> }/>
          <Route path="*" element={<h1>Page Not Found</h1>} />
          <Route path="/getUserDetails/:busId" element={<GetUsersByBusId/>} />
          <Route path="/getUserDetails/:tourId" element={<GetUsersByTourId/>} />
        </Routes>
    </Router>
    </UserState>
    </BusState>
    </div>
  );
}

export default App;