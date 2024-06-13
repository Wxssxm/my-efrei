import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

export const Login = () => {
    const { login, user } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isLogginSuccessfull = await login({
            mail: e.currentTarget.mail.value,
            password: e.currentTarget.password.value,
        });
        if (isLogginSuccessfull) {
            navigate("/");
        }

        setError("Identifiants incorrects !");
    };
    return (
        <div className="login-container">
            <form onSubmit={(e) => handleLogin(e)}>
                <h1 className="title-form">Connectez-vous :</h1>
                <input
                    type="text"
                    name="mail"
                    className="input-email"
                    placeholder="Adresse e-mail"
                />
                <input
                    type="password"
                    name="password"
                    className="input-password"
                    placeholder="Mot de passe"
                />
                <input type="submit" value="Connexion" />
                <div className="error-placeholder">{error}</div>
            </form>
        </div>
    );
};
