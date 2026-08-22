const fs = require('fs')

console.log('start')

fs.readFile(__filename, 'utf8', (err, data) => {
    if (err) {
        console.error('readFile error', err)
        return
    }
    console.log('readFile callback')
})

setImmediate(() => {
    console.log('setImmediate')
})

setTimeout(() => {
    console.log('setTimeout')
}, 0)

console.log('end')
