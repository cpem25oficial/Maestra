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

const p1 = fs.readFileSync(path.join(__dirname, 'agentes_part1.csv'), 'utf8').trim().split(/\r?\n/).slice(1);
const p2 = fs.readFileSync(path.join(__dirname, 'agentes_part2.csv'), 'utf8').trim().split(/\r?\n/);
const p3 = fs.readFileSync(path.join(__dirname, 'agentes_part3.csv'), 'utf8').trim().split(/\r?\n/);

const allRows = [...p1, ...p2, ...p3];
console.log('Total raw rows:', allRows.length);

function formatBirthDate(rawDate) {
  if (!rawDate) return '';
  const parts = rawDate.split('/');
  if (parts.length === 3) {
    let day = parts[0].padStart(2, '0');
    let month = parts[1].padStart(2, '0');
    let year = parts[2].trim();
    if (year.length === 2) {
      const num = parseInt(year, 10);
      year = num > 30 ? '19' + year : '20' + year;
    }
    return `${year}-${month}-${day}`;
  }
  return rawDate;
}

function cleanText(str) {
  if (!str) return '';
  return str.replace(/^["'\s]+|["'\s]+$/g, '').trim();
}

const agentsMap = new Map();
const duplicates = [];

// iterate bottom to top
// "importa a todos de abajo a arriba. toma los datos necesario unicamente. el Dirección de correo electrónico es el email real. si ya existe toma el mas actual para registro final."
for (let i = allRows.length - 1; i >= 0; i--) {
  const line = allRows[i].trim();
  if (!line) continue;
  const row = parseCSVLine(line);
  if (row.length < 5) continue;

  const timestamp = cleanText(row[0]);
  const emailReal = cleanText(row[1]).toLowerCase();
  let apellidos = cleanText(row[2]);
  let nombres = cleanText(row[3]);
  let rawDni = cleanText(row[4]);
  let rawEmpNum = cleanText(row[5]);
  let telefono = cleanText(row[6]);
  let lugarNacimiento = cleanText(row[8]);
  let fechaNacimiento = cleanText(row[9]);

  // Clean DNI & employee number
  const cleanDni = rawDni.replace(/[.\s-]/g, '');
  const cleanEmpNum = rawEmpNum.replace(/[.\s-]/g, '');

  if (!cleanDni && !cleanEmpNum) continue;

  const keyDni = cleanDni ? `DNI_${cleanDni}` : null;
  const keyEmp = cleanEmpNum ? `EMP_${cleanEmpNum}` : null;

  // Check if exists already (encountered earlier when going bottom to top, i.e. more recent)
  if ((keyDni && agentsMap.has(keyDni)) || (keyEmp && agentsMap.has(keyEmp))) {
    duplicates.push({ 
      timestamp, 
      name: `${apellidos}, ${nombres}`, 
      dni: cleanDni, 
      emp: cleanEmpNum 
    });
    continue;
  }

  const agent = {
    id: `agent-${cleanEmpNum || cleanDni}`,
    apellidos: apellidos || 'Sin Apellido',
    nombres: nombres || 'Sin Nombre',
    fullName: `${apellidos}, ${nombres}`,
    employeeNumber: cleanEmpNum || cleanDni,
    dni: cleanDni,
    telefono: telefono,
    email: emailReal,
    fechaNacimiento: formatBirthDate(fechaNacimiento),
    lugarNacimiento: lugarNacimiento,
    activo: true,
    hasAssignedPost: false
  };

  if (keyDni) agentsMap.set(keyDni, agent);
  if (keyEmp) agentsMap.set(keyEmp, agent);
  agentsMap.set(`ID_${agent.id}`, agent);
}

const uniqueAgents = Array.from(new Set(Array.from(agentsMap.values())));
console.log('Unique agents count:', uniqueAgents.length);
console.log('Duplicates skipped (older rows ignored):', duplicates.length);
console.log('Sample 3 agents (most recent from bottom):', JSON.stringify(uniqueAgents.slice(0, 3), null, 2));

// Save to JSON file
fs.writeFileSync(path.join(__dirname, 'agents_imported.json'), JSON.stringify(uniqueAgents, null, 2));
console.log('Saved to scripts/agents_imported.json successfully.');
