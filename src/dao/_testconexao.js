const pool = require('./conexao');

async function connect(){
    await pool.connect;
    console.log('Conectou no banco');
    await pool.end();
}

connect()