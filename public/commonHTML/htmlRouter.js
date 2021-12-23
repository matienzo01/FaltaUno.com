const { promisify } = require("util");
const fs = require("fs");

const primises = {
	readAsync: promisify(fs.readFile),
};

async function getHeader() {
	return await promises.readAsync("./header.html");
}
