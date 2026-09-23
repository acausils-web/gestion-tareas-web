from domain.ports.repositorio_tareas import RepositorioTareas


class ListarTareas:

    def __init__(self, repositorio: RepositorioTareas):
        self.repositorio = repositorio

    def ejecutar(self):
        return self.repositorio.listar()