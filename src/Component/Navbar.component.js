import React from "react"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavbarComponent() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/creatementor">Create Mentor</Nav.Link>
                        <Nav.Link as={Link} to="/createstudent">Create Student</Nav.Link>
                        <NavDropdown title="Categories" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/assignmentor">Assign Mentor</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/assignparticularstudent">Assign or Change Mentor for Particular Student</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/displaydetails">Display all Students</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};


export default NavbarComponent;