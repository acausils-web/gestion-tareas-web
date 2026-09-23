 function FormularioTarea({
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    fechaLimite,
    setFechaLimite,
    prioridad,
    setPrioridad,
    agregarTarea
}) {
    return (
        <section className="panel">

            <div className="titulo-seccion">
                <div>
                    <span className="numero-seccion">01</span>
                    <h2>Nueva tarea</h2>
                </div>

                <p>Registra una nueva actividad</p>
            </div>

            <form id="form-tarea" onSubmit={agregarTarea}>

                <div className="campo">
                    <label htmlFor="titulo">Título</label>

                    <input
                        id="titulo"
                        type="text"
                        placeholder="Escribe el título de la tarea"
                        value={titulo}
                        onChange={(evento) =>
                            setTitulo(evento.target.value)
                        }
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="descripcion">
                        Descripción
                    </label>

                    <textarea
                        id="descripcion"
                        placeholder="Describe brevemente la actividad"
                        value={descripcion}
                        onChange={(evento) =>
                            setDescripcion(evento.target.value)
                        }
                    />
                </div>

                <div className="campo">
                    <label htmlFor="fecha_limite">
                        Fecha límite
                    </label>

                    <input
                        id="fecha_limite"
                        type="date"
                        value={fechaLimite}
                        onChange={(evento) =>
                            setFechaLimite(evento.target.value)
                        }
                    />
                </div>

                <div className="campo">
                    <label htmlFor="prioridad">
                        Prioridad
                    </label>

                    <select
                        id="prioridad"
                        value={prioridad}
                        onChange={(evento) =>
                            setPrioridad(evento.target.value)
                        }
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn-agregar"
                >
                    Agregar tarea
                </button>

            </form>

        </section>
    );
}

export default FormularioTarea;