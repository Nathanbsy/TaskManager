import { useState, useEffect, use } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Issue } from "@/types";

export default function TableIssue() {

    const [issues, setIssues] = useState<Issue[]>([]);
    const idProjeto = useParams();

    useEffect(() => {
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



    return (
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
                            return (
                                <tr>
                                    <td>{issue.TipoName}</td>
                                    <td>{issue.Chave}</td>
                                    <td>{issue.Titulo}</td>
                                    <td>{issue.StatusName}</td>
                                    <td>{issue.CriadorName}</td>
                                    <td>{issue.ResponsavelName}</td>
                                    <td>{issue.EstimativaHoras}</td>
                                    <td>{issue.TempoGastoHoras}</td>
                                    <td>{issue.DataCriacao}</td>
                                    <td>{issue.DataAtualizacao}</td>
                                    <td>{issue.DataVencimento}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}