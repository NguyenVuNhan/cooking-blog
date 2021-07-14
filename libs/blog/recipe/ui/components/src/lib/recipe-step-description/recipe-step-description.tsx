import { IRecipeStep } from '@cookingblog/api/recipe';
import { strToDuration } from '@cookingblog/blog/recipe/utils';
import { mapStringMatch } from '@cookingblog/shared/utils';
import { Box } from '@material-ui/core';
import { memo } from 'react';

export interface RecipeStepDescriptionProps {
  description: string;
  startTimer: (number) => () => void;
}

export const RecipeStepDescription = memo<RecipeStepDescriptionProps>(
  (props) => {
    const { description, startTimer } = props;

    return (
      <Box lineHeight={2}>
        <strong>Description:</strong>
        {mapStringMatch(
          description,
          /(\d+\s*(?:-\s*\d+\s*)?\w+)/g,
          (val, match, i) => {
            if (!match) return val;
            const duration = strToDuration(val);
            if (duration === 0) return val;
            return (
              <Box
                component="a"
                bgcolor="primary.main"
                color="white"
                className="px-1 py-1 rounded font-semibold"
                key={i}
                onClick={startTimer(duration)}
              >
                {val}
              </Box>
            );
          }
        )}
      </Box>
    );
  }
);

export default RecipeStepDescription;
