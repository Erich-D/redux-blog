import { FormEvent, useState } from "react";
import FormBuilder from "../../components/formbuilder/FormBuilder";
import { useRegisterUserMutation } from "./registrationApi";
import { useAppDispatch } from "../../store/hooks";
import { flash } from "../flashmessage/flashMessageSlice";

export const RegistrationFormDef = `
    {
        "register":{
            "username": "text",
            "email": "email",
            "password": "password",
            "password2": "password",
            "about_me": "text"
        }
    }
`
// Generated by https://quicktype.io

export interface Register {
    username: string;
    email:    string;
    password: string;
    password2:string;
    about_me: string;
}

const registerInitState = {
    username: "",
    email:    "",
    password: "",
    password2:"",
    about_me: "",
}

export interface RegisterProps {
    initState?:Register
}

export default function RegistrationForm({initState=registerInitState}:RegisterProps){

    const [form, setForm] = useState<Register>(initState)
    const [errors, setErrors] = useState<Register>(registerInitState)
    const [registerUser, {isLoading, isError}] = useRegisterUserMutation()
    const dispatch = useAppDispatch();

    function updateForm(e:React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.id)
        let error:string = "";
        switch(e.target.id){
            case 'username':
                error = e.target.value.length<3 ? "Username must have at least 3 characters":"";
                break;
            case 'email':
                error = e.target.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? "":"Not a valid email address";
                break;
            case 'password':
                error = e.target.value.length<7 ? "Password must have at least 7 characters":"";
                break;
            case 'password2':
                error = e.target.value!==form.password ? "Passwords must match":"";
                break;
            default:
                break;
        }
        setErrors({...errors, [e.target.id]:error});
        setForm({...form, [e.target.id]:e.target.value});
    }

    const canSave = [form.username, form.email, form.password].every(Boolean)&&[errors.username,errors.password,errors.email,errors.password2].every(v=>!v);

    async function submitForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log(form)
        //remove extra password if form passes client side validation
        const newForm = (({username, email, password, about_me})=>({username, email, password, about_me}))(form)
        if(canSave){
            try{
                const response = await registerUser(newForm).unwrap()
                console.log(response)
                dispatch(flash({flashMessage:{
                    type: "success",
                    message: "You have successfully registered!"
                }}))
                setForm(registerInitState)
            }catch(err){
                console.error('Failed to save', err)
            }
        }
    }

    const handlers = {
        username: [form.username,updateForm],
        email:    [form.email,updateForm],
        password: [form.password,updateForm],
        password2:[form.password2,updateForm],
        about_me: [form.about_me,updateForm],
    }

    return<>
        <FormBuilder def={RegistrationFormDef} formHandler={submitForm } buttonText={"Submit"} handlers={handlers} errors={errors}/>
    </>
}