from domain.tarea import Tarea
from domain.ports.repositorio_tareas import RepositorioTareas


class CrearTarea:
    def __init__(self, repositorio: RepositorioTareas):
        self.repositorio = repositorio

    def ejecutar(
        self,
        id: int,
        titulo: str,
        descripcion: str,
        fecha_limite,
        prioridad: str
    ) -> Tarea:
        tarea = Tarea(
            id=id,
            titulo=titulo,
            descripcion=descripcion,
            fecha_limite=fecha_limite,
            prioridad=prioridad
        )

        return self.repositorio.guardar(tarea)