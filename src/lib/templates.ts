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
    id: 'story-generator',
    name: 'Story Generator',
    description: 'Generate a short story with specific characters, setting, and plot points',
    category: 'Creative',
    structure: {
      task: 'generate_story',
      genre: 'sci-fi | fantasy | mystery | romance | horror',
      setting: {
        time_period: 'string',
        location: 'string',
        atmosphere: 'string'
      },
      characters: [
        {
          name: 'string',
          role: 'protagonist | antagonist | supporting',
          motivation: 'string',
          conflict: 'string'
        }
      ],
      plot: {
        inciting_incident: 'string',
        rising_action: ['array', 'of', 'events'],
        climax: 'string',
        falling_action: ['array', 'of', 'events'],
        resolution: 'string'
      },
      output_format: {
        title: 'string',
        story: 'string',
        word_count: 'number'
      }
    },
    example: 'Write a fantasy story about a reluctant hero who must find a mythical creature to save their village'
  },
  {
    id: 'email-campaign',
    name: 'Email Campaign',
    description: 'Create a multi-email campaign for a product launch or promotion',
    category: 'Creative',
    structure: {
      task: 'create_email_campaign',
      product: {
        name: 'string',
        description: 'string',
        target_audience: 'string'
      },
      campaign_goals: ['awareness', 'conversions', 'engagement'],
      emails: [
        {
          sequence: 1,
          subject: 'string',
          body: 'string',
          call_to_action: 'string'
        },
        {
          sequence: 2,
          subject: 'string',
          body: 'string',
          call_to_action: 'string'
        },
        {
          sequence: 3,
          subject: 'string',
          body: 'string',
          call_to_action: 'string'
        }
      ],
      output_format: {
        campaign_name: 'string',
        emails: ['array', 'of', 'email', 'objects']
      }
    },
    example: 'Create a 3-part email campaign for the launch of a new productivity app'
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
    id: 'api-design',
    name: 'API Endpoint Design',
    description: 'Design a RESTful API endpoint with request and response specifications',
    category: 'Development',
    structure: {
      task: 'design_api_endpoint',
      endpoint: {
        path: '/users/{id}',
        method: 'GET | POST | PUT | DELETE',
        description: 'string'
      },
      request: {
        headers: ['array', 'of', 'headers'],
        path_parameters: ['array', 'of', 'path', 'parameters'],
        query_parameters: ['array', 'of', 'query', 'parameters'],
        body: 'json_schema'
      },
      response: {
        success_status_code: 'number',
        success_body: 'json_schema',
        error_status_codes: ['array', 'of', 'numbers'],
        error_body: 'json_schema'
      },
      output_format: {
        openapi_spec: 'yaml | json'
      }
    },
    example: 'Design a POST endpoint for creating a new user with request body validation and success/error responses'
  },
  {
    id: 'database-schema',
    name: 'Database Schema Design',
    description: 'Design a database schema for a new feature or application',
    category: 'Development',
    structure: {
      task: 'design_database_schema',
      database_type: 'sql | nosql',
      tables: [
        {
          name: 'string',
          columns: [
            {
              name: 'string',
              type: 'string',
              constraints: ['primary_key', 'foreign_key', 'not_null', 'unique']
            }
          ],
          relationships: [
            {
              table: 'string',
              type: 'one-to-one | one-to-many | many-to-many'
            }
          ]
        }
      ],
      output_format: {
        sql_ddl: 'string',
        erd_description: 'string'
      }
    },
    example: 'Design a SQL schema for a simple e-commerce application with users, products, and orders tables'
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
    id: 'swot-analysis',
    name: 'SWOT Analysis',
    description: 'Conduct a SWOT analysis for a business or project',
    category: 'Business',
    structure: {
      task: 'conduct_swot_analysis',
      subject: {
        name: 'string',
        description: 'string'
      },
      strengths: ['array', 'of', 'strengths'],
      weaknesses: ['array', 'of', 'weaknesses'],
      opportunities: ['array', 'of', 'opportunities'],
      threats: ['array', 'of', 'threats'],
      output_format: {
        summary: 'string',
        strategic_recommendations: ['array']
      }
    },
    example: 'Conduct a SWOT analysis for a new startup in the food delivery industry'
  },
  {
    id: 'meeting-agenda',
    name: 'Meeting Agenda Generator',
    description: 'Create a detailed agenda for a business meeting',
    category: 'Business',
    structure: {
      task: 'generate_meeting_agenda',
      meeting: {
        title: 'string',
        date: 'string',
        time: 'string',
        attendees: ['array', 'of', 'names']
      },
      objectives: ['array', 'of', 'goals'],
      agenda_items: [
        {
          topic: 'string',
          presenter: 'string',
          duration: 'number (minutes)'
        }
      ],
      output_format: {
        agenda: 'string'
      }
    },
    example: 'Generate a meeting agenda for a quarterly review with the sales and marketing teams'
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