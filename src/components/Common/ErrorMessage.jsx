import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start">
        <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-red-800 font-semibold mb-1">Terjadi Kesalahan</h3>
          <p className="text-red-700">{message}</p>
          {onRetry && (
            <Button
              variant="danger"
              icon={RefreshCw}
              onClick={onRetry}
              className="mt-4"
              size="sm"
            >
              Coba Lagi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;