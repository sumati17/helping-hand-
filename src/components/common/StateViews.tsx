import React from 'react';
import { AlertCircle, RefreshCw, FolderSearch, CheckCircle2 } from 'lucide-react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading services...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500 gap-3">
      <RefreshCw className="w-8 h-8 animate-spin text-[#003426]" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export const EmptyState: React.FC<{
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ title, description, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-2xl border border-slate-200 shadow-xs max-w-md mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
        <FolderSearch className="w-7 h-7" />
      </div>
      <h3 className="font-display font-bold text-base text-slate-800">{title}</h3>
      {description && <p className="text-xs text-slate-500 mt-1 max-w-xs">{description}</p>}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-[#003426] text-white text-xs font-semibold rounded-xl hover:bg-[#0f4c3a] transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const ErrorBanner: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => {
  return (
    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start justify-between gap-3 text-sm">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-bold text-red-900 underline hover:text-red-700 shrink-0"
        >
          Retry
        </button>
      )}
    </div>
  );
};
