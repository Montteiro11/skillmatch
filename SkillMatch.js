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