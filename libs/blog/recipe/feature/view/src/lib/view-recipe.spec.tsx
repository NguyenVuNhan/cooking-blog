import 'reflect-metadata'; // Required by class-transformer

describe('ViewRecipe', () => {
  it.todo('fetches the recipe from the given id');

  describe('while loading', () => {
    it.todo('should render a loader');
  });

  describe('with error', () => {
    it.todo('should render an error message');
  });

  describe('with data', () => {
    it.todo('should render recipe successfully');

    describe('on time click', () => {
      it.todo('should show timer snack bar');
    });

    describe('on title update', () => {
      it.todo('should update title and refetch recipe');
    });

    describe('on ingredient update', () => {
      it.todo('should update ingredients list and refetch recipe');
    });

    describe('on step update', () => {
      it.todo('should update step  and refetch recipe');
    });

    describe('on delete recipe', () => {
      it.todo('should delete recipe and go back');
    });
  });
});
