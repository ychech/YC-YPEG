import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, 'docs');

const isMarkdown = (filePath) => filePath.endsWith('.md') || filePath.endsWith('.mdx');

const isBlackishColor = (raw) => {
  const v = String(raw).trim().toLowerCase();
  if (v === 'black') return true;
  if (v === '##000000') return true;
  if (v === '#000' || v === '#000000') return true;
  if (v === 'rgb(0, 0, 0)' || v === 'rgb(0,0,0)') return true;
  if (v === 'rgb(15, 20, 26)' || v === 'rgb(15,20,26)') return true;
  if (v.startsWith('rgba(0, 0, 0') || v.startsWith('rgba(0,0,0')) return true;
  if (v.startsWith('rgba(15, 20, 26') || v.startsWith('rgba(15,20,26')) return true;
  if (v === 'rgb(24, 24, 24)' || v === 'rgb(24,24,24)') return true;
  if (v.startsWith('rgba(24, 24, 24') || v.startsWith('rgba(24,24,24')) return true;
  if (v === 'rgb(31, 35, 41)' || v === 'rgb(31,35,41)') return true;
  if (v.startsWith('rgba(31, 35, 41') || v.startsWith('rgba(31,35,41')) return true;
  return false;
};

const sanitizeStyleValue = (styleValue) => {
  const raw = String(styleValue);
  const parts = raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

  const kept = [];
  for (const decl of parts) {
    const idx = decl.indexOf(':');
    if (idx === -1) {
      kept.push(decl);
      continue;
    }
    const prop = decl.slice(0, idx).trim().toLowerCase();
    const value = decl.slice(idx + 1).trim();

    if (prop === 'color' && isBlackishColor(value)) continue;
    kept.push(decl);
  }

  return kept.join('; ');
};

const sanitizeContent = (content) => {
  return content.replace(/style="([^"]*)"/g, (_m, styles) => {
    const next = sanitizeStyleValue(styles);
    if (!next) return '';
    return `style="${next}"`;
  });
};

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.rspress' || ent.name === 'dist' || ent.name === '.git') continue;
      out.push(...(await walk(full)));
    } else if (ent.isFile()) {
      if (isMarkdown(full)) out.push(full);
    }
  }
  return out;
};

const files = await walk(docsRoot);
let changedFiles = 0;
let changedReplacements = 0;

for (const filePath of files) {
  const before = await fs.readFile(filePath, 'utf8');
  const after = sanitizeContent(before);
  if (after === before) continue;
  await fs.writeFile(filePath, after, 'utf8');
  changedFiles += 1;
  changedReplacements += 1;
}

console.log(`[sanitize-inline-colors] scanned=${files.length} changedFiles=${changedFiles} changed=${changedReplacements}`);

