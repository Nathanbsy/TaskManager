import { useState } from "react";
import axios from "axios";

export default function FormCadastro() {
    
    const [ user, setUser ] = useState({
        username: "",
        email: "",
        senha: "",
    });

    function verificaUser() {
        if (user.username != "" || user.email != "" || user.senha != "") return true; 
    }

    function escrever(evento: any) {
        setUser((prev: any) => ({
            ...prev,
            [evento.target.name]: evento.target.value,
        }));
    }

    
    async function cadastrarUsuario(evento: any) {
        evento.preventDefault();
        //verificando se não há nenhuma informação em branco
        if (!verificaUser()) return alert("Preencha todos os campos!");

        try {
            await axios.post("http://localhost:8080/usuario", user);
            return alert("Sucesso!");
        } catch (error) {
            console.log(error);
            return alert("Falha!");
        }
    }

    return(
        <>
            <div className="formulario">
                <h3>Cadastro</h3>
                <div className="input-container">
                    <label htmlFor="username">Nome de usuário</label>
                    <input className="forminput" type="text" maxLength={40} name="username" id="username" onChange={escrever}/>
                </div>

                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" maxLength={80} name="email" id="email" onChange={escrever}/>
                </div>

                <div className="input-container">
                    <label htmlFor="senha">Senha</label>
                    <input type="text" maxLength={80} name="senha" id="senha" onChange={escrever}/>
                </div>

                <div className="btn-container">
                    <button className="btn-form" onClick={cadastrarUsuario}>Cadastrar</button>
                </div>
            </div>
        </>
    );
}