# Setup de configuração

- Tenha o Node instalado na sua máquina: https://nodejs.org/en/download

- Da primeira vez, você precisará criar um token para consumir a API do Github. Faça isso no seguinte endereço: https://github.com/settings/tokens

- Cole seu token no arquivo .env para na variável GITHUB_TOKEN

# Rodar o script

Execute: 

```shell
node --env-file=.env script.js
```
# Vai ser gerado um arquivo csv com os dados dos repositórios populares (>2000 estrelas)
