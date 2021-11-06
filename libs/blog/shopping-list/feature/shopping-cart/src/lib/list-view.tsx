import { AislesView, RecipesView } from '@cookingblog/blog/shopping-list/ui';

export interface ListViewProps {
  type: 'aisles' | 'recipes';
}

export function ListView({ type }: ListViewProps) {
  switch (type) {
    case 'aisles':
      return <AislesView />;
    case 'recipes':
      return <RecipesView />;
    default:
      return null;
  }
}

export default ListView;
