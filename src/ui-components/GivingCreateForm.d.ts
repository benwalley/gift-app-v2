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
export declare type GivingCreateFormInputValues = {
    status?: string;
    giftId?: string;
    actualPrice?: string;
    buyerId?: string;
    giverIds?: string[];
};
export declare type GivingCreateFormValidationValues = {
    status?: ValidationFunction<string>;
    giftId?: ValidationFunction<string>;
    actualPrice?: ValidationFunction<string>;
    buyerId?: ValidationFunction<string>;
    giverIds?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GivingCreateFormOverridesProps = {
    GivingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    giftId?: PrimitiveOverrideProps<TextFieldProps>;
    actualPrice?: PrimitiveOverrideProps<TextFieldProps>;
    buyerId?: PrimitiveOverrideProps<TextFieldProps>;
    giverIds?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GivingCreateFormProps = React.PropsWithChildren<{
    overrides?: GivingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GivingCreateFormInputValues) => GivingCreateFormInputValues;
    onSuccess?: (fields: GivingCreateFormInputValues) => void;
    onError?: (fields: GivingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GivingCreateFormInputValues) => GivingCreateFormInputValues;
    onValidate?: GivingCreateFormValidationValues;
} & React.CSSProperties>;
export default function GivingCreateForm(props: GivingCreateFormProps): React.ReactElement;
