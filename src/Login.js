import { Link } from "react-router-dom"
import { useState } from "react";

export function Login() {
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const btn = document.getElementById('loginbtn');
    console.log(btn)
    return (
        <div id="LoginPage">
            <form>
                <div className="logintext">Login</div>
                <input type="text" placeholder="Email" required /><br/>
                <input id="password" type={passwordType} placeholder="Password" 
                value={passwordValue}
                onChange={(e)=>{
                    setPasswordValue(e.target.value);
                    if(passwordValue.length >=8){
                        btn.style.backgroundColor = '#0066ff';
                        btn.style.color = 'white';
                        btn.disabled = false;
                    }

                }}required /><br/>
                <div id="showpass">
                    <input id="showpasscheck" type="checkbox" value="show password" onChange={()=>{
                        if(passwordType === 'text')
                            setPasswordType('password');
                        else setPasswordType('text');
                    }}/>
                    Show password
                </div>
                <button id="loginbtn" disabled>Login</button>
                <br/>
                <div id="switch">Or create an account <Link to='/signup'>here</Link></div>
            </form>
        </div>
    )
}

export function SignUp() {
    const [passwordType, setPasswordType] = useState('password');
    const [passwordValue, setPasswordValue] = useState('');
    const [warnings, setWarnings] = useState();
    const btn = document.getElementById('signbtn');
    console.log(btn)
    
    return (
        <div id="LoginPage">
            <form id="signup">
                <div className="logintext">Fill in the details</div>
                <input type="text" placeholder="First Name" required /><br/>
                <input type="text" placeholder="Last Name" required /><br/>
                <input type="email" placeholder="Email" required /><br />
                <input id="password" type={passwordType}
                    placeholder="Password" minlength="8" value={passwordValue}
                    onChange={(e)=>{
                        setPasswordValue(e.target.value);
                        if(passwordValue.length < 8 && passwordValue.length > 0)
                            setWarnings('8 or more characters required');
                        else setWarnings('');
                    }}required />
                <br />
                <input  id="cpassword" type={passwordType} 
                placeholder="Confirm Password" minlength="8" 
                onChange={(e)=> {
                    if(passwordValue !== e.target.value)
                        setWarnings('Passwords don\'t match');
                    else {
                        setWarnings('');
                        btn.disabled = false;
                        btn.style.backgroundColor = '#0066ff';
                        btn.style.color = 'white';
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
                <button id="signbtn" disabled>Create Account</button><br />
                <div id="switch">Have an account? Login <Link to='/login'>here</Link></div>
            </form>
        </div>
    )
}
