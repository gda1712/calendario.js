
class Calendario
{
    /**
     * Clase que se encarga de manipular el calendario de la UI
     * Necesita las dependencias:
     * bootstrap
     * moment.js
     */
    constructor(id)
    {
        this.crearHtmlInicial(id);
        this.fechaActual = moment();
        
        //Obtenemos todos los elementos del calendario del DOM
        this.fechaCalendarioHtml = document.querySelector("#fecha-calendario");
        
        this.contruirCalendario();

        document.querySelector("#btn-izquierda-calendario").addEventListener("click", this.irMesAnterior.bind(this));

        document.querySelector("#btn-derecha-calendario").addEventListener("click", this.irMesPosterior.bind(this));

    }


    crearHtmlInicial(id)
    {
        /**Método que recibe el id de un elemento html del DOM, para insertar la
         * estructura básica del calendario
         */
        const htmlInicial = `
        <table id=mitabla class="table text-center">
            <thead class="thead-light">
                <tr>    
                    <th scope="col" colspan="7" class="text-center">
                        <button class="btn" id="btn-izquierda-calendario">&larr;</button> 
                        <span id="fecha-calendario"> Agosto 2020 </span>       
                        <button class="btn" id="btn-derecha-calendario">&rarr;</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Dom</th>
                    <th>Lun</th>
                    <th>Mar</th>
                    <th>Mié</th>
                    <th>Jue</th>
                    <th>Vie</th>
                    <th>Sab</th>
                </tr>

            </tbody>
            
        </table>
        `
        document.getElementById(id).innerHTML = htmlInicial;
    }


    contruirCalendario()
    {
        /**Dependiendo del mes actual, contruye el html del calendario y lo inserta en la DOM */
        this.fechaCalendarioHtml.innerText = this.fechaActual.format("MM YYYY");
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
        const filas = document.querySelectorAll(".dias-calendario");

        for(let fila of filas)
        {
            fila.remove();
        }
    }


    llenarCalendario(diaSemana)
    {
        /**
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
            //Se crea la fila de la tabla del html
            let fila = document.createElement("tr");
            fila.classList.add("dias-calendario");

            for(let i = 0; i < 7; i++)
            {
                //SE crea el elemento de la tabla, y se pasa al siguiente día
                let nuevoElemento = document.createElement("td")
                nuevoElemento.innerHTML = `<button class="btn">${fechaAux.format("DD")}</button>`;
                fila.appendChild(nuevoElemento);

                fechaAux.add(1, 'd');
            }

            //Añadimos la fila al html
            document.querySelector("#mitabla tbody").appendChild(fila);
        }
    }


    cantidadDias()
    {
        /**Método que retorna la cantidad de días que tiene el mes del elemento this.fechaActual
         * contando desde el día 1 hasta el día de la fecha, ejemplo del día 1 al 2 hay 1 día
         */
        return Number(this.fechaActual.format("DD")) - 1;
    }


    //-------------------------------MÉTODOS EVENTOS-------------------------
    irMesAnterior()
    {
        /**Método que cambia el mes actual, lleval al mes anterior, modificando por
         * consiguiente el Html del DOM
         */
        console.log("dentro");
        this.fechaActual.subtract(1, "month");
        this.contruirCalendario();
    }


    irMesPosterior()
    {
        /**Método que cambia el mes actual, lleva al mes siguiente, modificando por 
         * consiguiente el Html del DOM*/
        this.fechaActual.add(1, "month");
        this.contruirCalendario();
    }
}