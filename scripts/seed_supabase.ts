import { createClient } from '@supabase/supabase-js';
import { SEED_CARGOS } from '../src/data/cargosData';
import { SEED_AGENTES } from '../src/data/agentesData';
import { SEED_TIPOS_LICENCIAS } from '../src/data/tiposLicenciasData';
import { SEED_PUESTOS, SEED_PUESTOS_CARGOS } from '../src/data/puestosData';
import { SEED_SISO_LICENSES } from '../src/data/sisoData';

const SUPABASE_URL = 'https://xqwhiuvtsptpkubgfpfj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_2ErGc8P23F8k754VrCrL4g_t7EkLNyG';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function chunkUpsert(table: string, items: any[], onConflictColumn: string, chunkSize = 100) {
  console.log(`Upserting ${items.length} records into ${table}...`);
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const { error } = await supabase.from(table).upsert(chunk, { onConflict: onConflictColumn, ignoreDuplicates: true });
    if (error) {
      console.error(`Error in ${table} at index ${i}:`, error.message);
      throw error;
    }
    process.stdout.write(`\r${table}: ${Math.min(i + chunkSize, items.length)} / ${items.length}`);
  }
  console.log(`\n✔ ${table} seeded successfully.`);
}

async function run() {
  console.log('=== INICIANDO SEMBRADO EN SUPABASE POSTGRESQL ===');

  // 1. CARGOS
  const cargosToInsert = SEED_CARGOS.map((c) => ({
    cargo_id: c.cargo_id || parseInt(c.id.replace('cargo-', ''), 10),
    secuencia: parseInt(c.secuencia || '0', 10),
    turno: c.turno_codigo || (c.turno ? c.turno.charAt(0) : 'M'),
    curso: c.curso_raw || c.curso.replace('°', '').trim(),
    seccion: c.seccion_raw || c.seccion.replace('Div.', '').trim(),
    descripccion: c.descripcion,
    obligaciones: parseInt(c.obligaciones || '1', 10) || 1,
    area_id: c.area_id || null,
    activo: c.activo !== false,
    tiene_art: c.tieneArticulacion || c.tiene_art || false,
    orden_visual: c.ordenVisual || c.orden_visual || 1,
  }));
  await chunkUpsert('cargos', cargosToInsert, 'cargo_id', 100);

  // 2. PUESTOS
  const puestosToInsert = SEED_PUESTOS.map((p) => ({
    puesto_id: p.puesto_id || parseInt(p.id.replace('puesto-', ''), 10),
    cargo_id: p.cargo_id || parseInt(p.cargoId.replace('cargo-', ''), 10),
    activo: p.activo !== false,
  }));
  await chunkUpsert('puestos', puestosToInsert, 'puesto_id', 100);

  // 3. AGENTES
  const agentesToInsert = SEED_AGENTES.map((a) => {
    const rawDni = (a.dni || '').toString().replace(/\D/g, '');
    const numDni = parseInt(rawDni, 10) || 0;
    const numLegajo = typeof a.legajo === 'number' ? a.legajo : (parseInt(a.employeeNumber || '0', 10) || 0);

    return {
      agente_id: a.agente_id || parseInt(a.id.replace('ag-', ''), 10),
      dni: numDni,
      legajo: numLegajo,
      apellido: a.apellido || a.apellidos || a.fullName.split(',')[0]?.trim() || '',
      nombre: a.nombre || a.nombres || a.fullName.split(',')[1]?.trim() || '',
      telefono: a.telefono || '',
      email: a.email || '',
      fecha_nac: a.fecha_nac || (a.fechaNacimiento ? a.fechaNacimiento.split('T')[0] : null),
      lugar_nacimiento: a.lugar_nacimiento || a.lugarNacimiento || '',
      domicilio: a.domicilio || '',
      titulo: a.titulo || '',
      activo: a.activo !== false,
    };
  });
  await chunkUpsert('agentes', agentesToInsert, 'agente_id', 100);

  // 4. PUESTOS_CARGOS (Asignaciones Interinas)
  const puestosCargosToInsert = SEED_PUESTOS_CARGOS.map((pc) => ({
    puestos_cargos_id: pc.puestos_cargos_id,
    puesto_id: pc.puesto_id,
    agente_id: pc.agente_id,
    orden: pc.orden || 1,
    sit_revista: pc.sit_revista || 'Interino',
    fecha_alta: pc.fecha_alta ? pc.fecha_alta.split('T')[0] : null,
    activo: pc.activo !== false,
    detalle: pc.detalle || null,
  }));
  await chunkUpsert('puestos_cargos', puestosCargosToInsert, 'puestos_cargos_id', 100);

  // 5. TIPOS DE LICENCIAS
  const tiposLicenciasToInsert = SEED_TIPOS_LICENCIAS.map((t) => ({
    tipo_licencia_id: t.tipo_licencia_id || parseInt(t.id.replace('type-', ''), 10),
    codigo: t.code || t.codigo || '',
    nombre: t.name || t.nombre || '',
    categoria: t.category || t.categoria || '',
    sin_limite: t.sinLimite || t.sin_limite || false,
    max_dias_anio: t.maxDaysPerYear || t.max_dias_anio || null,
    max_dias_seguidos: t.maxConsecutiveDays || t.max_dias_seguidos || null,
    requiere_justificacion: t.requiresJustification || t.requiere_justificacion || false,
    requiere_obligaciones: t.requiresObligations || t.requiere_obligaciones || true,
    descripccion: t.description || t.descripccion || '',
    activo: t.active !== false,
  }));
  await chunkUpsert('tipos_licencias', tiposLicenciasToInsert, 'tipo_licencia_id', 100);

  // 6. USUARIOS INICIALES (Superadmin)
  const usersToInsert = [
    {
      email: 'cpem25oficial@gmail.com',
      displayname: 'Administración CPEM 25',
      role: 'superadmin',
      active: true,
      password_hash: 'admin123',
    },
  ];
  await chunkUpsert('users', usersToInsert, 'email', 10);

async function chunkInsert(table: string, items: any[], chunkSize = 200) {
  console.log(`Inserting ${items.length} records into ${table}...`);
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const { error } = await supabase.from(table).insert(chunk);
    if (error) {
      console.error(`Error in ${table} at index ${i}:`, error.message);
      throw error;
    }
    process.stdout.write(`\r${table}: ${Math.min(i + chunkSize, items.length)} / ${items.length}`);
  }
  console.log(`\n✔ ${table} seeded successfully.`);
}

  // 7. SISO LICENCIAS (Fiel a la estructura original)
  const sisoToInsert = SEED_SISO_LICENSES.map((s) => ({
    id: s.id,
    nro_empleado: s.nro_empleado || s.nroEmpleado || '',
    dni: s.dni || '',
    nombre: s.nombre || '',
    email: s.email || '',
    tipo: s.tipo || '',
    carga: s.carga || '',
    fecha_desde: s.fecha_desde || s.desde || '',
    fecha_hasta: s.fecha_hasta || s.hasta || '',
    dias: s.dias || '',
    justifica: s.justifica || '',
    cod_licencia: s.cod_licencia ? parseInt(s.cod_licencia.toString(), 10) : null,
    fecha_alta: s.fecha_alta || s.fechaAlta || '',
    auditor: s.auditor || '',
    patologia: s.patologia || '',
    fecha_auditoria: s.fecha_auditoria || s.fechaAuditoria || '',
    medico_interviniente: s.medico_interviniente || s.medicoInterviniente || '',
    matricula_medico_interviniente: s.matricula_medico_interviniente || s.matriculaMedicoInterviniente || '',
    establecimientos_o_sector: s.establecimientos_o_sector || s.establecimientosOSector || '',
  }));
  await chunkInsert('siso_licencias', sisoToInsert, 250);

  console.log('=== SEMBRADO FINALIZADO CON ÉXITO ===');
}

run().catch((err) => {
  console.error('Error durante el sembrado:', err);
  process.exit(1);
});
