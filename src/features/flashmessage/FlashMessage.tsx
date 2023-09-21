import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideFlash, selectDuration, selectFlashMessage, selectVisible } from './flashMessageSlice';
import { useEffect } from 'react';

export default function FlashMessage() {
  const flashMessage = useAppSelector(selectFlashMessage);
  const visible = useAppSelector(selectVisible);
  const duration = useAppSelector(selectDuration);
  const dispatch = useAppDispatch();
  let timer: NodeJS.Timeout | undefined;
  useEffect(()=>{
    if(timer){clearTimeout(timer)}
    console.log(timer)
    if(duration){timer = setTimeout(()=>{dispatch(hideFlash())},duration ? duration:10)}
  },[duration])

  return (
    <Collapse in={visible}>
      <div>
        <Alert variant={flashMessage.type || 'info'} dismissible
          onClose={()=>dispatch(hideFlash(undefined))}>
          {flashMessage.message}
        </Alert>
      </div>
    </Collapse>
  );
}