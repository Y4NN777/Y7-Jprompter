import { Template, TemplateCategory } from '@/types';

export const templates: Template[] = [
  {
    id: 'text-summarization',
    name: 'Text Summarization',
    description: 'Summarize content with specific requirements and structured output',
    category: 'Analysis',
    structure: {
      task: 'summarize_text',
      input: {
        text: 'text_to_summarize',
        source_type: 'document | article | report | email'
      },
      output_format: {
        summary: 'string',
        key_points: ['array', 'of', 'main', 'points'],
        word_count: 'number',
        reading_time: 'string'
      },
      requirements: {
        max_words: 150,
        tone: 'professional | neutral | casual',
        include_statistics: true,
        preserve_context: true
      },
      constraints: {
        focus_areas: ['main_arguments', 'conclusions', 'data_points'],
        exclude: ['minor_details', 'tangential_information']
      }
    },
    example: 'Summarize this quarterly report and highlight the key financial metrics and growth trends'
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'Generate content with specific parameters and target audience focus',
    category: 'Creative',
    structure: {
      task: 'create_content',
      content_type: 'blog_post | article | social_media | newsletter',
      topic: 'string',
      target_audience: {
        demographics: 'string',
        expertise_level: 'beginner | intermediate | expert',
        interests: ['array', 'of', 'interests']
      },
      output_format: {
        title: 'string',
        introduction: 'string',
        main_content: {
          sections: ['array', 'of', 'sections'],
          word_count_per_section: 'number'
        },
        conclusion: 'string',
        call_to_action: 'string',
        tags: ['array'],
        seo_keywords: ['array']
      },
      requirements: {
        tone: 'professional | conversational | authoritative | friendly',
        length: 'short (300-500) | medium (500-1000) | long (1000+)',
        include_examples: true,
        add_visual_suggestions: true
      }
    },
    example: 'Write a comprehensive blog post about sustainable technology trends for business decision-makers'
  },
  {
    id: 'data-extraction',
    name: 'Data Extraction & Analysis',
    description: 'Extract structured data from unstructured text with validation',
    category: 'Analysis',
    structure: {
      task: 'extract_and_analyze_data',
      input: {
        source_text: 'string',
        data_type: 'customer_feedback | financial_report | survey_response | document'
      },
      extract_fields: {
        entities: {
          people: ['names', 'roles'],
          organizations: ['companies', 'departments'],
          locations: ['cities', 'countries'],
          dates: ['events', 'deadlines'],
          amounts: ['financial', 'quantities']
        },
        sentiment: {
          overall: 'positive | negative | neutral',
          confidence: 'number (0-10)',
          specific_aspects: ['object']
        },
        topics: ['primary', 'secondary', 'tags'],
        key_metrics: ['performance', 'indicators']
      },
      output_format: {
        structured_data: 'object',
        analysis_summary: 'string',
        confidence_scores: 'object',
        recommendations: ['array']
      },
      validation_rules: {
        required_fields: ['entities', 'sentiment', 'topics'],
        date_format: 'YYYY-MM-DD',
        number_format: 'decimal',
        confidence_threshold: 0.7
      }
    },
    example: 'Extract key insights, sentiment, and actionable data from customer feedback emails'
  },
  {
    id: 'code-generation',
    name: 'Code Generation',
    description: 'Generate clean, documented code with specific requirements',
    category: 'Development',
    structure: {
      task: 'generate_code',
      programming_language: 'javascript | python | typescript | java | go',
      functionality: {
        description: 'string',
        input_parameters: [
          {
            name: 'string',
            type: 'string',
            required: 'boolean',
            description: 'string'
          }
        ],
        expected_output: {
          type: 'string',
          format: 'string',
          examples: ['array']
        }
      },
      requirements: {
        style_guide: 'standard | airbnb | google | custom',
        include_error_handling: true,
        add_input_validation: true,
        include_unit_tests: false,
        documentation_level: 'basic | comprehensive'
      },
      constraints: {
        max_lines: 100,
        dependencies: ['allowed', 'libraries'],
        performance_requirements: 'standard | optimized',
        compatibility: ['browser | node | both']
      },
      output_format: {
        main_code: 'string',
        documentation: 'string',
        usage_examples: ['array'],
        test_cases: ['array (if requested)']
      }
    },
    example: 'Create a TypeScript function to validate and sanitize email addresses with comprehensive error handling'
  },
  {
    id: 'decision-analysis',
    name: 'Decision Analysis',
    description: 'Structured decision-making with criteria evaluation',
    category: 'Business',
    structure: {
      task: 'analyze_decision',
      context: {
        situation: 'string',
        stakeholders: ['array'],
        timeline: 'string',
        constraints: ['budget', 'time', 'resources']
      },
      options: [
        {
          name: 'string',
          description: 'string',
          pros: ['array'],
          cons: ['array'],
          cost: 'number | range',
          feasibility: 'high | medium | low'
        }
      ],
      evaluation_criteria: {
        primary: ['most', 'important', 'factors'],
        secondary: ['additional', 'considerations'],
        weights: {
          cost: 'number (0-10)',
          time: 'number (0-10)',
          quality: 'number (0-10)',
          risk: 'number (0-10)'
        }
      },
      output_format: {
        recommendation: 'string',
        reasoning: 'detailed explanation',
        risk_assessment: 'object',
        next_steps: ['actionable', 'steps'],
        alternatives: ['backup', 'options']
      }
    },
    example: 'Analyze technology stack options for a new web application considering cost, scalability, and team expertise'
  },
  {
    id: 'research-synthesis',
    name: 'Research Synthesis',
    description: 'Combine multiple sources into comprehensive insights',
    category: 'Analysis',
    structure: {
      task: 'synthesize_research',
      input_sources: [
        {
          type: 'academic_paper | article | report | survey',
          title: 'string',
          key_findings: ['array'],
          credibility: 'high | medium | low'
        }
      ],
      research_question: 'string',
      synthesis_approach: 'comparative | thematic | chronological | methodological',
      output_format: {
        executive_summary: 'string',
        key_themes: [
          {
            theme: 'string',
            supporting_evidence: ['sources'],
            contradictions: ['conflicting_findings']
          }
        ],
        gaps_identified: ['areas', 'needing', 'more', 'research'],
        conclusions: 'synthesized insights',
        recommendations: ['actionable', 'next', 'steps']
      },
      quality_criteria: {
        source_diversity: 'ensure varied perspectives',
        recency: 'prefer recent studies',
        methodology_strength: 'consider research quality',
        relevance_score: 'number (1-10)'
      }
    },
    example: 'Synthesize research findings on remote work productivity from multiple studies and reports'
  }
];

export function getTemplatesByCategory(): TemplateCategory {
  return templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as TemplateCategory);
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(template => template.id === id);
}

export function searchTemplates(query: string): Template[] {
  const lowercaseQuery = query.toLowerCase();
  return templates.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.category.toLowerCase().includes(lowercaseQuery)
  );
}