import { useState } from "react";
import axios from "axios";

export default function FormEmpresao() {
    
    const [ empresa, setEmpresa ] = useState({
        username: "",
        email: "",
        senha: "",
    });

    function verificaEmpresa() {
        if (empresa.username != "" || empresa.email != "" || empresa.senha != "") return true; 
        return false;
    }

    function escrever(evento: any) {
        setEmpresa((prev: any) => ({
            ...prev,
            [evento.target.name]: evento.target.value,
        }));
    }

    
    async function cadastrarEmpresa(evento: any) {
        evento.preventDefault();
        //verificando se não há nenhuma informação em branco
        if (!verificaEmpresa()) return alert("Preencha todos os campos!");

        try {
            await axios.post("http://localhost:8080/empresas", empresa);
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
                    <label htmlFor="username">Nome da empresa</label>
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
                    <button className="btn-form" onClick={cadastrarEmpresa}>Cadastrar</button>
                </div>
            </div>
        </>
    );
}