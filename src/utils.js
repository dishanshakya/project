import { hostname } from "."

export async function checkTokenValidity(callback) {
    const response = await fetch(`${hostname}/api/v1/auth/tokenvalidity`, {
        credentials: 'include'
    })
    if (response.status == 200) {
        const data = await response.json()
        callback(data)
    }
}