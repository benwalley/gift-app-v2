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
export declare type CommentsCreateFormInputValues = {
    isWishlistComment?: string;
    posterId?: string;
    groupIds?: string[];
    isVisibleToOwner?: boolean;
    commentText?: string;
    parentId?: string;
};
export declare type CommentsCreateFormValidationValues = {
    isWishlistComment?: ValidationFunction<string>;
    posterId?: ValidationFunction<string>;
    groupIds?: ValidationFunction<string>;
    isVisibleToOwner?: ValidationFunction<boolean>;
    commentText?: ValidationFunction<string>;
    parentId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentsCreateFormOverridesProps = {
    CommentsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    isWishlistComment?: PrimitiveOverrideProps<TextFieldProps>;
    posterId?: PrimitiveOverrideProps<TextFieldProps>;
    groupIds?: PrimitiveOverrideProps<TextFieldProps>;
    isVisibleToOwner?: PrimitiveOverrideProps<SwitchFieldProps>;
    commentText?: PrimitiveOverrideProps<TextFieldProps>;
    parentId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommentsCreateFormProps = React.PropsWithChildren<{
    overrides?: CommentsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CommentsCreateFormInputValues) => CommentsCreateFormInputValues;
    onSuccess?: (fields: CommentsCreateFormInputValues) => void;
    onError?: (fields: CommentsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommentsCreateFormInputValues) => CommentsCreateFormInputValues;
    onValidate?: CommentsCreateFormValidationValues;
} & React.CSSProperties>;
export default function CommentsCreateForm(props: CommentsCreateFormProps): React.ReactElement;
