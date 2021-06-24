import { ToolBox } from '@cookingblog/blog/feature/tool-box';
import { goBack } from '@cookingblog/blog/utils';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { ReactNode } from 'react';

export interface RecipeTemplateProps {
  children?: ReactNode;
  showToolBox?: boolean;
  hideGoBack?: boolean;
}

export function RecipeTemplate(props: RecipeTemplateProps) {
  const { children, showToolBox = true, hideGoBack = false } = props;
  return (
    <Container className="relative overflow-auto">
      <div className="min-h-screen overflow-hidden">
        {!hideGoBack && (
          <IconButton onClick={goBack} data-testid="go-back-btn">
            <ArrowBackIcon />
          </IconButton>
        )}
        {children}
      </div>
      {showToolBox && <ToolBox />}
    </Container>
  );
}

export default RecipeTemplate;
