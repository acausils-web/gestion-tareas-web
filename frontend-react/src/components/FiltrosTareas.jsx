 function FiltrosTareas({
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado
}) {
    return (
        <>
            <div className="contenedor-buscador">

                <label htmlFor="buscador">
                    Buscar tarea
                </label>

                <input
                    id="buscador"
                    type="text"
                    placeholder="Buscar por título o descripción..."
                    value={busqueda}
                    onChange={(evento) =>
                        setBusqueda(evento.target.value)
                    }
                />

            </div>


            <div className="contenedor-filtros">

                <button
                    type="button"
                    className={
                        filtroEstado === "todas"
                            ? "btn-filtro activo"
                            : "btn-filtro"
                    }
                    onClick={() =>
                        setFiltroEstado("todas")
                    }
                >
                    Todas
                </button>


                <button
                    type="button"
                    className={
                        filtroEstado === "pendiente"
                            ? "btn-filtro activo"
                            : "btn-filtro"
                    }
                    onClick={() =>
                        setFiltroEstado("pendiente")
                    }
                >
                    Pendientes
                </button>


                <button
                    type="button"
                    className={
                        filtroEstado === "completada"
                            ? "btn-filtro activo"
                            : "btn-filtro"
                    }
                    onClick={() =>
                        setFiltroEstado("completada")
                    }
                >
                    Completadas
                </button>

            </div>
        </>
    );
}

export default FiltrosTareas;