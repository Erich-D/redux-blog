import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import styles from './headerStyle.module.css';

export default function Header() {
  return (
    <Navbar bg="light" sticky="top" className={styles.Header}>
      <Container>
        <Navbar.Brand>Microblog</Navbar.Brand>
      </Container>
    </Navbar>
  );
}