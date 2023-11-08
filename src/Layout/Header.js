import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const StemNavBar = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">StemNav</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default StemNavBar;