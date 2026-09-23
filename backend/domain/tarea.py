from dataclasses import dataclass
from datetime import date


@dataclass
class Tarea:
    id: int
    titulo: str
    descripcion: str
    fecha_limite: date
    prioridad: str
    estado: str = "Pendiente"

    def completar(self):
        self.estado = "Completada"