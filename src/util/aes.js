let crypto = require('crypto');
function encryption(data, key) {
	var iv = "";
	var cipherChunks = [];
	var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
	cipher.setAutoPadding(true);
	cipherChunks.push(cipher.update(data, 'utf8', 'hex'));
	cipherChunks.push(cipher.final('hex'));
	return cipherChunks.join('')
}

function decryption(data, key) {
	var iv = "";
	var cipherChunks = [];

	var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
	decipher.setAutoPadding(true);
	cipherChunks.push(decipher.update(data, 'hex', 'utf8'));
	cipherChunks.push(decipher.final('utf8'));
	return cipherChunks.join('')
}

export {encryption,decryption}