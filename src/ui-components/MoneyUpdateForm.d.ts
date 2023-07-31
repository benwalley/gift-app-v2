/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Money } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MoneyUpdateFormInputValues = {
    owedFromName?: string;
    owedToName?: string;
    amount?: number;
    ownerId?: string;
    note?: string;
};
export declare type MoneyUpdateFormValidationValues = {
    owedFromName?: ValidationFunction<string>;
    owedToName?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    ownerId?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MoneyUpdateFormOverridesProps = {
    MoneyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owedFromName?: PrimitiveOverrideProps<TextFieldProps>;
    owedToName?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    ownerId?: PrimitiveOverrideProps<TextFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MoneyUpdateFormProps = React.PropsWithChildren<{
    overrides?: MoneyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    money?: Money;
    onSubmit?: (fields: MoneyUpdateFormInputValues) => MoneyUpdateFormInputValues;
    onSuccess?: (fields: MoneyUpdateFormInputValues) => void;
    onError?: (fields: MoneyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MoneyUpdateFormInputValues) => MoneyUpdateFormInputValues;
    onValidate?: MoneyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MoneyUpdateForm(props: MoneyUpdateFormProps): React.ReactElement;
