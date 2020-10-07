/**
 * Creado por: Gabriel Díaz
 * gitHub: https://github.com/gda1712
 * Licencia: MIT
 */

//Dependencias
let moment = require("moment");
let fecha = require("./componentesJs/fecha.js")


class Calendario
{
    /**
     * Clase que se encarga de manipular el calendario de la UI
     * Necesita las dependencias:
     * moment.js
     */
    constructor(id, color)
    {

        //Variable Fecha, se encarga de manipular las fechas de las actividades de la agenda
        this.fechasActividades = new fecha.Fecha();

        /**Colors: oscuro, inspiracion */
        this.crearHtmlInicial(id, color);
        this.fechaActual = moment();
        
        //Obtenemos todos los elementos del calendario del DOM
        this.calendarioHtml = document.querySelector(".calendario");
        this.fechaCalendarioHtml = document.querySelector(".calendario__fecha");
        
        this.contruirCalendario();

        //Añadimos los eventos al precionar los botones del calendario
        document.querySelector("#btn-izquierda-calendario").addEventListener("click", this.irMesAnterior.bind(this));

        document.querySelector("#btn-derecha-calendario").addEventListener("click", this.irMesPosterior.bind(this));
    
        //Añadir eventos en los botones del mes para las actividades
        this.anadirEventoActividades();
    }


    crearHtmlInicial(id, color)
    {
        /**Método que recibe el id de un elemento html del DOM, para insertar la
         * estructura básica del calendario
         */
        const htmlInicial = `
        <div class="calendario calendario-${color}">
            <button class="calendario__btn" id="btn-izquierda-calendario">&larr;</button> 
            <section class="calendario__fecha"></section>       
            <button class="calendario__btn" id="btn-derecha-calendario">&rarr;</button>
            <section class="calendario__btn">Dom</section>
            <section class="calendario__btn">Lun</section>
            <section class="calendario__btn">Mar</section>
            <section class="calendario__btn">Mié</section>
            <section class="calendario__btn">Jue</section>
            <section class="calendario__btn">Vie</section>
            <section class="calendario__btn">Sab</section>
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
        const dias = document.querySelectorAll(".calendario__dias");

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
                    nuevoElemento.className = "calendario__dias--false";

                nuevoElemento.classList.add("calendario__dias");
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


    //-------------------------------MÉTODOS PROGRAMADOR------------------------------
    anadirEventosCeldas(funcion, dias, evento)
    {
        /**
         * Método que recibe por parametro una función, los días del mes actual,
         * a los que se requiere añadir un evento, por ejemplo [01, 10, 20], y el nombre
         * del evento, por ejemplo "click" 
        */

        const celdas = document.querySelectorAll(".calendario__dias");

        for(let celda of celdas)
        {
            //Si el día revisado existe y pertenece al mes actual: añadimos el evento
            if(dias.some(dia => Number(dia) == Number(celda.innerText)) && celda.classList.contains("calendario__dias--false") == "false")
                celda.addEventListener(evento, funcion);
            
        }
    }


    anadirActividadCalendario(fecha, textoActividad)
    {
        /** Método que permite añadir una actividad a una fecha del calendario
         * Esta actividad solo será visible si this.modoAgenda esta en true
         * La fecha debe venir en el formato "AAAA-MM-DD-HH-mm"
         */

        this.fechasActividades.anadirActividad(fecha, textoActividad);
    }


    cambiarColor(color)
    {
        /**Método que cambia el color del calendario por el que se le pase por parámetro */
        this.calendarioHtml.className = `calendario calendario-${color}`;
    }


    //-------------------------------MÉTODOS EVENTOS-------------------------
    irMesAnterior()
    {
        /**Método que cambia el mes actual, lleval al mes anterior, modificando por
         * consiguiente el Html del DOM
         */
        this.fechaActual.subtract(1, "month");
        this.contruirCalendario();
        
        this.anadirEventoActividades();
    }


    irMesPosterior()
    {
        /**Método que cambia el mes actual, lleva al mes siguiente, modificando por 
         * consiguiente el Html del DOM*/
        this.fechaActual.add(1, "month");
        this.contruirCalendario();

        this.anadirEventoActividades();
    }


    anadirEventoActividades()
    {
        /** Se encarga de dar el evento de click a cada día del mes actual */
        
        const celdas = document.querySelectorAll(".calendario__dias");

        for(let celda of celdas)
        {
            celda.addEventListener("click", this.cargarActividadesDia.bind(this));
        }
    }


    cargarActividadesDia(evt)
    {
        /** Método que se encarga de cargar en el calendario las actividades del día
         * del evento, crea y carga la ventana modal
         */
        const actividades = this.fechasActividades.obtenerActividadesDia(this.fechaActual.format("YYYY"), this.fechaActual.format("MM"), evt.target.innerText);
        
        //Aplicamos algoritmo burbuja para acomodar las fechas en orden ascendente
        //Creamos auxiliar para saber continuar el ciclo del algoritmo

        
        let desordenado = false;
        do
        {
            desordenado = false;
            for(let i = 0; i < actividades.length -1; i++)
            {
                if(actividades[i].minutosActividad() > actividades[i+1].minutosActividad())
                {
                    const auxiliar = actividades[i];
                    actividades[i] = actividades[i+1];
                    actividades[i+1] = auxiliar;
                    desordenado = true
                }
            }
        }while(desordenado);

        //Creamos el html para la ventana modal
        let contenidoVentanaModal = "";

        actividades.forEach(actividad =>
            {
                contenidoVentanaModal += `
                    <div> 
                        <div> ${actividad.hora}:${actividad.minuto} </div>
                        <div> ${actividad.textoActividad} </div>
                    </div>
                    `
            })
        
        const ventanaModal = document.createElement("div");
        ventanaModal.className = "calendario__modal";

        ventanaModal.innerHTML = `
            <div class="calendario__modalContenido">
                <div> Actividades del día <a href="#"> X </a> </div>
                ${contenidoVentanaModal}
            </div>`

        this.calendarioHtml.appendChild(ventanaModal);

        //Damos el evento para cerrar la ventana modal
        document.querySelector(".calendario__modalContenido > div > a").addEventListener("click", this.cerrarVentanaModal.bind(this))
    }


    cerrarVentanaModal(evt)
    {
        /** Método que se encarga de eliminar la ventana modal */
        evt.preventDefault();

        document.querySelector(".calendario__modal").remove();

    }
}

module.exports = {Calendario:Calendario};