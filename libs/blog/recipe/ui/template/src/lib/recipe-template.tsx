import { ToolBox } from '@cookingblog/blog/shared/feature/tool-box';
import { goBack } from '@cookingblog/blog/shared/utils';
import { Container, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ReactNode } from 'react';

export interface RecipeTemplateProps {
  children?: ReactNode;
  showToolBox?: boolean;
  hideGoBack?: boolean;
}

export function RecipeTemplate(props: RecipeTemplateProps) {
  const { children, showToolBox = true, hideGoBack = false } = props;
  return (
    <div className="overflow-auto h-screen">
      <Container className="min-h-screen overflow-x-hidden overflow-y-auto pb-6">
        {!hideGoBack && (
          <IconButton onClick={goBack} data-testid="go-back-btn">
            <ArrowBackIcon />
          </IconButton>
        )}
        {children}
      </Container>
      {showToolBox && <ToolBox />}
    </div>
  );
}

export default RecipeTemplate;
