 const API_URL = "http://127.0.0.1:5000/tareas";

export async function obtenerTareas() {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las tareas");
    }

    return respuesta.json();
}

export async function crearTarea(tarea) {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarea)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo crear la tarea");
    }

    return respuesta.json();
}

export async function completarTarea(id) {
    const respuesta = await fetch(
        `${API_URL}/${id}/completar`,
        {
            method: "PUT"
        }
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo completar la tarea");
    }

    return respuesta.json();
}

export async function eliminarTarea(id) {
    const respuesta = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!respuesta.ok) {
        throw new Error(
            `No se pudo eliminar la tarea. Código: ${respuesta.status}`
        );
    }

    return true;
}