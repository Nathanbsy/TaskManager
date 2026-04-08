'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Input } from '@/_components/Form';
import { Button } from '@/_components/Button';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/api';
import Link from 'next/link';

export default function AlterarUsuarioPage() {
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        nomecompleto: ''
    });

    function preencheUsuario() {
        //Adicionar a lógica depois
    }

    preencheUsuario();

    function escrever(evento: any) {
        setFormData((prev) => ({
            ...prev,
            [evento.target.name]: evento.target.value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        //Adicionar a lógica depois
        
    };

    return(
        <>
            <div>
                <div>
                    <h1>Alterar Perfil</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Nome de usuário"
                            type="text"
                            placeholder="seu_usuario"
                            name="username"
                            onChange={escrever}
                            defaultValue={formData.username}
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="seu@email.com"
                            name="email"
                            onChange={escrever}
                            defaultValue={formData.email}
                            required
                        />
                        <Input
                            label="Nome Completo"
                            type="text"
                            placeholder="Seu Nome Completo"
                            name="nomecompleto"
                            onChange={escrever}
                            defaultValue={formData.nomecompleto}
                            required
                        />
                        <Button type="submit" loading={loading} className="w-full">
                            Salvar Alterações
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}