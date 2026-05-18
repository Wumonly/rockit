/**
 * ralph-init — Initialize the Ralph autonomous AI coding system into a target project.
 *
 * Usage:
 *   node init.js --target <project-path> [--version <X.Y>]
 *
 * Examples:
 *   node init.js --target /path/to/my-project
 *   node init.js --target /path/to/my-project --version 2.1
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ─── CLI ────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { target: null, version: 'latest', help: false };
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--target':
        args.target = argv[++i] || null;
        break;
      case '--version':
        args.version = argv[++i] || 'latest';
        break;
      case '--help':
      case '-h':
        args.help = true;
        break;
    }
  }
  return args;
}

function usage() {
  console.log([
    'Usage: node init.js --target <project-path> [--version <X.Y>]',
    '',
    'Initialize the Ralph autonomous AI coding system into a target project.',
    '',
    'Options:',
    '  --target <path>    Target project directory (required)',
    '  --version <X.Y>    Ralph version to install (default: latest)',
    '  --help, -h         Show this help',
    '',
    'Examples:',
    '  node init.js --target /path/to/my-project',
    '  node init.js --target /path/to/my-project --version 2.1',
  ].join('\n'));
}

// ─── Paths ──────────────────────────────────────────────────────────

function resolvePaths() {
  const scriptDir = path.dirname(__filename);
  const skillDir = path.dirname(scriptDir);               // skills/ralph-init/
  const referencesDir = path.join(skillDir, 'references');
  const rockitSkillsDir = path.join(skillDir, '..');      // skills/ (sibling skills)
  return { scriptDir, skillDir, referencesDir, rockitSkillsDir };
}

// ─── Version resolution ─────────────────────────────────────────────

function findLatestVersion(referencesDir) {
  const entries = fs.readdirSync(referencesDir, { withFileTypes: true });
  const parsed = [];

  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const m = e.name.match(/^ralph-v(\d+)\.(\d+)$/);
    if (!m) continue;
    parsed.push({ dir: e.name, major: parseInt(m[1], 10), minor: parseInt(m[2], 10) });
  }

  if (parsed.length === 0) {
    console.error('Error: No Ralph version directories found in references/');
    process.exit(1);
  }

  parsed.sort((a, b) => (b.major - a.major) || (b.minor - a.minor));
  return parsed[0].dir.replace(/^ralph-v/, '');
}

function availableVersions(referencesDir) {
  const entries = fs.readdirSync(referencesDir, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && /^ralph-v\d+\.\d+$/.test(e.name))
    .map(e => e.name.replace(/^ralph-v/, ''))
    .sort();
}

function resolveVersion(referencesDir, requested) {
  if (requested === 'latest') {
    return findLatestVersion(referencesDir);
  }

  const dirName = 'ralph-v' + requested;
  if (!fs.existsSync(path.join(referencesDir, dirName))) {
    const avail = availableVersions(referencesDir);
    console.error(`Error: Ralph version ${requested} not found.`);
    console.error(`Available versions: ${avail.join(', ') || 'none'}`);
    process.exit(1);
  }

  return requested;
}

// ─── File operations ────────────────────────────────────────────────

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyRuntimeFiles(sourceDir, targetProject) {
  const targetDir = path.join(targetProject, 'scripts', 'ralph');
  fs.mkdirSync(targetDir, { recursive: true });

  const files = fs.readdirSync(sourceDir).filter(f => {
    const full = path.join(sourceDir, f);
    return fs.statSync(full).isFile();
  });

  const copied = [];
  for (const file of files) {
    const src = path.join(sourceDir, file);
    const dest = path.join(targetDir, file);
    fs.copyFileSync(src, dest);
    copied.push(file);
  }

  return { targetDir, copied };
}

function copySkill(rockitSkillsDir, targetSkillsDir, skillName) {
  const source = path.join(rockitSkillsDir, skillName);
  if (!fs.existsSync(source)) {
    return { skillName, status: 'skipped', reason: 'source not found' };
  }

  const dest = path.join(targetSkillsDir, skillName);
  const existed = fs.existsSync(dest);
  copyDirRecursive(source, dest);
  return { skillName, status: existed ? 'overwritten' : 'created' };
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    usage();
    process.exit(0);
  }

  if (!args.target) {
    console.error('Error: --target is required.');
    console.error('Use --help for usage information.');
    process.exit(1);
  }

  const targetProject = path.resolve(args.target);
  if (!fs.existsSync(targetProject)) {
    console.error(`Error: Target project does not exist: ${targetProject}`);
    process.exit(1);
  }

  const { referencesDir, rockitSkillsDir } = resolvePaths();

  // Resolve version
  const version = resolveVersion(referencesDir, args.version);
  const sourceDir = path.join(referencesDir, 'ralph-v' + version);

  console.log(`\nRalph Init — v${version}`);
  console.log(`Target: ${targetProject}\n`);

  // Copy runtime files
  console.log('── Copying Ralph runtime files ──');
  const rt = copyRuntimeFiles(sourceDir, targetProject);
  console.log(`  Destination: ${rt.targetDir}`);
  rt.copied.forEach(f => console.log(`  + ${f}`));
  console.log(`  (${rt.copied.length} files)\n`);

  // Copy associated skills
  console.log('── Copying associated skills ──');
  const targetSkillsDir = path.join(targetProject, '.claude', 'skills');
  const skillsToCopy = ['ralph', 'prd', 'agent-browser-skill'];

  const skillResults = [];
  for (const skillName of skillsToCopy) {
    const r = copySkill(rockitSkillsDir, targetSkillsDir, skillName);
    skillResults.push(r);
    const icon = r.status === 'skipped' ? '⚠' : '+';
    console.log(`  ${icon} ${r.skillName} (${r.status}${r.reason ? ': ' + r.reason : ''})`);
  }
  console.log(`  Destination: ${targetSkillsDir}\n`);

  // Summary
  console.log('── Summary ──');
  console.log(`  Ralph version: v${version}`);
  console.log(`  Runtime files: ${rt.copied.length} → scripts/ralph/`);
  const installed = skillResults.filter(r => r.status !== 'skipped').length;
  console.log(`  Skills copied: ${installed} → .claude/skills/`);
  console.log(`\nRalph system initialized successfully.\n`);
}

main();
