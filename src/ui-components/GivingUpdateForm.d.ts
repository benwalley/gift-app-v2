/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Giving } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GivingUpdateFormInputValues = {
    status?: string;
    giftId?: string;
    actualPrice?: string;
    buyerId?: string;
    giverIds?: string[];
};
export declare type GivingUpdateFormValidationValues = {
    status?: ValidationFunction<string>;
    giftId?: ValidationFunction<string>;
    actualPrice?: ValidationFunction<string>;
    buyerId?: ValidationFunction<string>;
    giverIds?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GivingUpdateFormOverridesProps = {
    GivingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    giftId?: PrimitiveOverrideProps<TextFieldProps>;
    actualPrice?: PrimitiveOverrideProps<TextFieldProps>;
    buyerId?: PrimitiveOverrideProps<TextFieldProps>;
    giverIds?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GivingUpdateFormProps = React.PropsWithChildren<{
    overrides?: GivingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    giving?: Giving;
    onSubmit?: (fields: GivingUpdateFormInputValues) => GivingUpdateFormInputValues;
    onSuccess?: (fields: GivingUpdateFormInputValues) => void;
    onError?: (fields: GivingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GivingUpdateFormInputValues) => GivingUpdateFormInputValues;
    onValidate?: GivingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GivingUpdateForm(props: GivingUpdateFormProps): React.ReactElement;
