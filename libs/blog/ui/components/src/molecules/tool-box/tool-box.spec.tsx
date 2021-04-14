import { render } from '@testing-library/react';

import ToolBox from './tool-box';

describe('ToolBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToolBox />);
    expect(baseElement).toBeTruthy();
  });
});
