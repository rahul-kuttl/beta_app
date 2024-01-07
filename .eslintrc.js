module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:mocha/recommended',
    'airbnb-typescript',
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended'
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended
    // configs e.g. "@typescript-eslint/explicit-function-return-type": "off",
    /**
     * To Off: Don't prefer default imports over named imports
     */
    'import/prefer-default-export': 'off',
    /**
     * To Off: Allow use of variables with _ in it. Eg, _id of mongodb
     */
    'no-underscore-dangle': 'off',
    /**
     * To Off: Allow use of continue statement in loop
     */
    'no-continue': 'off',
    /**
     * To Warning: console logs
     */
    'no-console': 'warn',
    /**
     * To Off: dot notation missing
     */
    '@typescript-eslint/dot-notation': 'off',
    /**
     * To Warning: All prettier related error
     */
    'prettier/prettier': 'warn',
    /**
     * To Warning: Redefinition of the variables from the global scope.
     */
    'no-shadow': 'warn',
    /**
     * To Warning: switch to have a default case
     */
    'default-case': 'warn',
    /**
     * To Warning: function arguments reassignment
     */
    'no-param-reassign': 'warn',

    /**
     * To Off: reduce await in return to waring rather than error
     */
    '@typescript-eslint/return-await': 'off',

    /**
     * To Warning: allow reuse of variable name defined in above scope
     */
    '@typescript-eslint/no-shadow': 'warn',

    /**
     * To Warning: Un-used variables
     */
    '@typescript-eslint/no-unused-vars': 'warn',

    /**
     * namespaces are being used actively in engage and erm
     */
    '@typescript-eslint/no-namespace': 'off',

    /**
     * base rule of no-shadow disables as it can report incorrect errors
     */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  }
};
