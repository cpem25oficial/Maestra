-- ============================================================================
-- BASE DE DATOS CPEM N° 25 - ESTRUCTURA POSTGRESQL DEFINITIVA
-- Almacenada y acordada para la migración a PostgreSQL
-- ============================================================================

-- 1. ÁREAS
CREATE TABLE areas (
  area_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  descripccion VARCHAR(255) NOT NULL
);

-- 2. CARGOS
CREATE TABLE cargos (
  cargo_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  secuencia BIGINT NOT NULL,
  turno VARCHAR(2) NOT NULL,
  curso VARCHAR(2),
  seccion VARCHAR(2),
  descripccion VARCHAR(150),
  obligaciones INTEGER DEFAULT 1,
  area_id BIGINT,
  activo BOOLEAN NOT NULL DEFAULT true,
  tiene_art BOOLEAN NOT NULL DEFAULT false,
  orden_visual INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_cargos_area FOREIGN KEY (area_id) REFERENCES areas(area_id)
);

-- 3. PUESTOS
CREATE TABLE puestos (
  puesto_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cargo_id BIGINT NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_puestos_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(cargo_id)
);

-- 4. HORARIOS DE CARGOS
CREATE TABLE horarios_cargos (
  horario_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cargo_id BIGINT NOT NULL,
  dia VARCHAR(25) NOT NULL,
  hora_desde TIME NOT NULL,
  hora_hasta TIME NOT NULL,
  articulacion BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT fk_horarios_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(cargo_id)
);

-- 5. AGENTES
CREATE TABLE agentes (
  agente_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  dni BIGINT NOT NULL UNIQUE,
  legajo BIGINT NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL,
  fecha_nac DATE,
  lugar_nacimiento VARCHAR(150),
  domicilio VARCHAR(255),
  titulo VARCHAR(255),
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. PUESTOS_CARGOS (Relación Agente - Puesto)
CREATE TABLE puestos_cargos (
  puestos_cargos_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  puesto_id BIGINT NOT NULL,
  agente_id BIGINT NOT NULL,
  orden INTEGER NOT NULL DEFAULT 1,
  sit_revista VARCHAR(50),
  fecha_alta DATE,
  activo BOOLEAN NOT NULL DEFAULT true,
  detalle TEXT,
  CONSTRAINT fk_puestos_cargos_puesto FOREIGN KEY (puesto_id) REFERENCES puestos(puesto_id),
  CONSTRAINT fk_puestos_cargos_agente FOREIGN KEY (agente_id) REFERENCES agentes(agente_id)
);

-- 7. TIPOS DE LICENCIAS
CREATE TABLE tipos_licencias (
  tipo_licencia_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  categoria VARCHAR(50),
  sin_limite BOOLEAN NOT NULL DEFAULT false,
  max_dias_anio INTEGER,
  max_dias_seguidos INTEGER,
  requiere_justificacion BOOLEAN DEFAULT false,
  requiere_obligaciones BOOLEAN DEFAULT true,
  descripccion TEXT,
  activo BOOLEAN NOT NULL DEFAULT true
);

-- 8. USUARIOS DEL SISTEMA
CREATE TABLE users (
  user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  displayName VARCHAR(150) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'superadmin', 'visitante')),
  active BOOLEAN NOT NULL DEFAULT true,
  password_hash VARCHAR(255) NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT now(),
  lastLogin TIMESTAMPTZ
);

-- 9. SOLICITUD DE LICENCIAS
CREATE TABLE solicitud_licencias (
  solicitud_licencia_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  agente_id BIGINT NOT NULL,
  tipo_licencia_id BIGINT NOT NULL,
  puestos_id JSONB,
  fecha_desde DATE NOT NULL,
  fecha_hasta DATE NOT NULL,
  articulacion BOOLEAN NOT NULL DEFAULT false,
  obligaciones INTEGER DEFAULT 1,
  detalle_solicitud TEXT,
  codigo VARCHAR(50),
  estado VARCHAR(50) NOT NULL,
  detalle_estado TEXT,
  signature_data_url TEXT,
  justificacion_url TEXT,
  fecha_carga TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_solicitud_agente FOREIGN KEY (agente_id) REFERENCES agentes(agente_id),
  CONSTRAINT fk_solicitud_tipo_licencia FOREIGN KEY (tipo_licencia_id) REFERENCES tipos_licencias(tipo_licencia_id)
);

-- 10. HISTORIAL DE SOLICITUDES
CREATE TABLE solicitud_historiales (
  solicitud_historial_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  solicitud_id BIGINT NOT NULL,
  estado_anterior VARCHAR(50) NOT NULL,
  estado_nuevo VARCHAR(50) NOT NULL,
  usuario BIGINT NOT NULL,
  detalle_cambio VARCHAR(255),
  fecha TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_historial_solicitud FOREIGN KEY (solicitud_id) REFERENCES solicitud_licencias(solicitud_licencia_id),
  CONSTRAINT fk_historial_usuario FOREIGN KEY (usuario) REFERENCES users(user_id)
);

-- 11. SISO LICENCIAS (Integración Neuquén)
CREATE TABLE siso_licencias (
  siso_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id VARCHAR(100) NOT NULL,
  nro_empleado VARCHAR(50),
  dni VARCHAR(20),
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  tipo VARCHAR(100),
  carga VARCHAR(50),
  fecha_desde VARCHAR(50),
  fecha_hasta VARCHAR(50),
  dias VARCHAR(20),
  justifica VARCHAR(50) NOT NULL,
  cod_licencia INTEGER,
  fecha_alta VARCHAR(50),
  auditor VARCHAR(150),
  patologia VARCHAR(255),
  fecha_auditoria VARCHAR(50),
  medico_interviniente VARCHAR(150),
  matricula_medico_interviniente VARCHAR(50),
  establecimientos_o_sector VARCHAR(255)
);
