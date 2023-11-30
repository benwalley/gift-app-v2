/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AdminMessages } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AdminMessagesUpdateFormInputValues = {
    message?: string;
    endDate?: string;
    seenBy?: string[];
    startDate?: string;
};
export declare type AdminMessagesUpdateFormValidationValues = {
    message?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    seenBy?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminMessagesUpdateFormOverridesProps = {
    AdminMessagesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    seenBy?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdminMessagesUpdateFormProps = React.PropsWithChildren<{
    overrides?: AdminMessagesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    adminMessages?: AdminMessages;
    onSubmit?: (fields: AdminMessagesUpdateFormInputValues) => AdminMessagesUpdateFormInputValues;
    onSuccess?: (fields: AdminMessagesUpdateFormInputValues) => void;
    onError?: (fields: AdminMessagesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdminMessagesUpdateFormInputValues) => AdminMessagesUpdateFormInputValues;
    onValidate?: AdminMessagesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AdminMessagesUpdateForm(props: AdminMessagesUpdateFormProps): React.ReactElement;
