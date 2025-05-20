import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import TaskList from './components/TaskList'
import { isAuthenticated, getToken, removeToken, parseJwt } from './lib/auth'

function App() {
    const [loggedIn, setLoggedIn] = useState(isAuthenticated())
    const [mode, setMode] = useState<'login' | 'register'>('login')

    const logout = () => {
        removeToken()
        setLoggedIn(false)
    }

    const email = loggedIn ? parseJwt(getToken()!)?.email : null

    return (
        <div style={{ padding: '2rem' }}>
            {loggedIn ? (
                <>
                    <div>
                        👤 {email}
                        <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
                    </div>
                    <TaskList />
                </>
            ) : (
                <>
                    <div style={{ marginBottom: '1rem' }}>
                        <button onClick={() => setMode('login')}>Login</button>
                        <button onClick={() => setMode('register')}>Register</button>
                    </div>
                    {mode === 'login' ? (
                        <LoginForm onLogin={() => setLoggedIn(true)} />
                    ) : (
                        <RegisterForm onLogin={() => setLoggedIn(true)} />
                    )}
                </>
            )}
        </div>
    )
}

export default App
