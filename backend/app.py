from flask import Flask, jsonify, request
from flask_cors import CORS

from application.crear_tarea import CrearTarea
from infrastructure.adapters.repositorio_sqlite import RepositorioTareasSQLite


app = Flask(__name__)
CORS(app)

repositorio = RepositorioTareasSQLite()
crear_tarea = CrearTarea(repositorio)


@app.route("/")
def inicio():
    return "Aplicación de Gestión de Tareas funcionando correctamente"


@app.route("/tareas", methods=["GET"])
def listar_tareas():
    tareas = repositorio.listar()

    return jsonify([
        {
            "id": tarea.id,
            "titulo": tarea.titulo,
            "descripcion": tarea.descripcion,
            "fecha_limite": tarea.fecha_limite,
            "prioridad": tarea.prioridad,
            "estado": tarea.estado
        }
        for tarea in tareas
    ])


@app.route("/tareas", methods=["POST"])
def agregar_tarea():
    datos = request.get_json()

    tarea = crear_tarea.ejecutar(
        id=datos["id"],
        titulo=datos["titulo"],
        descripcion=datos["descripcion"],
        fecha_limite=datos.get("fecha_limite"),
        prioridad=datos["prioridad"]
    )

    return jsonify({
        "id": tarea.id,
        "titulo": tarea.titulo,
        "descripcion": tarea.descripcion,
        "fecha_limite": tarea.fecha_limite,
        "prioridad": tarea.prioridad,
        "estado": tarea.estado
    }), 201


@app.route("/tareas/<int:id>/completar", methods=["PUT"])
def completar_tarea(id):
    actualizada = repositorio.completar(id)

    if actualizada:
        return jsonify({
            "mensaje": "Tarea completada correctamente",
            "id": id,
            "estado": "Completada"
        }), 200

    return jsonify({
        "error": "Tarea no encontrada"
    }), 404


@app.route("/tareas/<int:id>", methods=["DELETE"])
def eliminar_tarea(id):
    eliminada = repositorio.eliminar(id)

    if eliminada:
        return jsonify({
            "mensaje": "Tarea eliminada correctamente"
        }), 200

    return jsonify({
        "error": "Tarea no encontrada"
    }), 404


if __name__ == "__main__":
    app.run(debug=True)