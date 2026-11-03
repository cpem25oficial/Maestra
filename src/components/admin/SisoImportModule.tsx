import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  History, 
  Search, 
  Calendar, 
  Users, 
  Eye, 
  Layers, 
  Check, 
  Info,
  Clock,
  ClipboardPaste,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { SisoLicense, SisoImportHistory } from '../../types';
import { dataService, formatDMY, formatDateTimeDMY, parseCSVLine, normalizeSisoDate } from '../../services/dataService';
import { authService } from '../../services/authService';

export const SisoImportModule: React.FC = () => {
  const [sisoLicenses, setSisoLicenses] = useState<SisoLicense[]>(() => dataService.getSisoLicenses());
  const [importHistory, setImportHistory] = useState<SisoImportHistory[]>(() => dataService.getSisoImports());
  const currentUser = authService.getCurrentUser();

  // Mode: 'file' | 'paste'
  const [importMode, setImportMode] = useState<'file' | 'paste'>('file');
  const [pastedText, setPastedText] = useState<string>('');

  // Wizard / Import state (Section 22)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rawCsvText, setRawCsvText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [previewDetected, setPreviewDetected] = useState<number>(0);
  const [previewErrors, setPreviewErrors] = useState<string[]>([]);
  const [previewWarnings, setPreviewWarnings] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const [previewNewCount, setPreviewNewCount] = useState<number>(0);
  const [previewUpdateCount, setPreviewUpdateCount] = useState<number>(0);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    created: number;
    updated: number;
    detected: number;
    errors: string[];
  } | null>(null);

  // Table search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [justificaFilter, setJustificaFilter] = useState('TODOS');

  const refreshData = () => {
    setSisoLicenses([...dataService.getSisoLicenses()]);
    setImportHistory([...dataService.getSisoImports()]);
  };

  // Section 22: Template download with exact required original headers separated by semicolon
  const handleDownloadTemplate = () => {
    const headers = [
      'ID',
      'NRO EMPLEADO',
      'DNI',
      'NOMBRE',
      'EMAIL',
      'TIPO',
      'CARGA',
      'DESDE',
      'HASTA',
      'DIAS',
      'JUSTIFICA',
      'COD LICENCIA',
      'FECHA ALTA',
      'AUDITOR',
      'PATOLOGIA',
      'FECHA AUDITORIA',
      'MEDICO_INTERVINIENTE',
      'MATRICULA_MEDICO_INTERVINIENTE',
      'ESTABLECIMIENTOS O SECTOR',
    ];

    const sampleRows = [
      '1217795;39254;31020723;RAMIREZ, Andrea Julieta;andrea.julieta.ramirez@gmail.com;ENFERMEDAD;06-10-2026;05-10-2026;07-10-2026;3;SIN AUDITAR;7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL;;;;;;;CPEM N° 25',
      '1217634;45738;40035304;AgustÍn Maximiliano GUERRA;agusguerra97@gmail.com;ENFERMEDAD;05-10-2026;05-10-2026;06-10-2026;2;SIN AUDITAR;7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL;;;;;;;CPEM N° 25',
      '1217532;39624;39507139;FERNANDEZ PEREZ, Nahuel Gustavo;docentenahuelf@gmail.com;ENFERMEDAD;05-10-2026;05-10-2026;06-10-2026;2;JUSTIFICADO;4A - CORTO TRATAM.DOCENTE (Cód.RRHH: 2404A);;;;;;;CPEM N° 25',
    ];

    const csvContent = headers.join(';') + '\n' + sampleRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Plantilla_SISO_CPEM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cargar datos de prueba oficiales provistos por la institución
  const handleLoadSampleData = () => {
    const sample = `ID;NRO EMPLEADO;DNI;NOMBRE;EMAIL;TIPO;CARGA;DESDE;HASTA;DIAS;JUSTIFICA;COD LICENCIA;FECHA ALTA;AUDITOR;PATOLOGIA;FECHA AUDITORIA;MEDICO_INTERVINIENTE;MATRICULA_MEDICO_INTERVINIENTE;ESTABLECIMIENTOS O SECTOR.
1217795;39254;31020723;RAMIREZ, Andrea Julieta;andrea.julieta.ramirez@gmail.com;ENFERMEDAD;06-10-2026;05-10-2026;07-10-2026;3;SIN AUDITAR;7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL;;
1217634;45738;40035304;AgustÍn Maximiliano GUERRA;agusguerra97@gmail.com;ENFERMEDAD;05-10-2026;05-10-2026;06-10-2026;2;SIN AUDITAR;7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL;;
1217532;39624;39507139;FERNANDEZ PEREZ, Nahuel Gustavo;docentenahuelf@gmail.com;ENFERMEDAD;05-10-2026;05-10-2026;06-10-2026;2;JUSTIFICADO;4A - CORTO TRATAM.DOCENTE (Cód.RRHH: 2404A);;`;
    setPastedText(sample);
    setImportMode('paste');
    setFileName('Ejemplo_Oficial_SISO.csv');
    setRawCsvText(sample);
    analyzeCsv(sample, 'Ejemplo_Oficial_SISO.csv');
  };

  // File Select and Parse
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setRawCsvText(text);
      analyzeCsv(text, file.name);
    };
    reader.readAsText(file);
  };

  // Analyze Pasted Text Directly
  const handleAnalyzePastedText = () => {
    if (!pastedText.trim()) {
      alert('Por favor ingrese o pegue el contenido CSV.');
      return;
    }
    setFileName('Importacion_Manual_SISO.csv');
    setRawCsvText(pastedText);
    setImportResult(null);
    analyzeCsv(pastedText, 'Importacion_Manual_SISO.csv');
  };

  // Pre-analyze CSV (Validate headers, count duplicates, preview counts)
  const analyzeCsv = (text: string, fName: string) => {
    const analysis = dataService.analyzeSisoCsv(text);
    setPreviewDetected(analysis.detected);
    setPreviewNewCount(analysis.newCount);
    setPreviewUpdateCount(analysis.updateCount);
    setPreviewErrors(analysis.errors);
    setPreviewWarnings(analysis.warnings);
    setPreviewRows(analysis.previewRows);
    setIsAnalyzed(true);
  };

  // Execute Import
  const handleExecuteImport = () => {
    if (!rawCsvText || !fileName) return;

    setIsImporting(true);

    try {
      const res = dataService.importSisoCsv(
        rawCsvText,
        fileName,
        currentUser?.email || 'admin@cpem.edu.ar'
      );

      setImportResult({
        success: res.success,
        created: res.created,
        updated: res.updated,
        detected: res.detected,
        errors: res.errors,
      });

      refreshData();
    } catch (err: any) {
      setImportResult({
        success: false,
        created: 0,
        updated: 0,
        detected: 0,
        errors: [err.message || 'Error inesperado durante la importación.'],
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleResetImport = () => {
    setSelectedFile(null);
    setRawCsvText('');
    setPastedText('');
    setFileName('');
    setIsAnalyzed(false);
    setImportResult(null);
    setPreviewErrors([]);
    setPreviewWarnings([]);
    setPreviewRows([]);
  };

  // Filter SISO Licenses
  const filteredSisoLicenses = sisoLicenses.filter((lic) => {
    if (justificaFilter !== 'TODOS') {
      if (justificaFilter === 'JUSTIFICADO' && !lic.justifica.toUpperCase().includes('JUSTIFICADO')) return false;
      if (justificaFilter === 'SIN AUDITAR' && !lic.justifica.toUpperCase().includes('SIN AUDITAR')) return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      lic.nombre.toLowerCase().includes(q) ||
      lic.nroEmpleado.toLowerCase().includes(q) ||
      lic.dni.includes(q) ||
      lic.id.toLowerCase().includes(q) ||
      lic.tipo.toLowerCase().includes(q) ||
      lic.codLicencia.toLowerCase().includes(q) ||
      lic.justifica.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            <span>Módulo de Importación SISO</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Carga continua de licencias oficiales mediante archivos CSV con formato oficial delimitado por punto y coma (;).
          </p>
        </div>

        <button
          onClick={handleDownloadTemplate}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Descargar Plantilla CSV Oficial (;)</span>
        </button>
      </div>

      {/* IMPORT WIZARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <span>Importar Licencias SISO</span>
          </h2>

          {/* Mode selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setImportMode('file');
                if (!isAnalyzed) handleResetImport();
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                importMode === 'file' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Subir Archivo .CSV
            </button>
            <button
              onClick={() => {
                setImportMode('paste');
                if (!isAnalyzed) handleResetImport();
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                importMode === 'paste' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pegar Texto CSV Directo
            </button>
          </div>
        </div>

        {!isAnalyzed ? (
          importMode === 'file' ? (
            /* File upload dropzone */
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-6 sm:p-8 text-center transition-colors relative">
              <input
                type="file"
                accept=".csv,text/csv,text/plain"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-800">
                  Seleccione o arrastre el archivo CSV emitido por SISO
                </h3>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">
                  Compatible con el formato oficial delimitado por punto y coma (;) con columnas: ID, NRO EMPLEADO, DNI, NOMBRE, TIPO, CARGA, DESDE, HASTA, etc.
                </p>
              </div>
            </div>
          ) : (
            /* Direct text paste */
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Pegue aquí el texto de licencias SISO (con encabezados o directamente filas delimitadas por ';'):
                </label>
                <button
                  type="button"
                  onClick={handleLoadSampleData}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors self-start sm:self-auto border border-indigo-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Cargar Ejemplos Oficiales de Prueba (3 casos)</span>
                </button>
              </div>
              <textarea
                rows={7}
                placeholder={`ID;NRO EMPLEADO;DNI;NOMBRE;EMAIL;TIPO;CARGA;DESDE;HASTA;DIAS;JUSTIFICA;COD LICENCIA;FECHA ALTA;AUDITOR;PATOLOGIA;FECHA AUDITORIA;MEDICO_INTERVINIENTE;MATRICULA_MEDICO_INTERVINIENTE;ESTABLECIMIENTOS O SECTOR\n1217795;39254;31020723;RAMIREZ, Andrea Julieta;andrea.julieta.ramirez@gmail.com;ENFERMEDAD;06-10-2026;05-10-2026;07-10-2026;3;SIN AUDITAR;7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL;;\n1217634;45738;40035304;AgustÍn Maximiliano GUERRA;agusguerra97@gmail.com;ENFERMEDAD;05-10-2026;05-10-2026;06-10-2026;2;SIN AUDITAR;7000 - PENDIENTE DE AUDITAR MEDICINA LABORAL;;\n1217532;39624;39507139;FERNANDEZ PEREZ, Nahuel Gustavo;docentenahuelf@gmail.com;ENFERMEDAD;05-10-2026;05-10-2026;06-10-2026;2;JUSTIFICADO;4A - CORTO TRATAM.DOCENTE (Cód.RRHH: 2404A);;`}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-300 font-mono text-xs focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleAnalyzePastedText}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <ClipboardPaste className="w-4 h-4" />
                  <span>Analizar y Validar Texto Pegado</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  Admite texto con encabezados o solo filas de datos.
                </span>
              </div>
            </div>
          )
        ) : (
          /* Step: Analysis & Confirmation Summary */
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Origen de los datos:</span>
                <span className="font-mono font-bold text-slate-800">{fileName}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200/60 text-center font-mono">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 block">Detectados</span>
                  <span className="text-lg font-bold text-slate-900">{previewDetected}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-xs text-emerald-600 block">Nuevos a crear</span>
                  <span className="text-lg font-bold text-emerald-700">+{previewNewCount}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-xs text-blue-600 block">Actualizaciones</span>
                  <span className="text-lg font-bold text-blue-700">{previewUpdateCount}</span>
                </div>
              </div>
            </div>

            {/* Warnings check */}
            {previewWarnings.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Observaciones leves detectadas ({previewWarnings.length}):
                </span>
                <ul className="list-disc pl-5 space-y-0.5 font-mono text-[11px] text-amber-700">
                  {previewWarnings.slice(0, 3).map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                  {previewWarnings.length > 3 && (
                    <li>...y {previewWarnings.length - 3} avisos más.</li>
                  )}
                </ul>
              </div>
            )}

            {/* Errors check */}
            {previewErrors.length > 0 ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-2">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Se detectaron errores en el archivo que impiden la carga:
                </span>
                <ul className="list-disc pl-5 space-y-0.5 font-mono text-[11px]">
                  {previewErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Columnas validadas correctamente. Registros listos para procesar.</span>
              </div>
            )}

            {/* Preview rows table */}
            {previewRows.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Vista previa de licencias detectadas ({previewRows.length} mostradas):</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-48">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase sticky top-0">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Agente</th>
                        <th className="p-2">Legajo / DNI</th>
                        <th className="p-2">Período</th>
                        <th className="p-2 text-center">Días</th>
                        <th className="p-2">Código / Justifica</th>
                        <th className="p-2 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {previewRows.map((r, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="p-2 font-mono font-bold text-emerald-700">#{r.id}</td>
                          <td className="p-2 font-medium text-slate-900">{r.nombre}</td>
                          <td className="p-2 font-mono text-slate-600">{r.nroEmpleado} • {r.dni}</td>
                          <td className="p-2 font-mono text-slate-700 whitespace-nowrap">{formatDMY(r.desde)} al {formatDMY(r.hasta)}</td>
                          <td className="p-2 text-center font-bold font-mono">{r.dias}</td>
                          <td className="p-2">
                            <span className="block text-[11px] font-semibold text-slate-800 truncate max-w-xs">{r.codLicencia}</span>
                            <span className="text-[10px] text-slate-500">{r.justifica}</span>
                          </td>
                          <td className="p-2 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              r.isExisting ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {r.isExisting ? 'Actualizar' : 'Nuevo'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Final result if executed */}
            {importResult && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                  importResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>¡Importación SISO procesada con éxito!</span>
                </div>
                <p className="text-xs">
                  Se incorporaron <strong>{importResult.created}</strong> registros nuevos y se actualizaron{' '}
                  <strong>{importResult.updated}</strong> licencias existentes.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetImport}
                disabled={isImporting}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancelar / Cargar otros datos
              </button>

              {!importResult && previewErrors.length === 0 && previewDetected > 0 && (
                <button
                  type="button"
                  onClick={handleExecuteImport}
                  disabled={isImporting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  {isImporting ? (
                    <span>Procesando registros...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirmar y Ejecutar Importación ({previewDetected} licencias)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SISO LICENSES TABLE & SEARCH */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>Padrón de Licencias Importadas de SISO</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Registros médicos y certificaciones sincronizados desde la plataforma oficial SISO.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter by Justifica */}
            <select
              value={justificaFilter}
              onChange={(e) => setJustificaFilter(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white font-medium text-slate-700"
            >
              <option value="TODOS">Todos los Estados</option>
              <option value="JUSTIFICADO">Solo Justificado</option>
              <option value="SIN AUDITAR">Solo Sin Auditar</option>
            </select>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar por agente, DNI, legajo o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse min-w-[880px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3">ID SISO</th>
                <th className="py-2.5 px-3">AGENTE (NOMBRE Y APELLIDO)</th>
                <th className="py-2.5 px-3">LEGAJO / DNI</th>
                <th className="py-2.5 px-3">CÓDIGO / TIPO LICENCIA</th>
                <th className="py-2.5 px-3">PERÍODO (DESDE - HASTA)</th>
                <th className="py-2.5 px-2 text-center">DÍAS</th>
                <th className="py-2.5 px-3">ESTADO / AUDITORÍA</th>
                <th className="py-2.5 px-3">SECTOR / CARGA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredSisoLicenses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No se encontraron licencias SISO registradas con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredSisoLicenses.map((lic) => {
                  const isJustificado = lic.justifica.toUpperCase().includes('JUSTIFICADO');
                  const isSinAuditar = lic.justifica.toUpperCase().includes('SIN AUDITAR');

                  return (
                    <tr key={lic.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">
                        #{lic.id}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        <div>{lic.nombre}</div>
                        {lic.email && <div className="text-[10px] text-slate-400 font-normal">{lic.email}</div>}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">
                        {lic.nroEmpleado} • {lic.dni}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-slate-800 block text-xs">{lic.codLicencia}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{lic.tipo}</span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap font-mono text-slate-700">
                        {formatDMY(lic.desde)} al {formatDMY(lic.hasta)}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full font-bold font-mono text-xs bg-slate-100 text-slate-800">
                          {lic.dias}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] uppercase border ${
                          isJustificado 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : isSinAuditar 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {lic.justifica}
                        </span>
                        {lic.auditor && (
                          <span className="block text-[10px] text-slate-400 mt-0.5">Auditor: {lic.auditor}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-600">
                        <div>{lic.establecimientosOSector || 'CPEM N° 25'}</div>
                        {lic.carga && <div className="text-[10px] text-slate-400 font-mono">Carga: {lic.carga}</div>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMPORT HISTORY */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <History className="w-4 h-4 text-indigo-600" />
          <span>Historial de Importaciones Realizadas</span>
        </h3>

        {importHistory.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No hay importaciones registradas.</p>
        ) : (
          <div className="space-y-2">
            {importHistory.map((h) => (
              <div key={h.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{h.nombreArchivo}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {h.id}
                    </span>
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    Procesado el {formatDateTimeDMY(h.fecha)} por {h.usuario}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    +{h.registrosNuevos} creados
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                    {h.registrosActualizados} actualizados
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
