#!/usr/bin/env node

import { convert } from '.'

let input = ''
process.stdin.on('data', data => {
  input += data
})

process.stdin.once('end', () => {
  convert(input)
    .then(res => process.stdout.write(res))
    .catch(err => process.stderr.write(err))
})
