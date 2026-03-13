
# Laboratório 01 – Características de Repositórios Populares

## Introdução

### Contextualização

Plataformas de hospedagem de código como o GitHub concentram milhares de projetos de software open source. Alguns desses projetos se destacam por possuir grande número de estrelas, indicando alta popularidade dentro da comunidade de desenvolvedores. A análise desses repositórios pode revelar padrões sobre como projetos populares são desenvolvidos, mantidos e evoluem ao longo do tempo.

### Problema foco do experimento

Apesar da popularidade de alguns projetos open source, ainda é necessário compreender melhor como esses repositórios evoluem, especialmente em relação à frequência de releases, contribuição externa e gerenciamento de issues.

### Questões de Pesquisa

* **RQ01:** Sistemas populares são maduros ou antigos?
* **RQ02:** Sistemas populares recebem muita contribuição externa?
* **RQ03:** Sistemas populares lançam releases com frequência?
* **RQ04:** Sistemas populares são atualizados com frequência?
* **RQ05:** Sistemas populares são escritos nas linguagens mais populares?
* **RQ06:** Sistemas populares possuem um alto percentual de issues fechadas?

### Hipóteses

* **H1:** Repositórios populares tendem a ser mais antigos, pois tiveram mais tempo para crescer e ganhar popularidade.
* **H2:** Repositórios populares recebem muitas contribuições externas na forma de pull requests.
* **H3:** Projetos populares realizam releases com frequência para manter a evolução do software.
* **H4:** Repositórios populares são atualizados com frequência para corrigir erros e adicionar funcionalidades.
* **H5:** A maioria dos projetos populares é escrita em linguagens amplamente utilizadas na indústria, como JavaScript, Python e Java.
* **H6:** Projetos populares possuem uma alta taxa de issues fechadas, indicando manutenção ativa.

### Objetivo

#### Objetivo principal

Analisar características de repositórios populares no GitHub com base em métricas coletadas via API GraphQL.

#### Objetivos específicos

* Coletar dados de repositórios populares utilizando a API GraphQL do GitHub
* Identificar padrões de contribuição e manutenção desses projetos
* Avaliar métricas relacionadas a releases, issues e pull requests
* Explorar tendências presentes em projetos open source populares

---

## Metodologia

1. Utilização da API GraphQL do GitHub para consultar repositórios.
2. Seleção de dois grupos:
   * **Repositórios mais populares:** 1000 repositórios com maior número de estrelas (stars > 2000)
   * **Repositórios menos populares:** 1000 repositórios com estrelas entre 1000 e 2000
3. Coleta das seguintes informações para cada grupo:

   * número de releases
   * pull requests aceitas
   * total de issues
   * issues fechadas
   * linguagem principal
   * idade do repositório (dias desde a criação)
   * dias desde a última atualização
4. Armazenamento dos dados coletados em arquivos CSV.
5. Cálculo da média para métricas numéricas e moda para linguagem de programação.

### Decisões

* Foi utilizada **paginação na API GraphQL** para obter todos os resultados, já que não é possível retornar os valores da API de uma vez.
* A query de busca foi ajustada para cada grupo: `stars:>2000` para os mais populares e `stars:1000..2000` para os menos populares.

### Materiais utilizados

* Node.js
* API GraphQL do GitHub
* Script em JavaScript para coleta automatizada dos dados
* Arquivos CSV para armazenamento dos resultados
* Montagem de gráficos em planilha para visualização dos dados

---

## Resultados Obtidos

### Repositórios mais populares (stars > 2000)

| Métrica | Valor (Média) |
|---------|-------------------|
| Releases | 120.30 |
| Pull Requests Mergeados | 3967.40 |
| Total de Issues | 4990.52 |
| Issues Fechadas | 4347.04 |
| Idade do Repositório (dias) | 2965.70 |
| Dias desde última atualização | 1.01 |
| Percentual de Issues Fechadas | 77.34% |
| Linguagem Primária | Python (204 ocorrências - 20.40%) |

### Repositórios menos populares (stars 1000-2000)

| Métrica | Valor (Média) |
|---------|-------------------|
| Releases | 26.15 |
| Pull Requests Mergeados | 264.56 |
| Total de Issues | 245.95 |
| Issues Fechadas | 190.69 |
| Idade do Repositório (dias) | 2963.72 |
| Dias desde última atualização | 6.11 |
| Percentual de Issues Fechadas | 66.52% |
| Linguagem Primária | JavaScript (161 ocorrências - 16.10%) |

### Comparativo visual

[INSERIR GRÁFICO COMPARATIVO AQUI]

---

## Discussão dos Resultados

### Confronto com as Questões de Pesquisa

**RQ01: Sistemas populares são maduros ou antigos?**
Ambos os grupos apresentam idade média muito próxima (cerca de 2960 dias ou aproximadamente 8 anos). Isso indica que a idade do repositório não é um fator determinante para a popularidade, contrariando a hipótese H1.

**RQ02: Sistemas populares recebem muita contribuição externa?**
Repositórios mais populares recebem significativamente mais contribuições: em média 3967 pull requests aceitas contra apenas 264 dos menos populares. A hipótese H2 é confirmada.

**RQ03: Sistemas populares lançam releases com frequência?**
A diferença é expressiva: 120 releases em média nos mais populares contra 26 nos menos populares. A hipótese H3 é confirmada.

**RQ04: Sistemas populares são atualizados com frequência?**
Repositórios mais populares são atualizados com maior frequência (média de 1 dia desde última atualização) comparado aos menos populares (média de 6 dias). A hipótese H4 é confirmada.

**RQ05: Sistemas populares são escritos nas linguagens mais populares?**
Python aparece como linguagem mais frequente nos repositórios mais populares (20.4%), enquanto JavaScript predomina nos menos populares (16.1%). Ambas são linguagens amplamente utilizadas, confirmando a hipótese H5.

**RQ06: Sistemas populares possuem um alto percentual de issues fechadas?**
Repositórios mais populares fecham cerca de 77% das issues, contra 66% dos menos populares. A diferença indica melhor manutenção nos projetos mais populares, confirmando a hipótese H6.

### Insights

* **Volume de contribuição:** Repositórios populares recebem cerca de 15 vezes mais pull requests que os menos populares.
* **Releases:** Projetos populares lançam aproximadamente 4,6 vezes mais releases.
* **Manutenção:** A taxa de issues fechadas é 11 pontos percentuais maior nos projetos populares.
* **Atualizações:** Projetos populares são atualizados quase que diariamente (1 dia), enquanto os menos populares levam quase uma semana (6 dias) entre atualizações.
* **Linguagens:** Python lidera entre os mais populares, enquanto JavaScript lidera entre os menos populares, sugerindo que projetos em Python podem ter maior apelo ou visibilidade.

---

## Conclusão

A análise comparativa entre repositórios mais populares e menos populares do GitHub demonstra diferenças significativas em diversas métricas. Projetos com maior número de estrelas apresentam:

* Maior volume de contribuições externas
* Mais releases ao longo da vida do projeto
* Atualizações mais frequentes
* Melhor taxa de resolução de issues
* Linguagens de programação amplamente difundidas

Os resultados indicam que a popularidade de projetos open source está associada a um ciclo virtuoso: projetos mais populares atraem mais contribuidores, que geram mais pull requests e issues, que são resolvidas mais rapidamente, resultando em mais releases e atualizações frequentes, o que por sua vez mantém e aumenta a popularidade.

### Tomada de decisão

Para desenvolvedores que desejam criar projetos open source de sucesso, os dados sugerem que é fundamental:
* Manter um ciclo ativo de releases
* Responder e fechar issues com agilidade
* Aceitar e incentivar contribuições externas
* Manter o projeto atualizado constantemente

### Sugestões futuras

Para trabalhos futuros, recomenda-se:

* avaliar o tempo médio de resolução de issues
* comparar resultados por linguagem de programação individualmente
* analisar a correlação entre número de contribuidores e popularidade
* investigar se projetos mantidos por empresas ou organizações têm maior popularidade

---

## Comparação com trabalhos relacionados

Estudos sobre software open source indicam que projetos populares tendem a possuir comunidades ativas e ciclos frequentes de atualização. Os resultados observados neste experimento corroboram essas observações, indicando que projetos amplamente utilizados apresentam grande volume de contribuição e manutenção contínua.

A literatura também sugere que a linguagem de programação pode influenciar a popularidade de um projeto, com linguagens como Python e JavaScript dominando o ecossistema open source, o que foi confirmado pelos dados coletados.
