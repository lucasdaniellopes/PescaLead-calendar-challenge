# PescaLead Calendar Challenge

## Descrição do projeto

Aplicação de calendário com de gestão de eventos, desenvolvido como parte de um desafio técnico. O projeto é solução full-stack que permite criar, visualizar, editar e excluir eventos em um calendário interativo.

## Tecnologias utilizadas

### Backend
- **Node.js** com TypeScript
- **Express.js** - Framework web
- **PostgreSQL / Supabase** - Banco de dados
- **Jest** - Framework de testes unitários
- **Scalar** - Documentação interativa da API

### Frontend
- **React 18** com TypeScript
- **Vite** - Build tool e servidor de desenvolvimento
- **CSS3** com variáveis customizadas
- **React Icons** - Biblioteca de ícones

## Instruções de configuração do banco de dados

### Pré-requisitos
- Projeto ja criado no Supabase
- Url de conexão do banco

### Configuração
1. Crie um novo projeto no painel do Supabase
2. Copie a URL do banco de dados das configurações do projeto
3. Execute o SQL da migration no editor SQL do Supabase
  (localizado em `backend/src/migrations/001_create_events_table.sql`)
3. Configure a variável de ambiente:
   ```bash
   DB_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
   ```

## Passo a passo para executar o backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

O servidor estará disponível em `http://localhost:3333`

## Documentação da API

  A API possui documentação interativa via Scalar,
  acessível em:
  http://localhost:3333/docs


## Passo a passo para executar o frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. Configure a variável de ambiente da API:
   ```bash
   VITE_API_URL=http://localhost:3333/api
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

A aplicação estará disponível em `http://localhost:5173`

## Como executar os testes

### Testes do Backend
1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Execute os testes:
   ```bash
   npm test
   # ou
   pnpm test
   ```

### Cobertura de Testes
Os testes unitários atualmente cobrem:
- Validações de eventos (duração, sobreposição, limite diário)
- Regras de negócio do EventService

## Decisões técnicas relevantes

### Arquitetura
- **Separação entre frontend e backend** com comunicação via API REST
- **Service Layer** no backend para separar lógica de negócio dos controllers
- **Componentização modular** no frontend para reutilização e manutenção
- **Pastas do frontend seguem o padrão colocation**

### Frontend
- **Vite** escolhido por sua performance superior em desenvolvimento
- **CSS com variáveis** para consistência visual e tema
- **Componentes funcionais** com React Hooks para gerenciamento de estado
- **TypeScript em todo o projeto** para segurança de tipos

### Testes
- **Jest** para testes unitários com mocks de dependências
- **Mock de banco de dados** para testes rápidos e isolados