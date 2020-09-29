# Calendario.js

Crea calendarios HTML desde JavaScript de forma rápida y sencilla

## Comenzando 🚀

Usar el proyecto es muy sencillo, solo debes instanciar en tu archivo JS un elemento de la clase **Calendario**


### Instalación 🔧

Solo debes importar en tu proyecto los archivos de la carpeta *dist/* si no sabes mucho de JavaScript la forma más sencilla es usando la siguiente organización:

Estructura Carpetas
```
-js
  -calendario.js
-css
  -estilos.css
index.html
```

 **index.html**
 ```
 <head>
    <link rel="stylesheet" href="css/estilos.css">
 <head>
 <body>
    <script src="js/calendario.js"></script>
  </body>
 ```


## USO 📦

Para usar el proyecto solo basta con instanciar un objeto de la clase *cal.Calendario* pasandole al constructor como parámetro el *id* del elemento HTML al que se va a agregar el calendario

```
const miCalendario = new cal.Calendario("miId");
```

Esto iniciara el calendario dentro del id pasado por parámetro al constructor

## Métodos disponibles ⚙️

La librería cuenta con métodos que poco a poco se irán ampliando:

**anadirEventosCeldas(funcion, dias, evento)**

Este método permite añadir un evento a algún día del mes actual, ejemplo de uso:

```
const funcionEvento = function() { console.log("Hola Mundo") }

miCalendario.anadirEventosCeldas(funcionEvento, [20, 21, 17], "click");
```

El resultado sera que a cada día que se paso por parámetro se le agregara el evento "click" ejecutando la funcion *funcionEvento*

**cambioMes(funcion)**

Este método recibe por parámetro una función, que se ejecutará cada vez que el usuario cambie de mes en el calendario, ejemplo de uso:

```
const funcionEvento = function() { console.log("Hola Mundo") }

miCalendario.cambioMes(funcionEvento);
```

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [node.js](https://nodejs.org/es/) - Entorno de ejecución para JavaScript
* [browserify.js](http://browserify.org/) - Compilador de modulos JavaScript
* [moment.js](https://momentjs.com/) - Librería para el manejo de fechas


## Autores ✒️

* **Gabriel Díaz** - *Trabajo Inicial* - (https://github.com/gda1712)


## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢 
* Cualquier mejora que puedas aportar sera bien recibida 🤓.



---
⌨️ con ❤️ por [Gabriel Díaz](https://github.com/gda1712) 😊
