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
export declare type PlanningCreateFormInputValues = {
    giftForId?: string;
    giftFromId?: string;
    status?: string;
    wantToGetGifts?: boolean;
};
export declare type PlanningCreateFormValidationValues = {
    giftForId?: ValidationFunction<string>;
    giftFromId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    wantToGetGifts?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlanningCreateFormOverridesProps = {
    PlanningCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    giftForId?: PrimitiveOverrideProps<TextFieldProps>;
    giftFromId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    wantToGetGifts?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PlanningCreateFormProps = React.PropsWithChildren<{
    overrides?: PlanningCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PlanningCreateFormInputValues) => PlanningCreateFormInputValues;
    onSuccess?: (fields: PlanningCreateFormInputValues) => void;
    onError?: (fields: PlanningCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlanningCreateFormInputValues) => PlanningCreateFormInputValues;
    onValidate?: PlanningCreateFormValidationValues;
} & React.CSSProperties>;
export default function PlanningCreateForm(props: PlanningCreateFormProps): React.ReactElement;
