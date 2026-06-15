import fs from 'fs';
import path from 'path';
import { InferenceRun, ResearchQuery } from './types';

const DATA_DIR = path.join(__dirname, '../../data');
const RUNS_FILE = path.join(DATA_DIR, 'inference-runs.jsonl');

export function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function saveInferenceRun(run: InferenceRun): void {
  ensureDataDir();
  const line = JSON.stringify(run) + '\n';
  fs.appendFileSync(RUNS_FILE, line, 'utf8');
}

export function queryRuns(query: ResearchQuery = {}): InferenceRun[] {
  ensureDataDir();
  if (!fs.existsSync(RUNS_FILE)) return [];

  const lines = fs.readFileSync(RUNS_FILE, 'utf8').trim().split('\n').filter(Boolean);
  let runs: InferenceRun[] = lines.map(l => JSON.parse(l));

  if (query.minResonance !== undefined) {
    runs = runs.filter(r => r.dynamoTrace.resonanceScore >= query.minResonance!);
  }
  if (query.verdict) {
    runs = runs.filter(r => r.dynamoTrace.fullBox7DVerdict === query.verdict);
  }
  if (query.solarActivity) {
    runs = runs.filter(r => r.dynamoTrace.solarActivityLevel === query.solarActivity);
  }
  if (query.dateRange) {
    const from = new Date(query.dateRange.from);
    const to = new Date(query.dateRange.to);
    runs = runs.filter(r => {
      const ts = new Date(r.timestamp);
      return ts >= from && ts <= to;
    });
  }

  if (query.limit) {
    runs = runs.slice(0, query.limit);
  }

  return runs;
}

export function getStats() {
  const runs = queryRuns();
  return {
    totalRuns: runs.length,
    passCount: runs.filter(r => r.dynamoTrace.fullBox7DVerdict === 'PASS').length,
    avgResonance: runs.length > 0 
      ? runs.reduce((sum, r) => sum + r.dynamoTrace.resonanceScore, 0) / runs.length 
      : 0,
  };
}