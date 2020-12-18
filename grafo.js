//la complejidad de cada sentencia sigue despues de ►
//la complejidad de una método aplicando sigue ►[]

//clase grafo
class Grafo {
    constructor() {
        this.vertices = []; // ►1 
    };
    addVertice(dato) {  // ►[V]
        //se verifica que el vertice no haya sido incluido
        let nuevoNodo = new Nodo(dato, null); // ►1 
        if (!this.vertices.some(elemento => { return elemento.dato == nuevoNodo.dato })) { // ►V 
            nuevoNodo.sig = new LinkedList; // ►1
            this.vertices.push(nuevoNodo); // ►1
            return true;
        }
        return false;
    }
    addArista(origen, destino, peso) { // ►[4V+3A+VA]
        if (peso == undefined) { // ►1
            peso = 0; // ►1
        }
        let norigen = this.searchVertice(origen); // ►V
        let ndestino = this.searchVertice(destino); // ►V
        //verificamos si la arista existe
        if (this.searchArista(origen, destino)) {  // ►2V+VA
            return;
        }
        //verificamos si el nodo origen y destino existen
        if (norigen && ndestino) {   // ►1
            //pasamos las referencias
            if (norigen == ndestino) {  // ►1
                norigen.sig.add(ndestino);  // ►1
                norigen.sig.search(destino).peso = peso  // ►A
                return;
            }
            norigen.sig.add(ndestino); // ►1
            ndestino.sig.add(norigen); // ►1
            norigen.sig.search(destino).peso = peso // ►A
            ndestino.sig.search(origen).peso = peso // ►A
        }
        else {
            return null;
        }
    }
    searchArista(origen, destino) { // ►[2v+VA]
        let rOrigen = this.searchVertice(origen); // ►V
        let rDestino = this.searchVertice(destino); // ►V
        if (rOrigen && rDestino) { // ►1
            let arista = [] // ►1
            //busca el nodo destino en la lista de origen (la arita entre origen y destino)
            this.vertices.some(vertice => { // ►[V*A]
                if (vertice == rOrigen) { // ►1
                    let success = vertice.sig.search(destino); // ►A
                    if (success) { // ►1
                        arista.push(rOrigen); // ►1
                        arista.push(rDestino); // ►1
                        arista.push(success.peso) // ►1
                    }
                }
            })
            //si existe la arista se retorna las referencias de los nodos que conforman la arista
            if (arista.length >= 2) { // ►1
                return arista;
            }
            return false;
        }
        else {
            return false;
        }

    }
    modificarPeso(origen, destino, peso) { // ►[2V+2A]
        let rOrigen = this.searchVertice(origen); // ►V
        let rDestino = this.searchVertice(destino); // ►V
        if (rOrigen && rDestino) { // ►1
            let arista = [] // ►1
            //busca el nodo destino en la lista de origen (la arita entre origen y destino)
            this.vertices.some(vertice => {
                if (vertice == rOrigen) { // ►1
                    let success1 = vertice.sig.search(destino); // ►A
                    if (success1) { // ►1
                        success1.peso = peso; // ►1
                    }
                }
                else if (vertice == rDestino) { // ►1
                    let success2 = vertice.sig.search(origen); // ►A
                    if (success2) { // ►1
                        success2.peso = peso; // ►1
                    }
                }
            })
        }
        return true;
    }
    modificarColor(dato, color) { // ►[V]
        let vertice = this.searchVertice(dato); // ►V
        vertice.color = color; // ►1
    }
    searchVertice(dato) { // ►[V]
        //referencia al nodo
        let rNodo = null; // ►1
        //si se encuentra el nodo se asigna a rNodo
        this.vertices.some(vertice => {  // ►V
            if (vertice.dato == dato)  // ►1
            { rNodo = vertice } // ►1
        })
        //se retorna la referencia;
        if (rNodo == null) { // ►1
            return false;
        }
        return rNodo;
    }
    print() { // ►[V+A]
        let cadena = ''; // ►1
        this.vertices.some(vertice => { // ►V+A
            cadena += vertice.dato + ' ◘→ '; // ►1
            if (vertice.sig.head == null) { // ►1
                cadena += 'x' // ►1
            }
            else {
                let actual = vertice.sig.head; // ►1
                do {
                    cadena += actual.dato.dato + " (" + actual.peso + ") •→ "; // ►1
                    actual = actual.sig; // ►1
                    if (actual == null) { // ►1
                        cadena += 'x' // ►1
                    }
                } while (actual != null); // ►A

            }
            cadena += "\n"; // ►1
        })
        return cadena;
    }
    //Búsqueda por amplitud
    BFS(dato) { // ►[2V+A]
        this.vertices.forEach((v, i, ar) => { // ►V
            ar[i].color = "nv"; // ►1
            ar[i].nivel = Infinity; // ►1
            ar[i].padre = null; // ►1
        })
        let vertice = this.searchVertice(dato); // ►V
        vertice.color = "v"; // ►1
        vertice.nivel = 0; // ►1
        vertice.padre = null; // ►1
        //cola Q
        let Q = []; // ►1
        let QT = []; // ►1
        Q.push(vertice); // ►1
        while (Q.length != 0) { // ►1
            let verticeTemp = Q.shift(); // ►1
            if (verticeTemp.dato == dato) { // ►1
                QT.push(["→", verticeTemp.dato, verticeTemp.nivel]); // ►1
            }
            else {
                QT.push([verticeTemp.padre.dato, verticeTemp.dato, verticeTemp.nivel]); // ►1
            }

            for (let i = verticeTemp.sig.head; i != null; i = i.sig) { // ►A
                let vtemp = i.dato; // ►1
                if (vtemp.color == "nv") { // ►1
                    vtemp.color = "v"; // ►1
                    vtemp.nivel = verticeTemp.nivel + 1; // ►1
                    vtemp.padre = verticeTemp; // ►1
                    Q.push(vtemp); // ►1
                }
            }
        }
        return QT;
    }
    Prim(dato) { // ►[4V+A^2+3VA]
        let Q = []; // ►1
        let QT = []; // ►1
        this.vertices.forEach((v, i, ar) => { // ►V
            ar[i].padre = null; // ►1
            ar[i].nivel = null;
            ar[i].distancia = Infinity; // ►1
            Q.push([ar[i], ar[i].distancia]); // ►1
        })

        let vertice = this.searchVertice(dato); // ►V
        vertice.distancia = 0; // ►1
        //cola de prioridad
        Q.find(vertice => { // ►V
            if (vertice[0].dato == dato) { // ►1
                vertice[1] = vertice[0].distancia; // ►1
                return;
            }
        })
        //ordenando la cola de menor a mayor
        Q.sort(function (a, b) { // ►V
            return a[1] - b[1];
        });

        while (Q.length != 0) { // ►(A^2+3VA)
            let temp = Q.shift(); // ►1
            if (temp[0].dato == dato) { // ►1
                QT.push(["→", temp[0].dato, temp[1]]); // ►1
            }
            else {
                if (temp[0].padre != null) { // ►1
                    QT.push([temp[0].padre.dato, temp[0].dato, temp[1]]); // ►1
                }
            }

            for (let i = temp[0].sig.head; i != null; i = i.sig) { // ►(A^2+3VA)
                let vtemp = i.dato; // ►1
                let peso = this.searchArista(temp[0].dato, vtemp.dato)[2]; // ►A
                let existe = false;
                //si existe el vertice en la cola
                Q.some((v, z, arr) => { if (arr[z][0] == vtemp) { existe = true; } }) // ►V
                if (existe && vtemp.distancia > peso) { // ►1
                    vtemp.padre = temp[0]; // ►1
                    vtemp.distancia = peso // ►1
                    //actualizando la cola de prioridad
                    Q.find(vertice => { // ►V
                        if (vertice[0].dato == vtemp.dato) { // ►1
                            vertice[1] = vertice[0].distancia; // ►1
                            return;
                        }
                    })
                    //ordenando la cola de menor a mayor
                    Q.sort(function (a, b) { // ►V
                        return a[1] - b[1];
                    });
                }
            }
        }
        return QT;
    }
}



leerArchivo("calles1.json", function (text) { //►[N+N(N+N+N(A+2N))+4N+A^2+3NA+N^2+N] → [2N^3+3N^2+N^2A+A^2+3NA+6N]
    var data = JSON.parse(text); // ►1 
    console.log(data); // ►1 
    //json de las calles
    let calles = data.features; // ►1 
    console.time("tiempo ejecución: "); // ►1 
    let grafo = new Grafo(); // ►1 
    for (let i = 0; i < calles.length; i++) { // ►N
        //coordenadas de las calles
        let nodosCalle = calles[i].geometry.coordinates; // ►1 
        let latlon = nodosCalle[0]; // ►1 
        //se ingresa el primer vertice que pertenece a la primera coordenada
        if (grafo.addVertice(latlon[0] + "," + latlon[1])) { // ►N
            grafo.modificarColor(latlon[0] + "," + latlon[1], calles[i].properties.name); // ►N
        }
        //en caso se repita la coordenada se añade como intersección
        else {
            let colorAnterior = grafo.searchVertice(latlon[0] + "," + latlon[1]).color; // ►N
            grafo.modificarColor(latlon[0] + "," + latlon[1], calles[i].properties.name + " - " + colorAnterior.substring(colorAnterior.indexOf("/") + 1)); // ►N
        }
        for (let j = 1; j < nodosCalle.length; j++) { // ►N
            let latlon1 = nodosCalle[j]; // ►1 
            if (grafo.addVertice(latlon1[0] + "," + latlon1[1])) { // ►N
                grafo.modificarColor(latlon1[0] + "," + latlon1[1], calles[i].properties.name); // ►N
            }
            else {
                let colorAnterior = grafo.searchVertice(latlon1[0] + "," + latlon1[1]).color; // ►N
                grafo.modificarColor(latlon1[0] + "," + latlon1[1], calles[i].properties.name + " - " + colorAnterior.substring(colorAnterior.indexOf("/") + 1)); // ►N
            }
            grafo.addArista(latlon[0] + "," + latlon[1], latlon1[0] + "," + latlon1[1], latlonMetro(latlon[0], latlon[1], latlon1[0], latlon1[1])) // ►A
            latlon = nodosCalle[j]; // ►1
        }
    }
    
    console.log(grafo.print()) // ►1
    console.log(grafo.vertices) // ►1
    //calles1 plaza de armas -71.53626471,-16.39858007
    //moral -71.53472971,-16.39784338
    //rivero -71.5336289,-16.39821731
    let a = grafo.Prim("-71.53626471,-16.39858007"); //►[4N+A^2+3NA]
    console.log(a); //1
    //se crean los nodos para crear el grafo
    let nodos = []; //1
    let nombres = {}; //1
    for (let i = 0; i < a.length; i++) { //►N
        if(i== 0){
            nodos.push({ id: (i + 1), label: grafo.searchVertice(a[i][1]).color, color: "red",font: { size: 17, color: "green" } }); //►N
            
        }
        else{
        nodos.push({ id: (i + 1), label: grafo.searchVertice(a[i][1]).color, font: { size: 17, color: "green" } }); //►N
        }
        nombres[a[i][1]] = i + 1; //►1
    }
    //se crean las aristas para crear el grafo
    let aristas = []; //►1
    for (let i = 1; i < a.length; i++) { //►N
        aristas.push({ from: nombres[a[i][0]], to: nombres[a[i][1]], label: a[i][2].toFixed(1) }) //►1
    }
    // crea un grafo
    var container = document.getElementById("mynetwork"); //►1
    var data = { //►1
        nodes: nodos, //►1
        edges: aristas, //►1
    };
    var options = { //►1
        nodes: { //►1
            shape: "dot", //►1
            size: 10, //►1
        },
    };
    var network = new vis.Network(container, data, options); //►1
    console.timeEnd("tiempo ejecución: "); //►1
});

//FUNCIONES GENERALES
function leerArchivo(archivo, llamada) { //►[1]
    var json = new XMLHttpRequest(); //►1
    json.overrideMimeType("application/json"); //►1
    json.open("GET", archivo, true); //►1
    json.onreadystatechange = function () { //►1
        if (json.readyState === 4 && json.status == "200") { //►1
            llamada(json.responseText); //►1
        }
    }
    json.send(null); //►1
}

function latlonMetro(lat1, lon1, lat2, lon2) { //►[1]
    var R = 6371; // radio de la tierra aprox  //►1
    var dLat = deg2rad(lat2 - lat1);  // convierte de grados decimales a grados en radianes  //►1
    var dLon = deg2rad(lon2 - lon1);  //►1
    var a = //►1
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +  //►1
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * //►1
        Math.sin(dLon / 2) * Math.sin(dLon / 2) //►1
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //►1
    var d = R * c; // distancia en kilometros //►1
    return d * 1000; //distancia en metros //►1
}

function deg2rad(deg) { //►[1]
    return deg * (Math.PI / 180) //►1
}


