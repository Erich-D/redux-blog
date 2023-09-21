import { Link } from 'react-router-dom';
import Body from '../../components/body/Body';
import LoginForm from '../../features/login/LoginForm';

export default function LoginPage() {
  return (
    <Body sidebar={false}>
      <LoginForm/>
      <hr />
      <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p>
    </Body>
  );
}