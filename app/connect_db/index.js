module.exports = { connect };
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => console.log('Connected!'));
    } catch (error) {
        console.log('Connection failed');
    }
}

module.exports = { connect };
