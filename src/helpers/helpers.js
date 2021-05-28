
const Curso = require('../models/cursos')
const Estu = require('../models/estudiantes')
const hbs = require ('hbs')


hbs.registerHelper('Mostrar', (estudiantes) => {
 	if (estudiantes){ 
 		texto = "";
 	estudiantes.forEach(Estu => {
texto += `<tr><td>${Estu.nombreEst}</td>
              <td>${Estu.correo}</td>
              <td>${Estu.tel}</td>
              <td><button type="submit" class="form-control btn btn-primary btn-sm" name="NombreEstudiante" value="${Estu._id}}">eliminar</button></td>

                  </tr>`
 	})
 	console.log("Hola" + texto)
 	return texto
 	}
 });

//`<tr>
		  //<td>${Estu.nombreEst}</td>
          //<td>${Estu.correo}</td>
          //<td>${Estu.tel}</td> 
         // <td> <button type="submit" class="form-control btn btn-danger btn-sm" name="NombreEstudiante" value="${Estu._id}">eliminar</button></td>
 		 // </tr>`