import { ToolBox } from '@cookingblog/blog/shared/feature/tool-box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, IconButton } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface RecipeTemplateProps {
  children?: ReactNode;
  showToolBox?: boolean;
  hideGoBack?: boolean;
}

export function RecipeTemplate(props: RecipeTemplateProps) {
  const { children, showToolBox = true, hideGoBack = false } = props;
  const navigate = useNavigate();

  return (
    <div className="overflow-auto h-screen">
      <Container className="min-h-screen pb-6 overflow-x-hidden overflow-y-auto">
        {!hideGoBack && (
          <IconButton
            onClick={() => navigate(-1)}
            data-testid="go-back-btn"
            size="large"
          >
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
