const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const csvPath = path.join(__dirname, 'cargos_input.csv');
const lines = fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/).filter(Boolean);

console.log('Processing cargos CSV lines:', lines.length);

const existingAgents = JSON.parse(fs.readFileSync(path.join(__dirname, 'agents_imported.json'), 'utf8'));
const agentByEmp = new Map();
const agentByName = new Map();

existingAgents.forEach((a) => {
  if (a.employeeNumber) agentByEmp.set(a.employeeNumber.trim().toLowerCase(), a);
  agentByName.set(a.fullName.toLowerCase().trim(), a);
});

function cleanText(str) {
  if (!str) return '';
  return str.replace(/^["'\s]+|["'\s]+$/g, '').trim();
}

function parseNameParts(fullName) {
  const cleaned = cleanText(fullName);
  if (cleaned.includes(',')) {
    const parts = cleaned.split(',');
    const apellidos = parts[0].trim();
    const nombres = parts.slice(1).join(',').trim();
    return { apellidos, nombres, fullName: `${apellidos}, ${nombres}` };
  }
  return { apellidos: cleaned, nombres: '', fullName: cleaned };
}

const allAgents = [...existingAgents];
let autoCreatedCount = 0;

function getOrCreateAgent(empNum, rawName) {
  const emp = cleanText(empNum);
  const name = cleanText(rawName);

  if (!emp && !name) return null;
  const upper = name.toUpperCase();
  if (['ASAMBLEA', 'SP', 'CESAR DE PLANTA'].includes(upper)) {
    return null;
  }

  // 1. By employee number
  if (emp && agentByEmp.has(emp.toLowerCase())) {
    return agentByEmp.get(emp.toLowerCase());
  }

  // 2. By full name
  const cleanCleanName = name.replace(/\s+(JEF|LIC\s+\d+|ASAMBLEA)$/i, '').trim();
  if (agentByName.has(cleanCleanName.toLowerCase())) {
    const found = agentByName.get(cleanCleanName.toLowerCase());
    if (emp && !found.employeeNumber) found.employeeNumber = emp;
    return found;
  }

  // 3. Auto-create if not in existing 156
  const { apellidos, nombres, fullName } = parseNameParts(cleanCleanName);
  const cleanDni = '';
  const agentId = `agent-${emp || 'gen-' + (allAgents.length + 1)}`;

  const newAgent = {
    id: agentId,
    apellidos: apellidos || 'Docente',
    nombres: nombres || 'CPEM',
    fullName: fullName || `${apellidos}, ${nombres}`,
    employeeNumber: emp || `${allAgents.length + 1}`,
    dni: cleanDni,
    telefono: '',
    email: emp ? `legajo.${emp}@cpem25.edu.ar` : `${apellidos.toLowerCase().replace(/\s+/g, '')}@cpem25.edu.ar`,
    fechaNacimiento: '',
    lugarNacimiento: 'Neuquén',
    activo: true,
    hasAssignedPost: true,
  };

  allAgents.push(newAgent);
  if (emp) agentByEmp.set(emp.toLowerCase(), newAgent);
  agentByName.set(newAgent.fullName.toLowerCase(), newAgent);
  autoCreatedCount++;
  return newAgent;
}

function normalizeTurno(code) {
  const c = (code || '').toUpperCase().trim();
  if (c === 'M') return 'Mañana';
  if (c === 'T') return 'Tarde';
  if (c === 'C') return 'Central';
  if (c === 'E') return 'Extendido';
  if (c === 'I') return 'Intermedio';
  if (c === 'Z') return 'Vespertino';
  return code || 'Mañana';
}

const cargosList = [];
const puestosList = [];

lines.forEach((line, idx) => {
  const cols = parseCSVLine(line);
  const secuencia = cleanText(cols[0]);
  const turno = normalizeTurno(cols[1]);
  const cursoRaw = cleanText(cols[2]);
  const seccionRaw = cleanText(cols[3]);
  const descripcion = cleanText(cols[4]) || 'Cargo sin denominación';
  const obligacionesRaw = cleanText(cols[5]);

  const cargoId = `cargo-csv-${idx + 1}`;
  const puestoId = `puesto-csv-${idx + 1}`;

  // Formatted curso & seccion
  const cursoDisplay = cursoRaw ? (cursoRaw.match(/^\d+$/) ? `${cursoRaw}°` : cursoRaw) : 'Institucional';
  const seccionDisplay = seccionRaw ? (seccionRaw.length <= 2 ? `Div. ${seccionRaw}` : seccionRaw) : 'Única';

  const agentesAsignados = [];

  // Slot 1: cols[6] (emp), cols[7] (nombre)
  const slot1Emp = cleanText(cols[6]);
  const slot1Name = cleanText(cols[7]);
  if (slot1Emp || slot1Name) {
    const ag = getOrCreateAgent(slot1Emp, slot1Name);
    if (ag) {
      agentesAsignados.push({
        agenteId: ag.id,
        orden: 1,
        fechaAsignacion: '2024-03-01',
        situacionRevista: 'Titular',
        observacion: slot1Name,
      });
    } else if (slot1Name) {
      agentesAsignados.push({
        agenteId: '',
        orden: 1,
        fechaAsignacion: '2024-03-01',
        situacionRevista: 'Titular',
        observacion: slot1Name,
        notaEspecial: slot1Name,
      });
    }
  }

  // Slot 2: cols[8] (emp), cols[9] (nombre)
  const slot2Emp = cleanText(cols[8]);
  const slot2Name = cleanText(cols[9]);
  if (slot2Emp || slot2Name) {
    const ag = getOrCreateAgent(slot2Emp, slot2Name);
    if (ag) {
      agentesAsignados.push({
        agenteId: ag.id,
        orden: 2,
        fechaAsignacion: '2024-04-01',
        situacionRevista: 'Suplente',
        observacion: slot2Name,
      });
    } else if (slot2Name) {
      agentesAsignados.push({
        agenteId: '',
        orden: 2,
        fechaAsignacion: '2024-04-01',
        situacionRevista: 'Suplente',
        observacion: slot2Name,
        notaEspecial: slot2Name,
      });
    }
  }

  // Slot 3: cols[10] (emp), cols[11] (nombre)
  const slot3Emp = cleanText(cols[10]);
  const slot3Name = cleanText(cols[11]);
  if (slot3Emp || slot3Name) {
    const ag = getOrCreateAgent(slot3Emp, slot3Name);
    if (ag) {
      agentesAsignados.push({
        agenteId: ag.id,
        orden: 3,
        fechaAsignacion: '2024-05-01',
        situacionRevista: 'Suplente',
        observacion: slot3Name,
      });
    } else if (slot3Name) {
      agentesAsignados.push({
        agenteId: '',
        orden: 3,
        fechaAsignacion: '2024-05-01',
        situacionRevista: 'Suplente',
        observacion: slot3Name,
        notaEspecial: slot3Name,
      });
    }
  }

  const horaIn = turno === 'Tarde' ? '13:30' : '07:45';
  const horaOut = turno === 'Tarde' ? '17:30' : '12:45';

  cargosList.push({
    id: cargoId,
    secuencia: secuencia || `SEC-${idx + 1}`,
    turno,
    curso: cursoDisplay,
    seccion: seccionDisplay,
    descripcion,
    obligaciones: obligacionesRaw ? `${obligacionesRaw} hs cátedra` : 'Sin carga definida',
    area: descripcion,
    activo: true,
    horarios: [
      {
        id: `h-${cargoId}-1`,
        dia: 'Lunes',
        horaIngreso: horaIn,
        horaSalida: horaOut,
      },
    ],
    tieneArticulacion: false,
    ordenVisual: idx + 1,
    csvIndex: idx,
    createdAt: new Date().toISOString(),
  });

  puestosList.push({
    id: puestoId,
    cargoId: cargoId,
    descripcion: `${descripcion} • ${cursoDisplay} ${seccionDisplay}`,
    activo: true,
    agentesAsignados,
    csvIndex: idx,
    createdAt: new Date().toISOString(),
  });
});

console.log('Successfully generated:');
console.log('- Cargos:', cargosList.length);
console.log('- Puestos:', puestosList.length);
console.log('- All Agents:', allAgents.length, `(Original: ${existingAgents.length}, Newly registered: ${autoCreatedCount})`);

// Write files
const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// 1. importedCargos.ts
const cargosCode = `import { Cargo } from '../types';

export const IMPORTED_CARGOS: Cargo[] = ${JSON.stringify(cargosList, null, 2)};
`;
fs.writeFileSync(path.join(dataDir, 'importedCargos.ts'), cargosCode, 'utf8');

// 2. importedPuestos.ts
const puestosCode = `import { Puesto } from '../types';

export const IMPORTED_PUESTOS: Puesto[] = ${JSON.stringify(puestosList, null, 2)};
`;
fs.writeFileSync(path.join(dataDir, 'importedPuestos.ts'), puestosCode, 'utf8');

// 3. importedAgents.ts
const agentsCode = `import { Agent } from '../types';

export const IMPORTED_AGENTS: Agent[] = ${JSON.stringify(allAgents, null, 2)};
`;
fs.writeFileSync(path.join(dataDir, 'importedAgents.ts'), agentsCode, 'utf8');

console.log('Files generated successfully in src/data/');
