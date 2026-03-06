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

# Metodologia

## Passo a passo do experimento

1. Utilização da API GraphQL do GitHub para consultar repositórios populares.
2. Seleção dos **1000 repositórios com maior número de estrelas**.
3. Coleta das seguintes informações:

   * número de releases
   * pull requests aceitas
   * total de issues
   * issues fechadas
   * linguagem principal
4. Armazenamento dos dados coletados em arquivo CSV.
5. Cálculo de métricas agregadas (média) para análise inicial.

## Decisões

* A coleta foi limitada a **1000 repositórios** para manter o experimento viável.
* Foi utilizada **paginação na API GraphQL** para obter todos os resultados.
* Foram coletadas apenas métricas diretamente relacionadas às questões de pesquisa.

## Materiais utilizados

* Node.js
* API GraphQL do GitHub
* Script em JavaScript para coleta automatizada dos dados
* Arquivo CSV para armazenamento dos resultados

## Métodos utilizados

* Consulta automatizada à API GraphQL
* Processamento de dados via script JavaScript
* Cálculo de métricas estatísticas simples (média)

## Métricas e suas Unidades

| Métrica                 | Descrição                                | Unidade    |
| ----------------------- | ---------------------------------------- | ---------- |
| Releases                | Número total de releases por repositório | quantidade |
| Pull Requests Mergeados | Número de pull requests aceitas          | quantidade |
| Total de Issues         | Número total de issues criadas           | quantidade |
| Issues Fechadas         | Número total de issues fechadas          | quantidade |

---

# Visualização dos Resultados

## Resultados obtidos

| Métrica                 | Média   |
| ----------------------- | ------- |
| Releases                | 120.49  |
| Pull Requests Mergeados | 3953.96 |
| Total de Issues         | 5003.77 |
| Issues Fechadas         | 4357.87 |

Esses valores representam a média das métricas coletadas considerando os **1000 repositórios analisados**.

---

# Discussão dos Resultados

## Confronto com as Questões de Pesquisa

Os resultados indicam que repositórios populares apresentam uma quantidade significativa de releases e contribuições externas. O número médio de pull requests mergeados demonstra que projetos populares recebem grande participação da comunidade.

Além disso, a média elevada de issues fechadas em relação ao total de issues indica que esses projetos possuem manutenção ativa e equipes engajadas na resolução de problemas reportados pelos usuários.

## Insights

* Projetos populares tendem a ter **grande volume de contribuição da comunidade**.
* O número elevado de releases indica **evolução contínua do software**.
* A alta taxa de issues fechadas sugere **boa manutenção e suporte aos usuários**.

## Estatísticas

* Média de releases: **120.49**
* Média de pull requests mergeados: **3953.96**
* Média de issues totais: **5003.77**
* Média de issues fechadas: **4357.87**

A proporção de issues fechadas em relação ao total sugere uma **taxa elevada de resolução de problemas**.

---

# Conclusão

A análise dos repositórios populares do GitHub demonstra que esses projetos apresentam forte participação da comunidade e manutenção ativa. A quantidade significativa de pull requests aceitas e issues resolvidas indica que esses sistemas são amplamente utilizados e constantemente evoluídos.

Além disso, a frequência de releases sugere que projetos populares adotam ciclos contínuos de desenvolvimento e melhoria.

## Tomada de decisão

Os resultados indicam que a popularidade de projetos open source está associada a fatores como:

* contribuição ativa da comunidade
* manutenção constante
* evolução contínua do software

Esses fatores contribuem diretamente para o crescimento e sustentabilidade de projetos open source.

## Sugestões futuras

Para trabalhos futuros, recomenda-se:

* analisar a idade dos repositórios
* avaliar o tempo médio de resolução de issues
* comparar resultados por linguagem de programação
* analisar a frequência de commits ao longo do tempo

---

# Comparação com trabalhos relacionados

Estudos sobre software open source indicam que projetos populares tendem a possuir comunidades ativas e ciclos frequentes de atualização. Os resultados observados neste experimento corroboram essas observações, indicando que projetos amplamente utilizados apresentam grande volume de contribuição e manutenção contínua.
