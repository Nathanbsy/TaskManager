

export default function CriarEmpresaPage() {
    return(
        <>
            <div className="container-criar-empresa">
                <h1>Criar Empresa</h1>
                <form>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" />
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea id="descricao" name="descricao" />

                    <button type="submit">Criar Empresa</button>
                </form>
            </div>
        </>
    );
}