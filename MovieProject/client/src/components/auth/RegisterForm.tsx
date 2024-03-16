import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { authService } from "../../services/auth";

export function RegisterForm() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
  
    return (
        <form className="container box" onSubmit={(e) => {

            e.preventDefault();

            const locationFrom = location.state?.locationFrom;
            //todo implement register method and pass email and name
            authService.login({ username, password});
            setUsername("");

            navigate(locationFrom ?? "/");

        }}>
            <div className="field">
                <h1 className="title has-text-centered">
                    Movie Project
                </h1>
                <h2 className="subtitle has-text-centered">
                    Register
                </h2>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input" 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Name" 
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input 
                        className="input" 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input 
                        className="input" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control has-text-centered">
                    <button className="button is-primary" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}