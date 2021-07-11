import { ShoppingListItem } from '@cookingblog/blog/shopping-list/data-access';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface ListItemAnimationProps {
  data: [string, ShoppingListItem[]][];
  render: (key: string, data: ShoppingListItem[]) => ReactNode;
}

export function ListItemAnimation(props: ListItemAnimationProps) {
  const { data, render } = props;

  return (
    <AnimatePresence initial={false}>
      {data.map(([key, value], i) => {
        let delay = i * 0.1;
        delay = delay > 0.3 ? 0.3 : delay;

        return (
          <motion.div
            key={key}
            exit={{ x: -100, opacity: 0, transition: { delay } }}
          >
            {render(key, value)}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}

export default ListItemAnimation;
