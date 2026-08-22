import { Duplex } from 'stream'

class EchoDuplex extends Duplex {
  constructor(options = {}) {
    super(options)
    this._chunks = []
    this._reading = false
  }

  _write(chunk, encoding, callback) {
    const data = chunk.toString()
    const output = `echo: ${data}`

    if (this._reading) {
      this._reading = false
      this.push(output)
    } else {
      this._chunks.push(output)
    }

    callback()
  }

  _read(size) {
    if (this._chunks.length > 0) {
      this.push(this._chunks.shift())
    } else {
      this._reading = true
    }
  }

  _final(callback) {
    if (this._chunks.length > 0) {
      this.push(this._chunks.shift())
    }
    this.push(null)
    callback()
  }
}

const duplex = new EchoDuplex({ encoding: 'utf8' })

duplex.on('data', (chunk) => {
  console.log('duplex data:', chunk.toString().trim())
})

duplex.on('end', () => {
  console.log('duplex ended')
})

duplex.on('error', (err) => {
  console.error('duplex error', err)
})

duplex.write('first message\n')
duplex.write('second message\n')
duplex.end()