/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Planning } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PlanningUpdateFormInputValues = {
    giftForId?: string;
    giftFromId?: string;
    status?: string;
    wantToGetGifts?: boolean;
};
export declare type PlanningUpdateFormValidationValues = {
    giftForId?: ValidationFunction<string>;
    giftFromId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    wantToGetGifts?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlanningUpdateFormOverridesProps = {
    PlanningUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    giftForId?: PrimitiveOverrideProps<TextFieldProps>;
    giftFromId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    wantToGetGifts?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PlanningUpdateFormProps = React.PropsWithChildren<{
    overrides?: PlanningUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    planning?: Planning;
    onSubmit?: (fields: PlanningUpdateFormInputValues) => PlanningUpdateFormInputValues;
    onSuccess?: (fields: PlanningUpdateFormInputValues) => void;
    onError?: (fields: PlanningUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlanningUpdateFormInputValues) => PlanningUpdateFormInputValues;
    onValidate?: PlanningUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PlanningUpdateForm(props: PlanningUpdateFormProps): React.ReactElement;
