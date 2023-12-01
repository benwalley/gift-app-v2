/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Planning } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PlanningCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    giftForId: "",
    giftFromId: "",
    status: "",
    wantToGetGifts: false,
  };
  const [giftForId, setGiftForId] = React.useState(initialValues.giftForId);
  const [giftFromId, setGiftFromId] = React.useState(initialValues.giftFromId);
  const [status, setStatus] = React.useState(initialValues.status);
  const [wantToGetGifts, setWantToGetGifts] = React.useState(
    initialValues.wantToGetGifts
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setGiftForId(initialValues.giftForId);
    setGiftFromId(initialValues.giftFromId);
    setStatus(initialValues.status);
    setWantToGetGifts(initialValues.wantToGetGifts);
    setErrors({});
  };
  const validations = {
    giftForId: [],
    giftFromId: [],
    status: [],
    wantToGetGifts: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          giftForId,
          giftFromId,
          status,
          wantToGetGifts,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Planning(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PlanningCreateForm")}
      {...rest}
    >
      <TextField
        label="Gift for id"
        isRequired={false}
        isReadOnly={false}
        value={giftForId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              giftForId: value,
              giftFromId,
              status,
              wantToGetGifts,
            };
            const result = onChange(modelFields);
            value = result?.giftForId ?? value;
          }
          if (errors.giftForId?.hasError) {
            runValidationTasks("giftForId", value);
          }
          setGiftForId(value);
        }}
        onBlur={() => runValidationTasks("giftForId", giftForId)}
        errorMessage={errors.giftForId?.errorMessage}
        hasError={errors.giftForId?.hasError}
        {...getOverrideProps(overrides, "giftForId")}
      ></TextField>
      <TextField
        label="Gift from id"
        isRequired={false}
        isReadOnly={false}
        value={giftFromId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              giftForId,
              giftFromId: value,
              status,
              wantToGetGifts,
            };
            const result = onChange(modelFields);
            value = result?.giftFromId ?? value;
          }
          if (errors.giftFromId?.hasError) {
            runValidationTasks("giftFromId", value);
          }
          setGiftFromId(value);
        }}
        onBlur={() => runValidationTasks("giftFromId", giftFromId)}
        errorMessage={errors.giftFromId?.errorMessage}
        hasError={errors.giftFromId?.hasError}
        {...getOverrideProps(overrides, "giftFromId")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              giftForId,
              giftFromId,
              status: value,
              wantToGetGifts,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <SwitchField
        label="Want to get gifts"
        defaultChecked={false}
        isDisabled={false}
        isChecked={wantToGetGifts}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              giftForId,
              giftFromId,
              status,
              wantToGetGifts: value,
            };
            const result = onChange(modelFields);
            value = result?.wantToGetGifts ?? value;
          }
          if (errors.wantToGetGifts?.hasError) {
            runValidationTasks("wantToGetGifts", value);
          }
          setWantToGetGifts(value);
        }}
        onBlur={() => runValidationTasks("wantToGetGifts", wantToGetGifts)}
        errorMessage={errors.wantToGetGifts?.errorMessage}
        hasError={errors.wantToGetGifts?.hasError}
        {...getOverrideProps(overrides, "wantToGetGifts")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
