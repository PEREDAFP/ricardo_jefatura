const datos = [
    {
        'grupo': "SMR1A",
        'materia': 'SOM',
        'porcentaje':50.0,
        'mediaCurso':0,
    },
    {
        'grupo': "SMR1A",
        'materia': 'redes',
        'porcentaje':100.0,
        'mediaCurso':0,
    },{
        'grupo': "SMR1B",
        'materia': 'SOM',
        'porcentaje':50.0,
        'mediaCurso':0,
    },{
        'grupo': "SMR1B",
        'materia': 'redes',
        'porcentaje':50.0,
        'mediaCurso':0,
    },{
        'grupo': "SMR1A",
        'materia': 'AO',
        'porcentaje':50.0,
        'mediaCurso':0,
    },
]
//Función de media en un array

function media(arr) {
    if (arr.length === 0) return 0; // Maneja el caso de un array vacío
    const suma = arr.reduce((acc, curr) => acc + curr, 0)
    return Number((suma / arr.length).toFixed(2))
}

const mediaPorcentaje = datos.reduce((acc, curr) => {
    const { grupo, porcentaje } = curr
    if (!acc[grupo]) {
        acc[grupo] = []
    }
    acc[grupo].push(porcentaje)
    return acc
}, {})
//Cargamos la media el curso en datos y ordenamos por grupo
const final = datos
    .map(el=>{
        return {
            ...el,
            mediaCurso: media(mediaPorcentaje[el.grupo]),
            diferencia: el.porcentaje - media(mediaPorcentaje[el.grupo])
        }
    })
    .sort((a, b) => a.grupo.localeCompare(b.grupo))
        
    
console.log(final)
