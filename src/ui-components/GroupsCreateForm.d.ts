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
export declare type GroupsCreateFormInputValues = {
    groupName?: string;
    memberId?: string[];
    createdBy?: string;
    additionalAdmins?: string[];
    invitedEmail?: string[];
};
export declare type GroupsCreateFormValidationValues = {
    groupName?: ValidationFunction<string>;
    memberId?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    additionalAdmins?: ValidationFunction<string>;
    invitedEmail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GroupsCreateFormOverridesProps = {
    GroupsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    groupName?: PrimitiveOverrideProps<TextFieldProps>;
    memberId?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    additionalAdmins?: PrimitiveOverrideProps<TextFieldProps>;
    invitedEmail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GroupsCreateFormProps = React.PropsWithChildren<{
    overrides?: GroupsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GroupsCreateFormInputValues) => GroupsCreateFormInputValues;
    onSuccess?: (fields: GroupsCreateFormInputValues) => void;
    onError?: (fields: GroupsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GroupsCreateFormInputValues) => GroupsCreateFormInputValues;
    onValidate?: GroupsCreateFormValidationValues;
} & React.CSSProperties>;
export default function GroupsCreateForm(props: GroupsCreateFormProps): React.ReactElement;
