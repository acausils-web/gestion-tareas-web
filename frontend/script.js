 const API_URL = "http://127.0.0.1:5000/tareas";

const formulario = document.getElementById("form-tarea");
const listaTareas = document.getElementById("lista-tareas");
const buscador = document.getElementById("buscador");
const botonesFiltro = document.querySelectorAll(".btn-filtro");

let tareasCargadas = [];
let filtroEstado = "todas";

function normalizarTexto(texto) {
    return String(texto || "").trim().toLowerCase();
}

function formatearFecha(fecha) {
    if (!fecha) {
        return "Sin fecha";
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        const [anio, mes, dia] = fecha.split("-");
        return `${dia}/${mes}/${anio}`;
    }

    const fechaConvertida = new Date(fecha);

    if (isNaN(fechaConvertida.getTime())) {
        return fecha;
    }

    return fechaConvertida.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC"
    });
}

async function cargarTareas() {
    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar las tareas");
        }

        tareasCargadas = await respuesta.json();
        aplicarFiltros();

    } catch (error) {
        console.error("Error al cargar las tareas:", error);
    }
}

function mostrarTareas(tareas) {
    listaTareas.innerHTML = "";

    if (tareas.length === 0) {
        listaTareas.innerHTML = `
            <div class="sin-tareas">
                <p>No se encontraron tareas.</p>
            </div>
        `;
        return;
    }

    tareas.forEach((tarea) => {
        const contenedor = document.createElement("div");

        const prioridad = normalizarTexto(tarea.prioridad);
        const estado = normalizarTexto(tarea.estado);
        const completada = estado === "completada";

        contenedor.className = `tarjeta-tarea prioridad-${prioridad}`;

        if (completada) {
            contenedor.classList.add("tarea-completada");
        }

        contenedor.innerHTML = `
            <div class="cabecera-tarea">
                <h3>${tarea.titulo}</h3>

                <span class="etiqueta prioridad-${prioridad}">
                    ${tarea.prioridad}
                </span>
            </div>

            <p class="descripcion-tarea">
                ${tarea.descripcion || "Sin descripción"}
            </p>

            <div class="informacion-tarea">
                <span>
                    <strong>Fecha límite:</strong>
                    ${formatearFecha(tarea.fecha_limite)}
                </span>

                <span class="estado ${
                    completada
                        ? "estado-completada"
                        : "estado-pendiente"
                }">
                    ${tarea.estado}
                </span>
            </div>

            <div class="acciones-tarea">
                ${
                    !completada
                        ? `
                            <button
                                type="button"
                                class="btn-completar"
                                onclick="completarTarea(${tarea.id})"
                            >
                                Completar
                            </button>
                        `
                        : ""
                }

                <button
                    type="button"
                    class="btn-eliminar"
                    onclick="eliminarTarea(${tarea.id})"
                >
                    Eliminar
                </button>
            </div>
        `;

        listaTareas.appendChild(contenedor);
    });
}

function aplicarFiltros() {
    const textoBusqueda = normalizarTexto(buscador.value);

    const tareasFiltradas = tareasCargadas.filter((tarea) => {
        const titulo = normalizarTexto(tarea.titulo);
        const descripcion = normalizarTexto(tarea.descripcion);
        const estado = normalizarTexto(tarea.estado);

        const coincideBusqueda =
            titulo.includes(textoBusqueda) ||
            descripcion.includes(textoBusqueda);

        let coincideEstado = true;

        if (filtroEstado === "pendiente") {
            coincideEstado = estado === "pendiente";
        }

        if (filtroEstado === "completada") {
            coincideEstado = estado === "completada";
        }

        return coincideBusqueda && coincideEstado;
    });

    mostrarTareas(tareasFiltradas);
}

buscador.addEventListener("input", aplicarFiltros);

botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", function () {
        filtroEstado = normalizarTexto(this.dataset.estado);

        botonesFiltro.forEach((otroBoton) => {
            otroBoton.classList.remove("activo");
        });

        this.classList.add("activo");
        aplicarFiltros();
    });
});

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const nuevaTarea = {
        id: Date.now(),
        titulo: document.getElementById("titulo").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        fecha_limite: document.getElementById("fecha_limite").value || null,
        prioridad: document.getElementById("prioridad").value
    };

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo crear la tarea");
        }

        formulario.reset();
        await cargarTareas();

    } catch (error) {
        console.error("Error al crear la tarea:", error);
    }
});

async function completarTarea(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}/completar`, {
            method: "PUT"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo completar la tarea");
        }

        await cargarTareas();

    } catch (error) {
        console.error("Error al completar la tarea:", error);
    }
}

async function eliminarTarea(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar la tarea");
        }

        await cargarTareas();

    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
    }
}

cargarTareas();