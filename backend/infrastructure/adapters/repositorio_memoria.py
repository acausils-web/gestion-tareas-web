from domain.tarea import Tarea
from domain.ports.repositorio_tareas import RepositorioTareas


class RepositorioTareasMemoria(RepositorioTareas):

    def __init__(self):
        self.tareas = []

    def guardar(self, tarea: Tarea) -> Tarea:
        self.tareas.append(tarea)
        return tarea

    def listar(self) -> list[Tarea]:
        return self.tareas

    def eliminar(self, id: int) -> bool:
        for tarea in self.tareas:
            if tarea.id == id:
                self.tareas.remove(tarea)
                return True

        return False