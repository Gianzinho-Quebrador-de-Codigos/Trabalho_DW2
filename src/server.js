const express = require("express");
const res = require("express/lib/response");
const app = express();
const pool = require('./dao/conexao')
/**
 * Caminhos estáticos
 */

app.use('/bscss', express.static('./node_modules/bootstrap/dist/css'));
app.use('/bsjs', express.static('./node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/popperjs', express.static('./node_modules/@popperjs/core/dist/umd'));
app.use('/mask', express.static('./node_modules/jquery-mask-plugin/dist'));
app.use('/publico', express.static(__dirname + '/publico'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


app.listen(3000,function(){
    console.log('Servidor rodando na porta 3000');
});

app.set('views',__dirname+'/views');
app.set('view engine','pug');

app.get('/solicita-alterar/:id',function(req, res){
    const { id } = req.params;
    pool.query(`SELECT id, nome, to_char( dtnascimento, 'YYYY-MM-DD') as dtnascimento, cpf, email, telefone, estadocivil, curso
                 FROM estudantes WHERE ID = ${id}`)
                 .then(function(resultado){
                    let estudante = resultado.rows[0]
                    //console.log(estudante)
                    res.render('formulario',{estudante})
                })
                .catch(function(erro){
                    console.log(erro.stack)
                    //res.render('lista');
                })
});

app.get('/formulario',function(req, res){
    res.render('formulario');
});

app.get('/',function(req, res){
    pool.query(`SELECT id, nome, to_char( dtnascimento, 'DD-MON-YYYY') as dtnascimento, cpf, email, telefone, estadocivil, curso
                FROM estudantes ORDER BY ID ASC`)
    .then(function(resultado){
       resultado.rows.forEach( function(row){
         //console.log(row.nome,row.dtnascimento)
     })            
     let listaCompleta = resultado.rows
     res.render('listar',{listaCompleta})
   })
   .catch(function(erro){
       console.log(erro.stack)
       //res.render('lista');
   })
});


app.post('/cadastro-album',function(req, res){

    pool.query(`
                INSERT INTO estudantes 
                    (nome, dtnascimento, cpf, email, telefone, estadocivil, curso) 
	            VALUES
                    ($1, $2, $3, $4, $5, $6, $7)`,
                    [req.body.exampleInputNome1, 
                        req.body.exampleInputTelefone1, 
                        req.body.disabledSelect,
                        req.body.exampleInputEmail1,
                        req.body.exampleInputData1,
                        req.body.exampleInputCpf1,
                        req.body.exampleInputCurso1]
                )
                .then(function(retorno){
                    console.log("Cadastro realizado com sucesso!")
                    res.sendFile(__dirname + '/views/retorno-form-sucesso.html');
                })
                .catch(function(erro){
                    console.log('Apresentou erro: ' + erro);
                    res.sendFile(__dirname + '/views/retorno-form-erro.html');
                })
});

app.post('/alterar/:id',function(req, res){
    const { id } = req.params;
    pool.query(`
                UPDATE estudantes SET
		            nome = '${req.body.nome}',
                    dtnascimento = '${req.body.dataNascimento}',
                    cpf = '${req.body.cpf}',
                    email = '${req.body.email}',
                    telefone = '${req.body.telWhats}',
                    estadocivil = ${req.body.estCivil},
                    curso = ${req.body.curso}
	            WHERE 
                    ID = ${id}`)
                .then(function(retorno){
                    //console.log("Alteração realizada com sucesso!")
                    throw "erro"
                    //res.redirect('/listar')
                })
                //TRATAR ERROS NA CAMADA VISUAL
                .catch(function(erro){
                    console.log('Apresentou erro: ' + erro);
                    res.redirect(`/solicita-alterar/${id}`)
                })
});

app.get('/excluir/:id',function(req, res){
    const { id } = req.params;
    pool.query(`
                DELETE FROM estudantes 
	            WHERE 
                    ID = ${id}`)
                .then(function(retorno){
                    console.log("Registro excluído com sucesso!")
                    //throw "erro"
                    res.redirect('/listar')
                })
                //TRATAR ERROS NA CAMADA VISUAL
                .catch(function(erro){
                    console.log('Apresentou erro: ' + erro);
                    res.redirect('/listar')
                })
});