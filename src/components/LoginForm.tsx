import { useState } from 'react'
import { saveToken } from '../lib/auth'

type Props = {
    onLogin: () => void
}

export default function LoginForm({ onLogin }: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const login = async () => {
        const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (res.ok) {
            const token = await res.text()
            saveToken(token)
            onLogin()
        } else {
            setError('Invalid credentials')
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
        </div>
    )
}
