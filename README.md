# Calendario.js

Crea calendarios HTML desde JavaScript de forma rápida y sencilla

## Comenzando 🚀

Usar el proyecto es muy sencillo, solo debes instanciar en tu archivo JS un elemento de la clase **cal.Calendario**


### Instalación 🔧

Solo debes importar en tu proyecto los archivos de la carpeta *dist/* si no sabes mucho de JavaScript la forma más sencilla es usando la siguiente organización:

Estructura Carpetas
```
-js
  -calendario.js
-css
  -calendario.css
index.html
```

 **index.html**
 ```
 <head>
    <link rel="stylesheet" href="css/calendario.css">
 <head>
 <body>
    <script src="js/calendario.js"></script>
  </body>
 ```


## USO 📦

Para usar el proyecto solo basta con instanciar un objeto de la clase *cal.Calendario* pasandole al constructor como parámetro el *id* del elemento HTML al que se va a agregar el calendario y el *color* (ir a sección *Colores* para más información) 

```
const miCalendario = new cal.Calendario("miId", "inspiracion");
```

Esto iniciara el calendario dentro del id pasado por parámetro al constructor

## Métodos disponibles ⚙️

La librería cuenta con métodos que poco a poco se irán ampliando:

**anadirActividadCalendario(fecha, texto)**

Este método permite añadir una actividad a un día y hora en especifico. en la fecha se usa el formato *AAAA-MM-DD-HH-mm*, ejemplo de uso de una actividad el día *03 de octubre de 2020 a las 20:30*:

```
miCalendario.anadirActividadCalendario("2020-10-03-20-30", "Tocar violín");
```

Esto permite que al dar click sobre un día con la actividad, se abra una ventana modal mostrando las actividades registradas en este día. Ejemplo del resultado de la ventana modal:

![Ventana-Modal](https://raw.githubusercontent.com/gda1712/calendario.js/master/imagenesProyecto/calendario.gif)


**cambiarColor(color))**

Este método recibe por parámetro un color (ir a la sección *Colores* para más información) y cambia el color del calendario, ejemplo de uso:

```
miCalendario.cambiarColor("inspiracion");
```

## Colores


**inspiracion**

![inspiracion](https://raw.githubusercontent.com/gda1712/calendario.js/master/imagenesProyecto/calendario-inspiracion.png)


**mora**

![mora](https://raw.githubusercontent.com/gda1712/calendario.js/master/imagenesProyecto/calendario-mora.png)


**oficina**

![oficina](https://raw.githubusercontent.com/gda1712/calendario.js/master/imagenesProyecto/calendario-oficina.png)


**oscuro**

![oscuro](https://raw.githubusercontent.com/gda1712/calendario.js/master/imagenesProyecto/calendario-oscuro.png)


**tinieblas**

![tinieblas](https://raw.githubusercontent.com/gda1712/calendario.js/master/imagenesProyecto/calendario-tinieblas.png)


## Construido con 🛠️

* [node.js](https://nodejs.org/es/) - Entorno de ejecución para JavaScript
* [browserify.js](http://browserify.org/) - Compilador de modulos JavaScript
* [terser](https://github.com/terser/terser) - Compresor de JS
* [moment.js](https://momentjs.com/) - Librería para el manejo de fechas
* [stylus](https://stylus-lang.com/) - Precompilador de CSS



## Autores ✒️

* **Gabriel Díaz** - *Trabajo Inicial* - (https://github.com/gda1712)


## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Gracias por usar y apoyar este proyecto 📢 
* Cualquier mejora que puedas aportar sera bien recibida 🤓.



---
⌨️ con ❤️ desde Venezuela
