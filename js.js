

let btnEnviar = document.querySelector(".btnEnviar")
let titulo = document.querySelector(".title")
let views = document.querySelector(".views")
let containerDivs = document.querySelector(".containerDivs")
let childContainer = document.querySelectorAll(".childContainer")


btnEnviar.addEventListener("click", (e)=>{
    let aleatorio = Math.floor(Math.random()*1000)
    if (titulo.value != "") {
        fetch("http://localhost:3000/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `${titulo.value}`,
                views: `${aleatorio}`
            })
        })
    }
})


let longitud;
let arrayDeId = [];

const verDatos = async ()=>{
    let data = await fetch("http://localhost:3000/posts")
    let moreData = await data.json()
    
    for (let i = 0; i < moreData.length; i++) {
        arrayDeId.push(moreData[i].id)
    }
    
    longitud = moreData.length
    
     return longitud
     
}
    
let arrayDeTitles = [];

const pedidaDeDatos = async ()=>{
        let data = await fetch("http://localhost:3000/posts")
    
    let moreData = await data.json()

    for (let i = 0; i < moreData.length; i++) {
        arrayDeTitles.push(moreData[i].title)
    }

}

pedidaDeDatos()

// Creacion de divs y botones 

let fragmentDivs = document.createDocumentFragment()
let fragmentButtonEditar = document.createDocumentFragment()
let fragmentButtonElimminar = document.createDocumentFragment()

const crearDivs = async () => {
    let longitud = await verDatos();

    for (let i = 0; i < longitud; i++) {
        let div = document.createElement("div")
        div.classList.add("childContainer")
        div.id = arrayDeId[i]
        div.textContent = arrayDeTitles[i]
        fragmentDivs.appendChild(div)
        containerDivs.appendChild(fragmentDivs)

        let boton = document.createElement("button")
        boton.classList.add("boton")
        boton.textContent = "Editar"
        fragmentButtonEditar.appendChild(boton)
        containerDivs.appendChild(fragmentButtonEditar)
        
        let boton1 = document.createElement("button")
        boton1.classList.add("boton1")
        boton1.textContent = "Eliminar"
        fragmentButtonElimminar.appendChild(boton1)
        containerDivs.appendChild(fragmentButtonElimminar)
    }
}

// crearDivs()

const editarElementos = async ()=>{
    await crearDivs()
    let botonEditar = document.querySelectorAll(".boton")
    
    botonEditar.forEach(e => {
        e.addEventListener("click", ()=>{
            let post = prompt("Ingrese el mensaje para editar")
            let aleatorio = Math.floor(Math.random()*1000)

            fetch(`http://localhost:3000/posts/${e.previousElementSibling.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
              
                body: JSON.stringify({
                      id: e.previousElementSibling.id,
                      title: post,
                      views: aleatorio
                }
              )
            })
    })
});
}


const eliminarElementos = async ()=>{
    await editarElementos()
    let botonEliminar = document.querySelectorAll(".boton1")

    botonEliminar.forEach(e => {
        e.addEventListener("click", ()=>{
            fetch(`http://localhost:3000/posts/${e.previousElementSibling.previousElementSibling.id}`, {
                method: 'DELETE',
            })
        })
    });
}

eliminarElementos()

