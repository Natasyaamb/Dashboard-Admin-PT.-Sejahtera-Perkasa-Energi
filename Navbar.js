import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import "./Navbar.css";
import { Space, Tag, Table, Modal, Breadcrumb, Form, Input, Select, DatePicker } from 'antd';

class NavBar extends React.Component {
  handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/login';
  }
  
  render() {
    const { title } = this.props; // Mengambil judul dari props

    console.log('Rendering NavBar with title:', title); // Tambahkan log ini

    return (
      <div className="top-navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outline-info" className="custom-toggle-btn" onClick={this.props.toggle}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </Button>
          <div style={{ marginLeft: '10px' }}>
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: 'Home',
                },
                {
                  title: title, // Menggunakan judul dari props
                  href: 'javascript:void(0)'
                }
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
