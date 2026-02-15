import { useState } from "react";

const LabPreview = ({ url, className = "" }) => {
  const [loaded, setLoaded] = useState(false);

  if (!url) return null;

  return (
    <div className={`relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 ${className}`}>
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-700 animate-pulse"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <div className="w-12 h-12 rounded-full border-2 border-slate-500 border-t-cyan-400 animate-spin" />
            <span className="text-sm">Chargement de la démo…</span>
          </div>
        </div>
      )}
      <iframe
        src={url}
        title="Lab preview"
        className="w-full h-full border-0"
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default LabPreview;
