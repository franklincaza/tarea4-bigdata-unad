# Tarea 4 - Almacenamiento y Consultas de Datos en Big Data

**Curso:** BIG DATA - 202016911A_2204 | UNAD  
**Estudiante:** Franklin Antonio Ramirez Herazo  
**Caso de uso:** Sistema de Gestión de Órdenes de Producción Industrial (`produccion_bigdata`)

## Descripción

Implementación de base de datos NoSQL documental con MongoDB para gestionar órdenes de producción industrial.
150 documentos en 3 colecciones: `maquinas` (20), `productos` (30), `ordenes_produccion` (100).

## Uso

```bash
# Levantar entorno (requiere Docker)
docker-compose up -d

# Cargar datos
mongosh produccion_bigdata scripts/cargar_datos.js

# Ejecutar consultas
mongosh produccion_bigdata scripts/consultas_mongodb.js
```

## Estructura

```
├── docker-compose.yml          # MongoDB 7.0 + Mongo Express
└── scripts/
    ├── cargar_datos.js         # Carga las 3 colecciones (150 docs)
    └── consultas_mongodb.js    # CRUD + filtros $lookup + agregaciones
```

## Presentación online
https://docs.google.com/presentation/d/1kvkQNn_2qH2KAFQfyZmswu1JgmkZHJuaI8lP0fZvSsI/edit?slide=id.p1#slide=id.p1

