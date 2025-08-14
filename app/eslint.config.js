import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Prevent cross-feature imports and direct data impl usage in routes
      'no-restricted-imports': [
        'error',
        {
          paths: [],
          patterns: [
            // Disallow routes importing other routes' internals
            {
              group: ['src/routes/*/*'],
              message:
                'Do not import other feature routes. Use shared components or data interfaces.'
            },
            // Disallow direct data impls in routes; use interfaces/hooks instead
            {
              group: ['src/data/**/memory/*', 'src/data/db', 'src/data/**/supabase*'],
              message:
                'Routes/components must not import data implementations. Import repository interfaces/hooks only.'
            }
          ]
        }
      ]
    }
  },
])
