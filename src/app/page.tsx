'use client';

import Link from 'next/link';
import { FiCheckCircle, FiUsers, FiTrendingUp, FiGitBranch, FiClock, FiTarget } from 'react-icons/fi';
import { Button } from '@/_components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TaskManager</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Preços</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">Sobre</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/autenticacao">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/autenticacao/registro">
              <Button variant="primary">Começar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-blue-700">🚀 Gerenciar projetos nunca foi tão fácil</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Gerencie seus projetos <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">com elegância</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TaskManager é uma plataforma moderna de gerenciamento de projetos, inspirada em Jira, 
            projetada para equipes que querem trabalhar de forma inteligente e colaborativa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/autenticacao/registro">
              <Button variant="primary">Comece Agora - Grátis</Button>
            </Link>
            <Link href="#features">
              <Button variant="secondary">Veja as Features</Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            ✨ Sem cartão de crédito necessário • ⚡ Setup em 2 minutos
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Funcionalidades Poderosas</h2>
            <p className="text-xl text-gray-600">Tudo que você precisa para gerenciar projetos eficientemente</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiCheckCircle className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gerenciamento de Issues</h3>
              <p className="text-gray-600">Crie, atribua e rastreie issues com prioridades, status e responsáveis.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Colaboração em Tempo Real</h3>
              <p className="text-gray-600">Trabalhe em equipe com comentários, menciones e histórico de atividades.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiTrendingUp className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Relatórios & Analytics</h3>
              <p className="text-gray-600">Acompanhe o progresso com dashboards intuitivos e métricas importantes.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiGitBranch className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Epics & Sprints</h3>
              <p className="text-gray-600">Organize o trabalho em épicas grandes e sprints iterativos.</p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiClock className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Registro de Tempo</h3>
              <p className="text-gray-600">Rastreie tempo gasto em cada issue e gerencie a capacidade da equipe.</p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiTarget className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customização Completa</h3>
              <p className="text-gray-600">Adaptei o sistema com campos, workflows e status customizados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Preços Simples</h2>
            <p className="text-xl text-gray-600">Comece grátis, pague apenas quando crescer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="p-8 rounded-xl border border-gray-200 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Grátis</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">R$ 0<span className="text-lg text-gray-600">/mês</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <FiCheckCircle className="text-green-600" /> Até 5 usuários
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FiCheckCircle className="text-green-600" /> Projetos ilimitados
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FiCheckCircle className="text-green-600" /> Issues ilimitadas
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FiCheckCircle className="text-gray-300" /> Sem relatórios avançados
                </li>
              </ul>
              <Link href="/autenticacao/registro" className="w-full">
                <Button variant="secondary" className="w-full">Começar Grátis</Button>
              </Link>
            </div>

            {/* Pro Plan - Destacado */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white relative ring-2 ring-blue-400">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                Populares
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">R$ 99<span className="text-lg">/mês</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-300" /> Até 50 usuários
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-300" /> Projetos e issues ilimitadas
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-300" /> Relatórios avançados
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-300" /> Automações
                </li>
              </ul>
              <Button variant="ghost" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                Upgrade para Pro
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-xl border border-gray-200 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">Custom</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <FiCheckCircle className="text-green-600" /> Usuários ilimitados
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FiCheckCircle className="text-green-600" /> SSO e SAML
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FiCheckCircle className="text-green-600" /> Suporte 24/7
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FiCheckCircle className="text-green-600" /> Integrações custom
                </li>
              </ul>
              <Button variant="primary" className="w-full">Fale Conosco</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Pronto para transformar seu workflow?</h2>
          <p className="text-xl mb-8 opacity-90">Junte-se a milhares de equipes que já usam TaskManager.</p>
          <Link href="/autenticacao/registro">
            <Button variant="ghost" className="bg-white text-blue-600 hover:bg-gray-100">
              Comece Agora - É Grátis!
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">&copy; 2026 TaskManager. Todos os direitos reservados.</p>
          <div className="flex items-center justify-center gap-6">
            <a href="#" className="hover:text-white transition">Privacidade</a>
            <a href="#" className="hover:text-white transition">Termos</a>
            <a href="#" className="hover:text-white transition">Contato</a>
            <a href="#" className="hover:text-white transition">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
