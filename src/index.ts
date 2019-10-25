import neatCsv, { Row } from 'neat-csv' // eslint-disable-line import/default

const freeAgentHeaders = ['Date', 'Amount', 'Description']

const isValid = (row: Row): boolean =>
  freeAgentHeaders.every(
    (freeAgentHeader: string): string => row[freeAgentHeader]
  )

const inverseAmount = (str: string) => {
  if (str === '0') return str
  if (str.startsWith('-')) return str.slice(1)
  return '-' + str
}

const transform = (row: Row) => ({
  ...row,
  Amount: inverseAmount(row.Amount),
})

export const convert = async (csvLines: string): Promise<string> => {
  const rows = await neatCsv(csvLines)
  return rows
    .filter(isValid)
    .map(transform)
    .reduce((acc, parsedRow: Row) => {
      const row = freeAgentHeaders.map(header => parsedRow[header]).join(',')
      return `${acc}${row}\n`
    }, '')
}
