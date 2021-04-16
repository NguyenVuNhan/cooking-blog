import React, { forwardRef } from 'react';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField';

export type TextFieldProps = MuiTextFieldProps & {
  thisRef?: MuiTextFieldProps['ref'];
};

export const TextField = forwardRef((props: TextFieldProps, ref) => {
  return <MuiTextField {...props} inputRef={ref} />;
});

export default TextField;
