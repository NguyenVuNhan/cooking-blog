import {
  AddRecipeReq,
  AddRecipeRes,
  DeleteRecipeRes,
  GetRecipeRes,
  SearchRecipeRes,
  UpdateRecipeReq,
  UpdateRecipeRes,
} from '@cookingblog/api-interfaces';
import axios from 'axios';

export const addRecipe = async (data: AddRecipeReq): Promise<AddRecipeRes> => {
  const res = await axios.post<AddRecipeRes>(`/api/recipe`, data);
  return res.data;
};

export const deleteRecipe = async (id: string): Promise<DeleteRecipeRes> => {
  const res = await axios.delete<DeleteRecipeRes>(`/api/recipe/${id}`);
  return res.data;
};

export const search = async (query: string): Promise<SearchRecipeRes> => {
  const res = await axios.get<SearchRecipeRes>(`/api/recipe?query=${query}`);
  return res.data;
};

export const updateRecipe = async (
  id: string,
  data: UpdateRecipeReq
): Promise<UpdateRecipeRes> => {
  const res = await axios.post<UpdateRecipeRes>(`/api/recipe/${id}`, data);
  return res.data;
};

export const getRecipe = async (id: string): Promise<GetRecipeRes> => {
  const res = await axios.get<GetRecipeRes>(`/api/recipe/${id}`);
  return res.data;
};
