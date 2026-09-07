# SkillMatch JS

Mini-Projeto Avaliativo (M1S6) do curso Front-End React T4. Desenvolvi um simulador de compatibilidade entre meu perfil e vagas fictícias de Front-End Júnior, em JavaScript puro.

## O que o sistema faz

Comparo minhas habilidades com os requisitos de 3 vagas fictícias e, para cada uma, calculo o percentual de compatibilidade, a classificação (Alta, Média ou Baixa), as habilidades que ainda me faltam e os diferenciais que já possuo. No final, aponto a vaga com maior compatibilidade e gero uma recomendação de estudo.

## Como executar

1. Clone este repositório.
2. Abra o `skillmatch.js`.
3. Cole o conteúdo no console do navegador (F12 → Console) ou rode com o aplicativo node.js digitando `node skillmatch.js` no terminal.
4. O resultado aparece após ~1 segundo (simulando a busca dos dados em um servidor).

## Regra de cálculo da compatibilidade

```
compatibilidade = (requisitos que eu tenho ÷ total de requisitos da vaga) × 100
```

Classificação: 80-100% = Alta | 50-79% = Média | 0-49% = Baixa.

## Critério da recomendação de estudo

Junto todas as habilidades que me faltam em todas as vagas e conto quantas vezes cada uma se repete. Recomendo a que aparece com mais frequência, por afetar mais de uma oportunidade ao mesmo tempo.

## Conceitos aplicados e onde

objetos e arrays: candidato, vagasBrutas

filter, map, reduce: calcularCompatibilidade, listarHabilidadesFaltantes, encontrarMelhorVaga, gerarRecomendacaoEstudo

classe e construtor: class Vaga

herança: class VagaComDiferencial extends Vaga

this: métodos da classe Vaga

callback: processarVagas(vagas, callback)

closure: criarContadorDeAnalises()

promise e async/await: buscarVagasDoServidor() e main()

if-else: classificarCompatibilidade()

operador ternário: encontrarMelhorVaga() e gerarRecomendacaoEstudo()

for: ranking numerado das vagas, dentro de main()

while: contagem de vagas com alta compatibilidade, dentro de main()

do-while: exibição do cabeçalho do relatório, dentro de main()

try/catch: tratamento de erro ao buscar as vagas, em main()

## Sobre var, let e const

No projeto usei apenas `const` e `let`, sem usar `var`. A maioria das variáveis é `const`, porque não precisam ser reatribuídas depois de criadas. Usei `let` só no contador da closure (`quantidadeAnalisada`), já que esse valor precisa mudar a cada chamada. Optei por não usar `var` porque seu escopo é mais "solto", o professor falou que ele escapa de blocos, o que pode causar bugs difíceis de rastrear — `let` e `const` resolvem isso ao respeitar o escopo de bloco.

## Como a internet funciona

Quando um usuário acessa um site, o navegador (cliente) envia uma requisição para um servidor, pedindo os dados. O servidor processa esse pedido e devolve uma resposta, que o navegador exibe na tela. Isso não é instantâneo — leva um tempo de rede, por isso aplicações reais usam Promises para lidar com essa espera sem travar a página.

## Extensões usadas no VS Code

- Node.js — utilizado para executar o código JavaScript diretamente no terminal, sem depender do navegador
- Prettier — para formatar o código automaticamente

## Arquitetura cliente-servidor

Simulei a busca das vagas como se viessem de um servidor real: `buscarVagasDoServidor()` usa uma `Promise` com atraso artificial (`setTimeout`), e `main()` usa `async/await` para esperar essa resposta antes de continuar — do mesmo jeito que aconteceria com uma API de verdade.

## Vídeo de apresentação

[link do vídeo aqui]

## Kanban de apresentação (Trello)
https://trello.com/invite/b/6a95bc02f2ff8c8850dddc50/ATTI5ff790b37d8525690572591e509eb77c345C3D4F/skillmatch-js-simulador-de-compatibilidade-com-vaga-front-end-junior

## Apresentação no GitHub



