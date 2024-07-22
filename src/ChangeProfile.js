import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function ChangePassword (){
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(()=> {
        const check = async ()=> {
            const response = await fetch('http://localhost:4000/api/v1/auth/tokenvalidity', {
                credentials: 'include'
            })
            if (response.status == 400)
                navigate('/')
        }
        check()
    }, [])
    return (
    <div id="LoginPage">
        <form className="flex-center"
            onSubmit={async (e) => {
                e.preventDefault()
                const response = await fetch('http://localhost:4000/api/v1/user/change-password', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({
                        currentPassword, newPassword
                    })
                })
                if (response.status == 200)
                    navigate('/')
            }}
        >
            <input type="password" 
                placeholder="Current Password" value={currentPassword} minLength={8}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input type="password" placeholder="New Password" value={newPassword} minLength={8}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input type="password" placeholder="Confirm Password"></input>
            <button type="submit">Change</button> 
        </form>
    </div>
    )
}

export function ChangePicture(){
    const [source, setSource] = useState('/images/uploadimg.jpg')
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    useEffect(()=> {
        const check = async ()=> {
            const response = await fetch('http://localhost:4000/api/v1/auth/tokenvalidity', {
                credentials: 'include'
            })
            if (response.status == 400)
                navigate('/')
        }
        check()
    }, [])
    return (
    <div id="LoginPage">
        <form 
            onSubmit={async (e) => {
                const formdata = new FormData()
                formdata.append('file', file)
                e.preventDefault()
                const response = await fetch('http://localhost:4000/api/v1/user/change-picture', {
                    method: 'POST',
                    body: formdata,
                    credentials: 'include'
                })
                if (response.status == 200)
                    navigate('/')
            }}
        >
            <label className="img-holder" style={{height: '200px', width: '200px', borderRadius: '50%', 
            border: '2px solid var(--mydarkergrey)', marginBottom: '50px', cursor: 'pointer'}}>
                <input type="file" accept="image/*" required 
                    onChange={(e) => {
                        const imageurl = URL.createObjectURL(e.target.files[0])
                        setSource(imageurl)
                        setFile(e.target.files[0])
                    }}
                />
                <img src={source} style={{height: '100%', width: 'auto'}}/>
            </label>
            <button type="submit">Change</button> 
        </form>
    </div>
    )
}