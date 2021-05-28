const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const estudiantesSchema = new Schema ({

	nombreEst : {
		type : String,
		required : true
		
	}, 
	nuiden : {
		type : Number,
		required : true
		
	}, 

	correo : {
		type: String,
		required : true,
		
	},

	idcurso: [{
		type : Schema.Types.ObjectId,
		ref:'cursos'
		
	}],
		
	tel: {
		type: Number,
		required : true
		
	},

	usuario : {
		type : String,
		required : true
		
	}, 

	contrasena : {
		type : String,
		required : true
		
	},


});

const Estu = mongoose.model('Estu', estudiantesSchema); 

module.exports = Estu