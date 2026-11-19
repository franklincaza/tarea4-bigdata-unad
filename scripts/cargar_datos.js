// Script de carga de datos - produccion_bigdata
// Tarea 4 Big Data - Franklin Antonio Ramirez Herazo
// Ejecutar con: mongosh produccion_bigdata cargar_datos.js

// ─── COLECCION: maquinas (20 documentos) ────────────────────────────────────

const listaMaquinas = [
  { codigo_maquina: "MAQ-001", nombre: "Torno CNC T200",             tipo: "Mecanizado",  capacidad_hora: 15, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-01"), ubicacion: "Linea A - Piso 1" },
  { codigo_maquina: "MAQ-002", nombre: "Fresadora FV-5",             tipo: "Mecanizado",  capacidad_hora: 12, estado: "Operativa",    ultima_mantenimiento: new Date("2026-09-15"), ubicacion: "Linea A - Piso 1" },
  { codigo_maquina: "MAQ-003", nombre: "Centro Mecanizado CM-5",     tipo: "Mecanizado",  capacidad_hora: 18, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-10"), ubicacion: "Linea A - Piso 2" },
  { codigo_maquina: "MAQ-004", nombre: "Rectificadora RG-3",         tipo: "Acabado",     capacidad_hora: 10, estado: "Operativa",    ultima_mantenimiento: new Date("2026-08-20"), ubicacion: "Linea B - Piso 1" },
  { codigo_maquina: "MAQ-005", nombre: "Soldadora MIG-350",          tipo: "Soldadura",   capacidad_hora:  8, estado: "Mantenimiento",ultima_mantenimiento: new Date("2026-11-10"), ubicacion: "Linea B - Piso 1" },
  { codigo_maquina: "MAQ-006", nombre: "Prensa Hidraulica PH-100",   tipo: "Conformado",  capacidad_hora: 20, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-05"), ubicacion: "Linea C - Piso 1" },
  { codigo_maquina: "MAQ-007", nombre: "Taladro Radial TR-50",       tipo: "Mecanizado",  capacidad_hora: 25, estado: "Operativa",    ultima_mantenimiento: new Date("2026-09-01"), ubicacion: "Linea A - Piso 2" },
  { codigo_maquina: "MAQ-008", nombre: "Dobladora DB-6",             tipo: "Conformado",  capacidad_hora: 16, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-20"), ubicacion: "Linea C - Piso 2" },
  { codigo_maquina: "MAQ-009", nombre: "Cabina de Pintura CP-2",     tipo: "Pintura",     capacidad_hora:  6, estado: "Operativa",    ultima_mantenimiento: new Date("2026-09-28"), ubicacion: "Linea D - Piso 1" },
  { codigo_maquina: "MAQ-010", nombre: "Horno de Tratamiento HT-1",  tipo: "Tratamiento", capacidad_hora: 30, estado: "Operativa",    ultima_mantenimiento: new Date("2026-08-01"), ubicacion: "Linea D - Piso 2" },
  { codigo_maquina: "MAQ-011", nombre: "Torno Convencional TC-120",  tipo: "Mecanizado",  capacidad_hora: 10, estado: "Inactiva",     ultima_mantenimiento: new Date("2026-07-15"), ubicacion: "Linea A - Piso 1" },
  { codigo_maquina: "MAQ-012", nombre: "Sierra de Banda SB-4",       tipo: "Corte",       capacidad_hora: 40, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-12"), ubicacion: "Linea E - Piso 1" },
  { codigo_maquina: "MAQ-013", nombre: "Roladora RL-10",             tipo: "Conformado",  capacidad_hora: 14, estado: "Operativa",    ultima_mantenimiento: new Date("2026-09-22"), ubicacion: "Linea C - Piso 1" },
  { codigo_maquina: "MAQ-014", nombre: "Compresor Industrial CI-7",  tipo: "Neumatica",   capacidad_hora: 60, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-18"), ubicacion: "Sala Maquinas" },
  { codigo_maquina: "MAQ-015", nombre: "Ensamble Manual EM-1",       tipo: "Ensamble",    capacidad_hora: 20, estado: "Operativa",    ultima_mantenimiento: new Date("2026-11-01"), ubicacion: "Linea F - Piso 1" },
  { codigo_maquina: "MAQ-016", nombre: "CNC Router CR-4",            tipo: "Mecanizado",  capacidad_hora: 22, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-25"), ubicacion: "Linea A - Piso 3" },
  { codigo_maquina: "MAQ-017", nombre: "Soldadora TIG ST-200",       tipo: "Soldadura",   capacidad_hora:  7, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-30"), ubicacion: "Linea B - Piso 2" },
  { codigo_maquina: "MAQ-018", nombre: "Oxicorte OX-5",              tipo: "Corte",       capacidad_hora: 18, estado: "Operativa",    ultima_mantenimiento: new Date("2026-09-10"), ubicacion: "Linea E - Piso 2" },
  { codigo_maquina: "MAQ-019", nombre: "Pulidora Angular PA-9",      tipo: "Acabado",     capacidad_hora: 35, estado: "Operativa",    ultima_mantenimiento: new Date("2026-11-05"), ubicacion: "Linea B - Piso 1" },
  { codigo_maquina: "MAQ-020", nombre: "Lavadora Industrial LI-3",   tipo: "Limpieza",    capacidad_hora: 50, estado: "Operativa",    ultima_mantenimiento: new Date("2026-10-07"), ubicacion: "Linea D - Piso 1" },
];

db.maquinas.drop();
db.maquinas.insertMany(listaMaquinas);
print("Maquinas insertadas:", db.maquinas.countDocuments());

// ─── COLECCION: productos (30 documentos) ────────────────────────────────────

const listaProductos = [
  { codigo_producto: "PROD-001", nombre: "Eje de transmision 50mm",     categoria: "Mecanizado",  tiempo_ciclo_min: 45, costo_unitario_cop:  85000, peso_kg: 2.3, especificaciones: { material: "Acero 1045", dureza_hrc: 58, tolerancia_mm: 0.05 } },
  { codigo_producto: "PROD-002", nombre: "Engranaje helicoidal 60T",    categoria: "Mecanizado",  tiempo_ciclo_min: 60, costo_unitario_cop: 120000, peso_kg: 1.8, especificaciones: { material: "Acero 4140", modulo: 2, angulo_helix_deg: 20 } },
  { codigo_producto: "PROD-003", nombre: "Brida de union DN50",         categoria: "Mecanizado",  tiempo_ciclo_min: 30, costo_unitario_cop:  45000, peso_kg: 0.9, especificaciones: { material: "Acero A36", presion_max_psi: 150, diametro_mm: 50 } },
  { codigo_producto: "PROD-004", nombre: "Polea acanalada 8\"",         categoria: "Conformado",  tiempo_ciclo_min: 25, costo_unitario_cop:  38000, peso_kg: 1.2, especificaciones: { material: "Hierro gris", canales: 3, diametro_pulg: 8 } },
  { codigo_producto: "PROD-005", nombre: "Soporte soldado tipo L",      categoria: "Soldadura",   tiempo_ciclo_min: 40, costo_unitario_cop:  55000, peso_kg: 3.1, especificaciones: { material: "Acero A36", soldadura: "MIG", espesor_mm: 6 } },
  { codigo_producto: "PROD-006", nombre: "Buje de bronce 30mm",         categoria: "Mecanizado",  tiempo_ciclo_min: 20, costo_unitario_cop:  28000, peso_kg: 0.4, especificaciones: { material: "Bronce SAE-660", holgura_mm: 0.03 } },
  { codigo_producto: "PROD-007", nombre: "Leva de disco perfil 3A",     categoria: "Mecanizado",  tiempo_ciclo_min: 90, costo_unitario_cop: 180000, peso_kg: 2.7, especificaciones: { material: "Acero herramienta D2", tratamiento: "Nitrurado" } },
  { codigo_producto: "PROD-008", nombre: "Placa base 300x200mm",        categoria: "Conformado",  tiempo_ciclo_min: 35, costo_unitario_cop:  62000, peso_kg: 4.5, especificaciones: { material: "Acero A36", acabado: "Pintado", espesor_mm: 10 } },
  { codigo_producto: "PROD-009", nombre: "Tubo estructural 2\" x 2m",   categoria: "Corte",       tiempo_ciclo_min: 10, costo_unitario_cop:  15000, peso_kg: 5.2, especificaciones: { material: "Acero A500", calibre: 14, longitud_mm: 2000 } },
  { codigo_producto: "PROD-010", nombre: "Carcasa de proteccion CP-5",  categoria: "Ensamble",    tiempo_ciclo_min: 55, costo_unitario_cop:  95000, peso_kg: 2.1, especificaciones: { material: "Aluminio 6061", acabado: "Anodizado" } },
  { codigo_producto: "PROD-011", nombre: "Tornillo hexagonal M16x50",   categoria: "Mecanizado",  tiempo_ciclo_min:  8, costo_unitario_cop:   4500, peso_kg: 0.1, especificaciones: { material: "Acero grado 8.8", rosca: "M16", paso_mm: 2.0 } },
  { codigo_producto: "PROD-012", nombre: "Riel guia 1m perfil T",       categoria: "Mecanizado",  tiempo_ciclo_min: 50, costo_unitario_cop:  75000, peso_kg: 3.8, especificaciones: { material: "Acero 1020", rectificado: true } },
  { codigo_producto: "PROD-013", nombre: "Cilindro hidraulico CH-80",   categoria: "Ensamble",    tiempo_ciclo_min: 70, costo_unitario_cop: 220000, peso_kg: 6.5, especificaciones: { diametro_vastago_mm: 50, carrera_mm: 200, presion_max_bar: 200 } },
  { codigo_producto: "PROD-014", nombre: "Plato divisor 4 ranuras",     categoria: "Mecanizado",  tiempo_ciclo_min: 120,costo_unitario_cop: 350000, peso_kg: 8.2, especificaciones: { material: "Hierro gris", ranuras: 4, diametro_mm: 160 } },
  { codigo_producto: "PROD-015", nombre: "Marco soldado tipo ventana",  categoria: "Soldadura",   tiempo_ciclo_min: 80, costo_unitario_cop: 145000, peso_kg: 12.0,especificaciones: { material: "Acero A36", soldadura: "TIG", espesor_mm: 3 } },
  { codigo_producto: "PROD-016", nombre: "Muñon de apoyo MA-25",        categoria: "Mecanizado",  tiempo_ciclo_min: 35, costo_unitario_cop:  58000, peso_kg: 1.5, especificaciones: { material: "Acero 4340", diametro_mm: 25, longitud_mm: 80 } },
  { codigo_producto: "PROD-017", nombre: "Bracket de sujecion BS-7",    categoria: "Conformado",  tiempo_ciclo_min: 22, costo_unitario_cop:  32000, peso_kg: 0.7, especificaciones: { material: "Acero A36", galvanizado: true } },
  { codigo_producto: "PROD-018", nombre: "Disco de corte DC-250",       categoria: "Mecanizado",  tiempo_ciclo_min: 40, costo_unitario_cop:  68000, peso_kg: 2.9, especificaciones: { material: "Acero herramienta", diametro_mm: 250, espesor_mm: 3 } },
  { codigo_producto: "PROD-019", nombre: "Union articulada UA-20",      categoria: "Ensamble",    tiempo_ciclo_min: 60, costo_unitario_cop: 110000, peso_kg: 1.1, especificaciones: { material: "Acero 1040", angulo_max_deg: 30 } },
  { codigo_producto: "PROD-020", nombre: "Chumacera de piso CP-45",     categoria: "Ensamble",    tiempo_ciclo_min: 25, costo_unitario_cop:  42000, peso_kg: 2.4, especificaciones: { rodamiento: "UCF-209", diametro_eje_mm: 45 } },
  { codigo_producto: "PROD-021", nombre: "Placa de desgaste PD-10",     categoria: "Acabado",     tiempo_ciclo_min: 30, costo_unitario_cop:  48000, peso_kg: 3.2, especificaciones: { material: "Acero Hardox 400", espesor_mm: 10 } },
  { codigo_producto: "PROD-022", nombre: "Manguito de acoplamiento MA", categoria: "Mecanizado",  tiempo_ciclo_min: 45, costo_unitario_cop:  78000, peso_kg: 1.6, especificaciones: { material: "Acero 1045", tolerancia: "H7/p6" } },
  { codigo_producto: "PROD-023", nombre: "Tensor de cadena TC-50",      categoria: "Ensamble",    tiempo_ciclo_min: 35, costo_unitario_cop:  60000, peso_kg: 0.8, especificaciones: { paso_cadena: "50", ajuste_mm: 30 } },
  { codigo_producto: "PROD-024", nombre: "Base de motor BM-180",        categoria: "Soldadura",   tiempo_ciclo_min: 65, costo_unitario_cop: 125000, peso_kg: 15.5,especificaciones: { potencia_hp: 180, pernos_anclaje: 8, soldadura: "MIG" } },
  { codigo_producto: "PROD-025", nombre: "Reductor de velocidad RV-5",  categoria: "Ensamble",    tiempo_ciclo_min: 180,costo_unitario_cop: 850000, peso_kg: 22.0,especificaciones: { relacion_reduccion: "1:5", par_salida_nm: 500 } },
  { codigo_producto: "PROD-026", nombre: "Perno especial PE-M24",       categoria: "Mecanizado",  tiempo_ciclo_min: 15, costo_unitario_cop:  18000, peso_kg: 0.3, especificaciones: { material: "Acero grado 10.9", rosca: "M24", paso_mm: 3.0 } },
  { codigo_producto: "PROD-027", nombre: "Alojamiento de rodamiento AR",categoria: "Mecanizado",  tiempo_ciclo_min: 55, costo_unitario_cop:  92000, peso_kg: 2.0, especificaciones: { material: "Hierro gris", rodamiento: "6210", ajuste: "K6" } },
  { codigo_producto: "PROD-028", nombre: "Palanca de mando PM-300",     categoria: "Conformado",  tiempo_ciclo_min: 28, costo_unitario_cop:  35000, peso_kg: 0.6, especificaciones: { material: "Acero 1020", longitud_mm: 300 } },
  { codigo_producto: "PROD-029", nombre: "Guardamotor galvanizado GM",  categoria: "Acabado",     tiempo_ciclo_min: 42, costo_unitario_cop:  70000, peso_kg: 1.9, especificaciones: { acabado: "Galvanizado en caliente", espesor_zinc_um: 85 } },
  { codigo_producto: "PROD-030", nombre: "Conjunto de freno CF-200",    categoria: "Ensamble",    tiempo_ciclo_min: 90, costo_unitario_cop: 280000, peso_kg: 8.8, especificaciones: { disco_mm: 200, par_frenado_nm: 120, piezas: 12 } },
];

db.productos.drop();
db.productos.insertMany(listaProductos);
print("Productos insertados:", db.productos.countDocuments());

// ─── COLECCION: ordenes_produccion (100 documentos) ──────────────────────────

const operarios  = ["Carlos Gomez", "Maria Torres", "Juan Perez", "Ana Reyes", "Luis Castro", "Clara Silva", "Pedro Ruiz", "Sofía Leon"];
const turnos     = ["Mañana", "Tarde", "Noche"];
const estados    = ["Completada", "Completada", "Completada", "Completada", "Completada", "Completada", "Completada", "En proceso", "Cancelada"];
const productos  = listaProductos.map(p => p.codigo_producto);
const maquinas   = listaMaquinas.map(m => m.codigo_maquina);

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr)      { return arr[Math.floor(Math.random() * arr.length)]; }

const ordenes = [];
const baseDate = new Date("2026-10-01T06:00:00");

for (let i = 1; i <= 100; i++) {
  const programada = rnd(50, 100);
  const defectuosa = rnd(0, Math.floor(programada * 0.08));
  const producida  = programada - rnd(0, Math.floor(programada * 0.05));
  const eficiencia = Math.round((producida / programada) * 100 * 10) / 10;
  const daysOffset = Math.floor((i - 1) / 4);
  const inicio     = new Date(baseDate.getTime() + daysOffset * 86400000);
  const fin        = new Date(inicio.getTime() + rnd(4, 10) * 3600000);
  const estado     = i <= 85 ? "Completada" : i <= 95 ? "En proceso" : "Cancelada";

  ordenes.push({
    numero_orden:        `OP-2026-${String(i).padStart(3, "0")}`,
    codigo_producto:     pick(productos),
    codigo_maquina:      pick(maquinas),
    operario:            pick(operarios),
    turno:               pick(turnos),
    fecha_inicio:        inicio,
    fecha_fin:           fin,
    cantidad_programada: programada,
    cantidad_producida:  producida,
    cantidad_defectuosa: defectuosa,
    estado:              estado,
    eficiencia_pct:      eficiencia,
  });
}

db.ordenes_produccion.drop();
db.ordenes_produccion.insertMany(ordenes);
print("Ordenes de produccion insertadas:", db.ordenes_produccion.countDocuments());

// ─── VERIFICACION FINAL ───────────────────────────────────────────────────────
print("\n=== CARGA COMPLETADA EN produccion_bigdata ===");
print("Maquinas:              ", db.maquinas.countDocuments());
print("Productos:             ", db.productos.countDocuments());
print("Ordenes de produccion: ", db.ordenes_produccion.countDocuments());
print("Total documentos:      ", db.maquinas.countDocuments() + db.productos.countDocuments() + db.ordenes_produccion.countDocuments());
