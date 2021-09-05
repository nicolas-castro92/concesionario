/* solo por ejemplo, pero modificarlo */
exports.sendSMS = async (phone) => {
    let code = Math.random(10);
    console.log(`enviando un mensaje ${code} al numero ${phone}`);
};