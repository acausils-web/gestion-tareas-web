 import { useEffect, useState } from "react";
import "./App.css";

import FormularioTarea from "./components/FormularioTarea.jsx";
import TarjetaTarea from "./components/TarjetaTarea.jsx";
import FiltrosTareas from "./components/FiltrosTareas.jsx";

import {
    obtenerTareas,
    crearTarea,
    completarTarea as completarTareaService,
    eliminarTarea as eliminarTareaService
} from "./tareasService.js";


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

            const datos = await obtenerTareas();

            setTareas(datos);

        } catch (error) {

            console.error(
                "Error al cargar las tareas:",
                error
            );

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

        if (!titulo.trim()) {
            return;
        }


        const nuevaTarea = {

            id: Date.now(),

            titulo: titulo.trim(),

            descripcion: descripcion.trim(),

            fecha_limite:
                fechaLimite || null,

            prioridad: prioridad

        };


        try {

            await crearTarea(nuevaTarea);


            setTitulo("");

            setDescripcion("");

            setFechaLimite("");

            setPrioridad("Baja");


            await cargarTareas();


        } catch (error) {

            console.error(
                "Error al crear la tarea:",
                error
            );

        }

    };


    // ==========================================
    // COMPLETAR TAREA
    // ==========================================

    const completarTarea = async (id) => {

        try {

            await completarTareaService(id);

            await cargarTareas();


        } catch (error) {

            console.error(
                "Error al completar la tarea:",
                error
            );

        }

    };


    // ==========================================
    // ELIMINAR TAREA
    // ==========================================

    const eliminarTarea = async (id) => {

        try {

            await eliminarTareaService(id);

            await cargarTareas();


        } catch (error) {

            console.error(
                "Error al eliminar la tarea:",
                error
            );

        }

    };


    // ==========================================
    // FILTRAR TAREAS
    // ==========================================

    const tareasFiltradas = tareas.filter(
        (tarea) => {

            const textoBusqueda =
                busqueda
                    .trim()
                    .toLowerCase();


            const tituloTarea =
                (tarea.titulo || "")
                    .toLowerCase();


            const descripcionTarea =
                (tarea.descripcion || "")
                    .toLowerCase();


            const coincideBusqueda =
                tituloTarea.includes(
                    textoBusqueda
                ) ||
                descripcionTarea.includes(
                    textoBusqueda
                );


            const estadoTarea =
                (tarea.estado || "")
                    .toLowerCase();


            const coincideEstado =
                filtroEstado === "todas" ||
                estadoTarea === filtroEstado;


            return (
                coincideBusqueda &&
                coincideEstado
            );

        }
    );


    // ==========================================
    // INTERFAZ
    // ==========================================

    return (

        <main className="contenedor-principal">


            {/* ================================
                ENCABEZADO
            ================================= */}

            <header className="encabezado">

                <span className="subtitulo-superior">

                    GESTIÓN Y ORGANIZACIÓN

                </span>


                <h1>

                    Las Tareas de las

                    <span>
                        Ingenierías Colaborativas
                    </span>

                </h1>


                <p>

                    Organiza, consulta y administra
                    tus actividades en un solo lugar.

                </p>

            </header>



            {/* ================================
                FORMULARIO
            ================================= */}

            <FormularioTarea

                titulo={titulo}

                setTitulo={setTitulo}

                descripcion={descripcion}

                setDescripcion={
                    setDescripcion
                }

                fechaLimite={fechaLimite}

                setFechaLimite={
                    setFechaLimite
                }

                prioridad={prioridad}

                setPrioridad={
                    setPrioridad
                }

                agregarTarea={
                    agregarTarea
                }

            />



            {/* ================================
                LISTADO DE TAREAS
            ================================= */}

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

                        Consulta y administra
                        tus actividades

                    </p>


                </div>



                {/* ============================
                    BUSCADOR Y FILTROS
                ============================= */}

                <FiltrosTareas

                    busqueda={busqueda}

                    setBusqueda={
                        setBusqueda
                    }

                    filtroEstado={
                        filtroEstado
                    }

                    setFiltroEstado={
                        setFiltroEstado
                    }

                />



                {/* ============================
                    TARJETAS
                ============================= */}

                <div id="lista-tareas">


                    {tareasFiltradas.length === 0 ? (


                        <div className="sin-tareas">

                            <p>

                                No se encontraron tareas.

                            </p>

                        </div>


                    ) : (


                        tareasFiltradas.map(
                            (tarea) => (


                                <TarjetaTarea

                                    key={
                                        tarea.id
                                    }

                                    tarea={
                                        tarea
                                    }

                                    completarTarea={
                                        completarTarea
                                    }

                                    eliminarTarea={
                                        eliminarTarea
                                    }

                                />


                            )
                        )


                    )}


                </div>


            </section>


        </main>

    );

}


export default App;