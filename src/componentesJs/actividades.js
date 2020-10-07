/**
 * Creado por: Gabriel Díaz
 * gitHub: https://github.com/gda1712
 * Licencia: MIT
 */


class Actividad
{
    /** Clase que se encarga de guardar las actividades, tanto fecha como texto */
    constructor(fecha, textoActividad)
    {
        const arrayFecha = fecha.split("-");

        //Se sacan los datos de la fecha recibida por parámetro
        this.anno = arrayFecha[0];
        this.mes = arrayFecha[1];
        this.dia = arrayFecha[2];
        this.hora = arrayFecha[3];
        this.minuto = arrayFecha[4];

        this.textoActividad = textoActividad;
    }


    minutosActividad()
    {
        /** Método que retorna la cantidad de minutos totales que tiene la hora de la realización de la actividad
         * Ejemplo: 02:30 regresaria 150
         */

        return (this.hora * 60) + this.minuto;
    }
}


module.exports = {Actividad:Actividad};