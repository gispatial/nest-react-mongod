import { FunctionComponent } from 'react';
import { InputProps } from 'ra-core';
import { TextFieldProps } from '@material-ui/core/TextField';
export declare type TextInputProps = InputProps<TextFieldProps> & Omit<TextFieldProps, 'label' | 'helperText'>;
/**
 * An Input component for a string
 *
 * @example
 * <TextInput source="first_name" />
 *
 * You can customize the `type` props (which defaults to "text").
 * Note that, due to a React bug, you should use `<NumberField>` instead of using type="number".
 * @example
 * <TextInput source="email" type="email" />
 * <NumberInput source="nb_views" />
 *
 * The object passed as `options` props is passed to the <ResettableTextField> component
 */
declare const TextInput: FunctionComponent<TextInputProps>;
export default TextInput;
