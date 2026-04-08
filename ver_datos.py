import sqlite3

conn = sqlite3.connect('ventas.db')
cursor = conn.cursor()

cursor.execute("SELECT * FROM ventas")
filas = cursor.fetchall()

print("\n--- REGISTROS EN LA BASE DE DATOS ---")
for fila in filas:
    print(f"ID: {fila[0]} | Cliente: {fila[1]} | Producto: {fila[2]} | Cantidad: {fila[3]} | Precio: {fila[4]} | Total: {fila[5]}")

conn.close()