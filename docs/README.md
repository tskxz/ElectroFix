## Instalacao
Na pasta ElectroFix, no terminal, rodar o seguinte comando

```bash
npm i
```

Ir para a pasta frontend e rodar o comando

```bash
cd frontend
npm i
```

Criar ficheiro .env na pasta ELECTROFIX

```bash
NODE_ENV=development
PORT=5000
MONGO_DB_USERNAME=username
MONGO_DB_PASSWORD=password
MONGO_URI=mongodb+srv://username:password@electrofix.9gtau.mongodb.net/?retryWrites=true&w=majority&appName=ElectroFix
JWT_SECRET=SH
PAYPAL_CLIENT_ID=paypal_client_id
```

Criar .env na pasta frontend
```bash
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

Rodar o programa

```bash
npm run dev
```