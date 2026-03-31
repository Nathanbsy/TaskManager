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
                <h1>Card Perfil</h1>
                <img src={avatar} alt="Avatar" className="rounded-full w-32 h-32"/>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Nome Completo: {nomecompleto}</p>
                <p>Data de Criação: {datacriacao}</p>
            </div>
        </>
    );
}