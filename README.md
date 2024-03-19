# NextJS x Supabase

## Iniciando
Clone este repositório localmente e prossiga para a próxima seção.
```bash
git clone https://github.com/dannypalmeira/my-app.git
```

### Configuração necessária

Crie um arquivo chamado .env.local no diretório raiz do projeto:
```bash
.env.local
```

Adicione suas chaves do seu projeto [Supabase](https://app.supabase.io/) no arquivo .env.local criado anteriormente.

```dotenv
SUPABASE_URL=XXX
SUPABASE_ANON_KEY=XXX
```
Supabase Schema
![DB Schema](https://github.com/dannypalmeira/pos-fiap-cineadmin/blob/main/db-schema.png)

### Instalar pacotes

Instale todos os pacotes necessários no diretório raiz do projeto com o seguinte comando:
```bash
npm install
```

## Desenvolvendo localmente
Execute o servidor de desenvolvimento con o comando:

```bash
npm rum dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## Indicação de Filme

Para ver a lista de indicação [clique aqui](https://docs.google.com/spreadsheets/d/1rnIxCaCXPo6L8sYwWnwfTdlItHckWbnAdNpn0aFxZLw/edit?usp=sharing)
