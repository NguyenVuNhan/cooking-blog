export const removeIdTransform = <
  TDoc,
  TRet extends { id: string; _id: string }
>(
  doc: TDoc,
  ret: TRet
) => {
  ret.id = ret._id;
  delete ret._id;
};
