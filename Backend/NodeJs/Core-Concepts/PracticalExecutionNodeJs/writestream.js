import fs from 'fs'

const writeStream = fs.createWriteStream('./streamread.txt', {
  encoding: 'utf8',
})

writeStream
  .on('finish', () => {
    console.log('stream finished writing')
  })
  .on('error', (err) => {
    console.error('stream error', err)
  })

writeStream.write('first line\n')
writeStream.write('second line\n')
writeStream.write('third line\n')

writeStream.end()