import sqlite3
from pathlib import Path
from datetime import date

from domain.tarea import Tarea


class RepositorioTareasSQLite:

    def __init__(self):
        # La base de datos se guardará directamente dentro de backend
        self.ruta_db = Path(__file__).resolve().parents[2] / "tareas.db"
        self.crear_tabla()

    def conectar(self):
        return sqlite3.connect(self.ruta_db)

    def crear_tabla(self):
        conexion = self.conectar()
        cursor = conexion.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tareas (
                id INTEGER PRIMARY KEY,
                titulo TEXT NOT NULL,
                descripcion TEXT,
                fecha_limite TEXT,
                prioridad TEXT NOT NULL,
                estado TEXT NOT NULL DEFAULT 'Pendiente'
            )
        """)

        conexion.commit()
        conexion.close()

    def guardar(self, tarea: Tarea) -> Tarea:
        conexion = self.conectar()
        cursor = conexion.cursor()

        fecha_limite = tarea.fecha_limite

        if isinstance(fecha_limite, date):
            fecha_limite = fecha_limite.isoformat()

        cursor.execute("""
            INSERT INTO tareas (
                id,
                titulo,
                descripcion,
                fecha_limite,
                prioridad,
                estado
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            tarea.id,
            tarea.titulo,
            tarea.descripcion,
            fecha_limite,
            tarea.prioridad,
            tarea.estado
        ))

        conexion.commit()
        conexion.close()

        return tarea

    def listar(self) -> list[Tarea]:
        conexion = self.conectar()
        cursor = conexion.cursor()

        cursor.execute("""
            SELECT
                id,
                titulo,
                descripcion,
                fecha_limite,
                prioridad,
                estado
            FROM tareas
            ORDER BY id DESC
        """)

        filas = cursor.fetchall()
        conexion.close()

        tareas = []

        for fila in filas:
            fecha_limite = fila[3]

            if fecha_limite:
                fecha_limite = date.fromisoformat(fecha_limite)

            tarea = Tarea(
                id=fila[0],
                titulo=fila[1],
                descripcion=fila[2],
                fecha_limite=fecha_limite,
                prioridad=fila[4],
                estado=fila[5]
            )

            tareas.append(tarea)

        return tareas

    def eliminar(self, id: int) -> bool:
        conexion = self.conectar()
        cursor = conexion.cursor()

        cursor.execute(
            "DELETE FROM tareas WHERE id = ?",
            (id,)
        )

        eliminada = cursor.rowcount > 0

        conexion.commit()
        conexion.close()

        return eliminada

    def completar(self, id: int) -> bool:
        conexion = self.conectar()
        cursor = conexion.cursor()

        cursor.execute("""
            UPDATE tareas
            SET estado = 'Completada'
            WHERE id = ?
        """, (id,))

        actualizada = cursor.rowcount > 0

        conexion.commit()
        conexion.close()

        return actualizada