const express = require('express')
const app = express()
const path = require ('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./../helpers/helpers')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Path
const dirPublic = path.join(__dirname, "../../public")
const dirViews = path.join(__dirname, "../../template/views")
const dirPartials = path.join(__dirname, '../../template/partials')
const Curso = require('../models/cursos')
const Estu = require('../models/estudiantes')

//hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials)

//Paginas
app.get('/', function (req, res){
	res.render('index',{
		titulo: 'Inicio'
	})
})
app.post('/eliminar',function(req,res){
	console.log(req.body.NombreCurso, 'hola')
	Curso.deleteOne({_id : req.body.NombreCurso},(err,resultado)=>{
		if (err){
			return console.log(err)
		}
		Curso.find({}, (err,resul)=>{
		if (err){
			return console.log(err)
		}
		console.log(resul)
		res.render('cursos',{
	    titulo: 'Cursos',
	    res: resul ,
	    mensaje: 'Se ha eliminado con exito'
		})
	})
        
		
	})
	
})
app.get('/cursos', function (req, res){
	Curso.find({},(err,resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log(resultado)
		res.render('cursos',{
		titulo:'cursos',
		res: resultado
		
		})
	})
})

app.post('/cursos', function(req, res){
	res.render('cursos2', {
		titulo: 'Ver cursos',
		NombreCurso: req.body.NombreCurso,
		Duracion: req.body.Duracion,
		valor: req.boody.valor

	
	})

});

app.get('/registrar', function (req, res){
	res.render('registrar',{
		titulo: 'Registrar'
	})
})

app.post('/registrar', function (req, res){
	console.log('ingresa')
	let cursos = new Curso({
		nombre: req.body.NombreCurso,
		duracion: req.body.Duracion,
		valor: req.body.valor,
		id: req.body.ID,
		modalidad: req.body.modalidad

	})
	console.log(cursos)

	cursos.save((err,resultado)=>{
		if (err) {
			return (err)
		}
		console.log("ingreso el nuevo registro")
		res.render('registrar',{
		titulo:'Registrar nuevo curso',
		mensaje: 'se ha registrado con exito'
		})


	})	
	
})

app.get('/inscribir', function(req, res){
	Curso.find({},(err,resultado)=>{
		if(err){
			return console.log(err)
		}
		let listaCursos =[];
		resultado.forEach(curso=>{
			if(curso.estado=='disponible'){
				listaCursos.push(curso)
			}

		})
		console.log(listaCursos)
		res.render('inscribir',{
		titulo: 'inscribir',
		res:resultado,
		cursosDIS:listaCursos
	    })
	
    })

})
app.post('/inscribir', function(req, res){
	let estudiantes = new Estu ({
		nombreEst: req.body.nombreEst,
		nuiden: req.body.nuiden,
		correo: req.body.correo,
		contrasena:bcrypt.hashSync(req.body.contrasena, 10),
		idcurso: [req.body.IDcurso],
		tel: req.body.tel,
		usuario: req.body.usuario,
	
		
		

    })

    console.log("registrado"+ estudiantes)
    estudiantes.save((err,resul)=>{
    	console.log("ingrese0"+ resul)
    	if (err){
    		return console.log(err)
    	}
    	console.log("termino")
    	Curso.find({},(err,resultado )=>{
    		console.log("ingreso" + resultado)
    	if(err){
    		return console.log(err)
    	}
    	res.render('inscribir',{
    		titulo: 'inscribir',
    		res:resultado,
    		mensaje:'fue inscrito con exito'
    	})
    	})
    })
	

})


app.get('/listaINScripciones', function(req, res){
	Curso.find({},(err,resultado)=>{
		if (err){
			return console.log(err)
		}
		res.render('listaINScripciones',{
		titulo:'lista de inscripciones',
		cursosDIS:resultado

	})
	
	})
})

app.post('/listaINScripciones', function(req, res){
	Estu.find({idcurso: [req.body.IDcurso]}, (err,resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log(resultado, req.body.IDcurso)

	res.render('listaINScripciones', {
		titulo: 'Lista De Inscripciones',
		estudiantes : resultado,
		IDcurso: req.body.IDcurso,
		nombreEst: req.body.nombreEst
		
		

	})
	})

})

app.post('/Ingresar', (req, res) => {	
	Estu.findOne({nombreEst:req.body.usuario}, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		if(!resultados){ 
			return res.render ('Ingresar', {
			mensaje:"Usuario no encontrado"			
			})
		}
		if(!bcrypt.compareSync(req.body.contrasena, resultados.contrasena)){
			req.session.usuario = resultados._id	
			req.session.nombreEst = resultados.nombreEst
			return res.render ('Ingresar', {
			mensaje:"Contraseña no es correcta"			
			})
		}	
			
			
			res.render('Ingresar', {
						mensaje : "Bienvenido " + resultados.nombreEst,
						nombreEst : resultados.nombreEst,
						sesion : true						
						 

						 })
	



	})	
})

app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	// localStorage.setItem('token', '');
	res.redirect('/')	
})










//error 404
app.get('*',function (req,res){
	res.render('error',{
		titulo:'Error 404'

	})
})
module.exports = app





