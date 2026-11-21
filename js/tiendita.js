
var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");

var productos = JSON.parse(localStorage.getItem("productos")) || [];

btnSave.onclick = () => {

    let txtNombre = document.getElementById("nombre");
    let txtPrecio = document.getElementById("precio");
    let txtStock = document.getElementById("stock");

    if (txtNombre.value == "" || txtPrecio.value == "" || txtStock.value == "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    const producto = {
        nombre: txtNombre.value,
        precio: txtPrecio.value,
        stock: parseInt(txtStock.value)
    };

    productos.push(producto);

    localStorage.setItem("productos", JSON.stringify(productos));

    document.getElementById("addProducto").close();

    txtNombre.value = "";
    txtPrecio.value = "";
    txtStock.value = "";

    cargarProductos();
};


// CARGAR PRODUCTOS

const cargarProductos = () => {

    let posicion = 0;

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    let tbody = document.getElementById("productos");

    var tabla = "";

    productos.map((producto) => {

        tabla += `<tr class="text-center">
            <td><b>${producto.nombre.toUpperCase()}</b></td>

            <td><b>$ ${parseFloat(producto.precio).toFixed(2)}</b></td>

            <td><b>${producto.stock ?? 0}</b></td>

            <td>
                <button class="btn-solid btn-styled theme-danger"
                onclick="eliminarProducto(${posicion})">
                <i class="bi bi-trash"></i>
                </button>

                <button class="btn-solid btn-styled theme-warning"
                onclick="editarProducto(${posicion})">
                <i class="bi bi-pencil"></i>
                </button>
            </td>
        </tr>`;

        posicion++;

    });

    tbody.innerHTML = tabla;
};


// EDITAR PRODUCTO

const editarProducto = (posicion) => {

    const producto = productos[posicion];

    document.getElementById("nombree").value = producto.nombre;

    document.getElementById("precioe").value = producto.precio;

    document.getElementById("stocke").value = producto.stock ?? 0;

    document.getElementById("posicion").value = posicion;

    document.getElementById("editProducto").showModal();
};


// CONFIRMACION DE ELIMINAR

const hola = Swal.mixin({

    customClass: {
        confirmButton: "btn-solid btn-styled theme-success",
        cancelButton: "btn-solid btn-styled theme-danger"
    },

    buttonsStyling: false

});


// ALERTA DE EXITO CON BOTON GRIS

const negro = Swal.mixin({

    customClass: {
        confirmButton: "btn-solid btn-styled theme-secondary"
    },

    buttonsStyling: false

});


// ELIMINAR PRODUCTO

const eliminarProducto = (posicion) => {

    hola.fire({

        title: "ELIMINAR REGISTRO",

        text: "¿Estas seguro de eliminar este registro?",

        icon: "error",

        showCancelButton: true,

        confirmButtonText: "SI",

        cancelButtonText: "NO",

        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {

            productos.splice(posicion, 1);

            localStorage.setItem("productos", JSON.stringify(productos));

            cargarProductos();

            negro.fire({

                title: "EXITO!!",

                text: "Se elimino correctamente",

                icon: "success"

            });

        }

    });

};


// GUARDAR CAMBIOS DE EDICION

btnEdit.onclick = () => {

    let txtNombre = document.getElementById("nombree");

    let txtPrecio = document.getElementById("precioe");

    let txtStock = document.getElementById("stocke");

    let posicion = document.getElementById("posicion");

    if (txtNombre.value == "" || txtPrecio.value == "" || txtStock.value == "") {

        alert("ERROR: CAMPOS VACIOS");

        return;

    }

    productos[posicion.value].nombre = txtNombre.value;

    productos[posicion.value].precio = txtPrecio.value;

    productos[posicion.value].stock = parseInt(txtStock.value);

    localStorage.setItem("productos", JSON.stringify(productos));

    document.getElementById("editProducto").close();

    txtNombre.value = "";

    txtPrecio.value = "";

    txtStock.value = "";

    cargarProductos();

};


// MOSTRAR LOS PRODUCTOS AL INICIAR

cargarProductos();
