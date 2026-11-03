const fs = require('fs');
const path = require('path');

const csvData = fs.readFileSync(path.join(__dirname, 'agentes_input.csv'), 'utf8');

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

const lines = csvData.split(/\r?\n/).filter(l => l.trim().length > 0);
console.log('Total lines:', lines.length);

const header = parseCSVLine(lines[0]);
console.log('Headers:', header);

// We process from bottom to top (reverse order):
// "importa a todos de abajo a arriba. toma los datos necesario unicamente. el Dirección de correo electrónico es el email real. si ya existe toma el mas actual para registro final."
const dataRows = lines.slice(1);
const agentsMap = new Map(); // key -> agent object. Key by DNI (cleaned) or N° Empleado

function formatBirthDate(rawDate) {
  if (!rawDate) return '';
  const parts = rawDate.split('/');
  if (parts.length === 3) {
    let day = parts[0].padStart(2, '0');
    let month = parts[1].padStart(2, '0');
    let year = parts[2];
    if (year.length === 2) year = '19' + year;
    return `${year}-${month}-${day}`;
  }
  return rawDate;
}

for (let i = dataRows.length - 1; i >= 0; i--) {
  const row = parseCSVLine(dataRows[i]);
  if (!row || row.length < 5) continue;

  const emailReal = (row[1] || '').trim().toLowerCase();
  let apellidos = (row[2] || '').trim();
  let nombres = (row[3] || '').trim();
  let rawDni = (row[4] || '').trim();
  let rawEmpNum = (row[5] || '').trim();
  let telefono = (row[6] || '').trim();
  let lugarNacimiento = (row[8] || '').trim();
  let fechaNacimiento = (row[9] || '').trim();

  // Clean DNI: remove dots, spaces
  const cleanDni = rawDni.replace(/[.\s]/g, '');
  const cleanEmpNum = rawEmpNum.replace(/[.\s]/g, '');

  if (!cleanDni && !cleanEmpNum) continue;

  // Clean names
  apellidos = apellidos.replace(/^"|"$/g, '').trim();
  nombres = nombres.replace(/^"|"$/g, '').trim();

  // Primary key for deduplication: cleanDni (or cleanEmpNum if no dni)
  const key = cleanDni || cleanEmpNum;

  // "si ya existe toma el mas actual para registro final"
  // Since we process from bottom to top, the first time we see this key, it is the most recent (bottom-most) entry!
  if (agentsMap.has(key)) {
    continue;
  }

  // Also check if employee number was already used
  if (cleanEmpNum && agentsMap.has('EMP_' + cleanEmpNum)) {
    continue;
  }

  const fullName = `${apellidos}, ${nombres}`;
  const formattedDob = formatBirthDate(fechaNacimiento);

  const agentObj = {
    id: `agent-${cleanEmpNum || cleanDni || Date.now()}`,
    apellidos: apellidos || 'Sin Apellido',
    nombres: nombres || 'Sin Nombre',
    fullName: fullName || 'Sin Nombre',
    employeeNumber: cleanEmpNum || cleanDni,
    dni: cleanDni,
    telefono: telefono,
    email: emailReal,
    fechaNacimiento: formattedDob,
    lugarNacimiento: lugarNacimiento,
    activo: true,
    hasAssignedPost: false,
    createdAt: new Date().toISOString(),
  };

  agentsMap.set(key, agentObj);
  if (cleanEmpNum) {
    agentsMap.set('EMP_' + cleanEmpNum, agentObj);
  }
}

// Extract unique agents
const uniqueAgents = [];
const seenIds = new Set();
for (const [k, v] of agentsMap.entries()) {
  if (!k.startsWith('EMP_') && !seenIds.has(v.id)) {
    seenIds.add(v.id);
    uniqueAgents.push(v);
  }
}

console.log('Unique agents parsed from bottom to top:', uniqueAgents.length);
fs.writeFileSync(path.join(__dirname, 'imported_agents.json'), JSON.stringify(uniqueAgents, null, 2));
