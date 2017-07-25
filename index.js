var fs = require('fs')
var cheerio = require('cheerio')
var cfg = require('./dist/js/stats.json')

const folder = 'dist/html/'

fs.readdir(folder, (err, files) => {
    files.forEach(file => {
        fs.readFile(folder + file, (err, data) => {
            var $ = cheerio.load(data)
            var scripts = $('script[src]').attr('src')
            
        })
    })
})
