let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 20),
    dataCheckIn: new Date (2024, 2, 25, 22, 00)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 15, 45),
    dataCheckIn: new Date (2024, 2, 23, 18, 30)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 10, 30),
    dataCheckIn: new Date (2024, 2, 20, 12, 45)
  },
  {
    nome: "Ana Santos",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 14, 15),
    dataCheckIn: new Date (2024, 2, 9, 16, 20)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 21, 10),
    dataCheckIn: null
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 1, 26, 18, 05),
    dataCheckIn: new Date (2024, 1, 28, 20, 40)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 11, 50),
    dataCheckIn: null
  },
  {
    nome: "Camila Costa",
    email: "camila@gmail.com",
    dataInscricao: new Date(2024, 0, 23, 16, 30),
    dataCheckIn: new Date (2024, 2, 22, 18, 20)
  },
  {
    nome: "Rafaela Martins",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 0, 18, 20, 40),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs (Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs (Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  //substituir informação
  document
  .querySelector('tbody')
  .innerHTML = output
} 

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmação de check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return 
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}

