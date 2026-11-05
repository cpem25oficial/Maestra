import { Puesto, PuestoCargo } from '../types';

/**
 * Tabla puestos (424 registros) sembrada para cada cargo de la institución CPEM N° 25.
 * Total ocupados: 421
 * Total vacantes: 3 (RENUNCIA, CESAR DE PLANTA, sin asignación)
 */
export const SEED_PUESTOS: Puesto[] = [
  {
    "id": "puesto-1",
    "puesto_id": 1,
    "cargoId": "cargo-1",
    "cargo_id": 1,
    "descripcion": "Puesto Artes Visuales (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-80",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 0,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-2",
    "puesto_id": 2,
    "cargoId": "cargo-2",
    "cargo_id": 2,
    "descripcion": "Puesto Biología (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-15",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 1,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-3",
    "puesto_id": 3,
    "cargoId": "cargo-3",
    "cargo_id": 3,
    "descripcion": "Puesto Construcción de Ciudadanías (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 2,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-4",
    "puesto_id": 4,
    "cargoId": "cargo-4",
    "cargo_id": 4,
    "descripcion": "Puesto Economía (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-303",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 3,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-5",
    "puesto_id": 5,
    "cargoId": "cargo-5",
    "cargo_id": 5,
    "descripcion": "Puesto Educación Física Integral (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-270",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 4,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-6",
    "puesto_id": 6,
    "cargoId": "cargo-6",
    "cargo_id": 6,
    "descripcion": "Puesto Educación Sexual Integral (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-80",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 5,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-7",
    "puesto_id": 7,
    "cargoId": "cargo-7",
    "cargo_id": 7,
    "descripcion": "Puesto Filosofía (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-24",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 6,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-8",
    "puesto_id": 8,
    "cargoId": "cargo-8",
    "cargo_id": 8,
    "descripcion": "Puesto Físico Química (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-271",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 7,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-9",
    "puesto_id": 9,
    "cargoId": "cargo-9",
    "cargo_id": 9,
    "descripcion": "Puesto Geografía (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-222",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 8,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-10",
    "puesto_id": 10,
    "cargoId": "cargo-10",
    "cargo_id": 10,
    "descripcion": "Puesto Historia (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-164",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 9,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-11",
    "puesto_id": 11,
    "cargoId": "cargo-11",
    "cargo_id": 11,
    "descripcion": "Puesto Informática (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-504",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 10,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-12",
    "puesto_id": 12,
    "cargoId": "cargo-12",
    "cargo_id": 12,
    "descripcion": "Puesto Integración Tecnológica (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-11",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 11,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-13",
    "puesto_id": 13,
    "cargoId": "cargo-13",
    "cargo_id": 13,
    "descripcion": "Puesto Lengua (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 12,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-14",
    "puesto_id": 14,
    "cargoId": "cargo-14",
    "cargo_id": 14,
    "descripcion": "Puesto Lenguas Otras (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-425",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 13,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-15",
    "puesto_id": 15,
    "cargoId": "cargo-15",
    "cargo_id": 15,
    "descripcion": "Puesto Literatura (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 14,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-16",
    "puesto_id": 16,
    "cargoId": "cargo-16",
    "cargo_id": 16,
    "descripcion": "Puesto Matemática (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 15,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-17",
    "puesto_id": 17,
    "cargoId": "cargo-17",
    "cargo_id": 17,
    "descripcion": "Puesto Música (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-96",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 16,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-18",
    "puesto_id": 18,
    "cargoId": "cargo-18",
    "cargo_id": 18,
    "descripcion": "Puesto Teatro (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-85",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 17,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-19",
    "puesto_id": 19,
    "cargoId": "cargo-19",
    "cargo_id": 19,
    "descripcion": "Puesto Artes Visuales (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-80",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 18,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-20",
    "puesto_id": 20,
    "cargoId": "cargo-20",
    "cargo_id": 20,
    "descripcion": "Puesto Biología (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-121",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 19,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-21",
    "puesto_id": 21,
    "cargoId": "cargo-21",
    "cargo_id": 21,
    "descripcion": "Puesto Construcción de Ciudadanías (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-337",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 20,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-22",
    "puesto_id": 22,
    "cargoId": "cargo-22",
    "cargo_id": 22,
    "descripcion": "Puesto Economía (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-397",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 21,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-23",
    "puesto_id": 23,
    "cargoId": "cargo-23",
    "cargo_id": 23,
    "descripcion": "Puesto Educación Física Integral (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-28",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 22,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-24",
    "puesto_id": 24,
    "cargoId": "cargo-24",
    "cargo_id": 24,
    "descripcion": "Puesto Educación Sexual Integral (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-12",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 23,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-25",
    "puesto_id": 25,
    "cargoId": "cargo-25",
    "cargo_id": 25,
    "descripcion": "Puesto Filosofía (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-415",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 24,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-26",
    "puesto_id": 26,
    "cargoId": "cargo-26",
    "cargo_id": 26,
    "descripcion": "Puesto Físico Química (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-185",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 25,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-27",
    "puesto_id": 27,
    "cargoId": "cargo-27",
    "cargo_id": 27,
    "descripcion": "Puesto Geografía (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-124",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 26,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-28",
    "puesto_id": 28,
    "cargoId": "cargo-28",
    "cargo_id": 28,
    "descripcion": "Puesto Historia (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-94",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 27,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-29",
    "puesto_id": 29,
    "cargoId": "cargo-29",
    "cargo_id": 29,
    "descripcion": "Puesto Informática (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-412",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 28,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-30",
    "puesto_id": 30,
    "cargoId": "cargo-30",
    "cargo_id": 30,
    "descripcion": "Puesto Integración Tecnológica (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-303",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 29,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-31",
    "puesto_id": 31,
    "cargoId": "cargo-31",
    "cargo_id": 31,
    "descripcion": "Puesto Lengua (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-334",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 30,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-32",
    "puesto_id": 32,
    "cargoId": "cargo-32",
    "cargo_id": 32,
    "descripcion": "Puesto Lenguas Otras (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-101",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 31,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-33",
    "puesto_id": 33,
    "cargoId": "cargo-33",
    "cargo_id": 33,
    "descripcion": "Puesto Literatura (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-334",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 32,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-34",
    "puesto_id": 34,
    "cargoId": "cargo-34",
    "cargo_id": 34,
    "descripcion": "Puesto Matemática (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-358",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 33,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-35",
    "puesto_id": 35,
    "cargoId": "cargo-35",
    "cargo_id": 35,
    "descripcion": "Puesto Música (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-96",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 34,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-36",
    "puesto_id": 36,
    "cargoId": "cargo-36",
    "cargo_id": 36,
    "descripcion": "Puesto Teatro (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-85",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 35,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-37",
    "puesto_id": 37,
    "cargoId": "cargo-37",
    "cargo_id": 37,
    "descripcion": "Puesto Artes Visuales (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-23",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 36,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-38",
    "puesto_id": 38,
    "cargoId": "cargo-38",
    "cargo_id": 38,
    "descripcion": "Puesto Biología (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-38",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 37,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-39",
    "puesto_id": 39,
    "cargoId": "cargo-39",
    "cargo_id": 39,
    "descripcion": "Puesto Construcción de Ciudadanías (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-164",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 38,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-40",
    "puesto_id": 40,
    "cargoId": "cargo-40",
    "cargo_id": 40,
    "descripcion": "Puesto Economía (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 39,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-41",
    "puesto_id": 41,
    "cargoId": "cargo-41",
    "cargo_id": 41,
    "descripcion": "Puesto Educación Física Integral (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-270",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 40,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-42",
    "puesto_id": 42,
    "cargoId": "cargo-42",
    "cargo_id": 42,
    "descripcion": "Puesto Educación Sexual Integral (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-425",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "Licencia (LIC 21399)",
        "notaEspecial": "Licencia (LIC 21399)"
      }
    ],
    "activo": true,
    "csvIndex": 41,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-43",
    "puesto_id": 43,
    "cargoId": "cargo-43",
    "cargo_id": 43,
    "descripcion": "Puesto Filosofía (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-495",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 42,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-44",
    "puesto_id": 44,
    "cargoId": "cargo-44",
    "cargo_id": 44,
    "descripcion": "Puesto Físico Química (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-185",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 43,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-45",
    "puesto_id": 45,
    "cargoId": "cargo-45",
    "cargo_id": 45,
    "descripcion": "Puesto Geografía (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-115",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 44,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-46",
    "puesto_id": 46,
    "cargoId": "cargo-46",
    "cargo_id": 46,
    "descripcion": "Puesto Historia (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-202",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 45,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-47",
    "puesto_id": 47,
    "cargoId": "cargo-47",
    "cargo_id": 47,
    "descripcion": "Puesto Informática (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-506",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 46,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-48",
    "puesto_id": 48,
    "cargoId": "cargo-48",
    "cargo_id": 48,
    "descripcion": "Puesto Integración Tecnológica (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-384",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 47,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-49",
    "puesto_id": 49,
    "cargoId": "cargo-49",
    "cargo_id": 49,
    "descripcion": "Puesto Lengua (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 48,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-50",
    "puesto_id": 50,
    "cargoId": "cargo-50",
    "cargo_id": 50,
    "descripcion": "Puesto Lenguas Otras (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-101",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 49,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-51",
    "puesto_id": 51,
    "cargoId": "cargo-51",
    "cargo_id": 51,
    "descripcion": "Puesto Literatura (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 50,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-52",
    "puesto_id": 52,
    "cargoId": "cargo-52",
    "cargo_id": 52,
    "descripcion": "Puesto Matemática (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 51,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-53",
    "puesto_id": 53,
    "cargoId": "cargo-53",
    "cargo_id": 53,
    "descripcion": "Puesto Música (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-96",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 52,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-54",
    "puesto_id": 54,
    "cargoId": "cargo-54",
    "cargo_id": 54,
    "descripcion": "Puesto Teatro (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-85",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 53,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-55",
    "puesto_id": 55,
    "cargoId": "cargo-55",
    "cargo_id": 55,
    "descripcion": "Puesto Artes Visuales (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-199",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 54,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-56",
    "puesto_id": 56,
    "cargoId": "cargo-56",
    "cargo_id": 56,
    "descripcion": "Puesto Biología (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-251",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 55,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-57",
    "puesto_id": 57,
    "cargoId": "cargo-57",
    "cargo_id": 57,
    "descripcion": "Puesto Construcción de Ciudadanías (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-32",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 56,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-58",
    "puesto_id": 58,
    "cargoId": "cargo-58",
    "cargo_id": 58,
    "descripcion": "Puesto Economía (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-303",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 57,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-59",
    "puesto_id": 59,
    "cargoId": "cargo-59",
    "cargo_id": 59,
    "descripcion": "Puesto Educación Física Integral (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-28",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 58,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-60",
    "puesto_id": 60,
    "cargoId": "cargo-60",
    "cargo_id": 60,
    "descripcion": "Puesto Educación Sexual Integral (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-273",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 59,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-61",
    "puesto_id": 61,
    "cargoId": "cargo-61",
    "cargo_id": 61,
    "descripcion": "Puesto Filosofía (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 60,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-62",
    "puesto_id": 62,
    "cargoId": "cargo-62",
    "cargo_id": 62,
    "descripcion": "Puesto Físico Química (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-496",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 61,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-63",
    "puesto_id": 63,
    "cargoId": "cargo-63",
    "cargo_id": 63,
    "descripcion": "Puesto Geografía (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-410",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 62,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-64",
    "puesto_id": 64,
    "cargoId": "cargo-64",
    "cargo_id": 64,
    "descripcion": "Puesto Historia (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 63,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-65",
    "puesto_id": 65,
    "cargoId": "cargo-65",
    "cargo_id": 65,
    "descripcion": "Puesto Informática (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-504",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 64,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-66",
    "puesto_id": 66,
    "cargoId": "cargo-66",
    "cargo_id": 66,
    "descripcion": "Puesto Integración Tecnológica (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-383",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 65,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-67",
    "puesto_id": 67,
    "cargoId": "cargo-67",
    "cargo_id": 67,
    "descripcion": "Puesto Lengua (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 66,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-68",
    "puesto_id": 68,
    "cargoId": "cargo-68",
    "cargo_id": 68,
    "descripcion": "Puesto Lenguas Otras (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-236",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 67,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-69",
    "puesto_id": 69,
    "cargoId": "cargo-69",
    "cargo_id": 69,
    "descripcion": "Puesto Literatura (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 68,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-70",
    "puesto_id": 70,
    "cargoId": "cargo-70",
    "cargo_id": 70,
    "descripcion": "Puesto Matemática (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-289",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 69,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-71",
    "puesto_id": 71,
    "cargoId": "cargo-71",
    "cargo_id": 71,
    "descripcion": "Puesto Música (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-37",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 70,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-72",
    "puesto_id": 72,
    "cargoId": "cargo-72",
    "cargo_id": 72,
    "descripcion": "Puesto Teatro (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-439",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 71,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-73",
    "puesto_id": 73,
    "cargoId": "cargo-73",
    "cargo_id": 73,
    "descripcion": "Puesto Artes Visuales (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-17",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 72,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-74",
    "puesto_id": 74,
    "cargoId": "cargo-74",
    "cargo_id": 74,
    "descripcion": "Puesto Biología (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-38",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 73,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-75",
    "puesto_id": 75,
    "cargoId": "cargo-75",
    "cargo_id": 75,
    "descripcion": "Puesto Construcción de Ciudadanías (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-448",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 74,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-76",
    "puesto_id": 76,
    "cargoId": "cargo-76",
    "cargo_id": 76,
    "descripcion": "Puesto Economía (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-303",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "Jefatura de Departamento",
        "notaEspecial": "Jefatura de Departamento"
      }
    ],
    "activo": true,
    "csvIndex": 75,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-77",
    "puesto_id": 77,
    "cargoId": "cargo-77",
    "cargo_id": 77,
    "descripcion": "Puesto Educación Física Integral (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-295",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 76,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-78",
    "puesto_id": 78,
    "cargoId": "cargo-78",
    "cargo_id": 78,
    "descripcion": "Puesto Educación Sexual Integral (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-174",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 77,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-79",
    "puesto_id": 79,
    "cargoId": "cargo-79",
    "cargo_id": 79,
    "descripcion": "Puesto Filosofía (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-24",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 78,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-80",
    "puesto_id": 80,
    "cargoId": "cargo-80",
    "cargo_id": 80,
    "descripcion": "Puesto Físico Química (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-368",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 79,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-81",
    "puesto_id": 81,
    "cargoId": "cargo-81",
    "cargo_id": 81,
    "descripcion": "Puesto Geografía (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-402",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 80,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-82",
    "puesto_id": 82,
    "cargoId": "cargo-82",
    "cargo_id": 82,
    "descripcion": "Puesto Historia (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-416",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 81,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-83",
    "puesto_id": 83,
    "cargoId": "cargo-83",
    "cargo_id": 83,
    "descripcion": "Puesto Informática (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-242",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 82,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-84",
    "puesto_id": 84,
    "cargoId": "cargo-84",
    "cargo_id": 84,
    "descripcion": "Puesto Integración Tecnológica (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-392",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 83,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-85",
    "puesto_id": 85,
    "cargoId": "cargo-85",
    "cargo_id": 85,
    "descripcion": "Puesto Lengua (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 84,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-86",
    "puesto_id": 86,
    "cargoId": "cargo-86",
    "cargo_id": 86,
    "descripcion": "Puesto Lenguas Otras (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-247",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 85,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-87",
    "puesto_id": 87,
    "cargoId": "cargo-87",
    "cargo_id": 87,
    "descripcion": "Puesto Literatura (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 86,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-88",
    "puesto_id": 88,
    "cargoId": "cargo-88",
    "cargo_id": 88,
    "descripcion": "Puesto Matemática (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-289",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 87,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-89",
    "puesto_id": 89,
    "cargoId": "cargo-89",
    "cargo_id": 89,
    "descripcion": "Puesto Música (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-403",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 88,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-90",
    "puesto_id": 90,
    "cargoId": "cargo-90",
    "cargo_id": 90,
    "descripcion": "Puesto Teatro (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-85",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 89,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-91",
    "puesto_id": 91,
    "cargoId": "cargo-91",
    "cargo_id": 91,
    "descripcion": "Puesto Artes Visuales (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-36",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 90,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-92",
    "puesto_id": 92,
    "cargoId": "cargo-92",
    "cargo_id": 92,
    "descripcion": "Puesto Biología (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-25",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 91,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-93",
    "puesto_id": 93,
    "cargoId": "cargo-93",
    "cargo_id": 93,
    "descripcion": "Puesto Construcción de Ciudadanías (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-448",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 92,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-94",
    "puesto_id": 94,
    "cargoId": "cargo-94",
    "cargo_id": 94,
    "descripcion": "Puesto Danza (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-485",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 93,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-95",
    "puesto_id": 95,
    "cargoId": "cargo-95",
    "cargo_id": 95,
    "descripcion": "Puesto Economía (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-303",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 94,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-96",
    "puesto_id": 96,
    "cargoId": "cargo-96",
    "cargo_id": 96,
    "descripcion": "Puesto Educación Física Integral (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-28",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 95,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-97",
    "puesto_id": 97,
    "cargoId": "cargo-97",
    "cargo_id": 97,
    "descripcion": "Puesto Educación Sexual Integral (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-25",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 96,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-98",
    "puesto_id": 98,
    "cargoId": "cargo-98",
    "cargo_id": 98,
    "descripcion": "Puesto Filosofía (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 97,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-99",
    "puesto_id": 99,
    "cargoId": "cargo-99",
    "cargo_id": 99,
    "descripcion": "Puesto Físico Química (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-301",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 98,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-100",
    "puesto_id": 100,
    "cargoId": "cargo-100",
    "cargo_id": 100,
    "descripcion": "Puesto Geografía (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-410",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 99,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-101",
    "puesto_id": 101,
    "cargoId": "cargo-101",
    "cargo_id": 101,
    "descripcion": "Puesto Historia (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 100,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-102",
    "puesto_id": 102,
    "cargoId": "cargo-102",
    "cargo_id": 102,
    "descripcion": "Puesto Informática (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-506",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 101,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-103",
    "puesto_id": 103,
    "cargoId": "cargo-103",
    "cargo_id": 103,
    "descripcion": "Puesto Integración Tecnológica (2° Div. A)",
    "agentesAsignados": [],
    "activo": true,
    "csvIndex": 102,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-104",
    "puesto_id": 104,
    "cargoId": "cargo-104",
    "cargo_id": 104,
    "descripcion": "Puesto Lengua (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 103,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-105",
    "puesto_id": 105,
    "cargoId": "cargo-105",
    "cargo_id": 105,
    "descripcion": "Puesto Lenguas Otras (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-44",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 104,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-106",
    "puesto_id": 106,
    "cargoId": "cargo-106",
    "cargo_id": 106,
    "descripcion": "Puesto Literatura (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 105,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-107",
    "puesto_id": 107,
    "cargoId": "cargo-107",
    "cargo_id": 107,
    "descripcion": "Puesto Matemática (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-192",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 106,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-108",
    "puesto_id": 108,
    "cargoId": "cargo-108",
    "cargo_id": 108,
    "descripcion": "Puesto Música (2° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-96",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 107,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-109",
    "puesto_id": 109,
    "cargoId": "cargo-109",
    "cargo_id": 109,
    "descripcion": "Puesto Artes Visuales (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-286",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 108,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-110",
    "puesto_id": 110,
    "cargoId": "cargo-110",
    "cargo_id": 110,
    "descripcion": "Puesto Biología (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-10",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 109,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-111",
    "puesto_id": 111,
    "cargoId": "cargo-111",
    "cargo_id": 111,
    "descripcion": "Puesto Construcción de Ciudadanías (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-122",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 110,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-112",
    "puesto_id": 112,
    "cargoId": "cargo-112",
    "cargo_id": 112,
    "descripcion": "Puesto Danza (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-260",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 111,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-113",
    "puesto_id": 113,
    "cargoId": "cargo-113",
    "cargo_id": 113,
    "descripcion": "Puesto Economía (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-293",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 112,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-114",
    "puesto_id": 114,
    "cargoId": "cargo-114",
    "cargo_id": 114,
    "descripcion": "Puesto Educación Física Integral (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-29",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 113,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-115",
    "puesto_id": 115,
    "cargoId": "cargo-115",
    "cargo_id": 115,
    "descripcion": "Puesto Educación Sexual Integral (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-25",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 114,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-116",
    "puesto_id": 116,
    "cargoId": "cargo-116",
    "cargo_id": 116,
    "descripcion": "Puesto Filosofía (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-238",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 115,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-117",
    "puesto_id": 117,
    "cargoId": "cargo-117",
    "cargo_id": 117,
    "descripcion": "Puesto Físico Química (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 116,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-118",
    "puesto_id": 118,
    "cargoId": "cargo-118",
    "cargo_id": 118,
    "descripcion": "Puesto Geografía (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-13",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 117,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-119",
    "puesto_id": 119,
    "cargoId": "cargo-119",
    "cargo_id": 119,
    "descripcion": "Puesto Historia (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-463",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 118,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-120",
    "puesto_id": 120,
    "cargoId": "cargo-120",
    "cargo_id": 120,
    "descripcion": "Puesto Informática (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-504",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 119,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-121",
    "puesto_id": 121,
    "cargoId": "cargo-121",
    "cargo_id": 121,
    "descripcion": "Puesto Integración Tecnológica (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-392",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 120,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-122",
    "puesto_id": 122,
    "cargoId": "cargo-122",
    "cargo_id": 122,
    "descripcion": "Puesto Lengua (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 121,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-123",
    "puesto_id": 123,
    "cargoId": "cargo-123",
    "cargo_id": 123,
    "descripcion": "Puesto Lenguas Otras (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-44",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 122,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-124",
    "puesto_id": 124,
    "cargoId": "cargo-124",
    "cargo_id": 124,
    "descripcion": "Puesto Literatura (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 123,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-125",
    "puesto_id": 125,
    "cargoId": "cargo-125",
    "cargo_id": 125,
    "descripcion": "Puesto Matemática (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-289",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 124,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-126",
    "puesto_id": 126,
    "cargoId": "cargo-126",
    "cargo_id": 126,
    "descripcion": "Puesto Música (2° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-96",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 125,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-127",
    "puesto_id": 127,
    "cargoId": "cargo-127",
    "cargo_id": 127,
    "descripcion": "Puesto Artes Visuales (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-36",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 126,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-128",
    "puesto_id": 128,
    "cargoId": "cargo-128",
    "cargo_id": 128,
    "descripcion": "Puesto Biología (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-71",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 127,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-129",
    "puesto_id": 129,
    "cargoId": "cargo-129",
    "cargo_id": 129,
    "descripcion": "Puesto Construcción de Ciudadanías (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-241",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 128,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-130",
    "puesto_id": 130,
    "cargoId": "cargo-130",
    "cargo_id": 130,
    "descripcion": "Puesto Danza (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 129,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-131",
    "puesto_id": 131,
    "cargoId": "cargo-131",
    "cargo_id": 131,
    "descripcion": "Puesto Economía (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-92",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 130,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-132",
    "puesto_id": 132,
    "cargoId": "cargo-132",
    "cargo_id": 132,
    "descripcion": "Puesto Educación Física Integral (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-109",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 131,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-133",
    "puesto_id": 133,
    "cargoId": "cargo-133",
    "cargo_id": 133,
    "descripcion": "Puesto Educación Sexual Integral (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-69",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 132,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-134",
    "puesto_id": 134,
    "cargoId": "cargo-134",
    "cargo_id": 134,
    "descripcion": "Puesto Filosofía (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-408",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 133,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-135",
    "puesto_id": 135,
    "cargoId": "cargo-135",
    "cargo_id": 135,
    "descripcion": "Puesto Físico Química (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-496",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 134,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-136",
    "puesto_id": 136,
    "cargoId": "cargo-136",
    "cargo_id": 136,
    "descripcion": "Puesto Geografía (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-13",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 135,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-137",
    "puesto_id": 137,
    "cargoId": "cargo-137",
    "cargo_id": 137,
    "descripcion": "Puesto Historia (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 136,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-138",
    "puesto_id": 138,
    "cargoId": "cargo-138",
    "cargo_id": 138,
    "descripcion": "Puesto Informática (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-316",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 137,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-139",
    "puesto_id": 139,
    "cargoId": "cargo-139",
    "cargo_id": 139,
    "descripcion": "Puesto Integración Tecnológica (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-384",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 138,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-140",
    "puesto_id": 140,
    "cargoId": "cargo-140",
    "cargo_id": 140,
    "descripcion": "Puesto Lengua (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 139,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-141",
    "puesto_id": 141,
    "cargoId": "cargo-141",
    "cargo_id": 141,
    "descripcion": "Puesto Lenguas Otras (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-44",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 140,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-142",
    "puesto_id": 142,
    "cargoId": "cargo-142",
    "cargo_id": 142,
    "descripcion": "Puesto Literatura (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 141,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-143",
    "puesto_id": 143,
    "cargoId": "cargo-143",
    "cargo_id": 143,
    "descripcion": "Puesto Matemática (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-349",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 142,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-144",
    "puesto_id": 144,
    "cargoId": "cargo-144",
    "cargo_id": 144,
    "descripcion": "Puesto Música (2° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-37",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 143,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-145",
    "puesto_id": 145,
    "cargoId": "cargo-145",
    "cargo_id": 145,
    "descripcion": "Puesto Artes Visuales (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-90",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 144,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-146",
    "puesto_id": 146,
    "cargoId": "cargo-146",
    "cargo_id": 146,
    "descripcion": "Puesto Biología (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-119",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 145,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-147",
    "puesto_id": 147,
    "cargoId": "cargo-147",
    "cargo_id": 147,
    "descripcion": "Puesto Construcción de Ciudadanías (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-241",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 146,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-148",
    "puesto_id": 148,
    "cargoId": "cargo-148",
    "cargo_id": 148,
    "descripcion": "Puesto Danza (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 147,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-149",
    "puesto_id": 149,
    "cargoId": "cargo-149",
    "cargo_id": 149,
    "descripcion": "Puesto Economía (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-303",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 148,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-150",
    "puesto_id": 150,
    "cargoId": "cargo-150",
    "cargo_id": 150,
    "descripcion": "Puesto Educación Física Integral (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-64",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 149,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-151",
    "puesto_id": 151,
    "cargoId": "cargo-151",
    "cargo_id": 151,
    "descripcion": "Puesto Educación Sexual Integral (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-69",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 150,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-152",
    "puesto_id": 152,
    "cargoId": "cargo-152",
    "cargo_id": 152,
    "descripcion": "Puesto Filosofía (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-396",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 151,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-153",
    "puesto_id": 153,
    "cargoId": "cargo-153",
    "cargo_id": 153,
    "descripcion": "Puesto Físico Química (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 152,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-154",
    "puesto_id": 154,
    "cargoId": "cargo-154",
    "cargo_id": 154,
    "descripcion": "Puesto Geografía (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-13",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 153,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-155",
    "puesto_id": 155,
    "cargoId": "cargo-155",
    "cargo_id": 155,
    "descripcion": "Puesto Historia (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-486",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 154,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-156",
    "puesto_id": 156,
    "cargoId": "cargo-156",
    "cargo_id": 156,
    "descripcion": "Puesto Informática (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-242",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 155,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-157",
    "puesto_id": 157,
    "cargoId": "cargo-157",
    "cargo_id": 157,
    "descripcion": "Puesto Integración Tecnológica (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-447",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 156,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-158",
    "puesto_id": 158,
    "cargoId": "cargo-158",
    "cargo_id": 158,
    "descripcion": "Puesto Lengua (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-312",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 157,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-159",
    "puesto_id": 159,
    "cargoId": "cargo-159",
    "cargo_id": 159,
    "descripcion": "Puesto Lenguas Otras (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-247",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 158,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-160",
    "puesto_id": 160,
    "cargoId": "cargo-160",
    "cargo_id": 160,
    "descripcion": "Puesto Literatura (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-312",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 159,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-161",
    "puesto_id": 161,
    "cargoId": "cargo-161",
    "cargo_id": 161,
    "descripcion": "Puesto Matemática (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 160,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-162",
    "puesto_id": 162,
    "cargoId": "cargo-162",
    "cargo_id": 162,
    "descripcion": "Puesto Música (2° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-191",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 161,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-163",
    "puesto_id": 163,
    "cargoId": "cargo-163",
    "cargo_id": 163,
    "descripcion": "Puesto Artes Visuales (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-36",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "Jefatura de Departamento",
        "notaEspecial": "Jefatura de Departamento"
      }
    ],
    "activo": true,
    "csvIndex": 162,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-164",
    "puesto_id": 164,
    "cargoId": "cargo-164",
    "cargo_id": 164,
    "descripcion": "Puesto Biología (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-79",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 163,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-165",
    "puesto_id": 165,
    "cargoId": "cargo-165",
    "cargo_id": 165,
    "descripcion": "Puesto Construcción de Ciudadanías (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-241",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 164,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-166",
    "puesto_id": 166,
    "cargoId": "cargo-166",
    "cargo_id": 166,
    "descripcion": "Puesto Danza (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 165,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-167",
    "puesto_id": 167,
    "cargoId": "cargo-167",
    "cargo_id": 167,
    "descripcion": "Puesto Economía (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-92",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 166,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-168",
    "puesto_id": 168,
    "cargoId": "cargo-168",
    "cargo_id": 168,
    "descripcion": "Puesto Educación Física Integral (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-297",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 167,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-169",
    "puesto_id": 169,
    "cargoId": "cargo-169",
    "cargo_id": 169,
    "descripcion": "Puesto Educación Sexual Integral (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-25",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 168,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-170",
    "puesto_id": 170,
    "cargoId": "cargo-170",
    "cargo_id": 170,
    "descripcion": "Puesto Filosofía (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 169,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-171",
    "puesto_id": 171,
    "cargoId": "cargo-171",
    "cargo_id": 171,
    "descripcion": "Puesto Físico Química (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-275",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 170,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-172",
    "puesto_id": 172,
    "cargoId": "cargo-172",
    "cargo_id": 172,
    "descripcion": "Puesto Geografía (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-431",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 171,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-173",
    "puesto_id": 173,
    "cargoId": "cargo-173",
    "cargo_id": 173,
    "descripcion": "Puesto Historia (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-486",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 172,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-174",
    "puesto_id": 174,
    "cargoId": "cargo-174",
    "cargo_id": 174,
    "descripcion": "Puesto Informática (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-200",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 173,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-175",
    "puesto_id": 175,
    "cargoId": "cargo-175",
    "cargo_id": 175,
    "descripcion": "Puesto Integración Tecnológica (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-392",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 174,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-176",
    "puesto_id": 176,
    "cargoId": "cargo-176",
    "cargo_id": 176,
    "descripcion": "Puesto Lengua (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-331",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 175,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-177",
    "puesto_id": 177,
    "cargoId": "cargo-177",
    "cargo_id": 177,
    "descripcion": "Puesto Lenguas Otras (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-421",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 176,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-178",
    "puesto_id": 178,
    "cargoId": "cargo-178",
    "cargo_id": 178,
    "descripcion": "Puesto Literatura (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-331",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 177,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-179",
    "puesto_id": 179,
    "cargoId": "cargo-179",
    "cargo_id": 179,
    "descripcion": "Puesto Matemática (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-289",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 178,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-180",
    "puesto_id": 180,
    "cargoId": "cargo-180",
    "cargo_id": 180,
    "descripcion": "Puesto Música (2° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-110",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 179,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-181",
    "puesto_id": 181,
    "cargoId": "cargo-181",
    "cargo_id": 181,
    "descripcion": "Puesto Artes Visuales (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-36",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 180,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-182",
    "puesto_id": 182,
    "cargoId": "cargo-182",
    "cargo_id": 182,
    "descripcion": "Puesto Biología (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-10",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 181,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-183",
    "puesto_id": 183,
    "cargoId": "cargo-183",
    "cargo_id": 183,
    "descripcion": "Puesto Comunicación y Medios (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-176",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 182,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-184",
    "puesto_id": 184,
    "cargoId": "cargo-184",
    "cargo_id": 184,
    "descripcion": "Puesto Construcción de Ciudadanías (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 183,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-185",
    "puesto_id": 185,
    "cargoId": "cargo-185",
    "cargo_id": 185,
    "descripcion": "Puesto Economía (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-35",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 184,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-186",
    "puesto_id": 186,
    "cargoId": "cargo-186",
    "cargo_id": 186,
    "descripcion": "Puesto Educación Física Integral (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-28",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 185,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-187",
    "puesto_id": 187,
    "cargoId": "cargo-187",
    "cargo_id": 187,
    "descripcion": "Puesto Física (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 186,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-188",
    "puesto_id": 188,
    "cargoId": "cargo-188",
    "cargo_id": 188,
    "descripcion": "Puesto Geografía (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-139",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 187,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-189",
    "puesto_id": 189,
    "cargoId": "cargo-189",
    "cargo_id": 189,
    "descripcion": "Puesto Historia (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-164",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 188,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-190",
    "puesto_id": 190,
    "cargoId": "cargo-190",
    "cargo_id": 190,
    "descripcion": "Puesto Informática (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-62",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 189,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-191",
    "puesto_id": 191,
    "cargoId": "cargo-191",
    "cargo_id": 191,
    "descripcion": "Puesto Integración Tecnológica (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-136",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 190,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-192",
    "puesto_id": 192,
    "cargoId": "cargo-192",
    "cargo_id": 192,
    "descripcion": "Puesto Investigación de las Orientaciones (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 191,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-193",
    "puesto_id": 193,
    "cargoId": "cargo-193",
    "cargo_id": 193,
    "descripcion": "Puesto Lengua (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 192,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-194",
    "puesto_id": 194,
    "cargoId": "cargo-194",
    "cargo_id": 194,
    "descripcion": "Puesto Lenguas Otras (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-70",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 193,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-195",
    "puesto_id": 195,
    "cargoId": "cargo-195",
    "cargo_id": 195,
    "descripcion": "Puesto Lenguas Preexistentes (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-172",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 194,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-196",
    "puesto_id": 196,
    "cargoId": "cargo-196",
    "cargo_id": 196,
    "descripcion": "Puesto Literatura (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 195,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-197",
    "puesto_id": 197,
    "cargoId": "cargo-197",
    "cargo_id": 197,
    "descripcion": "Puesto Matemática (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-289",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 196,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-198",
    "puesto_id": 198,
    "cargoId": "cargo-198",
    "cargo_id": 198,
    "descripcion": "Puesto Química (3° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 197,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-199",
    "puesto_id": 199,
    "cargoId": "cargo-199",
    "cargo_id": 199,
    "descripcion": "Puesto Artes Visuales (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-36",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "Jefatura de Departamento",
        "notaEspecial": "Jefatura de Departamento"
      }
    ],
    "activo": true,
    "csvIndex": 198,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-200",
    "puesto_id": 200,
    "cargoId": "cargo-200",
    "cargo_id": 200,
    "descripcion": "Puesto Biología (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-25",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 199,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-201",
    "puesto_id": 201,
    "cargoId": "cargo-201",
    "cargo_id": 201,
    "descripcion": "Puesto Comunicación y Medios (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-176",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 200,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-202",
    "puesto_id": 202,
    "cargoId": "cargo-202",
    "cargo_id": 202,
    "descripcion": "Puesto Construcción de Ciudadanías (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-116",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 201,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-203",
    "puesto_id": 203,
    "cargoId": "cargo-203",
    "cargo_id": 203,
    "descripcion": "Puesto Economía (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-35",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 202,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-204",
    "puesto_id": 204,
    "cargoId": "cargo-204",
    "cargo_id": 204,
    "descripcion": "Puesto Educación Física Integral (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-322",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 203,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-205",
    "puesto_id": 205,
    "cargoId": "cargo-205",
    "cargo_id": 205,
    "descripcion": "Puesto Educación Práctica - Taller II (3° Div. B)",
    "agentesAsignados": [],
    "activo": true,
    "csvIndex": 204,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-206",
    "puesto_id": 206,
    "cargoId": "cargo-206",
    "cargo_id": 206,
    "descripcion": "Puesto Física (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 205,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-207",
    "puesto_id": 207,
    "cargoId": "cargo-207",
    "cargo_id": 207,
    "descripcion": "Puesto Geografía (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-410",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 206,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-208",
    "puesto_id": 208,
    "cargoId": "cargo-208",
    "cargo_id": 208,
    "descripcion": "Puesto Historia (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 207,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-209",
    "puesto_id": 209,
    "cargoId": "cargo-209",
    "cargo_id": 209,
    "descripcion": "Puesto Informática (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-506",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 208,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-210",
    "puesto_id": 210,
    "cargoId": "cargo-210",
    "cargo_id": 210,
    "descripcion": "Puesto Integración Tecnológica (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-136",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 209,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-211",
    "puesto_id": 211,
    "cargoId": "cargo-211",
    "cargo_id": 211,
    "descripcion": "Puesto Investigación de las Orientaciones (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 210,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-212",
    "puesto_id": 212,
    "cargoId": "cargo-212",
    "cargo_id": 212,
    "descripcion": "Puesto Lengua (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-409",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 211,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-213",
    "puesto_id": 213,
    "cargoId": "cargo-213",
    "cargo_id": 213,
    "descripcion": "Puesto Lenguas Otras (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-70",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 212,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-214",
    "puesto_id": 214,
    "cargoId": "cargo-214",
    "cargo_id": 214,
    "descripcion": "Puesto Lenguas Preexistentes (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-87",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 213,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-215",
    "puesto_id": 215,
    "cargoId": "cargo-215",
    "cargo_id": 215,
    "descripcion": "Puesto Literatura (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-409",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 214,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-216",
    "puesto_id": 216,
    "cargoId": "cargo-216",
    "cargo_id": 216,
    "descripcion": "Puesto Matemática (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-358",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 215,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-217",
    "puesto_id": 217,
    "cargoId": "cargo-217",
    "cargo_id": 217,
    "descripcion": "Puesto Química (3° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 216,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-218",
    "puesto_id": 218,
    "cargoId": "cargo-218",
    "cargo_id": 218,
    "descripcion": "Puesto Artes Visuales (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-36",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 217,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-219",
    "puesto_id": 219,
    "cargoId": "cargo-219",
    "cargo_id": 219,
    "descripcion": "Puesto Biología (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-285",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 218,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-220",
    "puesto_id": 220,
    "cargoId": "cargo-220",
    "cargo_id": 220,
    "descripcion": "Puesto Comunicación y Medios (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-117",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 219,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-221",
    "puesto_id": 221,
    "cargoId": "cargo-221",
    "cargo_id": 221,
    "descripcion": "Puesto Construcción de Ciudadanías (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-448",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 220,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-222",
    "puesto_id": 222,
    "cargoId": "cargo-222",
    "cargo_id": 222,
    "descripcion": "Puesto Economía (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-53",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 221,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-223",
    "puesto_id": 223,
    "cargoId": "cargo-223",
    "cargo_id": 223,
    "descripcion": "Puesto Educación Física Integral (3° Div. C)",
    "agentesAsignados": [],
    "activo": true,
    "csvIndex": 222,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-224",
    "puesto_id": 224,
    "cargoId": "cargo-224",
    "cargo_id": 224,
    "descripcion": "Puesto Física (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-360",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 223,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-225",
    "puesto_id": 225,
    "cargoId": "cargo-225",
    "cargo_id": 225,
    "descripcion": "Puesto Geografía (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-139",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 224,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-226",
    "puesto_id": 226,
    "cargoId": "cargo-226",
    "cargo_id": 226,
    "descripcion": "Puesto Historia (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-202",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 225,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-227",
    "puesto_id": 227,
    "cargoId": "cargo-227",
    "cargo_id": 227,
    "descripcion": "Puesto Informática (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-62",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 226,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-228",
    "puesto_id": 228,
    "cargoId": "cargo-228",
    "cargo_id": 228,
    "descripcion": "Puesto Integración Tecnológica (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-500",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 227,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-229",
    "puesto_id": 229,
    "cargoId": "cargo-229",
    "cargo_id": 229,
    "descripcion": "Puesto Investigación de las Orientaciones (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 228,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-230",
    "puesto_id": 230,
    "cargoId": "cargo-230",
    "cargo_id": 230,
    "descripcion": "Puesto Lengua (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 229,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-231",
    "puesto_id": 231,
    "cargoId": "cargo-231",
    "cargo_id": 231,
    "descripcion": "Puesto Lenguas Otras (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-49",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 230,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-232",
    "puesto_id": 232,
    "cargoId": "cargo-232",
    "cargo_id": 232,
    "descripcion": "Puesto Lenguas Preexistentes (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-157",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 231,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-233",
    "puesto_id": 233,
    "cargoId": "cargo-233",
    "cargo_id": 233,
    "descripcion": "Puesto Literatura (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-189",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 232,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-234",
    "puesto_id": 234,
    "cargoId": "cargo-234",
    "cargo_id": 234,
    "descripcion": "Puesto Matemática (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-223",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 233,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-235",
    "puesto_id": 235,
    "cargoId": "cargo-235",
    "cargo_id": 235,
    "descripcion": "Puesto Química (3° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-307",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 234,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-236",
    "puesto_id": 236,
    "cargoId": "cargo-236",
    "cargo_id": 236,
    "descripcion": "Puesto Artes Visuales (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-287",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 235,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-237",
    "puesto_id": 237,
    "cargoId": "cargo-237",
    "cargo_id": 237,
    "descripcion": "Puesto Biología (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-10",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 236,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-238",
    "puesto_id": 238,
    "cargoId": "cargo-238",
    "cargo_id": 238,
    "descripcion": "Puesto Comunicación y Medios (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-111",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 237,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-239",
    "puesto_id": 239,
    "cargoId": "cargo-239",
    "cargo_id": 239,
    "descripcion": "Puesto Construcción de Ciudadanías (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-486",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 238,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-240",
    "puesto_id": 240,
    "cargoId": "cargo-240",
    "cargo_id": 240,
    "descripcion": "Puesto Economía (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-53",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 239,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-241",
    "puesto_id": 241,
    "cargoId": "cargo-241",
    "cargo_id": 241,
    "descripcion": "Puesto Educación Física Integral (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-457",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 240,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-242",
    "puesto_id": 242,
    "cargoId": "cargo-242",
    "cargo_id": 242,
    "descripcion": "Puesto Física (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 241,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-243",
    "puesto_id": 243,
    "cargoId": "cargo-243",
    "cargo_id": 243,
    "descripcion": "Puesto Geografía (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-410",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 242,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-244",
    "puesto_id": 244,
    "cargoId": "cargo-244",
    "cargo_id": 244,
    "descripcion": "Puesto Historia (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-141",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 243,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-245",
    "puesto_id": 245,
    "cargoId": "cargo-245",
    "cargo_id": 245,
    "descripcion": "Puesto Informática (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-506",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 244,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-246",
    "puesto_id": 246,
    "cargoId": "cargo-246",
    "cargo_id": 246,
    "descripcion": "Puesto Integración Tecnológica (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-392",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 245,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-247",
    "puesto_id": 247,
    "cargoId": "cargo-247",
    "cargo_id": 247,
    "descripcion": "Puesto Investigación de las Orientaciones (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 246,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-248",
    "puesto_id": 248,
    "cargoId": "cargo-248",
    "cargo_id": 248,
    "descripcion": "Puesto Lengua (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-312",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 247,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-249",
    "puesto_id": 249,
    "cargoId": "cargo-249",
    "cargo_id": 249,
    "descripcion": "Puesto Lenguas Otras (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-247",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 248,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-250",
    "puesto_id": 250,
    "cargoId": "cargo-250",
    "cargo_id": 250,
    "descripcion": "Puesto Lenguas Preexistentes (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-157",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 249,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-251",
    "puesto_id": 251,
    "cargoId": "cargo-251",
    "cargo_id": 251,
    "descripcion": "Puesto Literatura (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-312",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 250,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-252",
    "puesto_id": 252,
    "cargoId": "cargo-252",
    "cargo_id": 252,
    "descripcion": "Puesto Matemática (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 251,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-253",
    "puesto_id": 253,
    "cargoId": "cargo-253",
    "cargo_id": 253,
    "descripcion": "Puesto Química (3° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 252,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-254",
    "puesto_id": 254,
    "cargoId": "cargo-254",
    "cargo_id": 254,
    "descripcion": "Puesto Arte (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-17",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 253,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-255",
    "puesto_id": 255,
    "cargoId": "cargo-255",
    "cargo_id": 255,
    "descripcion": "Puesto Ciencias Biológicas (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-121",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 254,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-256",
    "puesto_id": 256,
    "cargoId": "cargo-256",
    "cargo_id": 256,
    "descripcion": "Puesto Economías (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 255,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-257",
    "puesto_id": 257,
    "cargoId": "cargo-257",
    "cargo_id": 257,
    "descripcion": "Puesto Educación Física Integral (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-109",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 256,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-258",
    "puesto_id": 258,
    "cargoId": "cargo-258",
    "cargo_id": 258,
    "descripcion": "Puesto Estado, Políticas Y Legislaciones (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-281",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 257,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-259",
    "puesto_id": 259,
    "cargoId": "cargo-259",
    "cargo_id": 259,
    "descripcion": "Puesto Física (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 258,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-260",
    "puesto_id": 260,
    "cargoId": "cargo-260",
    "cargo_id": 260,
    "descripcion": "Puesto Geografía (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-139",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 259,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-261",
    "puesto_id": 261,
    "cargoId": "cargo-261",
    "cargo_id": 261,
    "descripcion": "Puesto Historia (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-202",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 260,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-262",
    "puesto_id": 262,
    "cargoId": "cargo-262",
    "cargo_id": 262,
    "descripcion": "Puesto Informática (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-500",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 261,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-263",
    "puesto_id": 263,
    "cargoId": "cargo-263",
    "cargo_id": 263,
    "descripcion": "Puesto Integración Curricular: Análisis Y Evaluación De Proyectos (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-471",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 262,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-264",
    "puesto_id": 264,
    "cargoId": "cargo-264",
    "cargo_id": 264,
    "descripcion": "Puesto Lengua Y Literatura (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 263,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-265",
    "puesto_id": 265,
    "cargoId": "cargo-265",
    "cargo_id": 265,
    "descripcion": "Puesto Lenguas Otras (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-44",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 264,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-266",
    "puesto_id": 266,
    "cargoId": "cargo-266",
    "cargo_id": 266,
    "descripcion": "Puesto Matemática (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-289",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 265,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-267",
    "puesto_id": 267,
    "cargoId": "cargo-267",
    "cargo_id": 267,
    "descripcion": "Puesto Organizaciones Y Administraciones (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-293",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 266,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-268",
    "puesto_id": 268,
    "cargoId": "cargo-268",
    "cargo_id": 268,
    "descripcion": "Puesto Química (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-234",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 267,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-269",
    "puesto_id": 269,
    "cargoId": "cargo-269",
    "cargo_id": 269,
    "descripcion": "Puesto Sistemas De Información Contable (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-53",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 268,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-270",
    "puesto_id": 270,
    "cargoId": "cargo-270",
    "cargo_id": 270,
    "descripcion": "Puesto Sociedades, Políticas Y Subjetividades (4° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-130",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 269,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-271",
    "puesto_id": 271,
    "cargoId": "cargo-271",
    "cargo_id": 271,
    "descripcion": "Puesto Arte (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-80",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 270,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-272",
    "puesto_id": 272,
    "cargoId": "cargo-272",
    "cargo_id": 272,
    "descripcion": "Puesto Ciencias Biológicas (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-107",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 271,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-273",
    "puesto_id": 273,
    "cargoId": "cargo-273",
    "cargo_id": 273,
    "descripcion": "Puesto Educación Física Integral (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-28",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 272,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-274",
    "puesto_id": 274,
    "cargoId": "cargo-274",
    "cargo_id": 274,
    "descripcion": "Puesto Filosofía De La Educacion (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 273,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-275",
    "puesto_id": 275,
    "cargoId": "cargo-275",
    "cargo_id": 275,
    "descripcion": "Puesto Física (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-275",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 274,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-276",
    "puesto_id": 276,
    "cargoId": "cargo-276",
    "cargo_id": 276,
    "descripcion": "Puesto Geografía (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-343",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 275,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-277",
    "puesto_id": 277,
    "cargoId": "cargo-277",
    "cargo_id": 277,
    "descripcion": "Puesto Historia (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-326",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 276,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-278",
    "puesto_id": 278,
    "cargoId": "cargo-278",
    "cargo_id": 278,
    "descripcion": "Puesto Informática (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-468",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 277,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-279",
    "puesto_id": 279,
    "cargoId": "cargo-279",
    "cargo_id": 279,
    "descripcion": "Puesto Integración Curricular: Proyectos Educativos Sociocomunitarios (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-498",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 278,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-280",
    "puesto_id": 280,
    "cargoId": "cargo-280",
    "cargo_id": 280,
    "descripcion": "Puesto Introducción A Las Pedagogías (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-19",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 279,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-281",
    "puesto_id": 281,
    "cargoId": "cargo-281",
    "cargo_id": 281,
    "descripcion": "Puesto Introducción A Las Problemáticas Educativas (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-476",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 280,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-282",
    "puesto_id": 282,
    "cargoId": "cargo-282",
    "cargo_id": 282,
    "descripcion": "Puesto Introducción A Las Teorías De Las Enseñanzas  Y De Los Aprendizajes (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-140",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 281,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-283",
    "puesto_id": 283,
    "cargoId": "cargo-283",
    "cargo_id": 283,
    "descripcion": "Puesto Lengua Y Literatura (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-148",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 282,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-284",
    "puesto_id": 284,
    "cargoId": "cargo-284",
    "cargo_id": 284,
    "descripcion": "Puesto Lenguas Otras (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-425",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 283,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-285",
    "puesto_id": 285,
    "cargoId": "cargo-285",
    "cargo_id": 285,
    "descripcion": "Puesto Matemática (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-358",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 284,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-286",
    "puesto_id": 286,
    "cargoId": "cargo-286",
    "cargo_id": 286,
    "descripcion": "Puesto Sociedades, Políticas Y Subjetividades (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 285,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-287",
    "puesto_id": 287,
    "cargoId": "cargo-287",
    "cargo_id": 287,
    "descripcion": "Puesto Sujetos Y Construcción De Subjetividades (4° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-42",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 286,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-288",
    "puesto_id": 288,
    "cargoId": "cargo-288",
    "cargo_id": 288,
    "descripcion": "Puesto Arte (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-199",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 287,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-289",
    "puesto_id": 289,
    "cargoId": "cargo-289",
    "cargo_id": 289,
    "descripcion": "Puesto Ciencias Biológicas (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-1",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 288,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-290",
    "puesto_id": 290,
    "cargoId": "cargo-290",
    "cargo_id": 290,
    "descripcion": "Puesto Educación Física Integral (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-109",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 289,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-291",
    "puesto_id": 291,
    "cargoId": "cargo-291",
    "cargo_id": 291,
    "descripcion": "Puesto Filosofía De La Educacion (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-238",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 290,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-292",
    "puesto_id": 292,
    "cargoId": "cargo-292",
    "cargo_id": 292,
    "descripcion": "Puesto Física (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-165",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 291,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-293",
    "puesto_id": 293,
    "cargoId": "cargo-293",
    "cargo_id": 293,
    "descripcion": "Puesto Geografía (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-193",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 292,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-294",
    "puesto_id": 294,
    "cargoId": "cargo-294",
    "cargo_id": 294,
    "descripcion": "Puesto Historia (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-326",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 293,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-295",
    "puesto_id": 295,
    "cargoId": "cargo-295",
    "cargo_id": 295,
    "descripcion": "Puesto Informática (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-200",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 294,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-296",
    "puesto_id": 296,
    "cargoId": "cargo-296",
    "cargo_id": 296,
    "descripcion": "Puesto Integración Curricular: Proyectos Educativos Sociocomunitarios (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-476",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 295,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-297",
    "puesto_id": 297,
    "cargoId": "cargo-297",
    "cargo_id": 297,
    "descripcion": "Puesto Introducción A Las Pedagogías (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-19",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 296,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-298",
    "puesto_id": 298,
    "cargoId": "cargo-298",
    "cargo_id": 298,
    "descripcion": "Puesto Introducción A Las Problemáticas Educativas (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-476",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 297,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-299",
    "puesto_id": 299,
    "cargoId": "cargo-299",
    "cargo_id": 299,
    "descripcion": "Puesto Introducción A Las Teorías De Las Enseñanzas  Y De Los Aprendizajes (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-454",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 298,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-300",
    "puesto_id": 300,
    "cargoId": "cargo-300",
    "cargo_id": 300,
    "descripcion": "Puesto Lengua Y Literatura (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-95",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 299,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-301",
    "puesto_id": 301,
    "cargoId": "cargo-301",
    "cargo_id": 301,
    "descripcion": "Puesto Lenguas Otras (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-305",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 300,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-302",
    "puesto_id": 302,
    "cargoId": "cargo-302",
    "cargo_id": 302,
    "descripcion": "Puesto Matemática (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-289",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 301,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-303",
    "puesto_id": 303,
    "cargoId": "cargo-303",
    "cargo_id": 303,
    "descripcion": "Puesto Sociedades, Políticas Y Subjetividades (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 302,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-304",
    "puesto_id": 304,
    "cargoId": "cargo-304",
    "cargo_id": 304,
    "descripcion": "Puesto Sujetos Y Construcción De Subjetividades (4° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-42",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 303,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-305",
    "puesto_id": 305,
    "cargoId": "cargo-305",
    "cargo_id": 305,
    "descripcion": "Puesto Arte (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-90",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 304,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-306",
    "puesto_id": 306,
    "cargoId": "cargo-306",
    "cargo_id": 306,
    "descripcion": "Puesto Ciencias Biológicas (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-79",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 305,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-307",
    "puesto_id": 307,
    "cargoId": "cargo-307",
    "cargo_id": 307,
    "descripcion": "Puesto Economías (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-397",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 306,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-308",
    "puesto_id": 308,
    "cargoId": "cargo-308",
    "cargo_id": 308,
    "descripcion": "Puesto Educación Física Integral (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-297",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 307,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-309",
    "puesto_id": 309,
    "cargoId": "cargo-309",
    "cargo_id": 309,
    "descripcion": "Puesto Estado, Políticas Y Legislaciones (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-88",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 308,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-310",
    "puesto_id": 310,
    "cargoId": "cargo-310",
    "cargo_id": 310,
    "descripcion": "Puesto Física (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-266",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 309,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-311",
    "puesto_id": 311,
    "cargoId": "cargo-311",
    "cargo_id": 311,
    "descripcion": "Puesto Geografía (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-294",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 310,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-312",
    "puesto_id": 312,
    "cargoId": "cargo-312",
    "cargo_id": 312,
    "descripcion": "Puesto Historia (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-394",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 311,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-313",
    "puesto_id": 313,
    "cargoId": "cargo-313",
    "cargo_id": 313,
    "descripcion": "Puesto Informática (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-500",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 312,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-314",
    "puesto_id": 314,
    "cargoId": "cargo-314",
    "cargo_id": 314,
    "descripcion": "Puesto Integración Curricular: Análisis Y Evaluación De Proyectos (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 313,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-315",
    "puesto_id": 315,
    "cargoId": "cargo-315",
    "cargo_id": 315,
    "descripcion": "Puesto Lengua Y Literatura (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-312",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 314,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-316",
    "puesto_id": 316,
    "cargoId": "cargo-316",
    "cargo_id": 316,
    "descripcion": "Puesto Lenguas Otras (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-195",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 315,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-317",
    "puesto_id": 317,
    "cargoId": "cargo-317",
    "cargo_id": 317,
    "descripcion": "Puesto Matemática (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-378",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 316,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-318",
    "puesto_id": 318,
    "cargoId": "cargo-318",
    "cargo_id": 318,
    "descripcion": "Puesto Organizaciones Y Administraciones (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-282",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 317,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-319",
    "puesto_id": 319,
    "cargoId": "cargo-319",
    "cargo_id": 319,
    "descripcion": "Puesto Química (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-315",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 318,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-320",
    "puesto_id": 320,
    "cargoId": "cargo-320",
    "cargo_id": 320,
    "descripcion": "Puesto Sistemas De Información Contable (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 319,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-321",
    "puesto_id": 321,
    "cargoId": "cargo-321",
    "cargo_id": 321,
    "descripcion": "Puesto Sociedades, Políticas Y Subjetividades (4° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-238",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 320,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-322",
    "puesto_id": 322,
    "cargoId": "cargo-322",
    "cargo_id": 322,
    "descripcion": "Puesto Contabilidad (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-35",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 321,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-323",
    "puesto_id": 323,
    "cargoId": "cargo-323",
    "cargo_id": 323,
    "descripcion": "Puesto Derecho Administrativo (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-356",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 322,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-324",
    "puesto_id": 324,
    "cargoId": "cargo-324",
    "cargo_id": 324,
    "descripcion": "Puesto Derecho Comercial (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-5",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 323,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-325",
    "puesto_id": 325,
    "cargoId": "cargo-325",
    "cargo_id": 325,
    "descripcion": "Puesto Economía Politica (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-35",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 324,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-326",
    "puesto_id": 326,
    "cargoId": "cargo-326",
    "cargo_id": 326,
    "descripcion": "Puesto Educación Física (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-109",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 325,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-327",
    "puesto_id": 327,
    "cargoId": "cargo-327",
    "cargo_id": 327,
    "descripcion": "Puesto Geografía (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-139",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 326,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-328",
    "puesto_id": 328,
    "cargoId": "cargo-328",
    "cargo_id": 328,
    "descripcion": "Puesto Inglés (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-425",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 327,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-329",
    "puesto_id": 329,
    "cargoId": "cargo-329",
    "cargo_id": 329,
    "descripcion": "Puesto Matemática Financiera (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-482",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 328,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-330",
    "puesto_id": 330,
    "cargoId": "cargo-330",
    "cargo_id": 330,
    "descripcion": "Puesto Merceología (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 329,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-331",
    "puesto_id": 331,
    "cargoId": "cargo-331",
    "cargo_id": 331,
    "descripcion": "Puesto Organización Del Comercio Y De La Empresas (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-54",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 330,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-332",
    "puesto_id": 332,
    "cargoId": "cargo-332",
    "cargo_id": 332,
    "descripcion": "Puesto Organizacion Y Procesamientos De La Informacion (5° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-500",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 331,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-333",
    "puesto_id": 333,
    "cargoId": "cargo-333",
    "cargo_id": 333,
    "descripcion": "Puesto Apreciación Musical (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-96",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 332,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-334",
    "puesto_id": 334,
    "cargoId": "cargo-334",
    "cargo_id": 334,
    "descripcion": "Puesto Educación Cívica (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 333,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-335",
    "puesto_id": 335,
    "cargoId": "cargo-335",
    "cargo_id": 335,
    "descripcion": "Puesto Educación Física (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-304",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 334,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-336",
    "puesto_id": 336,
    "cargoId": "cargo-336",
    "cargo_id": 336,
    "descripcion": "Puesto Geografía (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-410",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 335,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-337",
    "puesto_id": 337,
    "cargoId": "cargo-337",
    "cargo_id": 337,
    "descripcion": "Puesto Historia Social de la Educación (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-19",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 336,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-338",
    "puesto_id": 338,
    "cargoId": "cargo-338",
    "cargo_id": 338,
    "descripcion": "Puesto Inglés (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-247",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 337,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-339",
    "puesto_id": 339,
    "cargoId": "cargo-339",
    "cargo_id": 339,
    "descripcion": "Puesto Lengua (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-74",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 338,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-340",
    "puesto_id": 340,
    "cargoId": "cargo-340",
    "cargo_id": 340,
    "descripcion": "Puesto Lógica y Metodología de la Ciencia (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-476",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 339,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-341",
    "puesto_id": 341,
    "cargoId": "cargo-341",
    "cargo_id": 341,
    "descripcion": "Puesto Matemática (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-103",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 340,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-342",
    "puesto_id": 342,
    "cargoId": "cargo-342",
    "cargo_id": 342,
    "descripcion": "Puesto Psicología Educacional (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-404",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 341,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-343",
    "puesto_id": 343,
    "cargoId": "cargo-343",
    "cargo_id": 343,
    "descripcion": "Puesto Química (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 342,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-344",
    "puesto_id": 344,
    "cargoId": "cargo-344",
    "cargo_id": 344,
    "descripcion": "Puesto Apreciación Musical (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-403",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 343,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-345",
    "puesto_id": 345,
    "cargoId": "cargo-345",
    "cargo_id": 345,
    "descripcion": "Puesto Educación Cívica (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-187",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 344,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-346",
    "puesto_id": 346,
    "cargoId": "cargo-346",
    "cargo_id": 346,
    "descripcion": "Puesto Educación Física (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-64",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 345,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-347",
    "puesto_id": 347,
    "cargoId": "cargo-347",
    "cargo_id": 347,
    "descripcion": "Puesto Geografía (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-163",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 346,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-348",
    "puesto_id": 348,
    "cargoId": "cargo-348",
    "cargo_id": 348,
    "descripcion": "Puesto Historia Social de la Educación (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-19",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 347,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-349",
    "puesto_id": 349,
    "cargoId": "cargo-349",
    "cargo_id": 349,
    "descripcion": "Puesto Inglés (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-305",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 348,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-350",
    "puesto_id": 350,
    "cargoId": "cargo-350",
    "cargo_id": 350,
    "descripcion": "Puesto Lengua (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-312",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 349,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-351",
    "puesto_id": 351,
    "cargoId": "cargo-351",
    "cargo_id": 351,
    "descripcion": "Puesto Lógica y Metodología de la Ciencia (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-238",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 350,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-352",
    "puesto_id": 352,
    "cargoId": "cargo-352",
    "cargo_id": 352,
    "descripcion": "Puesto Matemática (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-349",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 351,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-353",
    "puesto_id": 353,
    "cargoId": "cargo-353",
    "cargo_id": 353,
    "descripcion": "Puesto Psicología Educacional (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-268",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 352,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-354",
    "puesto_id": 354,
    "cargoId": "cargo-354",
    "cargo_id": 354,
    "descripcion": "Puesto Química (5° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-233",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "Jefatura de Departamento",
        "notaEspecial": "Jefatura de Departamento"
      }
    ],
    "activo": true,
    "csvIndex": 353,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-355",
    "puesto_id": 355,
    "cargoId": "cargo-355",
    "cargo_id": 355,
    "descripcion": "Puesto Director Ens. Media/Técnica (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-53",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 354,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-356",
    "puesto_id": 356,
    "cargoId": "cargo-356",
    "cargo_id": 356,
    "descripcion": "Puesto Vicedirector Ens. Media /Técnica (1° Div. V)",
    "agentesAsignados": [
      {
        "agenteId": "ag-94",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 355,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-357",
    "puesto_id": 357,
    "cargoId": "cargo-357",
    "cargo_id": 357,
    "descripcion": "Puesto Vicedirector Ens. Media /Técnica (1° Div. V)",
    "agentesAsignados": [
      {
        "agenteId": "ag-425",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 356,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-358",
    "puesto_id": 358,
    "cargoId": "cargo-358",
    "cargo_id": 358,
    "descripcion": "Puesto Coord. de C. Orientado Campo Form. Esp. Bachiller Economía y Adm. (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 357,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-359",
    "puesto_id": 359,
    "cargoId": "cargo-359",
    "cargo_id": 359,
    "descripcion": "Puesto Coord. de C. Orientado Campo Form. Esp. Bachiller Educación (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-19",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 358,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-360",
    "puesto_id": 360,
    "cargoId": "cargo-360",
    "cargo_id": 360,
    "descripcion": "Puesto Coordinación de Área Ciencias Naturales (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-10",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 359,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-361",
    "puesto_id": 361,
    "cargoId": "cargo-361",
    "cargo_id": 361,
    "descripcion": "Puesto Coordinación de Área Ciencias Sociales, Políticas y Económicas (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-202",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 360,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-362",
    "puesto_id": 362,
    "cargoId": "cargo-362",
    "cargo_id": 362,
    "descripcion": "Puesto Coordinación de Área Lenguajes y Producción Cultural (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-36",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 361,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-363",
    "puesto_id": 363,
    "cargoId": "cargo-363",
    "cargo_id": 363,
    "descripcion": "Puesto Coordinación de Área Matemática e Informática (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-358",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 362,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-364",
    "puesto_id": 364,
    "cargoId": "cargo-364",
    "cargo_id": 364,
    "descripcion": "Puesto Coordinación de Espacios Interáreas (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-176",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 363,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-365",
    "puesto_id": 365,
    "cargoId": "cargo-365",
    "cargo_id": 365,
    "descripcion": "Puesto Jefe de Dpto Ed. Fisica N.Medio (8° Div. J)",
    "agentesAsignados": [
      {
        "agenteId": "ag-270",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 364,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-366",
    "puesto_id": 366,
    "cargoId": "cargo-366",
    "cargo_id": 366,
    "descripcion": "Puesto Jefe Dto Lengua Y Literatura (8° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 365,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-367",
    "puesto_id": 367,
    "cargoId": "cargo-367",
    "cargo_id": 367,
    "descripcion": "Puesto Equipo de Apoyo Situado (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-101",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 366,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-368",
    "puesto_id": 368,
    "cargoId": "cargo-368",
    "cargo_id": 368,
    "descripcion": "Puesto Equipo de Apoyo Situado (1° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-468",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 367,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-369",
    "puesto_id": 369,
    "cargoId": "cargo-369",
    "cargo_id": 369,
    "descripcion": "Puesto Equipo de Apoyo Situado (1° Div. C)",
    "agentesAsignados": [
      {
        "agenteId": "ag-164",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 368,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-370",
    "puesto_id": 370,
    "cargoId": "cargo-370",
    "cargo_id": 370,
    "descripcion": "Puesto Equipo de Apoyo Situado (1° Div. D)",
    "agentesAsignados": [
      {
        "agenteId": "ag-10",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 369,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-371",
    "puesto_id": 371,
    "cargoId": "cargo-371",
    "cargo_id": 371,
    "descripcion": "Puesto Equipo de Apoyo Pedagógico Permanente CO Bachiller Economia y Administracion (1° Div. E)",
    "agentesAsignados": [
      {
        "agenteId": "ag-63",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 370,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-372",
    "puesto_id": 372,
    "cargoId": "cargo-372",
    "cargo_id": 372,
    "descripcion": "Puesto Equipo de Apoyo Pedagógico Permanente CO Educación (1° Div. F)",
    "agentesAsignados": [
      {
        "agenteId": "ag-19",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 371,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-373",
    "puesto_id": 373,
    "cargoId": "cargo-373",
    "cargo_id": 373,
    "descripcion": "Puesto Asesor Pedagógico (2° AP)",
    "agentesAsignados": [
      {
        "agenteId": "ag-184",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 372,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-374",
    "puesto_id": 374,
    "cargoId": "cargo-374",
    "cargo_id": 374,
    "descripcion": "Puesto Asesor Pedagógico (5° AP)",
    "agentesAsignados": [
      {
        "agenteId": "ag-68",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 373,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-375",
    "puesto_id": 375,
    "cargoId": "cargo-375",
    "cargo_id": 375,
    "descripcion": "Puesto Auxiliar Asesor Pedagógico (5° AU)",
    "agentesAsignados": [
      {
        "agenteId": "ag-6",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 374,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-376",
    "puesto_id": 376,
    "cargoId": "cargo-376",
    "cargo_id": 376,
    "descripcion": "Puesto Bibliotecario (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-41",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 375,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-377",
    "puesto_id": 377,
    "cargoId": "cargo-377",
    "cargo_id": 377,
    "descripcion": "Puesto Bibliotecario (5° Div. B)",
    "agentesAsignados": [
      {
        "agenteId": "ag-3",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 376,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-378",
    "puesto_id": 378,
    "cargoId": "cargo-378",
    "cargo_id": 378,
    "descripcion": "Puesto Jefe de Preceptores Ens. Media/Técnica (2° PJ)",
    "agentesAsignados": [
      {
        "agenteId": "ag-512",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 377,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-379",
    "puesto_id": 379,
    "cargoId": "cargo-379",
    "cargo_id": 379,
    "descripcion": "Puesto Subjefe de Preceptores Ens. Media/Técnica (3° SJ)",
    "agentesAsignados": [
      {
        "agenteId": "ag-297",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 378,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-380",
    "puesto_id": 380,
    "cargoId": "cargo-380",
    "cargo_id": 380,
    "descripcion": "Puesto Preceptor (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-100",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 379,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-381",
    "puesto_id": 381,
    "cargoId": "cargo-381",
    "cargo_id": 381,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-291",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 380,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-382",
    "puesto_id": 382,
    "cargoId": "cargo-382",
    "cargo_id": 382,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-227",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 381,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-383",
    "puesto_id": 383,
    "cargoId": "cargo-383",
    "cargo_id": 383,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-387",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 382,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-384",
    "puesto_id": 384,
    "cargoId": "cargo-384",
    "cargo_id": 384,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-48",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 383,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-385",
    "puesto_id": 385,
    "cargoId": "cargo-385",
    "cargo_id": 385,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-351",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 384,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-386",
    "puesto_id": 386,
    "cargoId": "cargo-386",
    "cargo_id": 386,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-512",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "Licencia (LIC 23951)",
        "notaEspecial": "Licencia (LIC 23951)"
      }
    ],
    "activo": true,
    "csvIndex": 385,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-387",
    "puesto_id": 387,
    "cargoId": "cargo-387",
    "cargo_id": 387,
    "descripcion": "Puesto Preceptor (1° Div. A)",
    "agentesAsignados": [
      {
        "agenteId": "ag-149",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 386,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-388",
    "puesto_id": 388,
    "cargoId": "cargo-388",
    "cargo_id": 388,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-123",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 387,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-389",
    "puesto_id": 389,
    "cargoId": "cargo-389",
    "cargo_id": 389,
    "descripcion": "Puesto Preceptor (2° PM)",
    "agentesAsignados": [
      {
        "agenteId": "ag-72",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 388,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-390",
    "puesto_id": 390,
    "cargoId": "cargo-390",
    "cargo_id": 390,
    "descripcion": "Puesto Preceptor (2° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-98",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 389,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-391",
    "puesto_id": 391,
    "cargoId": "cargo-391",
    "cargo_id": 391,
    "descripcion": "Puesto Ayudante de Clases Prácticas Ens. Media/Téc (2° AY)",
    "agentesAsignados": [
      {
        "agenteId": "ag-455",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 390,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-392",
    "puesto_id": 392,
    "cargoId": "cargo-392",
    "cargo_id": 392,
    "descripcion": "Puesto Ayudante de Clases Prácticas Ens. Media/Téc (5° AY)",
    "agentesAsignados": [
      {
        "agenteId": "ag-69",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 391,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-393",
    "puesto_id": 393,
    "cargoId": "cargo-393",
    "cargo_id": 393,
    "descripcion": "Puesto Ayudante de Clases Prácticas Ens. Media/Téc (2° AY)",
    "agentesAsignados": [
      {
        "agenteId": "ag-65",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 392,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-394",
    "puesto_id": 394,
    "cargoId": "cargo-394",
    "cargo_id": 394,
    "descripcion": "Puesto Ayudante de Clases Prácticas Ens. Media/Téc (A AY)",
    "agentesAsignados": [
      {
        "agenteId": "ag-2",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 393,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-395",
    "puesto_id": 395,
    "cargoId": "cargo-395",
    "cargo_id": 395,
    "descripcion": "Puesto Auxiliar de Secretaría Ens. Media/Téc (2° AR)",
    "agentesAsignados": [
      {
        "agenteId": "ag-422",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 394,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-396",
    "puesto_id": 396,
    "cargoId": "cargo-396",
    "cargo_id": 396,
    "descripcion": "Puesto Auxiliar de Secretaría Ens. Media/Téc (2° AR)",
    "agentesAsignados": [
      {
        "agenteId": "ag-254",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 395,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-397",
    "puesto_id": 397,
    "cargoId": "cargo-397",
    "cargo_id": 397,
    "descripcion": "Puesto Auxiliar de Secretaría Ens. Media/Téc (2° AR)",
    "agentesAsignados": [
      {
        "agenteId": "ag-254",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 396,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-398",
    "puesto_id": 398,
    "cargoId": "cargo-398",
    "cargo_id": 398,
    "descripcion": "Puesto Auxiliar de Secretaría Ens. Media/Téc (2° AR)",
    "agentesAsignados": [
      {
        "agenteId": "ag-246",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 397,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-399",
    "puesto_id": 399,
    "cargoId": "cargo-399",
    "cargo_id": 399,
    "descripcion": "Puesto Prosecretario Ens. Media/Técnica (2° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-227",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 398,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-400",
    "puesto_id": 400,
    "cargoId": "cargo-400",
    "cargo_id": 400,
    "descripcion": "Puesto PROSECRETARIO (2° Div. R)",
    "agentesAsignados": [
      {
        "agenteId": "ag-168",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 399,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-401",
    "puesto_id": 401,
    "cargoId": "cargo-401",
    "cargo_id": 401,
    "descripcion": "Puesto Secretario Ens. Media/Técnica (2° Div. S)",
    "agentesAsignados": [
      {
        "agenteId": "ag-7",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 400,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-402",
    "puesto_id": 402,
    "cargoId": "cargo-402",
    "cargo_id": 402,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-14",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 401,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-403",
    "puesto_id": 403,
    "cargoId": "cargo-403",
    "cargo_id": 403,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-381",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 402,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-404",
    "puesto_id": 404,
    "cargoId": "cargo-404",
    "cargo_id": 404,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-344",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 403,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-405",
    "puesto_id": 405,
    "cargoId": "cargo-405",
    "cargo_id": 405,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-18",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 404,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-406",
    "puesto_id": 406,
    "cargoId": "cargo-406",
    "cargo_id": 406,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-75",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 405,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-407",
    "puesto_id": 407,
    "cargoId": "cargo-407",
    "cargo_id": 407,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-323",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 406,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-408",
    "puesto_id": 408,
    "cargoId": "cargo-408",
    "cargo_id": 408,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-158",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 407,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-409",
    "puesto_id": 409,
    "cargoId": "cargo-409",
    "cargo_id": 409,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-169",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 408,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-410",
    "puesto_id": 410,
    "cargoId": "cargo-410",
    "cargo_id": 410,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-142",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 409,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-411",
    "puesto_id": 411,
    "cargoId": "cargo-411",
    "cargo_id": 411,
    "descripcion": "Puesto AUXILIAR DE SERVICIOS (3° Div. P)",
    "agentesAsignados": [
      {
        "agenteId": "ag-298",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 410,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-412",
    "puesto_id": 412,
    "cargoId": "cargo-412",
    "cargo_id": 412,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-258",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 411,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-413",
    "puesto_id": 413,
    "cargoId": "cargo-413",
    "cargo_id": 413,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-216",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 412,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-414",
    "puesto_id": 414,
    "cargoId": "cargo-414",
    "cargo_id": 414,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-111",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 413,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-415",
    "puesto_id": 415,
    "cargoId": "cargo-415",
    "cargo_id": 415,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-176",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 414,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-416",
    "puesto_id": 416,
    "cargoId": "cargo-416",
    "cargo_id": 416,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-96",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 415,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-417",
    "puesto_id": 417,
    "cargoId": "cargo-417",
    "cargo_id": 417,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-125",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 416,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-418",
    "puesto_id": 418,
    "cargoId": "cargo-418",
    "cargo_id": 418,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-270",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 417,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-419",
    "puesto_id": 419,
    "cargoId": "cargo-419",
    "cargo_id": 419,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-164",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 418,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-420",
    "puesto_id": 420,
    "cargoId": "cargo-420",
    "cargo_id": 420,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-19",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 419,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-421",
    "puesto_id": 421,
    "cargoId": "cargo-421",
    "cargo_id": 421,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-25",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 420,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-422",
    "puesto_id": 422,
    "cargoId": "cargo-422",
    "cargo_id": 422,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-293",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 421,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-423",
    "puesto_id": 423,
    "cargoId": "cargo-423",
    "cargo_id": 423,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-498",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 422,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  },
  {
    "id": "puesto-424",
    "puesto_id": 424,
    "cargoId": "cargo-424",
    "cargo_id": 424,
    "descripcion": "Puesto Disponibilidad (9° Div. Z)",
    "agentesAsignados": [
      {
        "agenteId": "ag-476",
        "orden": 1,
        "fechaAsignacion": "2026-03-01",
        "situacionRevista": "Interino",
        "observacion": "",
        "notaEspecial": ""
      }
    ],
    "activo": true,
    "csvIndex": 423,
    "createdAt": "2026-01-01T08:00:00.000Z",
    "created_at": "2026-01-01T08:00:00.000Z"
  }
];

/**
 * Tabla relacional puestos_cargos (421 registros)
 * Asignaciones sembradas en situación de revista 'Interino'.
 */
export const SEED_PUESTOS_CARGOS: PuestoCargo[] = [
  {
    "puestos_cargos_id": 1,
    "puesto_id": 1,
    "agente_id": 80,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 2,
    "puesto_id": 2,
    "agente_id": 15,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 3,
    "puesto_id": 3,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 4,
    "puesto_id": 4,
    "agente_id": 303,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 5,
    "puesto_id": 5,
    "agente_id": 270,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 6,
    "puesto_id": 6,
    "agente_id": 80,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 7,
    "puesto_id": 7,
    "agente_id": 24,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 8,
    "puesto_id": 8,
    "agente_id": 271,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 9,
    "puesto_id": 9,
    "agente_id": 222,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 10,
    "puesto_id": 10,
    "agente_id": 164,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 11,
    "puesto_id": 11,
    "agente_id": 504,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 12,
    "puesto_id": 12,
    "agente_id": 11,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 13,
    "puesto_id": 13,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 14,
    "puesto_id": 14,
    "agente_id": 425,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 15,
    "puesto_id": 15,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 16,
    "puesto_id": 16,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 17,
    "puesto_id": 17,
    "agente_id": 96,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 18,
    "puesto_id": 18,
    "agente_id": 85,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 19,
    "puesto_id": 19,
    "agente_id": 80,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 20,
    "puesto_id": 20,
    "agente_id": 121,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 21,
    "puesto_id": 21,
    "agente_id": 337,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 22,
    "puesto_id": 22,
    "agente_id": 397,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 23,
    "puesto_id": 23,
    "agente_id": 28,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 24,
    "puesto_id": 24,
    "agente_id": 12,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 25,
    "puesto_id": 25,
    "agente_id": 415,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 26,
    "puesto_id": 26,
    "agente_id": 185,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 27,
    "puesto_id": 27,
    "agente_id": 124,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 28,
    "puesto_id": 28,
    "agente_id": 94,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 29,
    "puesto_id": 29,
    "agente_id": 412,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 30,
    "puesto_id": 30,
    "agente_id": 303,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 31,
    "puesto_id": 31,
    "agente_id": 334,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 32,
    "puesto_id": 32,
    "agente_id": 101,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 33,
    "puesto_id": 33,
    "agente_id": 334,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 34,
    "puesto_id": 34,
    "agente_id": 358,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 35,
    "puesto_id": 35,
    "agente_id": 96,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 36,
    "puesto_id": 36,
    "agente_id": 85,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 37,
    "puesto_id": 37,
    "agente_id": 23,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 38,
    "puesto_id": 38,
    "agente_id": 38,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 39,
    "puesto_id": 39,
    "agente_id": 164,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 40,
    "puesto_id": 40,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 41,
    "puesto_id": 41,
    "agente_id": 270,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 42,
    "puesto_id": 42,
    "agente_id": 425,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": "Licencia (LIC 21399)"
  },
  {
    "puestos_cargos_id": 43,
    "puesto_id": 43,
    "agente_id": 495,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 44,
    "puesto_id": 44,
    "agente_id": 185,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 45,
    "puesto_id": 45,
    "agente_id": 115,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 46,
    "puesto_id": 46,
    "agente_id": 202,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 47,
    "puesto_id": 47,
    "agente_id": 506,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 48,
    "puesto_id": 48,
    "agente_id": 384,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 49,
    "puesto_id": 49,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 50,
    "puesto_id": 50,
    "agente_id": 101,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 51,
    "puesto_id": 51,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 52,
    "puesto_id": 52,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 53,
    "puesto_id": 53,
    "agente_id": 96,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 54,
    "puesto_id": 54,
    "agente_id": 85,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 55,
    "puesto_id": 55,
    "agente_id": 199,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 56,
    "puesto_id": 56,
    "agente_id": 251,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 57,
    "puesto_id": 57,
    "agente_id": 32,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 58,
    "puesto_id": 58,
    "agente_id": 303,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 59,
    "puesto_id": 59,
    "agente_id": 28,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 60,
    "puesto_id": 60,
    "agente_id": 273,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 61,
    "puesto_id": 61,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 62,
    "puesto_id": 62,
    "agente_id": 496,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 63,
    "puesto_id": 63,
    "agente_id": 410,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 64,
    "puesto_id": 64,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 65,
    "puesto_id": 65,
    "agente_id": 504,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 66,
    "puesto_id": 66,
    "agente_id": 383,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 67,
    "puesto_id": 67,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 68,
    "puesto_id": 68,
    "agente_id": 236,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 69,
    "puesto_id": 69,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 70,
    "puesto_id": 70,
    "agente_id": 289,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 71,
    "puesto_id": 71,
    "agente_id": 37,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 72,
    "puesto_id": 72,
    "agente_id": 439,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 73,
    "puesto_id": 73,
    "agente_id": 17,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 74,
    "puesto_id": 74,
    "agente_id": 38,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 75,
    "puesto_id": 75,
    "agente_id": 448,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 76,
    "puesto_id": 76,
    "agente_id": 303,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": "Jefatura de Departamento"
  },
  {
    "puestos_cargos_id": 77,
    "puesto_id": 77,
    "agente_id": 295,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 78,
    "puesto_id": 78,
    "agente_id": 174,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 79,
    "puesto_id": 79,
    "agente_id": 24,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 80,
    "puesto_id": 80,
    "agente_id": 368,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 81,
    "puesto_id": 81,
    "agente_id": 402,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 82,
    "puesto_id": 82,
    "agente_id": 416,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 83,
    "puesto_id": 83,
    "agente_id": 242,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 84,
    "puesto_id": 84,
    "agente_id": 392,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 85,
    "puesto_id": 85,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 86,
    "puesto_id": 86,
    "agente_id": 247,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 87,
    "puesto_id": 87,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 88,
    "puesto_id": 88,
    "agente_id": 289,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 89,
    "puesto_id": 89,
    "agente_id": 403,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 90,
    "puesto_id": 90,
    "agente_id": 85,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 91,
    "puesto_id": 91,
    "agente_id": 36,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 92,
    "puesto_id": 92,
    "agente_id": 25,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 93,
    "puesto_id": 93,
    "agente_id": 448,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 94,
    "puesto_id": 94,
    "agente_id": 485,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 95,
    "puesto_id": 95,
    "agente_id": 303,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 96,
    "puesto_id": 96,
    "agente_id": 28,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 97,
    "puesto_id": 97,
    "agente_id": 25,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 98,
    "puesto_id": 98,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 99,
    "puesto_id": 99,
    "agente_id": 301,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 100,
    "puesto_id": 100,
    "agente_id": 410,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 101,
    "puesto_id": 101,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 102,
    "puesto_id": 102,
    "agente_id": 506,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 103,
    "puesto_id": 104,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 104,
    "puesto_id": 105,
    "agente_id": 44,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 105,
    "puesto_id": 106,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 106,
    "puesto_id": 107,
    "agente_id": 192,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 107,
    "puesto_id": 108,
    "agente_id": 96,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 108,
    "puesto_id": 109,
    "agente_id": 286,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 109,
    "puesto_id": 110,
    "agente_id": 10,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 110,
    "puesto_id": 111,
    "agente_id": 122,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 111,
    "puesto_id": 112,
    "agente_id": 260,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 112,
    "puesto_id": 113,
    "agente_id": 293,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 113,
    "puesto_id": 114,
    "agente_id": 29,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 114,
    "puesto_id": 115,
    "agente_id": 25,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 115,
    "puesto_id": 116,
    "agente_id": 238,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 116,
    "puesto_id": 117,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 117,
    "puesto_id": 118,
    "agente_id": 13,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 118,
    "puesto_id": 119,
    "agente_id": 463,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 119,
    "puesto_id": 120,
    "agente_id": 504,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 120,
    "puesto_id": 121,
    "agente_id": 392,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 121,
    "puesto_id": 122,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 122,
    "puesto_id": 123,
    "agente_id": 44,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 123,
    "puesto_id": 124,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 124,
    "puesto_id": 125,
    "agente_id": 289,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 125,
    "puesto_id": 126,
    "agente_id": 96,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 126,
    "puesto_id": 127,
    "agente_id": 36,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 127,
    "puesto_id": 128,
    "agente_id": 71,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 128,
    "puesto_id": 129,
    "agente_id": 241,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 129,
    "puesto_id": 130,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 130,
    "puesto_id": 131,
    "agente_id": 92,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 131,
    "puesto_id": 132,
    "agente_id": 109,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 132,
    "puesto_id": 133,
    "agente_id": 69,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 133,
    "puesto_id": 134,
    "agente_id": 408,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 134,
    "puesto_id": 135,
    "agente_id": 496,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 135,
    "puesto_id": 136,
    "agente_id": 13,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 136,
    "puesto_id": 137,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 137,
    "puesto_id": 138,
    "agente_id": 316,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 138,
    "puesto_id": 139,
    "agente_id": 384,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 139,
    "puesto_id": 140,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 140,
    "puesto_id": 141,
    "agente_id": 44,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 141,
    "puesto_id": 142,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 142,
    "puesto_id": 143,
    "agente_id": 349,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 143,
    "puesto_id": 144,
    "agente_id": 37,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 144,
    "puesto_id": 145,
    "agente_id": 90,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 145,
    "puesto_id": 146,
    "agente_id": 119,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 146,
    "puesto_id": 147,
    "agente_id": 241,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 147,
    "puesto_id": 148,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 148,
    "puesto_id": 149,
    "agente_id": 303,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 149,
    "puesto_id": 150,
    "agente_id": 64,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 150,
    "puesto_id": 151,
    "agente_id": 69,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 151,
    "puesto_id": 152,
    "agente_id": 396,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 152,
    "puesto_id": 153,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 153,
    "puesto_id": 154,
    "agente_id": 13,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 154,
    "puesto_id": 155,
    "agente_id": 486,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 155,
    "puesto_id": 156,
    "agente_id": 242,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 156,
    "puesto_id": 157,
    "agente_id": 447,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 157,
    "puesto_id": 158,
    "agente_id": 312,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 158,
    "puesto_id": 159,
    "agente_id": 247,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 159,
    "puesto_id": 160,
    "agente_id": 312,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 160,
    "puesto_id": 161,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 161,
    "puesto_id": 162,
    "agente_id": 191,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 162,
    "puesto_id": 163,
    "agente_id": 36,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": "Jefatura de Departamento"
  },
  {
    "puestos_cargos_id": 163,
    "puesto_id": 164,
    "agente_id": 79,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 164,
    "puesto_id": 165,
    "agente_id": 241,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 165,
    "puesto_id": 166,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 166,
    "puesto_id": 167,
    "agente_id": 92,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 167,
    "puesto_id": 168,
    "agente_id": 297,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 168,
    "puesto_id": 169,
    "agente_id": 25,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 169,
    "puesto_id": 170,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 170,
    "puesto_id": 171,
    "agente_id": 275,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 171,
    "puesto_id": 172,
    "agente_id": 431,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 172,
    "puesto_id": 173,
    "agente_id": 486,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 173,
    "puesto_id": 174,
    "agente_id": 200,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 174,
    "puesto_id": 175,
    "agente_id": 392,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 175,
    "puesto_id": 176,
    "agente_id": 331,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 176,
    "puesto_id": 177,
    "agente_id": 421,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 177,
    "puesto_id": 178,
    "agente_id": 331,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 178,
    "puesto_id": 179,
    "agente_id": 289,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 179,
    "puesto_id": 180,
    "agente_id": 110,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 180,
    "puesto_id": 181,
    "agente_id": 36,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 181,
    "puesto_id": 182,
    "agente_id": 10,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 182,
    "puesto_id": 183,
    "agente_id": 176,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 183,
    "puesto_id": 184,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 184,
    "puesto_id": 185,
    "agente_id": 35,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 185,
    "puesto_id": 186,
    "agente_id": 28,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 186,
    "puesto_id": 187,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 187,
    "puesto_id": 188,
    "agente_id": 139,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 188,
    "puesto_id": 189,
    "agente_id": 164,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 189,
    "puesto_id": 190,
    "agente_id": 62,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 190,
    "puesto_id": 191,
    "agente_id": 136,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 191,
    "puesto_id": 192,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 192,
    "puesto_id": 193,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 193,
    "puesto_id": 194,
    "agente_id": 70,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 194,
    "puesto_id": 195,
    "agente_id": 172,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 195,
    "puesto_id": 196,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 196,
    "puesto_id": 197,
    "agente_id": 289,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 197,
    "puesto_id": 198,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 198,
    "puesto_id": 199,
    "agente_id": 36,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": "Jefatura de Departamento"
  },
  {
    "puestos_cargos_id": 199,
    "puesto_id": 200,
    "agente_id": 25,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 200,
    "puesto_id": 201,
    "agente_id": 176,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 201,
    "puesto_id": 202,
    "agente_id": 116,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 202,
    "puesto_id": 203,
    "agente_id": 35,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 203,
    "puesto_id": 204,
    "agente_id": 322,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 204,
    "puesto_id": 206,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 205,
    "puesto_id": 207,
    "agente_id": 410,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 206,
    "puesto_id": 208,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 207,
    "puesto_id": 209,
    "agente_id": 506,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 208,
    "puesto_id": 210,
    "agente_id": 136,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 209,
    "puesto_id": 211,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 210,
    "puesto_id": 212,
    "agente_id": 409,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 211,
    "puesto_id": 213,
    "agente_id": 70,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 212,
    "puesto_id": 214,
    "agente_id": 87,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 213,
    "puesto_id": 215,
    "agente_id": 409,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 214,
    "puesto_id": 216,
    "agente_id": 358,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 215,
    "puesto_id": 217,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 216,
    "puesto_id": 218,
    "agente_id": 36,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 217,
    "puesto_id": 219,
    "agente_id": 285,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 218,
    "puesto_id": 220,
    "agente_id": 117,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 219,
    "puesto_id": 221,
    "agente_id": 448,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 220,
    "puesto_id": 222,
    "agente_id": 53,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 221,
    "puesto_id": 224,
    "agente_id": 360,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 222,
    "puesto_id": 225,
    "agente_id": 139,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 223,
    "puesto_id": 226,
    "agente_id": 202,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 224,
    "puesto_id": 227,
    "agente_id": 62,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 225,
    "puesto_id": 228,
    "agente_id": 500,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 226,
    "puesto_id": 229,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 227,
    "puesto_id": 230,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 228,
    "puesto_id": 231,
    "agente_id": 49,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 229,
    "puesto_id": 232,
    "agente_id": 157,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 230,
    "puesto_id": 233,
    "agente_id": 189,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 231,
    "puesto_id": 234,
    "agente_id": 223,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 232,
    "puesto_id": 235,
    "agente_id": 307,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 233,
    "puesto_id": 236,
    "agente_id": 287,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 234,
    "puesto_id": 237,
    "agente_id": 10,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 235,
    "puesto_id": 238,
    "agente_id": 111,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 236,
    "puesto_id": 239,
    "agente_id": 486,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 237,
    "puesto_id": 240,
    "agente_id": 53,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 238,
    "puesto_id": 241,
    "agente_id": 457,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 239,
    "puesto_id": 242,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 240,
    "puesto_id": 243,
    "agente_id": 410,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 241,
    "puesto_id": 244,
    "agente_id": 141,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 242,
    "puesto_id": 245,
    "agente_id": 506,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 243,
    "puesto_id": 246,
    "agente_id": 392,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 244,
    "puesto_id": 247,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 245,
    "puesto_id": 248,
    "agente_id": 312,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 246,
    "puesto_id": 249,
    "agente_id": 247,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 247,
    "puesto_id": 250,
    "agente_id": 157,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 248,
    "puesto_id": 251,
    "agente_id": 312,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 249,
    "puesto_id": 252,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 250,
    "puesto_id": 253,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 251,
    "puesto_id": 254,
    "agente_id": 17,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 252,
    "puesto_id": 255,
    "agente_id": 121,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 253,
    "puesto_id": 256,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 254,
    "puesto_id": 257,
    "agente_id": 109,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 255,
    "puesto_id": 258,
    "agente_id": 281,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 256,
    "puesto_id": 259,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 257,
    "puesto_id": 260,
    "agente_id": 139,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 258,
    "puesto_id": 261,
    "agente_id": 202,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 259,
    "puesto_id": 262,
    "agente_id": 500,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 260,
    "puesto_id": 263,
    "agente_id": 471,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 261,
    "puesto_id": 264,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 262,
    "puesto_id": 265,
    "agente_id": 44,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 263,
    "puesto_id": 266,
    "agente_id": 289,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 264,
    "puesto_id": 267,
    "agente_id": 293,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 265,
    "puesto_id": 268,
    "agente_id": 234,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 266,
    "puesto_id": 269,
    "agente_id": 53,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 267,
    "puesto_id": 270,
    "agente_id": 130,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 268,
    "puesto_id": 271,
    "agente_id": 80,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 269,
    "puesto_id": 272,
    "agente_id": 107,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 270,
    "puesto_id": 273,
    "agente_id": 28,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 271,
    "puesto_id": 274,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 272,
    "puesto_id": 275,
    "agente_id": 275,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 273,
    "puesto_id": 276,
    "agente_id": 343,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 274,
    "puesto_id": 277,
    "agente_id": 326,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 275,
    "puesto_id": 278,
    "agente_id": 468,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 276,
    "puesto_id": 279,
    "agente_id": 498,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 277,
    "puesto_id": 280,
    "agente_id": 19,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 278,
    "puesto_id": 281,
    "agente_id": 476,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 279,
    "puesto_id": 282,
    "agente_id": 140,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 280,
    "puesto_id": 283,
    "agente_id": 148,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 281,
    "puesto_id": 284,
    "agente_id": 425,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 282,
    "puesto_id": 285,
    "agente_id": 358,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 283,
    "puesto_id": 286,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 284,
    "puesto_id": 287,
    "agente_id": 42,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 285,
    "puesto_id": 288,
    "agente_id": 199,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 286,
    "puesto_id": 289,
    "agente_id": 1,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 287,
    "puesto_id": 290,
    "agente_id": 109,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 288,
    "puesto_id": 291,
    "agente_id": 238,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 289,
    "puesto_id": 292,
    "agente_id": 165,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 290,
    "puesto_id": 293,
    "agente_id": 193,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 291,
    "puesto_id": 294,
    "agente_id": 326,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 292,
    "puesto_id": 295,
    "agente_id": 200,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 293,
    "puesto_id": 296,
    "agente_id": 476,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 294,
    "puesto_id": 297,
    "agente_id": 19,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 295,
    "puesto_id": 298,
    "agente_id": 476,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 296,
    "puesto_id": 299,
    "agente_id": 454,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 297,
    "puesto_id": 300,
    "agente_id": 95,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 298,
    "puesto_id": 301,
    "agente_id": 305,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 299,
    "puesto_id": 302,
    "agente_id": 289,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 300,
    "puesto_id": 303,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 301,
    "puesto_id": 304,
    "agente_id": 42,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 302,
    "puesto_id": 305,
    "agente_id": 90,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 303,
    "puesto_id": 306,
    "agente_id": 79,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 304,
    "puesto_id": 307,
    "agente_id": 397,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 305,
    "puesto_id": 308,
    "agente_id": 297,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 306,
    "puesto_id": 309,
    "agente_id": 88,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 307,
    "puesto_id": 310,
    "agente_id": 266,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 308,
    "puesto_id": 311,
    "agente_id": 294,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 309,
    "puesto_id": 312,
    "agente_id": 394,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 310,
    "puesto_id": 313,
    "agente_id": 500,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 311,
    "puesto_id": 314,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 312,
    "puesto_id": 315,
    "agente_id": 312,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 313,
    "puesto_id": 316,
    "agente_id": 195,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 314,
    "puesto_id": 317,
    "agente_id": 378,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 315,
    "puesto_id": 318,
    "agente_id": 282,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 316,
    "puesto_id": 319,
    "agente_id": 315,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 317,
    "puesto_id": 320,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 318,
    "puesto_id": 321,
    "agente_id": 238,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 319,
    "puesto_id": 322,
    "agente_id": 35,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 320,
    "puesto_id": 323,
    "agente_id": 356,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 321,
    "puesto_id": 324,
    "agente_id": 5,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 322,
    "puesto_id": 325,
    "agente_id": 35,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 323,
    "puesto_id": 326,
    "agente_id": 109,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 324,
    "puesto_id": 327,
    "agente_id": 139,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 325,
    "puesto_id": 328,
    "agente_id": 425,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 326,
    "puesto_id": 329,
    "agente_id": 482,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 327,
    "puesto_id": 330,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 328,
    "puesto_id": 331,
    "agente_id": 54,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 329,
    "puesto_id": 332,
    "agente_id": 500,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 330,
    "puesto_id": 333,
    "agente_id": 96,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 331,
    "puesto_id": 334,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 332,
    "puesto_id": 335,
    "agente_id": 304,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 333,
    "puesto_id": 336,
    "agente_id": 410,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 334,
    "puesto_id": 337,
    "agente_id": 19,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 335,
    "puesto_id": 338,
    "agente_id": 247,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 336,
    "puesto_id": 339,
    "agente_id": 74,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 337,
    "puesto_id": 340,
    "agente_id": 476,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 338,
    "puesto_id": 341,
    "agente_id": 103,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 339,
    "puesto_id": 342,
    "agente_id": 404,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 340,
    "puesto_id": 343,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 341,
    "puesto_id": 344,
    "agente_id": 403,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 342,
    "puesto_id": 345,
    "agente_id": 187,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 343,
    "puesto_id": 346,
    "agente_id": 64,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 344,
    "puesto_id": 347,
    "agente_id": 163,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 345,
    "puesto_id": 348,
    "agente_id": 19,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 346,
    "puesto_id": 349,
    "agente_id": 305,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 347,
    "puesto_id": 350,
    "agente_id": 312,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 348,
    "puesto_id": 351,
    "agente_id": 238,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 349,
    "puesto_id": 352,
    "agente_id": 349,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 350,
    "puesto_id": 353,
    "agente_id": 268,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 351,
    "puesto_id": 354,
    "agente_id": 233,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": "Jefatura de Departamento"
  },
  {
    "puestos_cargos_id": 352,
    "puesto_id": 355,
    "agente_id": 53,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 353,
    "puesto_id": 356,
    "agente_id": 94,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 354,
    "puesto_id": 357,
    "agente_id": 425,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 355,
    "puesto_id": 358,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 356,
    "puesto_id": 359,
    "agente_id": 19,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 357,
    "puesto_id": 360,
    "agente_id": 10,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 358,
    "puesto_id": 361,
    "agente_id": 202,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 359,
    "puesto_id": 362,
    "agente_id": 36,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 360,
    "puesto_id": 363,
    "agente_id": 358,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 361,
    "puesto_id": 364,
    "agente_id": 176,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 362,
    "puesto_id": 365,
    "agente_id": 270,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 363,
    "puesto_id": 366,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 364,
    "puesto_id": 367,
    "agente_id": 101,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 365,
    "puesto_id": 368,
    "agente_id": 468,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 366,
    "puesto_id": 369,
    "agente_id": 164,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 367,
    "puesto_id": 370,
    "agente_id": 10,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 368,
    "puesto_id": 371,
    "agente_id": 63,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 369,
    "puesto_id": 372,
    "agente_id": 19,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 370,
    "puesto_id": 373,
    "agente_id": 184,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 371,
    "puesto_id": 374,
    "agente_id": 68,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 372,
    "puesto_id": 375,
    "agente_id": 6,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 373,
    "puesto_id": 376,
    "agente_id": 41,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 374,
    "puesto_id": 377,
    "agente_id": 3,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 375,
    "puesto_id": 378,
    "agente_id": 512,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 376,
    "puesto_id": 379,
    "agente_id": 297,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 377,
    "puesto_id": 380,
    "agente_id": 100,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 378,
    "puesto_id": 381,
    "agente_id": 291,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 379,
    "puesto_id": 382,
    "agente_id": 227,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 380,
    "puesto_id": 383,
    "agente_id": 387,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 381,
    "puesto_id": 384,
    "agente_id": 48,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 382,
    "puesto_id": 385,
    "agente_id": 351,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 383,
    "puesto_id": 386,
    "agente_id": 512,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": "Licencia (LIC 23951)"
  },
  {
    "puestos_cargos_id": 384,
    "puesto_id": 387,
    "agente_id": 149,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 385,
    "puesto_id": 388,
    "agente_id": 123,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 386,
    "puesto_id": 389,
    "agente_id": 72,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 387,
    "puesto_id": 390,
    "agente_id": 98,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 388,
    "puesto_id": 391,
    "agente_id": 455,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 389,
    "puesto_id": 392,
    "agente_id": 69,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 390,
    "puesto_id": 393,
    "agente_id": 65,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 391,
    "puesto_id": 394,
    "agente_id": 2,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 392,
    "puesto_id": 395,
    "agente_id": 422,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 393,
    "puesto_id": 396,
    "agente_id": 254,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 394,
    "puesto_id": 397,
    "agente_id": 254,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 395,
    "puesto_id": 398,
    "agente_id": 246,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 396,
    "puesto_id": 399,
    "agente_id": 227,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 397,
    "puesto_id": 400,
    "agente_id": 168,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 398,
    "puesto_id": 401,
    "agente_id": 7,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 399,
    "puesto_id": 402,
    "agente_id": 14,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 400,
    "puesto_id": 403,
    "agente_id": 381,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 401,
    "puesto_id": 404,
    "agente_id": 344,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 402,
    "puesto_id": 405,
    "agente_id": 18,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 403,
    "puesto_id": 406,
    "agente_id": 75,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 404,
    "puesto_id": 407,
    "agente_id": 323,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 405,
    "puesto_id": 408,
    "agente_id": 158,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 406,
    "puesto_id": 409,
    "agente_id": 169,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 407,
    "puesto_id": 410,
    "agente_id": 142,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 408,
    "puesto_id": 411,
    "agente_id": 298,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 409,
    "puesto_id": 412,
    "agente_id": 258,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 410,
    "puesto_id": 413,
    "agente_id": 216,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 411,
    "puesto_id": 414,
    "agente_id": 111,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 412,
    "puesto_id": 415,
    "agente_id": 176,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 413,
    "puesto_id": 416,
    "agente_id": 96,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 414,
    "puesto_id": 417,
    "agente_id": 125,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 415,
    "puesto_id": 418,
    "agente_id": 270,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 416,
    "puesto_id": 419,
    "agente_id": 164,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 417,
    "puesto_id": 420,
    "agente_id": 19,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 418,
    "puesto_id": 421,
    "agente_id": 25,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 419,
    "puesto_id": 422,
    "agente_id": 293,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 420,
    "puesto_id": 423,
    "agente_id": 498,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  },
  {
    "puestos_cargos_id": 421,
    "puesto_id": 424,
    "agente_id": 476,
    "orden": 1,
    "sit_revista": "Interino",
    "fecha_alta": "2026-03-01",
    "activo": true,
    "detalle": ""
  }
];
