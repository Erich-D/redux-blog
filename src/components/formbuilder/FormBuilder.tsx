import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputField from "../inputfield/InputField";


type FormProps = {
    def:string;
    formHandler:React.FormEventHandler<HTMLFormElement>;
    buttonText:string;
    handlers:any;
    errors:any
}

export default function FormBuilder(props:FormProps){
    
    const inputDefs = JSON.parse(props.def);

    const inputFields = ()=> {
        const fields = [];
        for(let key in inputDefs){
            fields.push(
                <fieldset key={key} >
                    <legend >{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, c=>c.toLocaleUpperCase())}</legend>
                    {getInputs(inputDefs[key])}
                </fieldset>
            )
        }
        return fields;
    };

    function getInputs(inputobject: any){
        const inputs = [];
        for(let key in inputobject){
            inputs.push(
                <InputField key={key} name={key} label={key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, c => c.toLocaleUpperCase())} type={inputobject[key]} error={props.errors[key]} handlers={props.handlers[key]} />
            )
        }
        return inputs
    }

    const newForm = inputFields();

    return <>
        <Form onSubmit={props.formHandler}>
            {newForm}
            <Button variant="primary" type='submit'>{props.buttonText}</Button>   
        </Form>
        
        </>
}