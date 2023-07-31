/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ThemeCreateFormInputValues = {
    userId?: string;
    themeName?: string;
};
export declare type ThemeCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    themeName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThemeCreateFormOverridesProps = {
    ThemeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    themeName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ThemeCreateFormProps = React.PropsWithChildren<{
    overrides?: ThemeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ThemeCreateFormInputValues) => ThemeCreateFormInputValues;
    onSuccess?: (fields: ThemeCreateFormInputValues) => void;
    onError?: (fields: ThemeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThemeCreateFormInputValues) => ThemeCreateFormInputValues;
    onValidate?: ThemeCreateFormValidationValues;
} & React.CSSProperties>;
export default function ThemeCreateForm(props: ThemeCreateFormProps): React.ReactElement;
