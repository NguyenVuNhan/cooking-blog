module.exports = {
  displayName: 'blog-shopping-list-feature-shopping-cart',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/blog/shopping-list/feature/shopping-cart',
};
