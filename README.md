# Test Build-Time Environment Variables

Este projeto testa a funcionalidade de variáveis de ambiente em tempo de build.

## Como Testar

### 1. Via QuickSetup do Sysko

1. Crie um repositório no GitHub com estes arquivos
2. No Sysko, crie um novo projeto
3. No QuickSetup, selecione o repositório
4. Na aba "Environment", adicione:
   - `VITE_API_URL` = `https://api.example.com`
   - `VITE_APP_NAME` = `My App`
   - `VITE_ENV` = `production`
5. Deploy!

### 2. Teste Local com Docker

```bash
# Build com variáveis de ambiente
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  --build-arg VITE_APP_NAME="My Test App" \
  --build-arg VITE_ENV=production \
  -t test-build-envs .

# Run
docker run -p 8080:80 test-build-envs

# Acesse http://localhost:8080
```

### 3. Teste Local sem Docker

```bash
# Instalar dependências
npm install

# Definir variáveis e buildar
VITE_API_URL=https://api.example.com \
VITE_APP_NAME="My Test App" \
VITE_ENV=development \
npm run build

# Visualizar resultado
npm run preview
```

## Como Funciona

1. **Dockerfile** declara `ARG` para cada variável
2. **Kaniko** passa `--build-arg=VAR=VALUE` para cada env var
3. **Dockerfile** converte `ARG` em `ENV` para o processo de build
4. **Vite** lê as variáveis `VITE_*` do ambiente durante `npm run build`
5. As variáveis são substituídas diretamente no código JavaScript gerado

## Verificação

Após o deploy, a página deve mostrar:
- Status verde: "Environment variables were successfully injected at build time!"
- Lista de variáveis com seus valores
