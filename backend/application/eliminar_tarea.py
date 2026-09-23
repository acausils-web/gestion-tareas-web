from domain.ports.repositorio_tareas import RepositorioTareas


class EliminarTarea:

    def __init__(self, repositorio: RepositorioTareas):
        self.repositorio = repositorio

    def ejecutar(self, id: int) -> bool:
        return self.repositorio.eliminar(id)