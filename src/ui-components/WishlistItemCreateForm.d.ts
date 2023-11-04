/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WishlistItemCreateFormInputValues = {
    name?: string;
    price?: string;
    images?: string[];
    note?: string;
    groups?: string[];
    ownerId?: string;
    priority?: string;
    link?: string;
    gottenBy?: string[];
    wantsToGet?: string[];
    custom?: boolean;
    isPublic?: boolean;
    createdById?: string;
    seenBy?: string[];
};
export declare type WishlistItemCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    price?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
    groups?: ValidationFunction<string>;
    ownerId?: ValidationFunction<string>;
    priority?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    gottenBy?: ValidationFunction<string>;
    wantsToGet?: ValidationFunction<string>;
    custom?: ValidationFunction<boolean>;
    isPublic?: ValidationFunction<boolean>;
    createdById?: ValidationFunction<string>;
    seenBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WishlistItemCreateFormOverridesProps = {
    WishlistItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    groups?: PrimitiveOverrideProps<TextFieldProps>;
    ownerId?: PrimitiveOverrideProps<TextFieldProps>;
    priority?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    gottenBy?: PrimitiveOverrideProps<TextFieldProps>;
    wantsToGet?: PrimitiveOverrideProps<TextFieldProps>;
    custom?: PrimitiveOverrideProps<SwitchFieldProps>;
    isPublic?: PrimitiveOverrideProps<SwitchFieldProps>;
    createdById?: PrimitiveOverrideProps<TextFieldProps>;
    seenBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WishlistItemCreateFormProps = React.PropsWithChildren<{
    overrides?: WishlistItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WishlistItemCreateFormInputValues) => WishlistItemCreateFormInputValues;
    onSuccess?: (fields: WishlistItemCreateFormInputValues) => void;
    onError?: (fields: WishlistItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WishlistItemCreateFormInputValues) => WishlistItemCreateFormInputValues;
    onValidate?: WishlistItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function WishlistItemCreateForm(props: WishlistItemCreateFormProps): React.ReactElement;
