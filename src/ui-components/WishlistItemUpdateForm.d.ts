/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { WishlistItem } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WishlistItemUpdateFormInputValues = {
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
export declare type WishlistItemUpdateFormValidationValues = {
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
export declare type WishlistItemUpdateFormOverridesProps = {
    WishlistItemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type WishlistItemUpdateFormProps = React.PropsWithChildren<{
    overrides?: WishlistItemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    wishlistItem?: WishlistItem;
    onSubmit?: (fields: WishlistItemUpdateFormInputValues) => WishlistItemUpdateFormInputValues;
    onSuccess?: (fields: WishlistItemUpdateFormInputValues) => void;
    onError?: (fields: WishlistItemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WishlistItemUpdateFormInputValues) => WishlistItemUpdateFormInputValues;
    onValidate?: WishlistItemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WishlistItemUpdateForm(props: WishlistItemUpdateFormProps): React.ReactElement;
