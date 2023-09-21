import { useParams } from 'react-router-dom';
import Body from '../../components/body/Body';
import User from '../../features/user/User';

export default function UserPage() {
  const { username } = useParams();
  

  return (
    <Body sidebar>
        <User name={username!}/>
    </Body>
  );
}