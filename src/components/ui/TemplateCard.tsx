import { Template } from '@/types';
import Card from './Card';

interface TemplateCardProps {
  template: Template;
  applyTemplate: (template: Template) => void;
}

export default function TemplateCard({ template, applyTemplate }: TemplateCardProps) {
  return (
    <Card>
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h4 className="text-xl font-semibold mb-2">{template.name}</h4>
          <p className="text-gray-600 mb-4">{template.description}</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Example Use Case:</p>
            <p className="text-gray-600 italic text-sm">{template.example}</p>
          </div>
        </div>
        <button
          onClick={() => applyTemplate(template)}
          className="w-full btn-primary text-sm mt-auto"
        >
          Use This Template
        </button>
      </div>
    </Card>
  );
}