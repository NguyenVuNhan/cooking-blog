module.exports = {
  displayName: 'blog-shared-ui-components-atoms',
  preset: '../../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../../coverage/libs/blog/shared/ui/components/atoms',
};
