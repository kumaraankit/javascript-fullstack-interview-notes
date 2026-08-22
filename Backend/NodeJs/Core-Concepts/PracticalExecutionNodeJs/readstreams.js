import fs from 'fs';

fs.createReadStream('./streamread.txt', { encoding: 'utf8' })
  .on('data', (chunk) => {
    console.log('data chunk received', chunk);})
  .on('end', () => {
    console.log('stream ended')})
  .on('error', (err) => {
    console.error('stream error', err)});