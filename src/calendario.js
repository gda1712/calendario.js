/**
 * Creado por: Gabriel Díaz
 * gitHub: https://github.com/gda1712
 * Licencia: MIT
 */

//Dependencias
let moment = require("moment");


class Calendario
{
    /**
     * Clase que se encarga de manipular el calendario de la UI
     * Necesita las dependencias:
     * moment.js
     */
    constructor(id)
    {
        this.crearHtmlInicial(id);
        this.fechaActual = moment();
        
        //Obtenemos todos los elementos del calendario del DOM
        this.calendarioHtml = document.querySelector(".calendario");
        this.fechaCalendarioHtml = document.querySelector(".calendario__fecha");
        
        this.contruirCalendario();

        /*Función, que se ejecutara cada vez que se cambie el mes, esta es proporcionada
        En el método this.cambioMes(funcion)*/
        this.ejecutarAlCambiarMes;

        //Añadimos los eventos al precionar los botones del calendario
        document.querySelector("#btn-izquierda-calendario").addEventListener("click", this.irMesAnterior.bind(this));

        document.querySelector("#btn-derecha-calendario").addEventListener("click", this.irMesPosterior.bind(this));
    }


    crearHtmlInicial(id)
    {
        /**Método que recibe el id de un elemento html del DOM, para insertar la
         * estructura básica del calendario
         */
        const htmlInicial = `
        <div class="calendario">
            <button class="calendario__btn" id="btn-izquierda-calendario">&larr;</button> 
            <section class="calendario__fecha"></section>       
            <button class="calendario__btn" id="btn-derecha-calendario">&rarr;</button>
            <button class="calendario__btn">Dom</button>
            <button class="calendario__btn">Lun</button>
            <button class="calendario__btn">Mar</button>
            <button class="calendario__btn">Mié</button>
            <button class="calendario__btn">Jue</button>
            <button class="calendario__btn">Vie</button>
            <button class="calendario__btn">Sab</button>
        </div>
        `
        document.getElementById(id).innerHTML = htmlInicial;
    }


    contruirCalendario()
    {
        /**Dependiendo del mes actual, contruye el html del calendario y lo inserta en el DOM */
        this.fechaCalendarioHtml.innerHTML = `<span>${this.fechaActual.format("MM YYYY")}<span>`;
        this.eliminarDiasCalendario();

        switch(this.fechaActual.subtract(this.cantidadDias(), 'd').format("dddd"))
        {
            case "Sunday":
                this.llenarCalendario(0)
                break;
            case "Monday":
                this.llenarCalendario(1)
                break;
            case "Tuesday":
                this.llenarCalendario(2)
                break;
            case "Wednesday":
                this.llenarCalendario(3)
                break;
            case "Thursday":
                this.llenarCalendario(4)
                break;
            case "Friday":
                this.llenarCalendario(5)
                break;
            case "Saturday":
                this.llenarCalendario(6)
                break;
        }
    }


    eliminarDiasCalendario()
    {
        /**Elimina del html todas las filas con los días */
        const dias = document.querySelectorAll(".calendario__btn--dias");

        for(let dia of dias)
        {
            dia.remove();
        }
    }


    llenarCalendario(diaSemana)
    {
        /**
         * 
         * Método que recibe por parametro el número que equivale al primer día
         * de la semana, ejemplo Domingo : 0, Lunes : 1, llena la tabla
         * como si fuera un arreglo
        */

        /*Auxiliar que se usa para recorrer todos los dias del mes, se lleva hasta el número
        en que inicia el calendario, ejemplo: para agosto de 2020, el calendario comenzaria a
        a mostrarse el domingo 26 julio*/
        let fechaAux = moment(this.fechaActual);
        fechaAux.subtract( diaSemana + this.cantidadDias(), 'd');

        //Aux que se usa para hacer que el ciclo while se detenga, cuando se acabe el mes a imprimir
        let fechaAux2 = moment(this.fechaActual);
        fechaAux2.add(1, 'month');

        //Si ya no estamos en el mes actual, se termina el ciclo
        while(fechaAux.format("MM") != fechaAux2.format("MM"))
        {

            for(let i = 0; i < 7; i++)
            {
                //SE crea el botón del calendario, y se pasa al siguiente día
                let nuevoElemento = document.createElement("button")

                //En caso que no pertenezca se guarda en el html con una clase
                //llamada ".calendario__btn--dias--false"
                if(fechaAux.format("MM") == this.fechaActual.format("MM")) 
                    {}
                else
                    nuevoElemento.className = "calendario__btn--dias--false";

                nuevoElemento.classList.add("calendario__btn--dias");
                nuevoElemento.innerText = fechaAux.format("DD");

                //Añadimos la fila al html
                this.calendarioHtml.appendChild(nuevoElemento);

                fechaAux.add(1, 'd');
            }
        }
    }


    cantidadDias()
    {
        /**Método que retorna la cantidad de días que tiene el mes del elemento this.fechaActual
         * contando desde el día 1 hasta el día de la fecha, ejemplo del día 01 al 02 hay 1 día
         */
        return Number(this.fechaActual.format("DD")) - 1;
    }


    //-------------------------------MÉTODOS USUARIO------------------------------
    anadirEventosCeldas(funcion, dias, evento)
    {
        /**
         * Método que recibe por parametro una función, los días del mes actual,
         * a los que se requiere añadir un evento, por ejemplo [01, 10, 20], y el nombre
         * del evento, por ejemplo "click" 
        */

        const celdas = document.querySelectorAll(".calendario__btn--dias");

        for(let celda of celdas)
        {
            //Si el día revisado existe y pertenece al mes actual: añadimos el evento
            if(dias.some(dia => Number(dia) == Number(celda.innerText)) && celda.classList.contains("calendario__btn--dias--false") == "false")
                celda.addEventListener(evento, funcion);
            
        }
    }


    cambioMes(funcion)
    {
        /**Método que recibe por parametro una funcion, que sera guardada en el obj
         * para ser ejecutada cada vez que se cambia de mes (Cada vez que se oprime el btn
         * del calendario "derecha" o "izquierda")
         */

        this.ejecutarAlCambiarMes = funcion;
    }


    //-------------------------------MÉTODOS EVENTOS-------------------------
    irMesAnterior()
    {
        /**Método que cambia el mes actual, lleval al mes anterior, modificando por
         * consiguiente el Html del DOM
         */
        this.fechaActual.subtract(1, "month");
        this.contruirCalendario();
        this.ejecutarAlCambiarMes();
    }


    irMesPosterior()
    {
        /**Método que cambia el mes actual, lleva al mes siguiente, modificando por 
         * consiguiente el Html del DOM*/
        this.fechaActual.add(1, "month");
        this.contruirCalendario();
        this.ejecutarAlCambiarMes();
    }
}

module.exports = {Calendario:Calendario};