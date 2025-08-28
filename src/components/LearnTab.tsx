import Card from './ui/Card';

export default function LearnTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Master JSON Prompting</h2>
      
      <div className="space-y-8">
        <Card>
          <h3 className="text-2xl font-semibold mb-4">What is JSON Prompting?</h3>
          <p className="text-gray-700 mb-4">
            JSON prompting is a technique that structures your AI prompts using JSON format, making them more precise, 
            consistent, and powerful. Instead of writing loose natural language, you define exactly what you want using 
            key-value pairs.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <strong>Key Benefits:</strong> Better consistency, clearer instructions, structured outputs, easier automation
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold mb-4">Best Practices</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-2xl">🎯</div>
              <div>
                <strong>Be Specific:</strong> Define exact output format, length, and requirements
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">📝</div>
              <div>
                <strong>Structure Everything:</strong> Break complex tasks into clear components
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">🔄</div>
              <div>
                <strong>Use Examples:</strong> Include sample inputs and expected outputs
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">⚡</div>
              <div>
                <strong>Test & Iterate:</strong> Refine your prompts based on results
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold mb-4">Common Patterns</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Analysis Tasks</h4>
              <code className="text-sm text-gray-700">
                task, input, analysis_type, output_format, metrics
              </code>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Content Creation</h4>
              <code className="text-sm text-gray-700">
                content_type, topic, audience, tone, length, requirements
              </code>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Data Processing</h4>
              <code className="text-sm text-gray-700">
                input_data, operations, filters, output_schema, validation
              </code>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Decision Making</h4>
              <code className="text-sm text-gray-700">
                context, criteria, options, weights, recommendation_format
              </code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}