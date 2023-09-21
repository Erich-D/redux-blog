import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Sidebar from '../sidebar/Sidebar';
import { PropsWithChildren } from 'react';
import FlashMessage from '../../features/flashmessage/FlashMessage';

interface BodyType{
    sidebar:boolean
}


export default function Body({ sidebar, children }:PropsWithChildren<BodyType>) {
  return (
    <Container>
      <Stack direction="horizontal" className="Body">
        {sidebar && <Sidebar />}
        <Container className="Content">
          <FlashMessage/>
          {children}
        </Container>
      </Stack>
    </Container>
  );
}