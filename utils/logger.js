function logger({ text }) {
    return console.log(`\n=============\n${text}\n=============\n`);
}

function errorLogger({ errorText }) {
    console.error("Error: #%d", errorText);
}

module.exports = {
    logger,
    errorLogger,
}