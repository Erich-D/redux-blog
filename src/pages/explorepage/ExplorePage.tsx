import Body from '../../components/body/Body';
import Posts from '../../features/posts/Posts';

export default function ExplorePage() {
  return (
    <Body sidebar>
      <Posts content='explore' />
    </Body>
  );
}