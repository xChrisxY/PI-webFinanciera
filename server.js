import mysql from 'mysql';

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'cadofi',
    insecureAuth: true

});

connection.connect((error) => {

    if (error) {

        console.error('Error al conectar con la base de datos ', error);

    } else {

        console.log("Conexión exitosa a la base de datos");
        
        connection.query('SELECT * FROM cadofi.empleado;', (error, results) => {

            if (error) {

                console.error('Error al ejecutar la consulta: ', error);

            } else {

                console.log('Registros obtenidos: ', results);

            }
        });


        connection.query('INSERT INTO empleado(idEmpleado, nombre, direccion, email, contraseña, puesto, telefono) VALUES("3", "SAul gome", "1ra Calle Sur Poniente S/N", "chris@gmail.com", "123456", "Gestor de cobranzas", "9921040022");', function(error, results){

            if(error) throw error; 

            console.log("¡Registro Agregado!", results);
 
        });

    }

});

