export const funcoesAlocacao = [
  { id: 0, value: "Atendentes de bar" },
  { id: 1, value: "Repositores" },
  { id: 2, value: "Carregadores" },
  { id: 3, value: "Vigia noturno" },
  { id: 4, value: "Limpeza" },
  { id: 5, value: "Garçom" },
  { id: 6, value: "Dosador" },
  { id: 7, value: "Barback" },
  { id: 8, value: "Líder de bar" },
  { id: 9, value: "Coordenador" },
  { id: 10, value: "RH" },
  { id: 11, value: "Apoio de RH" },
];

export const colaboradores = [
  {
    id: 0,
    nome: "Senhor Nome da Silva0",
    celular: "19998527362",
    cpf: "10020030080",
    dataNascimento: "1994-02-01",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 1,
    nome: "Senhor Nome da Silva1",
    celular: "19998527363",
    cpf: "10020030081",
    dataNascimento: "1994-02-02",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 2,
    nome: "Senhor Nome da Silva2",
    celular: "19998527364",
    cpf: "10020030082",
    dataNascimento: "1994-02-03",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 3,
    nome: "Senhor Nome da Silva3",
    celular: "19998527365",
    cpf: "10020030083",
    dataNascimento: "1994-02-04",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 4,
    nome: "Senhor Nome da Silva4",
    celular: "19998527366",
    cpf: "10020030084",
    dataNascimento: "1994-02-05",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 5,
    nome: "Senhor Nome da Silva5",
    celular: "19998527367",
    cpf: "10020030085",
    dataNascimento: "1994-02-06",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 6,
    nome: "Senhor Nome da Silva6",
    celular: "19998527368",
    cpf: "10020030086",
    dataNascimento: "1994-02-07",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 7,
    nome: "Senhor Nome da Silva7",
    celular: "19998527369",
    cpf: "10020030087",
    dataNascimento: "1994-02-08",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 8,
    nome: "Senhor Nome da Silva8",
    celular: "199985273610",
    cpf: "10020030088",
    dataNascimento: "1994-02-09",
    cidade: "São Paulo",
    uf: "SP",
  },
  {
    id: 9,
    nome: "Senhor Nome da Silva9",
    celular: "199985273611",
    cpf: "10020030089",
    dataNascimento: "1994-02-10",
    cidade: "São Paulo",
    uf: "SP",
  },
];

export const tiposContrato = [
  { id: 0, value: "Freelancer", documentosObrigatorios: [0, 1, 5] },
  {
    id: 1,
    value: "Contrato intermitente",
    documentosObrigatorios: [0, 5, 7, 3],
  },
  { id: 2, value: "Contrato temporário", documentosObrigatorios: [0, 5, 7] },
  { id: 3, value: "Terceirizado", documentosObrigatorios: [0, 5] },
];

export const documentos = [
  { id: 0, value: "CPF" },
  { id: 1, value: "RG" },
  { id: 2, value: "CNH" },
  { id: 3, value: "CTPS" },
  { id: 4, value: "Comprovante Residência" },
  { id: 5, value: "ASO" },
  { id: 6, value: "Reservista" },
  { id: 7, value: "Contrato" },
];

export const eventos = [
  { id: "0", nome: "Evento A" },
  { id: "1", nome: "Evento B" },
  { id: "2", nome: "Evento C" },
  { id: "3", nome: "Evento D" },
  { id: "4", nome: "Evento E" },
  { id: "5", nome: "Evento F" },
];

export const getFormularios = [
  { id: "0", nome: "Formulário A", url: "https://forms.com/0" },
  { id: "1", nome: "Formulário B", url: "https://forms.com/1" },
  { id: "2", nome: "Formulário C", url: "https://forms.com/2" },
  { id: "3", nome: "Formulário D", url: "https://forms.com/3" },
  { id: "4", nome: "Formulário E", url: "https://forms.com/4" },
  { id: "5", nome: "Formulário F", url: "https://forms.com/5" },
];

export const getUsuarios = [
  {
    id: "055da5e3-b29a-4a29-a83f-b54f543d196f",
    nome: "Maria Souza",
    avaliacao: 4.5,
    idade: 31,
    local: "Avenida Paulista",
    cidade: "São Paulo - SP",
    imagem: "https://img.freepik.com/fotos-gratis/retrato-de-uma-jovem-sorrindo_23-2149260597.jpg"
  },
  {
    id: "000000000000000000000000000000000055",
    nome: "João Silva",
    avaliacao: 5,
    idade: 34,
    local: "Rua da Praia",
    cidade: "Porto Alegre - RS",
    imagem: "https://img.freepik.com/fotos-gratis/homem-retrato-rindo_23-2148859448.jpg"
  },
  {
    id: "000000000000000000000000000000000056",
    nome: "Pedro Oliveira",
    avaliacao: 2.5,
    idade: 23,
    local: "Praça da Liberdade",
    cidade: "Belo Horizonte - MG",
    imagem: "https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg"
  },
  {
    id: "000000000000000000000000000000000057",
    nome: "Ana Costa",
    avaliacao: 3.5,
    idade: 21,
    local: "Rua XV de Novembro",
    cidade: "Curitiba - PR",
    imagem: "https://img.freepik.com/fotos-gratis/retrato-de-uma-menina-negra-despreocupada-e-positiva-vestida-casualmente-e-sorrindo-amplamente_273609-13878.jpg"
  },
  {
    id: "000000000000000000000000000000000058",
    nome: "Lucas Almeida",
    avaliacao: 4,
    idade: 20,
    local: "Avenida Rio Branco",
    cidade: "Rio de Janeiro - RJ",
    imagem: "https://img.freepik.com/fotos-gratis/retrato-de-homem-feliz-e-sorridente_23-2149022628.jpg"
  },
  {
    id: "000000000000000000000000000000000059",
    nome: "Fernando Pereira",
    avaliacao: 3,
    idade: 37,
    local: "Rua Floriano Peixoto",
    cidade: "Fortaleza - CE",
    imagem: "https://img.freepik.com/fotos-gratis/homem-de-tiro-medio-com-penteado-afro_23-2150677135.jpg"
  },
  {
    id: "000000000000000000000000000000000060",
    nome: "Thiago Rodrigues",
    avaliacao: 4.5,
    idade: 31,
    local: "Praça da Sé",
    cidade: "São Paulo - SP",
    imagem: "https://img.freepik.com/fotos-gratis/retrato-de-homem-branco-isolado_53876-40306.jpg"
  },
  {
    id: "000000000000000000000000000000000061",
    nome: "Juliana Santos",
    avaliacao: 5,
    idade: 23,
    local: "Avenida Sete de Setembro",
    cidade: "Salvador - BA",
    imagem: "https://img.freepik.com/fotos-gratis/ainda-bem-que-mulher-bonita-com-rabo-de-cavalo-encaracolado-tem-sorriso-charmoso-usa-sueter-listrado-poses_273609-8851.jpg"
  },
  {
    id: "000000000000000000000000000000000062",
    nome: "Rafael Lima",
    avaliacao: 2.5,
    idade: 34,
    local: "Rua dos Três Corações",
    cidade: "Brasília - DF",
    imagem: "https://img.freepik.com/fotos-gratis/retrato-de-homem-afro-americano_23-2149072178.jpg"
  },
  {
    id: "000000000000000000000000000000000063",
    nome: "Carlos Mendes",
    avaliacao: 3.5,
    idade: 50,
    local: "Rua da Consolação",
    cidade: "São Paulo - SP",
    imagem: "https://img.freepik.com/fotos-gratis/medio-cima-tiro-homem-velho-rir_23-2148036816.jpg"
  },
  {
    id: "000000000000000000000000000000000064",
    nome: "Felippa Carvalho",
    avaliacao: 4,
    idade: 20,
    local: "Avenida das Américas",
    cidade: "Rio de Janeiro - RJ",
    imagem: "https://img.freepik.com/fotos-gratis/mulher-de-negocios-de-tiro-medio-posando_23-2149457709.jpg"
  },
  {
    id: "000000000000000000000000000000000065",
    nome: "Bernardo Martins",
    avaliacao: 3,
    idade: 37,
    local: "Rua da Bahia",
    cidade: "Belo Horizonte - MG",
    imagem: "https://img.freepik.com/fotos-gratis/retrato-de-homem-bonito-de-barba_23-2148328561.jpg"
  },
];

export const getDemandas = [
  
];

export const getEventos = [
  {
    id: 0,
    nome: "Evento A",
    inicio: "01/05/2024",
    fim: "01/06/2020",
    orcamento: 10000.0,
    logradouro: "Avenida das Ameixeiras",
  },
  {
    id: 1,
    nome: "Evento B",
    inicio: "01/06/2024",
    fim: "01/07/2020",
    orcamento: 20000.0,
    logradouro: "Avenida das Ameixeiras",
  },
  {
    id: 2,
    nome: "Evento C",
    inicio: "01/07/2024",
    fim: "01/08/2020",
    orcamento: 30000.0,
    logradouro: "Avenida das Ameixeiras",
  },
  {
    id: 3,
    nome: "Evento D",
    inicio: "01/08/2024",
    fim: "01/09/2020",
    orcamento: 40000.0,
    logradouro: "Avenida das Ameixeiras",
  },
  {
    id: 4,
    nome: "Evento E",
    inicio: "01/09/2024",
    fim: "01/010/2020",
    orcamento: 50000.0,
    logradouro: "Avenida das Ameixeiras",
  },
];


export const estados = [
  { id: "AC", value: "Acre" },
  { id: "AL", value: "Alagoas" },
  { id: "AP", value: "Amapá" },
  { id: "AM", value: "Amazonas" },
  { id: "BA", value: "Bahia" },
  { id: "CE", value: "Ceará" },
  { id: "DF", value: "Distrito Federal" },
  { id: "ES", value: "Espírito Santo" },
  { id: "GO", value: "Goiás" },
  { id: "MA", value: "Maranhão" },
  { id: "MT", value: "Mato Grosso" },
  { id: "MS", value: "Mato Grosso do Sul" },
  { id: "MG", value: "Minas Gerais" },
  { id: "PA", value: "Pará" },
  { id: "PB", value: "Paraíba" },
  { id: "PR", value: "Paraná" },
  { id: "PE", value: "Pernambuco" },
  { id: "PI", value: "Piauí" },
  { id: "RJ", value: "Rio de Janeiro" },
  { id: "RN", value: "Rio Grande do Norte" },
  { id: "RS", value: "Rio Grande do Sul" },
  { id: "RR", value: "Roraima" },
  { id: "SC", value: "Santa Catarina" },
  { id: "SP", value: "São Paulo" },
  { id: "SE", value: "Sergipe" },
  { id: "TO", value: "Tocantins" },
];