# 🧪 Guide de Test - OSS Funding Platform

## Installation des dépendances

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest ts-jest @types/jest
```

## Configuration Jest (jest.config.js)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
```

## Exécuter les tests

### Mode watch (développement)
```bash
npm test
```

### Une seule exécution
```bash
npm test -- --watchAll=false
```

### Avec couverture de code
```bash
npm test -- --coverage
```

### Un fichier spécifique
```bash
npm test OSSFunding.test.tsx
```

## Tests inclus

✅ **10 tests couvrant :**
- Rendu initial du dashboard
- Navigation entre onglets
- Filtrage des opportunités
- Affichage des KPIs
- Liste des bailleurs
- Vue Pipeline
- Centre d'alertes
- Bassin des idées
- Barre de recherche
- Bouton d'ajout d'idée

## Intégration CI/CD

Les tests s'exécutent automatiquement sur :
- Push sur branches `main`, `develop`, `feature/*`
- Pull requests vers `main` ou `develop`

Voir `.github/workflows/test.yml`
