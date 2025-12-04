export type PromptIntent = {
  genres: string[];
  year: { min: number; max: number } | null;
  regions: string[];
  keywords: string[];
};

export type FactorResults = {
  genreMatched: boolean;
  yearMatched: boolean;
  regionMatched: boolean;
  matchedFactors: number;
  totalFactors: number;
};

export type ValidationScores = {
  genreMatch: boolean;
  genreMatchedList: string[];
  yearMatch: boolean;
  regionMatch: boolean;
  factors: FactorResults;
};

export type ItemValidation = {
  title: string;
  itemGenres: string[];
  itemYear: number | null;
  itemCountry: string | null;
  scores: ValidationScores;
  passed: boolean;
  matchDetails: string[];
  failureReasons: string[];
};

export type ValidationReport = {
  prompt: string;
  intent: PromptIntent;
  totalResults: number;
  passedCount: number;
  passRate: number;
  validations: ItemValidation[];
  summary: {
    genreMatchCount: number;
    yearMatchCount: number;
    regionMatchCount: number;
  };
};

export const VALIDATION_CONFIG = {
  MIN_FACTORS_TO_PASS: 2,
  PASS_RATE_THRESHOLD: 0.70,
};

export const GENRE_MAP: Record<string, string[]> = {
  'Romance': ['romantic', 'romance', 'love', 'love story', 'relationship'],
  'Comedy': ['comedy', 'funny', 'humor', 'humorous', 'sense of humor', 'hilarious', 'comedic', 'laugh'],
  'Horror': ['horror', 'scary', 'terrifying', 'frightening', 'spooky', 'creepy', 'haunted'],
  'Action': ['action', 'action-packed', 'fight', 'fighting', 'martial arts'],
  'Drama': ['drama', 'dramatic', 'emotional'],
  'Sci-Fi': ['sci-fi', 'science fiction', 'futuristic', 'space', 'alien', 'robot', 'cyberpunk'],
  'Thriller': ['thriller', 'suspense', 'suspenseful', 'tense', 'mystery'],
  'Adventure': ['adventure', 'adventurous', 'quest', 'journey', 'expedition'],
  'Animation': ['animation', 'animated', 'cartoon', 'anime'],
  'Documentary': ['documentary', 'real story', 'true story', 'real life'],
  'Biography': ['biography', 'biopic', 'life story', 'biographical'],
  'History': ['history', 'historical', 'period', 'war', 'ancient'],
  'Musical': ['musical', 'music', 'songs', 'singing', 'dance'],
  'Fantasy': ['fantasy', 'magical', 'magic', 'mythical', 'fairy tale', 'wizard'],
  'Crime': ['crime', 'criminal', 'heist', 'robbery', 'detective', 'police'],
  'War': ['war', 'warfare', 'military', 'soldier', 'battle', 'army'],
  'Western': ['western', 'cowboy', 'wild west'],
  'Family': ['family', 'kids', 'children', 'family-friendly'],
  'Sport': ['sport', 'sports', 'athletic', 'football', 'basketball', 'boxing', 'racing'],
};

export const RELATED_GENRES: Record<string, string[]> = {
  'Romance': ['Drama', 'Comedy', 'Musical'],
  'Comedy': ['Romance', 'Family', 'Animation'],
  'Drama': ['Romance', 'Biography', 'History', 'War'],
  'Action': ['Adventure', 'Thriller', 'Sci-Fi', 'War'],
  'Horror': ['Thriller', 'Mystery', 'Sci-Fi'],
  'Thriller': ['Horror', 'Crime', 'Mystery', 'Action'],
  'Adventure': ['Action', 'Fantasy', 'Sci-Fi', 'Family'],
  'Sci-Fi': ['Action', 'Adventure', 'Thriller', 'Horror'],
  'Biography': ['Drama', 'History'],
  'History': ['Drama', 'Biography', 'War'],
  'Fantasy': ['Adventure', 'Animation', 'Family'],
  'Crime': ['Thriller', 'Drama', 'Mystery'],
  'War': ['Drama', 'History', 'Action'],
  'Musical': ['Romance', 'Drama', 'Comedy'],
  'Animation': ['Family', 'Comedy', 'Adventure', 'Fantasy'],
  'Family': ['Animation', 'Comedy', 'Adventure'],
  'Documentary': ['Biography', 'History'],
  'Mystery': ['Thriller', 'Crime', 'Horror'],
  'Sport': ['Drama', 'Biography'],
  'Western': ['Action', 'Drama', 'Adventure'],
};

export const REGION_MAP: Record<string, string[]> = {
  'middle-east': [
    'middle-east', 'middle east', 'arab', 'arabic', 'persian', 'iranian', 'iran',
    'turkish', 'turkey', 'egyptian', 'egypt', 'lebanese', 'lebanon', 'israeli',
    'israel', 'saudi', 'dubai', 'emirates', 'iraqi', 'iraq', 'syrian', 'syria',
    'jordanian', 'jordan', 'palestinian', 'palestine', 'afghanistan', 'afghan',
    'pakistan', 'pakistani', 'kuwait', 'kuwaiti', 'bahrain', 'qatar', 'oman', 'yemen'
  ],
  'asia': [
    'asian', 'chinese', 'china', 'japanese', 'japan', 'korean', 'korea',
    'bollywood', 'indian', 'india', 'thai', 'thailand', 'vietnamese', 'vietnam',
    'filipino', 'philippines', 'indonesian', 'indonesia', 'malaysian', 'malaysia',
    'taiwanese', 'taiwan', 'hong kong', 'singapore', 'cambodia', 'myanmar', 'nepal'
  ],
  'europe': [
    'european', 'british', 'uk', 'england', 'french', 'france', 'german', 'germany',
    'italian', 'italy', 'spanish', 'spain', 'russian', 'russia', 'scandinavian',
    'nordic', 'swedish', 'danish', 'norwegian', 'dutch', 'polish', 'greek',
    'portuguese', 'irish', 'scottish', 'belgian', 'swiss', 'austrian', 'czech',
    'hungarian', 'romanian', 'ukrainian', 'finnish'
  ],
  'latin-america': [
    'latin', 'latino', 'mexican', 'mexico', 'brazilian', 'brazil', 'argentinian',
    'argentina', 'colombian', 'colombia', 'cuban', 'cuba', 'spanish-speaking',
    'chilean', 'chile', 'peruvian', 'peru', 'venezuelan', 'puerto rican'
  ],
  'africa': [
    'african', 'nigeria', 'nollywood', 'south african', 'egyptian', 'moroccan',
    'kenyan', 'ghana', 'ethiopian', 'tanzanian', 'ugandan', 'algerian', 'tunisian'
  ],
  'hollywood': [
    'hollywood', 'american', 'usa', 'us', 'united states', 'u.s.'
  ],
  'oceania': [
    'australian', 'australia', 'new zealand', 'kiwi', 'polynesian'
  ],
};

export function extractGenres(prompt: string): string[] {
  const lower = prompt.toLowerCase();
  const genres: string[] = [];
  
  for (const [genre, keywords] of Object.entries(GENRE_MAP)) {
    if (keywords.some(k => lower.includes(k))) {
      genres.push(genre);
    }
  }
  
  return [...new Set(genres)];
}

export function extractYear(prompt: string): { min: number; max: number } | null {
  const lower = prompt.toLowerCase();
  const decadeMatch = lower.match(/\b(19|20)?(\d{2})s?\b/);
  
  if (decadeMatch) {
    const century = decadeMatch[1];
    const twoDigit = parseInt(decadeMatch[2]);
    
    if (century && !lower.includes(`${century}${decadeMatch[2]}s`)) {
      const fullYear = parseInt(`${century}${decadeMatch[2]}`);
      if (fullYear >= 1900 && fullYear <= 2100) {
        if (lower.includes(`${fullYear}s`)) {
          return { min: fullYear, max: fullYear + 9 };
        }
        return { min: fullYear, max: fullYear };
      }
    }
    
    if (twoDigit >= 0 && twoDigit <= 99) {
      const centuryNum = twoDigit >= 30 ? 1900 : 2000;
      const decadeStart = centuryNum + twoDigit;
      return { min: decadeStart, max: decadeStart + 9 };
    }
  }
  
  return null;
}

export function extractRegions(prompt: string): string[] {
  const lower = prompt.toLowerCase();
  const regions: string[] = [];
  
  for (const [region, keywords] of Object.entries(REGION_MAP)) {
    if (keywords.some(k => lower.includes(k))) {
      regions.push(region);
    }
  }
  
  return [...new Set(regions)];
}

export function extractKeywords(prompt: string): string[] {
  const stopWords = new Set([
    'the', 'and', 'for', 'with', 'from', 'that', 'have', 'this', 'these',
    'those', 'a', 'an', 'in', 'on', 'of', 'to', 'is', 'are', 'it', 'as',
    'by', 'be', 'or', 'at', 'which', 'was', 'were', 'but', 'not', 'film',
    'movie', 'movies', 'films', 'about', 'like', 'some', 'any', 'can', 'will'
  ]);
  
  return prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3 && !stopWords.has(t));
}

export function extractPromptIntent(prompt: string): PromptIntent {
  return {
    genres: extractGenres(prompt),
    year: extractYear(prompt),
    regions: extractRegions(prompt),
    keywords: extractKeywords(prompt),
  };
}

function getItemYear(item: any): number | null {
  const dateStr = item.release_date || item.year || item.releaseYear;
  if (!dateStr) return null;
  
  if (typeof dateStr === 'string' && dateStr.includes('-')) {
    const year = parseInt(dateStr.split('-')[0]);
    return isNaN(year) ? null : year;
  }
  
  const year = parseInt(dateStr);
  return isNaN(year) ? null : year;
}

function checkGenreMatch(itemGenres: string[], expectedGenres: string[]): { matched: boolean; matchedList: string[] } {
  if (expectedGenres.length === 0) {
    return { matched: true, matchedList: [] };
  }
  
  const itemGenresLower = itemGenres.map(g => g.toLowerCase());
  const matchedList: string[] = [];
  
  for (const expected of expectedGenres) {
    const expectedLower = expected.toLowerCase();
    
    if (itemGenresLower.some(ig => ig === expectedLower || ig.includes(expectedLower) || expectedLower.includes(ig))) {
      matchedList.push(`${expected} (direct)`);
      continue;
    }
    
    const relatedGenres = RELATED_GENRES[expected] || [];
    for (const related of relatedGenres) {
      const relatedLower = related.toLowerCase();
      if (itemGenresLower.some(ig => ig === relatedLower || ig.includes(relatedLower) || relatedLower.includes(ig))) {
        matchedList.push(`${expected} → ${related} (related)`);
        break;
      }
    }
  }
  
  return { matched: matchedList.length > 0, matchedList };
}

function checkYearMatch(itemYear: number | null, expectedYear: { min: number; max: number } | null): boolean {
  if (!expectedYear) return true;
  if (!itemYear) return false;
  return itemYear >= expectedYear.min && itemYear <= expectedYear.max;
}

function checkRegionMatch(item: any, expectedRegions: string[]): boolean {
  if (expectedRegions.length === 0) return true;
  
  const haystack = [
    item.title || '',
    item.description || '',
    item.country || '',
    item.origin_country || '',
    item.production_countries || '',
    ...(Array.isArray(item.country) ? item.country : []),
  ].join(' ').toLowerCase();
  
  for (const region of expectedRegions) {
    const regionKeywords = REGION_MAP[region] || [];
    if (regionKeywords.some(k => haystack.includes(k))) {
      return true;
    }
  }
  
  return false;
}

export function validateResult(item: any, intent: PromptIntent): ItemValidation {
  const matchDetails: string[] = [];
  const failureReasons: string[] = [];
  
  const itemGenres = item.genre || [];
  const itemYear = getItemYear(item);
  const itemCountry = item.country || item.origin_country || null;
  
  const genreResult = checkGenreMatch(itemGenres, intent.genres);
  const genreMatched = genreResult.matched;
  
  if (genreMatched) {
    matchDetails.push(`Genre: ${genreResult.matchedList.join(', ')}`);
  } else if (intent.genres.length > 0) {
    failureReasons.push(`Genre mismatch (expected: ${intent.genres.join(', ')}, got: ${itemGenres.join(', ')})`);
  }
  
  const yearMatched = checkYearMatch(itemYear, intent.year);
  
  if (yearMatched && intent.year) {
    matchDetails.push(`Year: ${itemYear}`);
  } else if (intent.year && !yearMatched) {
    failureReasons.push(`Year mismatch (expected: ${intent.year.min}-${intent.year.max}, got: ${itemYear || 'N/A'})`);
  }
  
  const regionMatched = checkRegionMatch(item, intent.regions);
  
  if (regionMatched && intent.regions.length > 0) {
    matchDetails.push(`Region: ${itemCountry || 'matched'}`);
  } else if (intent.regions.length > 0 && !regionMatched) {
    failureReasons.push(`Region mismatch (expected: ${intent.regions.join(', ')})`);
  }
  
  let totalFactors = 0;
  let matchedFactors = 0;
  
  if (intent.genres.length > 0) {
    totalFactors++;
    if (genreMatched) matchedFactors++;
  }
  if (intent.year) {
    totalFactors++;
    if (yearMatched) matchedFactors++;
  }
  if (intent.regions.length > 0) {
    totalFactors++;
    if (regionMatched) matchedFactors++;
  }
  
  // If no factors extracted from prompt, item cannot pass validation
  // This handles invalid/nonsense prompts that have no movie-related intent
  if (totalFactors === 0) {
    return {
      title: item.title || 'Untitled',
      itemGenres,
      itemYear,
      itemCountry,
      scores: {
        genreMatch: false,
        genreMatchedList: [],
        yearMatch: false,
        regionMatch: false,
        factors: { genreMatched: false, yearMatched: false, regionMatched: false, matchedFactors: 0, totalFactors: 0 },
      },
      passed: false,
      matchDetails: [],
      failureReasons: ['No movie-related intent found in prompt'],
    };
  }
  
  const minFactorsRequired = Math.min(VALIDATION_CONFIG.MIN_FACTORS_TO_PASS, totalFactors);
  const passed = matchedFactors >= minFactorsRequired;
  
  return {
    title: item.title || 'Untitled',
    itemGenres,
    itemYear,
    itemCountry,
    scores: {
      genreMatch: genreMatched,
      genreMatchedList: genreResult.matchedList,
      yearMatch: yearMatched,
      regionMatch: regionMatched,
      factors: { genreMatched, yearMatched, regionMatched, matchedFactors, totalFactors },
    },
    passed,
    matchDetails,
    failureReasons,
  };
}

export function validateAllResults(results: any[], prompt: string): ValidationReport {
  const intent = extractPromptIntent(prompt);
  const validations = results.map(r => validateResult(r, intent));
  
  const passedCount = validations.filter(v => v.passed).length;
  const passRate = results.length > 0 ? passedCount / results.length : 0;
  
  return {
    prompt,
    intent,
    totalResults: results.length,
    passedCount,
    passRate,
    validations,
    summary: {
      genreMatchCount: validations.filter(v => v.scores.genreMatch).length,
      yearMatchCount: validations.filter(v => v.scores.yearMatch).length,
      regionMatchCount: validations.filter(v => v.scores.regionMatch).length,
    },
  };
}

export function generateValidationSummary(report: ValidationReport): string {
  const lines: string[] = [
    `Prompt: "${report.prompt}"`,
    `Intent: Genres=[${report.intent.genres.join(', ')}] Year=${report.intent.year ? `${report.intent.year.min}-${report.intent.year.max}` : 'any'} Regions=[${report.intent.regions.join(', ')}]`,
    `Results: ${report.passedCount}/${report.totalResults} passed (${(report.passRate * 100).toFixed(1)}%)`,
    `Status: ${report.passRate >= VALIDATION_CONFIG.PASS_RATE_THRESHOLD ? 'PASS' : 'FAIL'}`,
    '',
  ];
  
  report.validations.forEach((v, i) => {
    const status = v.passed ? '✓' : '✗';
    const factors = `${v.scores.factors.matchedFactors}/${v.scores.factors.totalFactors}`;
    lines.push(`${status} ${i + 1}. "${v.title}" [${factors}] ${v.itemGenres.join(', ')} | ${v.itemYear || 'N/A'} | ${v.itemCountry || 'N/A'}`);
    if (v.failureReasons.length > 0) {
      lines.push(`   → ${v.failureReasons.join(' | ')}`);
    }
  });
  
  return lines.join('\n');
}
