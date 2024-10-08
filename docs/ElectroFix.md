# Projeto: **ElectroFix**

## Descrição Geral

O projeto **ElectroFix** visa o desenvolvimento de uma aplicação web para modernizar e facilitar o processo de marcação de serviços de reparação de eletrodomésticos e a compra de novos equipamentos oferecidos por um técnico especializado. A aplicação tem como objetivo melhorar a experiência dos clientes, proporcionando uma plataforma simples e acessível para agendar reparações e efetuar compras, substituindo o atual método de contacto via telefone.

## Funcionalidades Principais

### 1. Agendamento de Reparações
A aplicação permitirá que os clientes façam marcações para a reparação de eletrodomésticos de forma rápida e prática. O processo de marcação segue os seguintes passos:

- **Pagamento Antecipado da Deslocação**: Para confirmar a marcação, o cliente deverá efetuar o pagamento de uma taxa fixa de **20€**, referente à deslocação do técnico até à casa do cliente. Esse pagamento é obrigatório e deve ser feito no momento da marcação.
- **Diagnóstico Inicial**: Após o pagamento, o técnico desloca-se à morada indicada e realiza uma avaliação inicial da máquina para verificar o problema.
- **Orçamento**: Após identificar o erro, o técnico comunica ao cliente qual é o problema e apresenta o valor estimado da reparação.
- **Autorização do Cliente**: O técnico apenas realiza a reparação após obter a autorização do cliente. Nenhum trabalho será iniciado sem o consentimento do mesmo.
- **Reparação no Local**: Dependendo da complexidade do erro, o técnico pode ser capaz de resolver o problema diretamente na casa do cliente. Em casos mais complexos, poderá ser necessário levar o eletrodoméstico para uma oficina.

As informações necessárias para a marcação incluem:
- **Nome do cliente**: Para identificar quem solicita o serviço.
- **Morada e número da porta**: O local onde o técnico deverá deslocar-se para realizar o diagnóstico.
- **Data e hora preferencial**: O cliente poderá selecionar a data e o horário mais conveniente para a visita do técnico.

### 2. Compra de Eletrodomésticos
Além dos serviços de reparação, os clientes poderão visualizar e comprar eletrodomésticos diretamente na aplicação. O técnico disponibiliza diversos modelos para venda, permitindo que os utilizadores consultem os produtos e efetuem a compra através da plataforma.

## Benefícios do Projeto

- **Facilidade de Agendamento**: O processo de marcação de visitas será mais rápido e eficiente, uma vez que os clientes poderão realizar o agendamento a qualquer momento, sem necessidade de contacto telefónico.
- **Pagamento Antecipado de Deslocação**: A plataforma exigirá o pagamento de 20€ pela deslocação no momento da marcação, garantindo que o técnico é compensado pela viagem, independentemente de a reparação ser realizada.
- **Transparência no Serviço**: O técnico oferece um diagnóstico inicial e só avança com a reparação após a aprovação do cliente, garantindo clareza nos custos.
- **Gestão de Informação**: O técnico terá acesso direto às informações de marcação, como nome, morada e horário pretendido, organizando as visitas de forma mais eficiente.
- **Venda Online**: A plataforma oferece a possibilidade de os clientes adquirirem eletrodomésticos, aumentando as oportunidades de negócio para o técnico.


## Diagrama Casos de uso
<img src="https://files.polido.pt/Elecotro_Fix_drawio-2xLULC.png">

## Modelo Entidade-Relacionamento

O diagrama abaixo ilustra o modelo entidade-relacionamento (ER) da aplicação **ElectroFix**. Este modelo descreve as entidades principais, seus atributos e os relacionamentos entre elas.

### Entidades

- **Cliente**: Armazena informações sobre os clientes que utilizam a aplicação.
  - Atributos: `nome`, `email`, `telefone`, `password`

- **Agendamento**: Representa o agendamento de uma reparação.
  - Atributos: `endereco`, `data_horario`, `estado`

- **Reparação**: Representa o serviço de reparação realizado pelo técnico.
  - Atributos: `descricao_problema`, `valor_orcamento`, `status`

- **Eletrodoméstico**: Refere-se aos produtos que estão disponíveis para compra.
  - Atributos: `nome_produto`, `descricao`, `preco`, `quantidade_stock`

- **Encomenda**: Representa o pedido feito por um cliente.
  - Atributos: `valor_total`, `data_encomenda`, `status`

- **ItemEncomenda**: Representa os produtos dentro de uma encomenda específica.
  - Atributos: `quantidade`, `preco_unitario`

### Relacionamentos

- **ClienteFazAgendamento**: Um cliente pode fazer vários agendamentos, e cada agendamento é feito por um único cliente. (1:N)
- **ClienteFazEncomenda**: Um cliente pode fazer várias encomendas, e cada encomenda é feita por um único cliente. (1:N)
- **ReparaçãoAgendamento**: Cada agendamento resulta em uma única reparação, e cada reparação está associada a um único agendamento. (1:1)
- **EletrodomésticoPertenceEncomenda**: Um eletrodoméstico pode estar presente em várias encomendas, e uma encomenda pode incluir vários eletrodomésticos. (N:N)
- **EncomendaContémItens**: Uma encomenda pode conter vários itens de encomenda, e cada item de encomenda pertence a uma única encomenda. (1:N)
- **ItemContémProduto**: Cada item de encomenda refere-se a um único eletrodoméstico, e um eletrodoméstico pode estar em vários itens de encomenda. (N:1)


## Diagrama de Classes | Entidade e Relação
<img src="https://files.polido.pt/entidaderelacao_drawio-IIlmkn.png">

## Diagrama de Atividades
O diagrama de atividades descreve o fluxo do processo de **Agendamento de Reparações** na plataforma ElectroFix, que envolve três principais atores: **Cliente**, **Sistema** e **Técnico**. Cada um deles desempenha um papel essencial no ciclo de vida de um agendamento de reparação de eletrodomésticos. Abaixo, descrevemos as principais etapas do processo conforme representado no diagrama.

### 1. Cliente
- **Preencher Agendamento**: O cliente inicia o processo preenchendo um formulário de agendamento na plataforma.
- **Pagamento da Deslocação**: Após preencher o agendamento, o cliente deve pagar uma taxa de 20€ pela deslocação do técnico.
  - Se o pagamento for **confirmado**, o processo segue para a criação de agenda.
  - Se o pagamento não for efetuado, o sistema **notifica um erro** ao cliente, encerrando o processo.
- **Autorização**: Após o diagnóstico e a apresentação do orçamento, o cliente deve decidir se autoriza ou não a reparação.
  - Se o cliente **autorizar**, o processo continua com a reparação.
  - Caso contrário, o processo é encerrado.

### 2. Sistema
- **Criação de Agenda**: Após o pagamento da deslocação, o sistema cria uma agenda para a visita do técnico.
- **Definir Confirmado**: O sistema verifica se o técnico confirmou a agenda.
  - Se a agenda for **confirmada** pelo técnico, o sistema segue com a visita.
  - Se não for confirmada, o sistema define o status como **pendente**.
- **Definir Orçamento**: Após a realização do diagnóstico pelo técnico, o sistema registra o orçamento proposto.
- **Definir Autorizado**: O sistema aguarda a autorização do cliente para continuar o processo de reparação.

### 3. Técnico
- **Gerir Agendas**: O técnico visualiza e gerencia as agendas criadas pelo sistema.
  - Caso o técnico **confirme** a agenda, ele realiza a visita conforme agendado.
  - Se não for possível confirmar, o sistema continua com a agenda pendente.
- **Visita**: O técnico realiza a visita ao local indicado para realizar o diagnóstico inicial.
- **Faz Diagnóstico**: O técnico identifica o problema e insere o orçamento no sistema.
- **Faz Reparação**: Após a autorização do cliente, o técnico executa a reparação.
- **Encerrar Processo**: Ao finalizar a reparação, o processo é encerrado tanto pelo técnico quanto pelo sistema.


<img src="https://files.polido.pt/diagrama_atividades_light_drawio-B3zusZ.png">