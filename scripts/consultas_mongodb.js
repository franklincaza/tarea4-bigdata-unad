// ================================================================
// CONSULTAS MONGODB - TAREA 4 BIG DATA
// Curso: BIG DATA - 202016911A_2204 | UNAD
// Estudiante: Franklin Antonio Ramirez Herazo
// Base de datos: produccion_bigdata
// ================================================================
// Ejecutar con: mongosh produccion_bigdata consultas_mongodb.js
// ================================================================

print("\n========== TAREA 4 - CONSULTAS MONGODB ==========\n");

// ─────────────────────────────────────────────────────────────────
// SECCION 1: CONSULTAS BASICAS (CRUD)
// ─────────────────────────────────────────────────────────────────
print("--- 1. CONSULTAS BASICAS (CRUD) ---\n");

// 1.1 INSERCION - Agregar un registro de prueba para el CRUD
print("1.1 Insercion (insertOne) - Contrato de prueba:");
const insertResult = db.ordenes_produccion.insertOne({
  numero_orden:        "OP-2026-TEST",
  codigo_producto:     "PROD-001",
  codigo_maquina:      "MAQ-003",
  operario:            "Franklin Ramirez",
  turno:               "Mañana",
  fecha_inicio:        new Date("2026-11-19T06:00:00"),
  fecha_fin:           new Date("2026-11-19T14:00:00"),
  cantidad_programada: 80,
  cantidad_producida:  78,
  cantidad_defectuosa: 2,
  estado:              "Completada",
  eficiencia_pct:      97.5,
});
print("acknowledged:", insertResult.acknowledged);
print("insertedId:  ", insertResult.insertedId);
print("Total ordenes:", db.ordenes_produccion.countDocuments(), "\n");

// 1.2 SELECCION - Consulta general con proyeccion
print("1.2 Seleccion (find) - Primeras 5 ordenes completadas:");
db.ordenes_produccion.find(
  { estado: "Completada" },
  { _id: 0, numero_orden: 1, codigo_maquina: 1, turno: 1, eficiencia_pct: 1, estado: 1 }
).limit(5).forEach(doc => printjson(doc));
print();

// 1.3 ACTUALIZACION - Cambiar estado de la orden de prueba
print("1.3 Actualizacion (updateOne) - Cambio de estado:");
const updateResult = db.ordenes_produccion.updateOne(
  { numero_orden: "OP-2026-TEST" },
  { $set: { estado: "Auditada", cantidad_defectuosa: 0, eficiencia_pct: 100 } }
);
print("matchedCount: ", updateResult.matchedCount);
print("modifiedCount:", updateResult.modifiedCount);
print("Verificacion:");
printjson(db.ordenes_produccion.findOne(
  { numero_orden: "OP-2026-TEST" },
  { _id: 0, numero_orden: 1, estado: 1, eficiencia_pct: 1 }
));
print();

// 1.4 ELIMINACION - Borrar el registro de prueba
print("1.4 Eliminacion (deleteOne) - Borrar orden de prueba:");
const deleteResult = db.ordenes_produccion.deleteOne({ numero_orden: "OP-2026-TEST" });
print("deletedCount:", deleteResult.deletedCount);
print("Total ordenes tras borrado:", db.ordenes_produccion.countDocuments(), "\n");

// ─────────────────────────────────────────────────────────────────
// SECCION 2: CONSULTAS CON FILTROS Y OPERADORES ($LOOKUP)
// ─────────────────────────────────────────────────────────────────
print("--- 2. CONSULTAS CON FILTROS Y OPERADORES ---\n");

// 2.1 Filtro con operadores $lt y $gte (eficiencia critica)
print("2.1 Ordenes con eficiencia critica (< 85%):");
const criticas = db.ordenes_produccion.find(
  { eficiencia_pct: { $lt: 85 }, estado: { $in: ["Completada", "En proceso"] } },
  { _id: 0, numero_orden: 1, turno: 1, eficiencia_pct: 1, operario: 1 }
).sort({ eficiencia_pct: 1 }).limit(5).toArray();
criticas.forEach(doc => printjson(doc));
print("Total ordenes criticas:", db.ordenes_produccion.countDocuments({ eficiencia_pct: { $lt: 85 } }), "\n");

// 2.2 $lookup doble: ordenes + productos + maquinas
print("2.2 $lookup doble - Ordenes con nombre de producto y maquina:");
db.ordenes_produccion.aggregate([
  { $lookup: {
      from:         "productos",
      localField:   "codigo_producto",
      foreignField: "codigo_producto",
      as:           "datos_producto"
  }},
  { $unwind: { path: "$datos_producto", preserveNullAndEmpty: false } },
  { $lookup: {
      from:         "maquinas",
      localField:   "codigo_maquina",
      foreignField: "codigo_maquina",
      as:           "datos_maquina"
  }},
  { $unwind: { path: "$datos_maquina", preserveNullAndEmpty: false } },
  { $project: {
      _id: 0,
      numero_orden: 1,
      producto:     "$datos_producto.nombre",
      maquina:      "$datos_maquina.nombre",
      operario:     1,
      turno:        1,
      eficiencia_pct: 1,
      estado:       1
  }},
  { $sort: { eficiencia_pct: -1 } },
  { $limit: 5 }
]).forEach(doc => printjson(doc));
print();

// 2.3 Filtro por rango de fechas y operador $in
print("2.3 Ordenes de octubre 2026 en turno Noche:");
const octubreNoche = db.ordenes_produccion.find({
  turno: { $in: ["Noche"] },
  fecha_inicio: { $gte: new Date("2026-10-01"), $lte: new Date("2026-10-31") }
}, { _id: 0, numero_orden: 1, fecha_inicio: 1, turno: 1, eficiencia_pct: 1 }).toArray();
print("Total:", octubreNoche.length);
octubreNoche.slice(0, 3).forEach(doc => printjson(doc));
print();

// ─────────────────────────────────────────────────────────────────
// SECCION 3: CONSULTAS DE AGREGACION ESTADISTICA
// ─────────────────────────────────────────────────────────────────
print("--- 3. CONSULTAS DE AGREGACION ---\n");

// 3.1 Resumen global (contar, sumar, promediar, min, max)
print("3.1 Resumen global de produccion:");
db.ordenes_produccion.aggregate([
  { $group: {
      _id:                  null,
      total_ordenes:        { $sum: 1 },
      total_producido:      { $sum: "$cantidad_producida" },
      total_defectuoso:     { $sum: "$cantidad_defectuosa" },
      eficiencia_promedio:  { $avg: "$eficiencia_pct" },
      eficiencia_minima:    { $min: "$eficiencia_pct" },
      eficiencia_maxima:    { $max: "$eficiencia_pct" }
  }},
  { $project: {
      _id:                  0,
      total_ordenes:        1,
      total_producido:      1,
      total_defectuoso:     1,
      tasa_defectos_pct:    { $round: [{ $multiply: [{ $divide: ["$total_defectuoso", "$total_producido"] }, 100] }, 2] },
      eficiencia_promedio:  { $round: ["$eficiencia_promedio", 1] },
      eficiencia_minima:    1,
      eficiencia_maxima:    1
  }}
]).forEach(doc => printjson(doc));
print();

// 3.2 Eficiencia promedio por turno
print("3.2 Resumen por turno (contar + sumar + promediar):");
db.ordenes_produccion.aggregate([
  { $group: {
      _id:                  "$turno",
      total_ordenes:        { $sum: 1 },
      eficiencia_promedio:  { $avg: "$eficiencia_pct" },
      total_producido:      { $sum: "$cantidad_producida" },
      total_defectuoso:     { $sum: "$cantidad_defectuosa" }
  }},
  { $sort: { eficiencia_promedio: -1 } }
]).forEach(doc => printjson(doc));
print();

// 3.3 Top 5 maquinas con mayor produccion ($lookup + $group)
print("3.3 Top 5 maquinas por unidades producidas:");
db.ordenes_produccion.aggregate([
  { $group: {
      _id:                  "$codigo_maquina",
      ordenes_ejecutadas:   { $sum: 1 },
      unidades_producidas:  { $sum: "$cantidad_producida" },
      eficiencia_promedio:  { $avg: "$eficiencia_pct" }
  }},
  { $sort: { unidades_producidas: -1 } },
  { $limit: 5 },
  { $lookup: {
      from:         "maquinas",
      localField:   "_id",
      foreignField: "codigo_maquina",
      as:           "info_maquina"
  }},
  { $unwind: "$info_maquina" },
  { $project: {
      _id:                  0,
      maquina:              "$info_maquina.nombre",
      tipo:                 "$info_maquina.tipo",
      ordenes_ejecutadas:   1,
      unidades_producidas:  1,
      eficiencia_promedio:  { $round: ["$eficiencia_promedio", 1] }
  }}
]).forEach(doc => printjson(doc));
print();

// 3.4 Productos con mayor cantidad defectuosa
print("3.4 Top 5 productos con mayor tasa de defectos:");
db.ordenes_produccion.aggregate([
  { $group: {
      _id:               "$codigo_producto",
      total_producido:   { $sum: "$cantidad_producida" },
      total_defectuoso:  { $sum: "$cantidad_defectuosa" }
  }},
  { $project: {
      total_producido:    1,
      total_defectuoso:   1,
      tasa_defectos_pct:  { $round: [{ $multiply: [{ $divide: ["$total_defectuoso", "$total_producido"] }, 100] }, 2] }
  }},
  { $sort: { tasa_defectos_pct: -1 } },
  { $limit: 5 },
  { $lookup: {
      from:         "productos",
      localField:   "_id",
      foreignField: "codigo_producto",
      as:           "info_producto"
  }},
  { $unwind: "$info_producto" },
  { $project: {
      _id:               0,
      producto:          "$info_producto.nombre",
      categoria:         "$info_producto.categoria",
      total_producido:   1,
      total_defectuoso:  1,
      tasa_defectos_pct: 1
  }}
]).forEach(doc => printjson(doc));
print();

// 3.5 Eficiencia promedio por operario (ranking)
print("3.5 Ranking de operarios por eficiencia promedio:");
db.ordenes_produccion.aggregate([
  { $group: {
      _id:                 "$operario",
      ordenes_asignadas:   { $sum: 1 },
      eficiencia_promedio: { $avg: "$eficiencia_pct" },
      unidades_producidas: { $sum: "$cantidad_producida" }
  }},
  { $sort: { eficiencia_promedio: -1 } },
  { $project: {
      _id:                 0,
      operario:            "$_id",
      ordenes_asignadas:   1,
      eficiencia_promedio: { $round: ["$eficiencia_promedio", 1] },
      unidades_producidas: 1
  }}
]).forEach(doc => printjson(doc));

print("\n========== FIN DE CONSULTAS ==========");
