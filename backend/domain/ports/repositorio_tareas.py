from abc import ABC, abstractmethod
from domain.tarea import Tarea


class RepositorioTareas(ABC):

    @abstractmethod
    def guardar(self, tarea: Tarea) -> Tarea:
        pass

    @abstractmethod
    def listar(self) -> list[Tarea]:
        pass

    @abstractmethod
    def eliminar(self, id: int) -> bool:
        pass