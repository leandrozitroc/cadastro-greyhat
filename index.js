const express = require('express')
const app = express()
const port = 8181
//body-parser
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
//bcrypt
const bcrypt = require('bcryptjs')
//ejs
app.set('view engine', "ejs" )
app.use(express.static('public'))
//sessions
const session = require('express-session')
const Auth = require('../../curso_js/cadastro_greyhat/views/partials/midle')

app.use(session({
    secret: "palmeirasnaotemmundial", cookie:{maxAge: 100000000}
}))

//database
const connection = require('./database/database.js')
const Admin = require('./database/Admin')
const Register = require('./database/Register')
app.use(bodyparser.urlencoded({extended: false}))

connection.authenticate()
.then(()=>{
    console.log('Connection Stabilished to database!!!')
})
.catch((erro)=>{
    console.log(erro)
})


app.get('/',(req,res) => {
    res.render('index')
})

app.get('/administration', (req,res)=>{
    res.render('login')
    
})

app.get('/register', (req,res)=>{
    res.render('register')
    

})

app.get('/users', (req,res)=>{
    res.render('users')
    

})


app.post('/creation', (req,res)=>{
    let name = req.body.nome
    let common = req.body.common
    let email = req.body.Email
    let password = req.body.Pass
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    Register.create({
        nome: name,
        sobrenome: common,
        email: email,
        password: hash, 

    }).then(()=>{
        res.redirect('/')
    })
})

app.get('/adminpage', Auth ,(req,res)=>{
    Register.findAll({raw: true}).then(logins =>{
            res.render('adminpage',{
                logins: logins
            })
        })

    })


app.get('/users/:id', (req,res)=>{
    let id = req.params.id
    Admin.findOne({
        where:{id: id}
        
    }).then(nome=>{
        if( nome != undefined){
            Register.findAll({
                where: {id: id}
            }).then(email=>{
                res.render('users',{
                                        
                    email: email

                })
            })
            
        }else{
            console.log('error')
        }
    })
})

app.post('/autenthication',(req,res) =>{
    const email = req.body.Email
    const password = req.body.Pass

    Admin.findOne({ where:{email: email}}).then(user =>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password,user.password)
            if(correct){
                req.session.user ={
                    id: user.id,
                    email: user.email
                }
                res.redirect('/adminpage')
            }else{
                res.redirect('/administration')
            }


        }else{
            res.redirect('/administration')
        }
    })
})

app.post('/delete',(req,res)=>{
    let id = req.body.id
    if(id != undefined){
        Register.destroy({
            where: {
                id: id
            }, 
            
        }).then(() =>{
            res.redirect('/adminpage')
        })
    }else{
        res.redirect('/')
    }
})

app.listen(8181, (erro)=>{
    if(erro){
        console.log(erro)
    }else{
        console.log(`Server Running at port ${port}`)
    }
})

