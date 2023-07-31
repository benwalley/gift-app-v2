/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Theme } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ThemeUpdateFormInputValues = {
    userId?: string;
    themeName?: string;
};
export declare type ThemeUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    themeName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThemeUpdateFormOverridesProps = {
    ThemeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    themeName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ThemeUpdateFormProps = React.PropsWithChildren<{
    overrides?: ThemeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    theme?: Theme;
    onSubmit?: (fields: ThemeUpdateFormInputValues) => ThemeUpdateFormInputValues;
    onSuccess?: (fields: ThemeUpdateFormInputValues) => void;
    onError?: (fields: ThemeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThemeUpdateFormInputValues) => ThemeUpdateFormInputValues;
    onValidate?: ThemeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ThemeUpdateForm(props: ThemeUpdateFormProps): React.ReactElement;
