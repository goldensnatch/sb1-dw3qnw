import React from 'react';
import { Button } from './ui/button';
import { Download, Trash2 } from 'lucide-react';
import type { ProjectStructure } from '../types/project';

interface ProjectInvoiceProps {
  structures: ProjectStructure[];
  onRemoveStructure: (id: string) => void;
}

const ProjectInvoice: React.FC<ProjectInvoiceProps> = ({ 
  structures,
  onRemoveStructure
}) => {
  const calculateTotal = () => {
    const subtotal = structures.reduce((sum, structure) => sum + structure.totalCost, 0);
    const tax = subtotal * 0.08; // 8% tax
    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const exportToCSV = () => {
    const { subtotal, tax, total } = calculateTotal();
    const csvContent = [
      ['Structure', 'Dimensions', 'Description', 'Total Cost'],
      ...structures.map(structure => [
        structure.type,
        `${structure.dimensions.length}'x${structure.dimensions.width}'x${structure.dimensions.height}'`,
        structure.description,
        structure.totalCost.toFixed(2)
      ]),
      ['', '', 'Subtotal:', subtotal.toFixed(2)],
      ['', '', 'Tax (8%):', tax.toFixed(2)],
      ['', '', 'Total:', total.toFixed(2)]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-invoice.csv';
    a.click();
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Project Invoice</h2>
      <div className="space-y-4">
        {structures.length > 0 ? (
          <>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {structures.map(structure => (
                <div 
                  key={structure.id}
                  className="flex items-start justify-between p-3 bg-gray-900 rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-white">{structure.type}</div>
                    <div className="text-sm text-gray-400">
                      {structure.dimensions.length}' x {structure.dimensions.width}' x {structure.dimensions.height}'
                    </div>
                    <div className="text-sm text-gray-300">{structure.description}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-white">
                      ${structure.totalCost.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveStructure(structure.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>${calculateTotal().subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax (8%):</span>
                <span>${calculateTotal().tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Total:</span>
                <span>${calculateTotal().total.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={exportToCSV} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Invoice
            </Button>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No structures added to the project yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInvoice;