import { useState, useEffect } from "react";
import axios from "axios";

export default function FormCadastro() {
    const [ user, setUser ] = useState({
        username: "",
        email: "",
        senha: "",
    });
    return(
        <div>
            <p>Teste</p>
        </div>
    );
}