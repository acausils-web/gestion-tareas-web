 function TarjetaTarea({
    tarea,
    completarTarea,
    eliminarTarea
}) {
    const completada = tarea.estado === "Completada";

    const prioridadClase =
        (tarea.prioridad || "Baja").toLowerCase();

    return (
        <div
            className={
                `tarjeta-tarea prioridad-${prioridadClase} ${
                    completada ? "tarea-completada" : ""
                }`
            }
        >

            <div className="cabecera-tarea">

                <h3>{tarea.titulo}</h3>

                <span
                    className={
                        `etiqueta prioridad-${prioridadClase}`
                    }
                >
                    {tarea.prioridad}
                </span>

            </div>

            <p className="descripcion-tarea">
                {tarea.descripcion || "Sin descripción"}
            </p>

            <div className="informacion-tarea">

                <span>
                    <strong>Fecha límite:</strong>{" "}
                    {tarea.fecha_limite || "Sin fecha"}
                </span>

                <span
                    className={
                        completada
                            ? "estado estado-completada"
                            : "estado estado-pendiente"
                    }
                >
                    {tarea.estado}
                </span>

            </div>

            <div className="acciones-tarea">

                {!completada && (
                    <button
                        type="button"
                        className="btn-completar"
                        onClick={() =>
                            completarTarea(tarea.id)
                        }
                    >
                        Completar
                    </button>
                )}

                <button
                    type="button"
                    className="btn-eliminar"
                    onClick={() =>
                        eliminarTarea(tarea.id)
                    }
                >
                    Eliminar
                </button>

            </div>

        </div>
    );
}

export default TarjetaTarea;