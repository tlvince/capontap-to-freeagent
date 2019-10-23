import { convert } from '../src'
import { promises as fsP } from 'fs'

interface SetupResponse {
  csvFixture: string
}

const setup = async (): Promise<SetupResponse> => {
  const buffer = await fsP.readFile('./test/fixtures/capontap.csv')
  const csvFixture = buffer.toString()
  return {
    csvFixture,
  }
}

describe('convert', () => {
  it('should handle a well-formed CSV', async () => {
    const { csvFixture } = await setup()
    const converted = await convert(csvFixture)
    expect(converted).toMatchSnapshot()
  })
})
