import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "./Sidebar.module.css"
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    
  return (
    <Navbar sticky="top" className={`flex-column ${styles.Sidebar}`}>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/" end>Feed</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/explore">Explore</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/test">Test</Nav.Link>
      </Nav.Item>
    </Navbar>
  );
}