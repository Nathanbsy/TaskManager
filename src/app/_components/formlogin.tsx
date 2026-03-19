import { useState } from "react";
import axios from "axios";

export default function FormLogin() {
    const [ user, setUser ] = useState({
        email: "",
        senha: "",
    });

    function verificaUser() {
        if (user.email != "" || user.senha != "") return true;
    }

    function escrever(evento: any) {
        setUser((prev: any) => ({
            ...prev,
            [evento.target.name]: evento.target.value,
        }));
    }

    async function login(evento: any) {
        evento.preventDefault();
        //código incompleto
        if (!verificaUser()) return alert("Preencha todos os campos!");

        try {
            await axios.post("http://localhost:8080/login", user);
            return alert("Sucesso!");
        } catch (error) {
            console.error(error);
            return alert("Falha!");
        }
    }

    return(
        <>
            <div className="formulario">
                <h3>Login</h3>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" maxLength={80} name="email" id="email" onChange={escrever}/>
                </div>
                <div>
                    <label htmlFor="senha">Senha</label>
                    <input type="text" maxLength={80} name="senha" id="senha" onChange={escrever}/>
                </div>

                <div className="btn-container">
                    <button className="btn-form" onClick={login}>Login</button>
                </div>
            </div>
        </>
    );
}