const db = require(' ./_database');

async function createTable(){
    await db.connect();

    await db.query('CREATE TABLE aluno( id serial PRIMARY KEY, )')
}