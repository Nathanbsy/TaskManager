import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalIssue() {
    const [ issue, setIssue ] = useState({
        id: 0,
        idProjeto: 0,
        chave: "",
        titulo: "",
        descricao: "",
        idTipoIssue: 0,
        tipoName: "",
        idStatus: 0,
        statusName: "",
        idCriador: 0,
        criadorName: "",
        idResponsavel: 0,
        responsavelName: "",
        idEpic: 0,
        idSprint: 0,
        estimativaHoras: 0,
        tempoGastoHoras: 0,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
        dataVencimento: new Date(),
    });

    return(
        <>
        </>
    );
}