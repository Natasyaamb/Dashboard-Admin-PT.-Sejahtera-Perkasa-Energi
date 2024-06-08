import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import Content from './components/content/Content';
import Registration from './Pages/auth/Registration/Registration';
import Login from './Pages/auth/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
class App extends React.Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true,
    };

    this.previousWidth = -1;
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile,
      });
    }

    this.previousWidth = width;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth.bind(this));
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const isLogin = localStorage.getItem('isLogin');
    return (
      <div className="App wrapper">
        {isLogin ? (
          <>
            <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
            <Content toggle={this.toggle} isOpen={this.state.isOpen} />
          </>
        ) : (
          <Router>
            <Routes>
              <Route exact path="/register" element={<Registration />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
