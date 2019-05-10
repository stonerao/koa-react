const crypto = require('crypto');

exports.aesEncrypt = function aesEncrypt(data, key) {
    //加密MD5
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

exports.aesDecrypt = function aesDecrypt(encrypted, key) {
    //还原MD5
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}