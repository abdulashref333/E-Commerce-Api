const randomstring = require('randomstring');

module.exports = () => {
    return randomstring.generate({
        length:5,
        charset: 'alphabetic',
        capitalization: 'uppercase'
    });
}