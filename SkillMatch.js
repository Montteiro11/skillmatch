// Meu perfil de candidata
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

// As 3 vagas fictícias.
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

// Criei a classe pra representar uma vaga, usando o this
class Vaga {
  constructor(empresa, cargo, requisitos, diferencial) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.diferencial = diferencial;
  }

  // Aqui eu calculo minha compatibilidade com essa vaga
  calcularCompatibilidade(habilidadesCandidato) {
    const requisitosQueTem = this.requisitos.filter((requisito) =>
      habilidadesCandidato.includes(requisito),
    );
    return (requisitosQueTem.length / this.requisitos.length) * 100;
  }

  exibirResumo() {
    console.log(`Empresa: ${this.empresa} - ${this.cargo}`);
  }
}

// Uso herança aqui: essa classe estende a classe Vaga e verifica meus diferenciais
class VagaComDiferencial extends Vaga {
  constructor(empresa, cargo, requisitos, diferencial) {
    super(empresa, cargo, requisitos, diferencial);
  }

  verificarDiferenciais(habilidadesCandidato) {
    return this.diferencial.filter((item) =>
      habilidadesCandidato.includes(item),
    );
  }
}

// Transformo as vagas em instância dessa classe
const vagasDeEmprego = vagasBrutas.map(
  (vaga) =>
    new VagaComDiferencial(
      vaga.empresa,
      vaga.cargo,
      vaga.requisitos,
      vaga.diferencial,
    ),
);

// Classifico a compatibilidade entre Alta, Média ou Baixa
function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

// Listo as habilidades que ainda me faltam.
function listarHabilidadesFaltantes(vaga, habilidadesCandidato) {
  return vaga.requisitos.filter(
    (requisito) => !habilidadesCandidato.includes(requisito),
  );
}

// Essa função recebe um callback, que uso mais adiante
function processarVagas(vagas, callback) {
  return vagas.map(callback);
}

// Crio um contador usando closure
function criarContadorDeAnalises() {
  let quantidadeAnalisada = 0;
  return function () {
    quantidadeAnalisada++;
    return quantidadeAnalisada;
  };
}
const contarAnalise = criarContadorDeAnalises();

// Encontro a vaga que combina mais de comigo
function encontrarMelhorVaga(resultados) {
  return resultados.reduce((melhorAteAgora, atual) =>
    atual.compatibilidade > melhorAteAgora.compatibilidade
      ? atual
      : melhorAteAgora,
  );
}

// Gero minha recomendação de estudo
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

// Simulo a busca das vagas como se viessem de um servidor
function buscarVagasDoServidor() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagasDeEmprego);
    }, 1000);
  });
}

// Função principal: uso async/await e trato erro com try/catch
async function main() {
  try {
    console.log("Buscando vagas no servidor simulado...\n");
    const vagas = await buscarVagasDoServidor();

    // Aqui uso o callback pra processar cada vaga
    const resultados = processarVagas(vagas, (vaga) => {
      contarAnalise();
      vaga.exibirResumo();
      const compatibilidade = vaga.calcularCompatibilidade(
        candidato.listaDeHabilidades,
      );
      return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        compatibilidade: Math.round(compatibilidade),
        classificacao: classificarCompatibilidade(compatibilidade),
        faltantes: listarHabilidadesFaltantes(
          vaga,
          candidato.listaDeHabilidades,
        ),
        diferenciaisQueTem: vaga.verificarDiferenciais(
          candidato.listaDeHabilidades,
        ),
      };
    });

    // Uso do while pra exibir o cabeçalho do relatório
    let cabecalhoExibido = false;
    do {
      console.log("Relatório de Compatibilidade SkillMatch JS");
      console.log(
        `Candidata: ${candidato.nomeCompleto} (${candidato.areaDeInteresse})\n`,
      );
      cabecalhoExibido = true;
    } while (!cabecalhoExibido);

    resultados.forEach((resultado) => {
      console.log(
        `Compatibilidade: ${resultado.compatibilidade}% (${resultado.classificacao})`,
      );
      console.log(
        `Habilidades faltantes: ${resultado.faltantes.length > 0 ? resultado.faltantes.join(", ") : "nenhuma"}`,
      );
      console.log(
        `Diferenciais que já possui: ${resultado.diferenciaisQueTem.length > 0 ? resultado.diferenciaisQueTem.join(", ") : "nenhum"}`,
      );
      console.log("---");
    });

    // Uso for pra montar um ranking numerado
    console.log("\nRanking das vagas analisadas:");
    for (let i = 0; i < resultados.length; i++) {
      console.log(
        `${i + 1}º - ${resultados[i].empresa}: ${resultados[i].compatibilidade}%`,
      );
    }

    // Uso while pra contar quantas vagas tiveram alta compatibilidade
    let indice = 0;
    let totalAltaCompatibilidade = 0;
    while (indice < resultados.length) {
      if (resultados[indice].classificacao === "Alta compatibilidade") {
        totalAltaCompatibilidade++;
      }
      indice++;
    }
    console.log(
      `\nQuantidade de vagas com alta compatibilidade: ${totalAltaCompatibilidade}`,
    );

    const melhorVaga = encontrarMelhorVaga(resultados);
    console.log(
      `\nVaga com maior compatibilidade: ${melhorVaga.empresa} (${melhorVaga.compatibilidade}%)`,
    );

    console.log(gerarRecomendacaoEstudo(resultados));

    console.log(
      `\nTotal de vagas analisadas (contador via closure): ${contarAnalise() - 1}`,
    );
  } catch (erro) {
    console.log(
      "Ocorreu um erro ao buscar ou processar as vagas do servidor:",
      erro.message,
    );
  }
}
 
main();
