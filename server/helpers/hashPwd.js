const bcrypt = require('bcryptjs');

const hashPwd = password => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = { hashPwd, compare }