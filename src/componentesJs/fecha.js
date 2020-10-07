/**
 * Creado por: Gabriel Díaz
 * gitHub: https://github.com/gda1712
 * Licencia: MIT
 */

//Dependencias
let actividad = require("./actividades.js");

class Fecha
{
    /** Clase que se encarga de guardar y administrar las actividades
     * Se usa la clase Actividades, esta clase solo manipula y guarda la información
     *  */
    constructor()
    {
        this.actividades = [];
        
        /*if(sessionStorage.getItem("fechas") == null)
            sessionStorage.setItem("fechas", JSON.stringify(this.actividades));
        else
            this.actividades = JSON.parse(sessionStorage.getItem("fechas"));*/
    }


    anadirActividad(fecha, textoActividad)
    {
        /** Método que añade una fecha a la BBDD en session storage */

        const nuevaActividad = new actividad.Actividad(fecha, textoActividad);

        this.actividades.push(nuevaActividad);

        //sessionStorage.setItem("fechas", JSON.stringify(this.actividades));
    }


    obtenerActividadesMes(anno, mes)
    {
        /** Retorna un arreglo, con objeos de tipo Actividad, correspondientes al mes y anno solicitado */

        return this.actividades.filter(actividad => { actividad.mes == mes && actividad.anno == anno });
    }


    obtenerActividadesDia(anno, mes, dia)
    {
        /** Retorna un arreglo, con objeos de tipo Actividad, correspondientes al día, mes y anno solicitado */
        return this.actividades.filter(actividad => { if(actividad.anno == anno && actividad.mes == mes && actividad.dia == dia) return actividad });

    }
}


module.exports = {Fecha:Fecha};