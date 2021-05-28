const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const CursosSchema = new Schema ({

	nombre : {
		type : String,
		required : true
		
	}, 

	duracion : {
		type : String,
		required : true
		
	}, 

	valor : {
		type: Number,
		required : true,
		
	},

	id : {
		type: Number,
		required : true
		
	},
	estado  : {
		type: String,
		required : true,
		default:'disponible'
		
	},
	modalidad  : {
		type: String,
		required : true
		
	}


});

const Cursos = mongoose.model('Cursos', CursosSchema); 

module.exports = Cursos