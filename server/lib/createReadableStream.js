const { get } = require('https');
const { Readable } = require('stream');

const createUrlReadStream = (url) => {
    const readable = new Readable({
        read() { }, // No-op
    })

    get(url, (response) => {
        response.on('data', (chunk) => {
            readable.push(chunk)
        })

        response.on('end', () => {
            readable.push(null) // End of stream
        })
    }).on('error', (error) => {
        readable.emit('error', error) // Forward the error to the readable stream
    })

    return readable
}

module.exports = { createUrlReadStream }