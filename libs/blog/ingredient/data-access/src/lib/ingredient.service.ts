import { GetIngredientsRes } from '@cookingblog/api/interfaces';
import axios from 'axios';

export const getIngredients = async (
  name: string
): Promise<GetIngredientsRes> => {
  const res = await axios.get<GetIngredientsRes>(
    `/api/ingredients/${name.replace(new RegExp('/', 'g'), '%2F')}`
  );
  return res.data;
};
