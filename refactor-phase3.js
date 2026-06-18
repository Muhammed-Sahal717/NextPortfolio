const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const componentsDir = path.join(projectRoot, 'components');
const appDir = path.join(projectRoot, 'app');

const fileMapping = {
  'HeroSection.tsx': 'sections',
  'Footer.tsx': 'sections',
  'ContactConsole.tsx': 'sections',
  'LiquidNavbar.tsx': 'sections',
  'ChatWidget.tsx': 'features',
  'ProjectCarousel.tsx': 'features',
  'ProjectGrid.tsx': 'features',
  'BentoGrid.tsx': 'features',
  'LiquidEther.tsx': 'visuals',
  'CircuitBoard.tsx': 'visuals',
  'ParticleText.tsx': 'visuals',
  'SadRobot.tsx': 'visuals',
  'SplitText.tsx': 'visuals',
  'ClientProviders.tsx': 'layout',
  'theme-provider.tsx': 'layout',
  'ThemeToggle.tsx': 'layout',
  'PageTransitionLoader.tsx': 'layout',
  'Preloader.tsx': 'layout',
  'SmoothScrolling.tsx': 'layout',
  'CommandMenu.tsx': 'layout',
  'Magnetic.tsx': 'animations',
  'ScrollReveal.tsx': 'animations',
  'SpotlightCard.tsx': 'animations',
  'TiltCard.tsx': 'animations',
  'CustomCursor.tsx': 'animations',
  'ProgressBar.tsx': 'animations',
  'AiraIcon.tsx': 'icons',
  'ClientButton.tsx': 'shared',
};

// Create directories
const newDirs = [...new Set(Object.values(fileMapping))];
newDirs.forEach(dir => {
  const dirPath = path.join(componentsDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Move files
Object.entries(fileMapping).forEach(([file, newDir]) => {
  const oldPath = path.join(componentsDir, file);
  const newPath = path.join(componentsDir, newDir, file);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${file} to ${newDir}/`);
  }
});

// Update imports
function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.ts') || dirFile.endsWith('.tsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
}

const allFiles = [...walkSync(componentsDir), ...walkSync(appDir)];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  Object.entries(fileMapping).forEach(([fileName, newDir]) => {
    const baseName = fileName.replace('.tsx', '');
    
    // Replace exact path @/components/BaseName
    const importRegex1 = new RegExp(`@/components/${baseName}(['"])`, 'g');
    if (importRegex1.test(content)) {
      content = content.replace(importRegex1, `@/components/${newDir}/${baseName}$1`);
      changed = true;
    }

    // Replace relative paths if any
    const importRegex2 = new RegExp(`from (['"])\\.\\.?\\/.*?${baseName}(['"])`, 'g');
    if (importRegex2.test(content)) {
      content = content.replace(importRegex2, `from $1@/components/${newDir}/${baseName}$2`);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file.replace(projectRoot, '')}`);
  }
});

console.log('Phase 3 refactoring completed successfully.');
