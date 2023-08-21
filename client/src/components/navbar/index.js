import { IoMdSettings, IoIosHome } from 'react-icons/io';
import { GiCook } from 'react-icons/gi';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './style.css';

function BasicExample() {
  const baseURL = process.env.PUBLIC_URL;
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">
              <IoIosHome className='icon'/>
            </Nav.Link>
            <Nav.Link href="/profile">
              <GiCook className='icon'/>
            </Nav.Link>
            <Nav.Link href="/settings">
              <IoMdSettings className='icon'/>
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
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