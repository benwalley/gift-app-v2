/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Groups } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GroupsUpdateFormInputValues = {
    groupName?: string;
    memberId?: string[];
    createdBy?: string;
    additionalAdmins?: string[];
    invitedEmail?: string[];
};
export declare type GroupsUpdateFormValidationValues = {
    groupName?: ValidationFunction<string>;
    memberId?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    additionalAdmins?: ValidationFunction<string>;
    invitedEmail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GroupsUpdateFormOverridesProps = {
    GroupsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    groupName?: PrimitiveOverrideProps<TextFieldProps>;
    memberId?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    additionalAdmins?: PrimitiveOverrideProps<TextFieldProps>;
    invitedEmail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GroupsUpdateFormProps = React.PropsWithChildren<{
    overrides?: GroupsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    groups?: Groups;
    onSubmit?: (fields: GroupsUpdateFormInputValues) => GroupsUpdateFormInputValues;
    onSuccess?: (fields: GroupsUpdateFormInputValues) => void;
    onError?: (fields: GroupsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GroupsUpdateFormInputValues) => GroupsUpdateFormInputValues;
    onValidate?: GroupsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GroupsUpdateForm(props: GroupsUpdateFormProps): React.ReactElement;
