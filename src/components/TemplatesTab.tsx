import { getTemplatesByCategory } from '@/lib/templates';
import { Template } from '@/types';
import TemplateCard from './ui/TemplateCard';

interface TemplatesTabProps {
  applyTemplate: (template: Template) => void;
}

export default function TemplatesTab({ applyTemplate }: TemplatesTabProps) {
  const templateCategories = getTemplatesByCategory();

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Prompt Templates</h2>
      
      {Object.entries(templateCategories).map(([category, categoryTemplates]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} applyTemplate={applyTemplate} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}