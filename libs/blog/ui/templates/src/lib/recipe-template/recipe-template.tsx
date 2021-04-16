import { ToolBox } from '@cookingblog/blog/ui/components';
import { goBack } from '@cookingblog/blog/utils';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { ReactNode } from 'react';

export interface RecipeTemplateProps {
  children: ReactNode;
  showToolBox?: boolean;
  hideGoBack?: boolean;
}

export function RecipeTemplate(props: RecipeTemplateProps) {
  const { children, showToolBox = true, hideGoBack = false } = props;
  return (
    <Container className="relative" maxWidth="md">
      <Box overflow="auto" className="vh-100 noScrollBar">
        {!hideGoBack && (
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {children}
      </Box>
      {showToolBox && <ToolBox />}
    </Container>
  );
}

export default RecipeTemplate;
