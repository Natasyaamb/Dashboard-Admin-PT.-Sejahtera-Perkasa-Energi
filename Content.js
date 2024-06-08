import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";
import AddSupir from '../../Pages/AddSupir';
import LihatSupir from '../../Pages/LihatSupir';
import EditSupir from '../../Pages/EditSupir';
import StatusSupir from '../../Pages/StatusSupir';
import SuratJalanSupir from '../../Pages/SuratJalanSupir';
import GajiSupir from '../../Pages/GajiSupir';
import UserManajemen from '../../Pages/UserManajemen';
import DownPayment from '../DownPayment/DownPayment';
import Pelunasan from '../Pelunasan/Pelunasan';
import LaporanSJ from '../../Pages/LaporanSJ';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { userInputs } from "../../formSource";
import "./Content.css";

class Content extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        {/* <NavBar toggle={this.props.toggle} /> */}
        <Router>
          <Routes>
            <Route exact path="/add-supir" element={<AddSupir inputs={userInputs}/>}>
            </Route>
            <Route exact path="/lihat-supir/:id" element={<LihatSupir />} />
            <Route exact path="/edit-supir/:id" element={<EditSupir />} />
            <Route exact path="/status-supir" element={<StatusSupir />} />
            <Route exact path="/surat-jalan-supir" element={<SuratJalanSupir />} />
            <Route exact path="/gaji-supir" element={<GajiSupir />} />
            <Route exact path="/user-manajemen" element={<UserManajemen />} />
            <Route exact path="/down-payment/:selectedDocId" element={<DownPayment />} />
            <Route exact path="/pelunasan/:selectedDocId" element={<Pelunasan />} />
            <Route exact path="/laporan-sjbast" element={<LaporanSJ />} />
            
          </Routes>
        </Router>
      </Container>
    );
  }
}

export default Content;