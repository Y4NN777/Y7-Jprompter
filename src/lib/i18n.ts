export type Language = 'en' | 'fr';

export const jsonKeyTranslations: Record<Language, Record<string, string>> = {
  en: {
    task: 'task',
    input: 'input',
    output_format: 'output_format',
    requirements: 'requirements',
    context: 'context',
    constraints: 'constraints',
    examples: 'examples',
  },
  fr: {
    task: 'tâche',
    input: 'entrée',
    output_format: 'format_de_sortie',
    requirements: 'exigences',
    context: 'contexte',
    constraints: 'contraintes',
    examples: 'exemples',
  },
};

export function detectLanguage(text: string): Language {
  // Simple language detection based on French characters and common words
  const frenchChars = /[àâäéèêëïîôöùûüÿñç]/i;
  const frenchWords = /\b(le|la|les|et|ou|mais|avec|pour|dans|sur|par|comme|si|alors|donc|or|ni|car)\b/i;

  if (frenchChars.test(text) || frenchWords.test(text)) {
    return 'fr';
  }
  return 'en';
}

export function getTranslatedKeys(language: Language): Record<string, string> {
  return jsonKeyTranslations[language];
}