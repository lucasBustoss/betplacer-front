export const backtestResultType = [
  {
    id: 1,
    name: 'Primeiro a marcar'
  },
  {
    id: 2,
    name: 'Primeiro a marcar 2x0'
  },
  {
    id: 3,
    name: 'Para vencer no intervalo'
  },
  {
    id: 4,
    name: 'Para vencer o jogo'
  },
  {
    id: 5,
    name: 'Primeiro a marcar no HT'
  },
  {
    id: 6,
    name: 'Primeiro a marcar 2x0 no HT'
  },
]

export const backtestResultTeamType = [
  {
    id: 1,
    name: 'Mandante'
  },
  {
    id: 2,
    name: 'Visitante'
  }
]

export const backtestFilterItems = [
  {
    name: '% de jogos sendo primeiro a marcar',
    propName: 'FtsFilter'
  },
  {
    name: '% de jogos sendo primeiro a marcar 2x0',
    propName: 'TwoZeroFilter'
  },
  {
    name: '% de jogos sem sofrer gols',
    propName: 'CleanSheetsFilter'
  },
  {
    name: '% de jogos em que não marcou gols',
    propName: 'FailedToScoreFilter'
  },
  {
    name: '% de jogos em que os dois times marcaram',
    propName: 'BothToScoreFilter'
  },
  {
    name: 'Média de gols marcados',
    propName: 'AverageGoalsScoredFilter'
  },
  {
    name: 'Média de gols sofridos',
    propName: 'AverageGoalsConcededFilter'
  },
]

export const backtestCompareType = [
  {
    id: 1,
    name: 'Estrita (Maior/Menor)',
  },
  {
    id: 2,
    name: 'Não estrita (>=/<=)'
  }
]

export const backtestTeamType = [
  {
    id: 1,
    name: 'Mandante'
  },
  {
    id: 2,
    name: 'Visitante'
  },
]

export const backtestPropType = [
  {
    id: 1,
    name: 'Geral'
  },
  {
    id: 2,
    name: 'Casa/Fora'
  }
]