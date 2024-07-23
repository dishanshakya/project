import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { hostname } from ".";

export function Login() {
    const [passwordValue, setPasswordValue] = useState('');
    const [emailValue, setEmailValue] = useState('')
    const [passwordType, setPasswordType] = useState('password');
    const [responseStatus, setResponseStatus] = useState();
    const [warnings, setWarnings] = useState();
    const btn = useRef()

    if(responseStatus == 400) {
        setWarnings('Incorrect email or password!')
        setResponseStatus(null)
    }

    return ( (responseStatus == 200) ? <Navigate to='/' replace /> :
        <div id="LoginPage">
            <form onSubmit={async (event)=> {
                event.preventDefault()
                const response = await fetch(`${hostname}/api/v1/auth/login`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: 'include',
                    mode: 'cors',
                    body: JSON.stringify({
                        email: emailValue,
                        password: passwordValue
                    })
                }) 
                setResponseStatus(response.status)
                
            }}>
                <div className="logintext">Login</div>
                <input type="text" 
                    placeholder="Email" 
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    required />
                <input id="password" type={passwordType} placeholder="Password" minLength={8}
                value={passwordValue}
                onChange={(e)=>{
                    setPasswordValue(e.target.value);
                    setWarnings('');
                    if(e.target.value.length >=8){
                        btn.current.style.backgroundColor = '#0066ff';
                        btn.current.style.color = 'white';
                        btn.current.disabled = false;
                    }
                    else {
                        btn.current.style.backgroundColor = 'white';
                        btn.current.style.color = 'grey';
                        btn.current.disabled = true;
                    }

                }}required />
                <div id="showpass">
                    <input id="showpasscheck" type="checkbox" value="show password" onChange={()=>{
                        if(passwordType === 'text')
                            setPasswordType('password');
                        else setPasswordType('text');
                    }}/>
                    Show password
                </div>
                <div id="warnings">{warnings}</div>
                <button ref={btn} id="loginbtn" disabled>Login</button>
                <div id="switch">Or create an account <Link to='/signup' replace>here</Link></div>
            </form>
        </div>
    )
}

export function SignUp() {
    const [passwordType, setPasswordType] = useState('password');
    const [passwordValue, setPasswordValue] = useState('');
    const [warnings, setWarnings] = useState();
    const [name, setName] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [gender, setGender] = useState('0')
    const [responseStatus, setResponseStatus] = useState();
    const btn = useRef()
    const handle = (func, event) => {
        func(event.target.value)
    }
    if(responseStatus == 400) {
        setWarnings('Email alredy used!')
        setResponseStatus(null)
    }

    return ((responseStatus == 200) ? <Navigate to='/' replace /> :
        <div id="LoginPage">
            <form id="signup" onSubmit={async (e) => {
                e.preventDefault()
                const response = await fetch(`${hostname}/api/v1/auth/register`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: 'include',
                    mode: 'cors',
                    body: JSON.stringify({
                        username: name,
                        gender: gender,
                        email: emailValue,
                        password: passwordValue
                    })
                })
                setResponseStatus(response.status)
            }}>
                <div className="logintext">Fill in the details</div>
                <input type="text" value={name} placeholder="Name" 
                    required onChange={(e)=> handle(setName,e)}/>
                    <select id="selectmale" onChange={(e)=> handle(setGender, e)}>
                        <option value={0}>Male</option>
                        <option value={1}>Female</option>
                    </select>
                <input type="email" value={emailValue} placeholder="Email" 
                    required onChange={(e)=>{
                        handle(setEmailValue,e)
                        setWarnings('')
                    }}/>
                <input id="password" type={passwordType}
                    placeholder="Password" minLength={8} value={passwordValue}
                    onChange={(e)=>{
                        setPasswordValue(e.target.value);
                        if(e.target.value.length < 8 && e.target.value.length > 0)
                            setWarnings('8 or more characters required');
                        else setWarnings('');
                    }}required />
                
                <input  id="cpassword" type={passwordType} 
                placeholder="Confirm Password" minLength={8} 
                onChange={(e)=> {
                    if(passwordValue !== e.target.value)
                        setWarnings('Passwords don\'t match');
                    else {
                        setWarnings('');
                        btn.current.disabled = false;
                        btn.current.style.backgroundColor = '#0066ff';
                        btn.current.style.color = 'white';
                    }
                }}required />
                <div id="warnings">{warnings}</div>
                <div id="showpass">
                    <input id="showpasscheck" type="checkbox" value="show password" onChange={()=>{
                        if(passwordType === 'text')
                            setPasswordType('password');
                        else setPasswordType('text');
                    }}/>
                    Show password
                </div>
                <button ref={btn} id="signbtn" disabled>Create Account</button>
                <div id="switch">Have an account? Login <Link to='/login' replace>here</Link></div>
            </form>
        </div>
    )
}
