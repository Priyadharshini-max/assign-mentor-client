import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Creatementor from "./Pages/createMentor";
import Createstudent from "./Pages/createStudent";
import Assignmentor from "./Pages/AssignMentor";
import AssignParticularStudent from "./Pages/assignParticularStudent";
import DisplayDetails from "./Pages/displayAllDetails";
import { ToastContainer } from 'react-toastify';
import NavbarComponent from "../src/Component/Navbar.component";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Creatementor} />
        <Route exact path="/creatementor" component={Creatementor} />
        <Route exact path="/assignmentor" component={Assignmentor} />
        <Route exact path="/createstudent" component={Createstudent} />
        <Route exact path="/assignparticularstudent" component={AssignParticularStudent} />
        <Route exact path="/displaydetails" component={DisplayDetails} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
