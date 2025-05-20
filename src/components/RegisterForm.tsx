import { useState } from 'react'
import { saveToken } from '../lib/auth'

type Props = {
    onLogin: () => void
}

export default function RegisterForm({ onLogin }: Props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const register = async () => {
        setError('')

        const res = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })

        if (res.ok) {
            // ✅ автоматически логиним пользователя после регистрации
            const loginRes = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (loginRes.ok) {
                const token = await loginRes.text()
                saveToken(token)
                onLogin()
            } else {
                setError('Login failed after registration')
            }
        } else {
            setError('Registration failed — maybe email already exists?')
        }
    }

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={register}>Register</button>
        </div>
    )
}
