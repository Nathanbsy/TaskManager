import { useState, useEffect } from "react";
import axios from "axios";

export default function TableIssue() {
    
    const [ issues, setIssues ] = useState([]);  
    const idProjeto = 1;  

    useEffect(() => {
        //pegar o id pela url
        const fetchIssues = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/projetos/${idProjeto}/issues`);
                const data = res.data;
                setIssues(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIssues();
    }, [idProjeto]);

    

    return(
        <>
            <div className="container-table">
                <table className="table-issues">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Chave</th>
                            <th>Titulo</th>
                            <th>Status</th>
                            <th>Criador</th>
                            <th>Responsável</th>
                            <th>Estimativa de Horas</th>
                            <th>Tempo Gasto</th>
                            <th>Data de Criação</th>
                            <th>Ultima Atualização</th>
                            <th>Data de Vencimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => {
                            return(
                                <tr>
                                    <td></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}