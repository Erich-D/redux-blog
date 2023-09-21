import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const useKeyPress = (keys:string[], callback:any, node:HTMLElement|null = null) => {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event:any) => {
      // check if one of the key is part of the ones we want
      if (keys.some((key) => event.key === key)) {
        callbackRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? window;
    // attach the event listener
    targetNode &&
      targetNode.addEventListener("keydown", handleKeyPress);
      targetNode.addEventListener("keyup", handleKeyPress);
    // remove the event listener
    return () =>{
      targetNode &&
        targetNode.removeEventListener("keydown", handleKeyPress);
        targetNode.removeEventListener("keyup", handleKeyPress);
    }
  }, [handleKeyPress, node]);
};

export default useKeyPress
