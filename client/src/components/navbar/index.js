import { IoMdSettings, IoIosHome } from 'react-icons/io';
import { GiCook } from 'react-icons/gi';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './style.css';

function BasicExample() {
  const baseURL = process.env.PUBLIC_URL;
  
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              <IoIosHome className='icon'/>
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <GiCook className='icon'/>
            </Nav.Link>
            <Nav.Link as={Link} to="/settings">
              <IoMdSettings className='icon'/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand href="#home" id="text-center">Chefs Kiss
        <img src= {`${baseURL}/kissing-chef.png`} style={{width:50, marginTop: -7}} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
