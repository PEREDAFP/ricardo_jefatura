/*
PAra estadísticas de claustro
debe devolver 
GRUPO totalevaluados suspensos1 suspensos2 suspensos3oMás
*/

const valoresSupensos = ['NE', 'NS', 'NO AP']

const alumnos = [
    ['7','1SMRA','NO AP','Sociedad'],
    ['6','1SMRA',1,'Matemáticas'],
    ['7','1SMRA','NO AP','Sociedad'],
    ['6','1SMRA',1,'Matemáticas'],
    ['7','1SMRA',7,'Ciencias'],
    ['7','1SMRA',3,'SOM'],
    ['7','1SMRA',3,'SOM'],
    ['7','1SMRA','NO AP','Sociedad'],
    ['6','1SMRA',1,'Matemáticas'],
    ['7','1SMRA','NO AP','Sociedad'],
    ['6','1SMRA',1,'Matemáticas'],
    ['7','1SMRA',7,'Ciencias'],
    ['7','1SMRA',3,'SOM'],
    ['7','1SMRA',3,'SOM'],
    ['8','1SMRB',3,'SOM'],
    ['8','1SMRB',2,'Matemáticas'],
    ['8','1SMRC',8,'Matemáticas'],
] 
//Obtenemos el número de alumnos por grupo
const alumnosPorGrupo = Array.from(new Set(
    alumnos.map((el=>[el[0],el[1]]))
           .map(JSON.stringify)
    ))
    .map(JSON.parse)
    .map(el=>{
        return {'grupo': el[1], 'nia': el[0]}
    })//Lo pasamos a lista de objetos
    .reduce((lista, elemento) => {
         lista[elemento.grupo]=(lista[elemento.grupo] || 0) + 1
         return lista},[]) //Devolvemos el total de alumnos por grupo

//Ahora obtenemos los suspensos por grupo
//Eliminamos los duplicados y tenemos en cuenta otros valores de suspenso además de los numéricos
const suspensosPorAlumno = Object.entries(Array.from(new Set( 
                alumnos  //Obtenemos los suspensos
                    .filter((el)=> (el[2] < 5 || valoresSupensos.filter(dato => dato == el[2]).length >0)  && el[2] !== '' )
                    .map(el=>{
                        return {
                            'nia':el[0],
                            'grupo':el[1],
                            'materia':el[3],
                     }
                 }).map(JSON.stringify)
                 )).map(JSON.parse)
                 
                 .reduce((acc, item) => { //Lo pasamos a una estructura que me permita agrupar por alumnos
                    const {nia, grupo} = item
                    const key = `${nia}-${grupo}`
                    if (!acc[key]) {
                      acc[key] = { nia, grupo, suspensos: 0 }
                    }
                    acc[key].suspensos += 1;
                  return acc
                 }, []))
                 .map(el=>el[1])
                 .reduce((acc, item) => {

                    const {grupo,suspensos} = item
                    if (!acc[grupo]) {
                      acc[grupo] = {grupo:grupo, suspensos1: 0, suspensos2: 0, suspensos3: 0, totalAlumnos: alumnosPorGrupo[grupo] }
                    }
                    if (suspensos === 1) {
                      acc[grupo].suspensos1 += 1
                    } else if (suspensos === 2) {
                      acc[grupo].suspensos2 += 1
                    } else if (suspensos >= 3) {
                      acc[grupo].suspensos3 += 1
                    }
                    return acc;
                  }, [])

console.log(suspensosPorAlumno)

alumnosPorGrupo.map(el=>{console.log('hola')})
console.log(alumnosPorGrupo)          
