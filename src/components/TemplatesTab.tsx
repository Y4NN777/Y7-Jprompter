import { getTemplatesByCategory } from '@/lib/templates';
import { Template } from '@/types';
import Card from './ui/Card';

interface TemplatesTabProps {
  applyTemplate: (template: Template) => void;
}

export default function TemplatesTab({ applyTemplate }: TemplatesTabProps) {
  const templateCategories = getTemplatesByCategory();

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Prompt Templates</h2>
      
      {Object.entries(templateCategories).map(([category, categoryTemplates]) => (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">{category}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {categoryTemplates.map((template) => (
              <Card key={template.id}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{template.name}</h4>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Example Use Case:</p>
                  <p className="text-gray-600 italic text-sm">{template.example}</p>
                </div>

                <button
                  onClick={() => applyTemplate(template)}
                  className="w-full btn-primary text-sm"
                >
                  Use This Template
                </button>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}