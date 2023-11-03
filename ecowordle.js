var height = 6; // Número de intentos
var width = 6; // Longitud de la palabra
var row = 0; // Intento actual
var col = 0; // Letra actual en ese intento
var gameOver = false;

// Array con palabras a adivinar y sus mensajes correspondientes
var words = [
    { word: "PRUEBA", message: "Hello world"},
    { word: "pRUBEA2", message: "¡Gran trabajo! 'TIGER' es la palabra correcta." },
    { word: "HONGOS", message: "Los hongos son conocidos como descomponedores. Juegan un papel esencial en la descomposición de la materia orgánica muerta, como hojas caídas, madera y otros restos orgánicos. Esto es crucial para el reciclaje de nutrientes en los ecosistemas, ya que liberan nutrientes esenciales, como nitrógeno y fósforo, de la materia orgánica en descomposición. Forman asociaciones simbióticas con las raíces de las plantas en lo que se conoce como micorrizas" },
    { word: "CICLOS", message: "Los ciclos biogeoquímicos implican la circulación y transformación de elementos químicos esenciales, como carbono, nitrógeno, fósforo, azufre y otros, entre los componentes bióticos y abióticos de un ecosistema. Los microorganismos desempeñan un papel central en estos ciclos, ya que son responsables de las transformaciones químicas clave." },
    { word: "ETANOL", message: "En la naturaleza, el etanol liberado en el medio ambiente a través de actividades humanas, como la fermentación y la producción de etanol combustible, puede ser descompuesto por microorganismos. Son capaces de utilizar el etanol como fuente de carbono y energía en su metabolismo." },
    { word: "ESPORA", message: "Las esporas son estructuras de resistencia que permiten a los microorganismos sobrevivir en condiciones adversas, como altas temperaturas, sequía, radiación ultravioleta y la falta de nutrientes. Actúan como una especie de caparazón protector que encierra al organismo en su interior. Algunos microorganismos, como las bacterias esporulantes, desempeñan un papel importante en la descomposición de materia orgánica y en los ciclos biogeoquímicos" },
    { word: "NOSTOC", message: "Se trata de un género de cianobacterias. Es conocido por su capacidad de establecer simbiosis con otros organismos, como plantas y hongos. En estas simbiosis, Nostoc puede fijar nitrógeno atmosférico y proporcionar nutrientes a sus hospedadores. Puede tomar nitrógeno atmosférico (N2) y convertirlo en formas utilizables, como amoníaco (NH3) y nitratos (NO3-)." },
    { word: "CLIMAX", message: "La sucesión microbiana se refiere al cambio en la composición y la abundancia de microorganismos en un ecosistema a lo largo del tiempo. El clímax microbiano sería una etapa de equilibrio en la que las comunidades microbianas alcanzan una composición y una función estables en respuesta a las condiciones ambientales." },
    { word: "SLIMES", message: "Ecosistemas microbianos litoautotróficos del subsuelo. Estos ambientes se encuentran cerca del manto, por lo que puede haber procesos geofísicos que vayan recomponiendo los materiales necesarios para este metabolismo." },
    { word: "ARTICO", message: "El Ártico es una de las regiones más afectadas por el cambio climático global. El aumento de las temperaturas, el deshielo del permafrost y el deshielo del hielo marino están alterando los hábitats árticos y afectando a las comunidades microbianas. Estos cambios pueden tener un impacto en la dinámica de los ciclos biogeoquímicos y en la biodiversidad microbiana." }, 
    { word: "HUMMUS", message: "Se refiere a una sustancia orgánica rica en materia orgánica en descomposición que se encuentra en el suelo. Los microorganismos, como bacterias y hongos, son responsables de la descomposición de la materia orgánica en el hummus. Descomponen la materia orgánica en compuestos más simples y liberan nutrientes esenciales como nitrógeno, fósforo y carbono. La materia orgánica en el hummus contiene carbono, y su estabilidad puede influir en la cantidad de carbono almacenado en los suelos, lo que tiene implicaciones para el ciclo global del carbono y el cambio climático." },
    { word: "AZUFRE", message: "El ciclo del azufre es un proceso fundamental en los ecosistemas que involucra la transformación y la circulación del azufre en sus diferentes formas químicas. Los microorganismos realizan procesos de reducción y oxidación del azufre, lo que significa que pueden convertir compuestos de azufre de una forma a otra. Por ejemplo, algunas bacterias son capaces de reducir sulfato (SO4²-) a sulfuro de hidrógeno (H2S), liberando azufre en su forma reducida." },
    { word: "ARQUEA", message: "Este es uno de los tres dominios junto con bacterias y eucariotas. Son microorganismos únicos y diversos que se encuentran en una variedad de entornos, desde ambientes extremos hasta ecosistemas más convencionales. Su estudio es fundamental para comprender la vida en la Tierra y su evolución." },
    { word: "ASGARD", message: "Este grupo es de especial interés, ya que podrían ser la clave para descifrar el origen de la célula eucariota. Aunque se obtuvieron numerosos genomas ensamblados a partir de metagenomas (MAGs) de arqueas de Asgard que pertenecen a estos grupos en entornos de sedimentos anóxicos de todo el mundo, parece que habitan en diversos entornos. Para descubir el metabolismo de este grupo se partió de inferencias genómicas, como la mixotrofia en Thorarchaeota, la homoacetogénesis en Lokiarchaeota, el metabolismo anaeróbico facultativo en Heimdallarchaeota y Gerdarchaeota y la posible utilización de alcanos en Helarchaeota. Podrían ser componentes importantes en los ciclos biogeoquímicos, especialmente en sedimentos salinos."},
];

// Variable global para la palabra y el mensaje actual
var word;
var message;

// Obtén la fecha actual
var currentDate = new Date();

// Obtiene el día del mes (1 al 31)
var dayOfMonth = currentDate.getDate();

// Utiliza el día del mes como índice para seleccionar una palabra
var randomIndex = dayOfMonth % words.length;

// Selecciona la palabra y el mensaje correspondiente
var wordOfTheDay = words[randomIndex];
word = wordOfTheDay.word;
message = wordOfTheDay.message;

window.onload = function() {
    initialize();
};

function initialize() {
    // Resto del código de inicialización
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if (/^[a-zA-Z]$/.test(e.key)) {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.key.toUpperCase();
                    col++;
                }
            }
        } else if (e.code == "Backspace") {
            if (col > 0) {
                col--;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        } else if (e.code == "Enter") {
            update();
            row++;
            col = 0;
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = message;
            showModal();
        }
    });
}

function checkIfWordIsGuessed() {
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        if (currTile.innerText !== word[c]) {
            return false;
        }
    }
    return true;
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        if (row < height) {
            let currTile = document.getElementById(row.toString() + '-' + c.toString());
            let letter = currTile.innerText;

            if (word[c] == letter) {
                currTile.classList.add("correct");
                correct++;
            } else if (word.includes(letter)) {
                currTile.classList.add("present");
            } else {
                currTile.classList.add("absent");
            }
        }
    }

    if (correct == width) {
        gameOver = true;
    }

    if (correct == width) {
        gameOver = true;
        showModal(); // Muestra la ventana modal si la respuesta es correcta
    }
    
}

function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    document.getElementById("modal-title").innerText = "¡Enhorabuena!";
    document.getElementById("modal-answer").innerText = message;
}



function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
