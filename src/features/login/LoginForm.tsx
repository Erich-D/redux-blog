import { useState } from "react";
import FormBuilder from "../../components/formbuilder/FormBuilder";

export const LoginFormDef = `
    {
        "login":{
            "username":"text",
            "password":"password"
        }
    }
`

interface LoginFormErrors{
    username:string 
    password:string
}

export default function LoginForm(){
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<LoginFormErrors>({username:'',password:''});

    function changeUsername(e:React.ChangeEvent<HTMLInputElement>){
        const error:string = e.target.value.length<3 ? "Username must have at least 3 characters":""
        setErrors({...errors, username:error})
        setUserName(e.target.value)
        console.log("usernamr field changed")
    }

    function changePassword(e:React.ChangeEvent<HTMLInputElement>){
        const error:string = e.target.value.length<7 ? "Password must have at least 7 characters":""
        setErrors({...errors, password:error})
        setPassword(e.target.value)
        console.log("password change fired")
    }

    function submitForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(username)
        console.log(password)
    }

    const handlers = {username:[username, changeUsername],password:[password, changePassword]}

    return(
        <>
            <FormBuilder def={LoginFormDef} formHandler={submitForm} buttonText={"Submit"} handlers={handlers} errors={errors}/>
        </>
    )
}