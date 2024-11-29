# Configurações do npm

## Necessario "baixar" a lib interna "vitest-environment-prisma/prisma-test-environment.ts" para executar os testes
### Por isso foram criados os comandos
```JSON
    // runs-s é referente ao pacote npm-run-all (para conseguir rodar mais de um comando em sequencia "especialmente no windows")
    "pretest:e2e": "run-s test:create-prisma-environment test:install-prisma-environment",

    // npm link é para "linkar" a lib interna para o projeto
    // primeiro comando é para criar o link
    // segundo comando é para instalar o link
    "test:create-prisma-environment": "npm link ./prisma/vitest-environment-prisma",
    "test:install-prisma-environment": "npm link vitest-environment-prisma"