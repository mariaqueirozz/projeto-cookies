# Questões para reflexão

### 1. O que é um cookie?

Cookie é uma pequena informação armazenada pelo navegador para guardar dados relacionados a um site, como informações de uma sessão.

### 2. Quem armazena o cookie: cliente ou servidor?

O navegador do cliente armazena o cookie, mas ele é criado e enviado pelo servidor.

### 3. Quem envia o cookie nas próximas requisições?

O navegador envia automaticamente o cookie para o servidor nas próximas requisições.

### 4. O que muda quando utilizamos HttpOnly?

O JavaScript não consegue mais acessar o cookie utilizando `document.cookie`.

### 5. Por que um cookie HttpOnly continua funcionando mesmo não aparecendo em document.cookie?

Porque o navegador continua armazenando o cookie e o envia automaticamente nas requisições HTTP, mesmo que o JavaScript não consiga acessá-lo.

### 6. Qual é a finalidade de Secure?

A propriedade `Secure` faz com que o cookie seja enviado somente através de conexões HTTPS.

### 7. Qual é a finalidade de SameSite?

A propriedade `SameSite` controla o envio do cookie em requisições relacionadas a outros sites e ajuda na proteção contra ataques CSRF.

### 8. Qual a diferença entre armazenar simplesmente um identificador de usuário e armazenar um JWT?

Um identificador simples apenas indica qual usuário está autenticado. Um JWT pode armazenar informações sobre o usuário e permite ao servidor verificar se o token é válido.

### 9. O conteúdo de um JWT é secreto?

Não. O conteúdo de um JWT pode ser decodificado. O que permite verificar sua autenticidade é a assinatura do token.

### 10. Por que armazenar um JWT em um cookie HttpOnly pode ser mais seguro do que disponibilizá-lo diretamente ao JavaScript?

Porque o JavaScript não consegue acessar diretamente um cookie `HttpOnly`, dificultando que um script malicioso obtenha o token por meio de `document.cookie`.
