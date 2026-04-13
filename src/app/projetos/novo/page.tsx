import { Projeto } from '@/types';
import { useState } from 'react';


export default function NovoProjetoPage() {
    const [ projeto, setProjeto ] = useState<Projeto>();

    function escrever(evento: any) {
        setProjeto((prev) => ({
            ...prev,
            [evento.target.name]: [evento.target.value],
        }) as Projeto);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    }

    return(
        <>
            <div className="container-novo-projeto">
                <h1>Novo Projeto</h1>
                <form>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" onChange={escrever} />
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea id="descricao" name="descricao" onChange={escrever} />
                    <button type="submit">Criar Projeto</button>
                </form>
            </div>
        </>
    );
}