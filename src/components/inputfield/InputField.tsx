import { RefObject } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './inputFieldStyle.module.css'


interface InputFieldProps{
    name:string 
    label?:string | undefined
    type:string 
    placeholder?:string | undefined
    error:string 
    fieldRef?: RefObject<HTMLInputElement> | undefined
    handlers: any
}

export default function InputField(
  { name, label, type, placeholder, error, fieldRef, handlers }:InputFieldProps
) {
  return (
    <Form.Group controlId={name} className={styles.InputField}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldRef}
        value={handlers[0]}
        onChange={handlers[1]}
      />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}