module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: `${__dirname}/frontend`,
    project: ['./tsconfig.json'],
  },
  extends: [
    'plugin:@next/next/recommended',
  ],
  ignorePatterns: ['graphql.ts', '*.graphql', '.next', 'node_modules', '*.js'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'no-magic-numbers': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'jest-dom/prefer-in-document': 'off',
    'jest-dom/prefer-to-have-attribute': 'off',
  },
};
