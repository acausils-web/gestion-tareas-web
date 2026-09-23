from domain.ports.repositorio_tareas import RepositorioTareas


class CompletarTarea:

    def __init__(self, repositorio: RepositorioTareas):
        self.repositorio = repositorio

    def ejecutar(self, id: int) -> bool:
        return self.repositorio.completar(id)