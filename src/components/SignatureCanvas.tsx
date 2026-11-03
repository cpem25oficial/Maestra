import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, PenTool, CheckCircle2, AlertCircle } from 'lucide-react';

interface SignatureCanvasProps {
  onSignatureChange: (dataUrl: string | null) => void;
  requiredError?: string | null;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSignatureChange,
  requiredError,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  // Setup canvas resolution and resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Save current content if any before resize
      const prevData = hasDrawn ? canvas.toDataURL() : null;

      canvas.width = rect.width * dpr;
      canvas.height = 220 * dpr; // standard height for signature pad
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `220px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#0f172a'; // dark slate ink

        if (prevData) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, rect.width, 220);
          };
          img.src = prevData;
        }
      }
    };

    setupCanvas();

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [hasDrawn]);

  // Pointer position helper
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getCoordinates(e);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    if (!hasDrawn) {
      setHasDrawn(true);
    }
    setStrokeCount((prev) => prev + 1);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // pointer capture might already be released
    }

    // Export signature as PNG data URL
    const dataUrl = canvas.toDataURL('image/png');
    onSignatureChange(dataUrl);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, 180);
    setHasDrawn(false);
    setStrokeCount(0);
    onSignatureChange(null);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <PenTool className="w-4 h-4 text-blue-600" />
          <span>Firma digital manuscrita <span className="text-red-500">*</span></span>
        </label>
        
        {/* Requirement 28: Botón: "Limpiar firma" */}
        <button
          type="button"
          onClick={handleClear}
          disabled={!hasDrawn}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          title="Borrar y volver a firmar"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Limpiar firma</span>
        </button>
      </div>

      {/* Signature Box */}
      <div 
        className={`relative w-full rounded-xl bg-white border-2 border-dashed transition-all overflow-hidden shadow-inner ${
          requiredError 
            ? 'border-red-400 bg-red-50/20 ring-2 ring-red-100' 
            : hasDrawn 
              ? 'border-emerald-400 bg-emerald-50/10' 
              : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        {/* Requirement 28: Texto exacto "Firme dentro del recuadro" */}
        {!hasDrawn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 select-none">
            <span className="text-sm font-medium text-slate-500 bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/80 shadow-xs">
              Firme dentro del recuadro
            </span>
            <span className="text-xs text-slate-400 mt-1">
              (Use su dedo, lápiz táctil o mouse)
            </span>
          </div>
        )}

        {/* Baseline guide */}
        <div className="absolute left-6 right-6 bottom-8 border-b border-slate-200/60 pointer-events-none select-none flex justify-between text-[10px] text-slate-300 font-mono">
          <span>✕ LÍNEA DE FIRMA</span>
          <span>VALIDEZ DIGITAL</span>
        </div>

        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="w-full h-[180px] touch-none cursor-crosshair relative z-10"
          style={{ touchAction: 'none' }}
        />

        {hasDrawn && (
          <div className="absolute top-2 right-2 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Firma registrada
            </span>
          </div>
        )}
      </div>

      {requiredError && (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {requiredError}
        </p>
      )}

      <p className="text-[11px] text-slate-500 leading-tight">
        La firma estampada tiene carácter de declaración jurada y quedará vinculada legalmente a la solicitud.
      </p>
    </div>
  );
};
