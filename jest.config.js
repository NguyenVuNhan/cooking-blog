const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/blog/home/ui/default',
    ,
    '<rootDir>/libs/blog/feature',
    ,
    '<rootDir>/libs/blog/recipe/ui/search',
    ,
    '<rootDir>/libs/blog/recipe/ui/view',
    ,
    '<rootDir>/libs/blog/recipe/feature/components',
    ,
    '<rootDir>/libs/blog/recipe/ui/add',
    ,
    '<rootDir>/libs/blog/ui/components/molecule',
    ,
    '<rootDir>/libs/blog/auth/feature/routes',
  ],
};
