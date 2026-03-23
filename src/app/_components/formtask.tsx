import { useState } from "react";
import axios from "axios";

export default function FormTask() {

    const [ task, setTask ] = useState({
        titulo: "",
        descricao: "",
        dataEntrega: "",
        idStatus: 0,
        idEmpresa: 0,
        idResponsavel: 0,
        idCriador: 0
    });

    function verificaTask() {
        if(task.titulo != "" || task.idStatus != 0 || task.idEmpresa != 0 || task.idCriador != 0) return true;
        return false;
    }

    function escrever(evento: any) {
        setTask((prev: any) => ({
            ...prev,
            [evento.target.name]: evento.target.value,
        }));
    }

    
    async function cadastrarTask(evento: any) {
        evento.preventDefault();
        //verificando se não há nenhuma informação em branco
        if (!verificaTask()) return alert("Preencha todos os campos!");

        try {
            await axios.post("http://localhost:8080/task", task);
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
                    <button className="btn-form" onClick={cadastrarTask}>Cadastrar</button>
                </div>
            </div>
        </>
    );
}