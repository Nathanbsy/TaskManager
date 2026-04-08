interface CardPerfilProps {
    username: string,
    email: string,
    nomecompleto: string,
    avatar: any,
    datacriacao: string,
}

export const CardPerfil = ( { username, email, nomecompleto, avatar, datacriacao }: CardPerfilProps ) => {
    return(
        <>
            <div>
                <div>
                    <h2>Meu Perfil</h2>
                    <img src={avatar} alt="Avatar" className="rounded-full w-32 h-32"/>
                </div>
                <div>
                    <p>Username: {username}</p>
                    <p>Email: {email}</p>
                    <p>Nome Completo: {nomecompleto}</p>
                    <p>Data de Criação: {datacriacao}</p>
                </div>
                <div>
                    <a href="/meuperfil/alterar">Alterar Perfil</a>
                </div>
            </div>
        </>
    );
}