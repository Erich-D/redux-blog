import Body from '../../components/body/Body';
import LoginForm from '../../features/login/LoginForm';
import RegistrationForm from '../../features/registration/RegistrationForm';

export default function RegistrationPage() {
  return (
    <Body sidebar={false}>
      <RegistrationForm/>
    </Body>
  );
}