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
export declare type MoneyCreateFormInputValues = {
    owedFromName?: string;
    owedToName?: string;
    amount?: number;
    ownerId?: string;
    note?: string;
};
export declare type MoneyCreateFormValidationValues = {
    owedFromName?: ValidationFunction<string>;
    owedToName?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    ownerId?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MoneyCreateFormOverridesProps = {
    MoneyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owedFromName?: PrimitiveOverrideProps<TextFieldProps>;
    owedToName?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    ownerId?: PrimitiveOverrideProps<TextFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MoneyCreateFormProps = React.PropsWithChildren<{
    overrides?: MoneyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MoneyCreateFormInputValues) => MoneyCreateFormInputValues;
    onSuccess?: (fields: MoneyCreateFormInputValues) => void;
    onError?: (fields: MoneyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MoneyCreateFormInputValues) => MoneyCreateFormInputValues;
    onValidate?: MoneyCreateFormValidationValues;
} & React.CSSProperties>;
export default function MoneyCreateForm(props: MoneyCreateFormProps): React.ReactElement;
