module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "airbnb-typescript/base",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "import/named": 2,
        "@typescript-eslint/default-param-last": 0,
        "@typescript-eslint/space-before-blocks": 0,
        "@typescript-eslint/dot-notation": 0,

      },
      settings: {
        "import/resolver": {
          typescript: {}
        },
      },
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}
