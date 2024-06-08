import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMoneyBill,
  faInfoCircle,
  faTruck,
  faTimes,
  faUsersCog,
  faPersonCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button, Dropdown, DropdownItem, Navbar } from "react-bootstrap";
import classNames from "classnames";
import { Link } from 'react-router-dom';
import "./SideBar.css";
import logout from '../assets/logout.png'

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDropdown: false
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpenDropdown: !prevState.isOpenDropdown
    }));
  }

  handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/login';
  }

  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          
          <Dropdown show={this.state.isOpenDropdown} onToggle={this.toggleDropdown}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ 
              backgroundColor: "transparent", 
              border: "none",
              marginTop: "30px",
              marginLeft: "22px",
              
              
            }}>
              <div className="admin">
                <span className="logo">
                  <FontAwesomeIcon icon={faUser} size="2x" className="logoadmin" />
                  ADMIN
                </span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handleLogout}>
                <img src={logout} alt="logout" className="logout-icon" />
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <hr/>
          <div className="dashboard">
            <span className="logo"> DASHBOARD</span>
          </div>
          <hr/>
        </div>
        
        <Nav className="flex-column pt-2">
          <div className="fitur">FITUR</div>
          <Nav.Item className={window.location.href.includes('/status-supir') ? 'active' : ''} >
            
            <Nav.Link href="/status-supir" className="navcolor"  >
              <FontAwesomeIcon icon={faPersonCircleCheck} className="mr-2" />
              STATUS SUPIR
            </Nav.Link>
          
          </Nav.Item>

          <Nav.Item className={window.location.href.includes('/surat-jalan-supir') ? 'active' : ''} >
            <Nav.Link href="/surat-jalan-supir" className="navcolor">
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              SURAT JALAN & BAST
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/gaji-supir" className="navcolor">
              <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
              GAJI SUPIR
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className={window.location.href.includes('/user-manajemen') ? 'active' : ''}>
            <Nav.Link href="/user-manajemen" className="navcolor">
              <FontAwesomeIcon icon={faUsersCog} className="mr-2" />
              USER MANAJEMEN
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="https://ptsejahteraperkasaenergi.000webhostapp.com/" className="navcolor">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              WEBSITE
            </Nav.Link>
          </Nav.Item>

        </Nav>
      </div>
    );
  }
}

export default SideBar;
