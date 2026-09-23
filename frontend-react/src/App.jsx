 import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:5000/tareas";

function App() {
    const [tareas, setTareas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todas");

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");
    const [prioridad, setPrioridad] = useState("Baja");


    // ==========================================
    // CARGAR TAREAS
    // ==========================================

    const cargarTareas = async () => {
        try {
            const respuesta = await fetch(API_URL);

            if (!respuesta.ok) {
                throw new Error("No se pudieron cargar las tareas");
            }

            const datos = await respuesta.json();
            setTareas(datos);

        } catch (error) {
            console.error("Error al cargar las tareas:", error);
        }
    };


    useEffect(() => {
        cargarTareas();
    }, []);


    // ==========================================
    // AGREGAR TAREA
    // ==========================================

    const agregarTarea = async (evento) => {
        evento.preventDefault();

        const nuevaTarea = {
            id: Date.now(),
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            fecha_limite: fechaLimite || null,
            prioridad: prioridad
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

            setTitulo("");
            setDescripcion("");
            setFechaLimite("");
            setPrioridad("Baja");

            await cargarTareas();

        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };


    // ==========================================
    // COMPLETAR TAREA
    // ==========================================

    const completarTarea = async (id) => {
        try {
            const respuesta = await fetch(
                `${API_URL}/${id}/completar`,
                {
                    method: "PUT"
                }
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo completar la tarea");
            }

            await cargarTareas();

        } catch (error) {
            console.error("Error al completar la tarea:", error);
        }
    };


    // ==========================================
    // FILTRAR TAREAS
    // ==========================================

    const tareasFiltradas = tareas.filter((tarea) => {
        const texto = busqueda.toLowerCase();

        const coincideBusqueda =
            tarea.titulo.toLowerCase().includes(texto) ||
            (tarea.descripcion || "").toLowerCase().includes(texto);

        const coincideEstado =
            filtroEstado === "todas" ||
            tarea.estado.toLowerCase() === filtroEstado;

        return coincideBusqueda && coincideEstado;
    });


    return (
        <main className="contenedor-principal">

            {/* ENCABEZADO */}

            <header className="encabezado">

                <span className="subtitulo-superior">
                    GESTIÓN Y ORGANIZACIÓN
                </span>

                <h1>
                    Las Tareas de las
                    <span>Ingenierías Colaborativas</span>
                </h1>

                <p>
                    Organiza, consulta y administra tus actividades
                    en un solo lugar.
                </p>

            </header>


            {/* NUEVA TAREA */}

            <section className="panel">

                <div className="titulo-seccion">

                    <div>
                        <span className="numero-seccion">
                            01
                        </span>

                        <h2>
                            Nueva tarea
                        </h2>
                    </div>

                    <p>
                        Registra una nueva actividad
                    </p>

                </div>


                <form
                    id="form-tarea"
                    onSubmit={agregarTarea}
                >

                    <div className="campo">

                        <label htmlFor="titulo">
                            Título
                        </label>

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

                            <option value="Baja">
                                Baja
                            </option>

                            <option value="Media">
                                Media
                            </option>

                            <option value="Alta">
                                Alta
                            </option>

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


            {/* MIS TAREAS */}

            <section className="panel">

                <div className="titulo-seccion">

                    <div>
                        <span className="numero-seccion">
                            02
                        </span>

                        <h2>
                            Mis tareas
                        </h2>
                    </div>

                    <p>
                        Consulta y administra tus actividades
                    </p>

                </div>


                {/* BUSCADOR */}

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


                {/* FILTROS */}

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


                {/* LISTA DE TAREAS */}

                <div id="lista-tareas">

                    {tareasFiltradas.length === 0 ? (

                        <div className="sin-tareas">
                            <p>
                                No se encontraron tareas.
                            </p>
                        </div>

                    ) : (

                        tareasFiltradas.map((tarea) => {

                            const completada =
                                tarea.estado === "Completada";

                            return (

                                <div
                                    key={tarea.id}
                                    className={
                                        `tarjeta-tarea prioridad-${tarea.prioridad.toLowerCase()} ${
                                            completada
                                                ? "tarea-completada"
                                                : ""
                                        }`
                                    }
                                >

                                    <div className="cabecera-tarea">

                                        <h3>
                                            {tarea.titulo}
                                        </h3>

                                        <span
                                            className={
                                                `etiqueta prioridad-${tarea.prioridad.toLowerCase()}`
                                            }
                                        >
                                            {tarea.prioridad}
                                        </span>

                                    </div>


                                    <p className="descripcion-tarea">

                                        {
                                            tarea.descripcion ||
                                            "Sin descripción"
                                        }

                                    </p>


                                    <div className="informacion-tarea">

                                        <span>

                                            <strong>
                                                Fecha límite:
                                            </strong>{" "}

                                            {
                                                tarea.fecha_limite ||
                                                "Sin fecha"
                                            }

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


                                    {/* ACCIONES */}

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

                                    </div>

                                </div>

                            );
                        })

                    )}

                </div>

            </section>

        </main>
    );
}

export default App;