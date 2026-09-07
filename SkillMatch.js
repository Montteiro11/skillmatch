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