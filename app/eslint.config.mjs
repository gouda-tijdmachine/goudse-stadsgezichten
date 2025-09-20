import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import babelParser from '@babel/eslint-parser';

export default [
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        requireConfigFile: false,
        babelOptions: {
          presets: ['@vue/cli-plugin-babel/preset']
        },
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly'
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginVue.configs['essential'].rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off'
    }
  }
];
