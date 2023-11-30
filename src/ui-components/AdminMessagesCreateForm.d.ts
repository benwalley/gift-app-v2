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
export declare type AdminMessagesCreateFormInputValues = {
    message?: string;
    endDate?: string;
    seenBy?: string[];
    startDate?: string;
};
export declare type AdminMessagesCreateFormValidationValues = {
    message?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    seenBy?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminMessagesCreateFormOverridesProps = {
    AdminMessagesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    seenBy?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdminMessagesCreateFormProps = React.PropsWithChildren<{
    overrides?: AdminMessagesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AdminMessagesCreateFormInputValues) => AdminMessagesCreateFormInputValues;
    onSuccess?: (fields: AdminMessagesCreateFormInputValues) => void;
    onError?: (fields: AdminMessagesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdminMessagesCreateFormInputValues) => AdminMessagesCreateFormInputValues;
    onValidate?: AdminMessagesCreateFormValidationValues;
} & React.CSSProperties>;
export default function AdminMessagesCreateForm(props: AdminMessagesCreateFormProps): React.ReactElement;
