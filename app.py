from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def init_db():
    conn = sqlite3.connect('ventas.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS ventas
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  cliente TEXT,
                  producto TEXT,
                  cantidad INTEGER,
                  precio REAL,
                  total REAL)''')
    conn.commit()
    conn.close()

# Ruta para REGISTRAR (index.html)


@app.route('/registrar', methods=['POST'])
def registrar_venta():
    data = request.json
    conn = sqlite3.connect('ventas.db')
    c = conn.cursor()
    c.execute("INSERT INTO ventas (cliente, producto, cantidad, precio, total) VALUES (?, ?, ?, ?, ?)",
              (data['cliente'], data['producto'], data['cantidad'], data['precio'], data['total']))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Venta registrada correctamente"})

# Ruta para MOSTRAR (reporte.html)


@app.route('/obtener_ventas', methods=['GET'])
def obtener_ventas():
    conn = sqlite3.connect('ventas.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM ventas")
    filas = c.fetchall()
    conn.close()
    ventas = [dict(fila) for fila in filas]
    return jsonify(ventas)

# Ruta para ELIMINAR (Tu parte del trabajo)


@app.route('/eliminar/<int:id>', methods=['DELETE'])
def eliminar_venta(id):
    conn = sqlite3.connect('ventas.db')
    c = conn.cursor()
    c.execute("DELETE FROM ventas WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Registro eliminado correctamente"})


if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
