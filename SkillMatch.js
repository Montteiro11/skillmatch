/* ============================================================
   ROTEIRO DE ABERTURA (fala inicial do vídeo)

   "Meu projeto é o SkillMatch JS, um simulador que compara minhas
   habilidades com os requisitos de vagas de front-end júnior, calcula
   um percentual de compatibilidade, mostra o que ainda me falta e
   recomenda o que estudar. Para desenvolver, eu não me baseei só no
   curso: pesquisei em vídeos no YouTube, em sites e usei IA como
   apoio para tirar dúvidas e organizar o código, sempre revisando e
   entendendo cada parte antes de aplicar. Vou apresentar o código
   por blocos, explicando o que cada parte faz."
   ============================================================ */

/*  Aqui eu criei o objeto candidato, que reúne as informações que serão
   utilizadas na análise. Coloquei meu nome, minha área de interesse,
   minhas habilidades e meu tempo de experiência. */
const candidato = {
  nomeCompleto: "Vanessa Monteiro Paim",
  areaDeInteresse: "Front End Júnior",
  listaDeHabilidades: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Git/GitHub",
    "Acessibilidade",
    "Responsividade",
  ],
  tempoDeExperiencia: "6 meses",
};

/* Aqui eu criei um array com três vagas fictícias. Cada vaga possui
   a empresa, o cargo, os requisitos necessários e alguns diferenciais. */
const vagasBrutas = [
  {
    empresa: "ByteForge",
    cargo: "Front-end Júnior",
    requisitos: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Git/GitHub",
      "Responsividade",
      "Consumo de APIs REST",
    ],
    diferencial: ["React", "Figma"],
  },
  {
    empresa: "Nexora Labs",
    cargo: "Front-end Júnior",
    requisitos: [
      "HTML5",
      "CSS3",
      "React",
      "JavaScript",
      "Git/GitHub",
      "Componetização",
      "Consumo de APIs REST",
    ],
    diferencial: ["TypeScript", "Redux"],
  },
  {
    empresa: "PixelCore",
    cargo: "Front-end Júnior",
    requisitos: [
      "HTML5",
      "CSS3",
      "Responsividade",
      "Acessibilidade",
      "Manipulação do DOM",
      "React",
      "TypeScript",
      "Testes automatizados",
      "Node.js",
    ],
    diferencial: ["React", "Animações CSS"],
  },
];

/* Aqui eu criei a classe Vaga para representar as vagas do sistema.
   No constructor eu recebo as informações de cada vaga e utilizo o
   this para guardar essas informações. */
class Vaga {
  constructor(empresa, cargo, requisitos, diferencial) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.diferencial = diferencial;
  }

  /* Aqui eu criei o método que calcula a compatibilidade. Ele compara
     as minhas habilidades com os requisitos da vaga. O filter
     encontra os requisitos que o candidato possui e depois calcula
     o percentual com base nessa quantidade. */

  calcularCompatibilidade(habilidadesCandidato) {
    const requisitosQueTem = this.requisitos.filter((requisito) =>
      habilidadesCandidato.includes(requisito),
    );
    return (requisitosQueTem.length / this.requisitos.length) * 100;
  }

  /* Aqui eu criei um método que exibe um resumo da vaga (empresa e
     cargo), usando this para pegar os dados da própria vaga. */

  exibirResumo() {
    console.log(`Empresa: ${this.empresa} - ${this.cargo}`);
  }
}

/* Aqui eu utilizei herança. A classe VagaComDiferencial herda da 
classe Vaga, mas acrescenta um comportamento, que verifica quais diferenciais o eu já possuo. */

class VagaComDiferencial extends Vaga {
  constructor(empresa, cargo, requisitos, diferencial) {
    super(empresa, cargo, requisitos, diferencial);
  }

  /* método extra que só essa subclasse tem: verifica quantos "diferenciais" o candidato também possui*/

  verificarDiferenciais(habilidadesCandidato) {
    return this.diferencial.filter((item) =>
      habilidadesCandidato.includes(item),
    );
  }
}

/* Aqui eu uso o map para transformar cada vaga que estava no array
   inicial em uma instância da classe VagaComDiferencial. Assim, essas
   vagas passam a ter os métodos que criei na classe. */

const vagasDeEmprego = vagasBrutas.map(
  (vaga) =>
    new VagaComDiferencial(
      vaga.empresa,
      vaga.cargo,
      vaga.requisitos,
      vaga.diferencial,
    ),
);


/* Aqui eu classifico o percentual de compatibilidade utilizando if e
   else. A partir de 80% é alta compatibilidade, entre 50 e 79% é
   média e abaixo de 50% é baixa. */

function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

/* Essa função verifica quais requisitos da vaga o eu ainda não
   possuo. Aqui eu uso novamente o filter, mas dessa vez para encontrar
   os requisitos que não estão na minha lista de habilidades. */

function listarHabilidadesFaltantes(vaga, habilidadesCandidato) {
  return vaga.requisitos.filter(
    (requisito) => !habilidadesCandidato.includes(requisito),
  );
}

/* Aqui eu criei uma função que recebe um array de vagas e também uma
   outra função como parâmetro. Essa outra função é o callback, que
   define o que será feito com cada vaga. */

function processarVagas(vagas, callback) {
  return vagas.map(callback);
}

/* Aqui eu utilizei um closure para criar um contador. A quantidade
   analisada fica guardada dentro da função e continua sendo atualizada
   cada vez que o contador é chamado */

function criarContadorDeAnalises() {
  let quantidadeAnalisada = 0;
  return function () {
    quantidadeAnalisada++;
    return quantidadeAnalisada;
  };
}
const contarAnalise = criarContadorDeAnalises();

/* Aqui eu utilizo o reduce para comparar os resultados das vagas e
   encontrar aquela que combina mais comigo no momento. */

function encontrarMelhorVaga(resultados) {
  return resultados.reduce((melhorAteAgora, atual) =>
    atual.compatibilidade > melhorAteAgora.compatibilidade
      ? atual
      : melhorAteAgora,
  );
}

/* Aqui eu conto quais habilidades aparecem como faltantes nas vagas
   e recomendo aquela que aparece com maior frequência, porque assim
   ela pode ser útil para mais de uma vaga. */

function gerarRecomendacaoEstudo(resultados) {
  const todasFaltantes = resultados.flatMap((resultado) => resultado.faltantes);

  if (todasFaltantes.length === 0) {
    return "Parabéns! Você já atende a todos os requisitos das vagas analisadas.";
  }

  const contagem = {};
  todasFaltantes.forEach((habilidade) => {
    contagem[habilidade] = (contagem[habilidade] || 0) + 1;
  });

  const habilidadePrioritaria = Object.keys(contagem).reduce(
    (maisFrequente, atual) =>
      contagem[atual] > contagem[maisFrequente] ? atual : maisFrequente,
  );

  return `Recomendação: estude "${habilidadePrioritaria}" — é a habilidade que mais aparece faltando entre as vagas analisadas.`;
}


/* Aqui eu simulei o carregamento das vagas como se elas viessem de um
   servidor. Utilizei um Promise e um atraso de um segundo para
   simular o tempo de uma requisição. */

function buscarVagasDoServidor() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagasDeEmprego);
    }, 1000);
  });
}