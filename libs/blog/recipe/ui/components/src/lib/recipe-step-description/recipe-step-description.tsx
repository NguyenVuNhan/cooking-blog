import { strToDuration } from '@cookingblog/blog/recipe/utils';
import { mapStringMatch } from '@cookingblog/shared/utils';
import { Box } from '@material-ui/core';
import { memo } from 'react';

export interface RecipeStepDescriptionProps {
  description: string;
  onDurationClick: (number) => () => void;
}

export const RecipeStepDescription = memo<RecipeStepDescriptionProps>(
  (props) => {
    const { description, onDurationClick } = props;

    return (
      <Box lineHeight={2} component="p">
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
                className="px-1 py-1 rounded font-semibold cursor-pointer"
                key={i}
                onClick={onDurationClick(duration)}
              >
                {val}
              </Box>
            );
          }
        )}
      </Box>
    );
  },
  (prev, next) => prev.description === next.description
);

export default RecipeStepDescription;
