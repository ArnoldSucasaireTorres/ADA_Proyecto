//clase nodo
class Nodo {
    //sig : referencia al siguiente nodo
    //dato : es el dato del nodo
    constructor(dato, sig) {
        this.dato = dato;
        this.sig = sig;
        this.peso = null; // solo se utiliza para cuando el nodo pertenece a la 
        //lista de adyacencia del vertice
        this.color = null;
        this.nivel = null;
        this.padre = null;
        this.distancia = null;
    };
    modiColor(color){ // ►1
        this.color = color; // ►1
    }
};
//clase lista enlazada
class LinkedList {
    constructor() {
        //head : inicio de la lista enlazada
        //size : tamaño de la lista
        this.head = null;
        this.size = 0;
    };
    //funcion añadir
    add(dato) { // ►[A]
        const nuevoNodo = new Nodo(dato, null); // ►1
        //se verifica si la cabeza esta vacía
        if (!this.head) { // ►1
            this.head = nuevoNodo; // ►1
        } else {
            let actual = this.head; // ►1
            //recorre hasta que la referencia del nodo sea null
            while (actual.sig) { // ►1
                actual = actual.sig; // ►A
            };
            //se añade el nodo
            actual.sig = nuevoNodo; // ►1
        };
        this.size++; // ►1
    };
    //funcion añadir en
    insertAt(dato, indice) { // ►[V]
        //se verifica si el indice es positivo y si no sobrepasa a la lista
        if (indice < 0 || indice > this.size) { // ►1
            return null
        };
        const nuevoNodo = new Nodo(dato); // ►1
        let actual = this.head; // ►1
        let anterior; // ►1
        if (indice === 0) { // ►1
            nuevoNodo.sig = actual; // ►1
            this.head = nuevoNodo; // ►1
        } else {
            for (let i = 0; i < indice; i++) { // ►V
                anterior = actual; // ►1
                actual = actual.sig; // ►1
            }
            nuevoNodo.sig = actual; // ►1
            anterior.sig = nuevoNodo; // ►1
        }
        this.size++;
    }

    remove(dato) { // ►[V]
        let actual = this.head; // ►1
        let anterior = null; // ►1
        while (actual != null) { // ►1
            if (actual.dato === dato) { // ►1
                if (!anterior) {
                    this.head = actual.sig; // ►1
                } else {
                    anterior.sig = actual.sig; // ►1
                };
                this.size--; // ►1
                return actual.dato; // ►1
            };
            anterior = actual; // ►1
            actual = actual.sig; // ►V
        };
        return null;
    }
    removeFrom(indice) { // ►[V]
        if (indice < 0 || indice > this.size) { // ►1
            return null;
        };
        let actual = this.head; // ►1
        let anterior = null; // ►1

        if (indice === 0) { // ►1
            this.head = actual.sig; // ►1
        } else {
            for (let i = 0; i < indice; i++) { // ►V
                anterior = actual; // ►1
                actual = actual.sig; // ►1
            }
            anterior.sig = actual.sig; // ►1
        };
        this.size--; // ►1
        return actual.dato; // ►1
    };
    search(dato) { // ►[V]
        let actual = this.head; // ►1
        //verifica si el head es un nodo
        if (actual != null) { // ►1
            if (actual.dato instanceof Nodo) { // ►1
                while (actual instanceof Nodo) { // ►1
                    if (actual.dato.dato == dato) { // ►1
                        return actual;
                    }
                    actual = actual.sig; // ►V
                }
            }
            else {
                while (actual != null) { // ►1
                    if (actual.dato === dato) { // ►1
                        return actual;
                    };
                    actual = actual.sig; // ►V
                };
            }
        }
        return false;

    }
    isEmpty() { // ►[1]
        return this.size === 0;
    };
    getSize() { // ►[1]
        return this.size;
    }
    print() { // ►[V]
        if (!this.size === 0) { // ►1
            return null;
        }
        let actual = this.head; // ►1
        let cadena = ''; // ►1
        while (actual) { // ►1
            cadena += actual.dato + ' •→ '; // ►1
            actual = actual.sig; // ►V
        };
        cadena += 'x'; // ►1
        return cadena;
    }
};






