/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Money } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MoneyCreateForm(props) {
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
    owedFromName: "",
    owedToName: "",
    amount: "",
    ownerId: "",
    note: "",
  };
  const [owedFromName, setOwedFromName] = React.useState(
    initialValues.owedFromName
  );
  const [owedToName, setOwedToName] = React.useState(initialValues.owedToName);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [ownerId, setOwnerId] = React.useState(initialValues.ownerId);
  const [note, setNote] = React.useState(initialValues.note);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwedFromName(initialValues.owedFromName);
    setOwedToName(initialValues.owedToName);
    setAmount(initialValues.amount);
    setOwnerId(initialValues.ownerId);
    setNote(initialValues.note);
    setErrors({});
  };
  const validations = {
    owedFromName: [{ type: "Required" }],
    owedToName: [{ type: "Required" }],
    amount: [{ type: "Required" }],
    ownerId: [],
    note: [],
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
          owedFromName,
          owedToName,
          amount,
          ownerId,
          note,
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
          await DataStore.save(new Money(modelFields));
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
      {...getOverrideProps(overrides, "MoneyCreateForm")}
      {...rest}
    >
      <TextField
        label="Owed from name"
        isRequired={true}
        isReadOnly={false}
        value={owedFromName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owedFromName: value,
              owedToName,
              amount,
              ownerId,
              note,
            };
            const result = onChange(modelFields);
            value = result?.owedFromName ?? value;
          }
          if (errors.owedFromName?.hasError) {
            runValidationTasks("owedFromName", value);
          }
          setOwedFromName(value);
        }}
        onBlur={() => runValidationTasks("owedFromName", owedFromName)}
        errorMessage={errors.owedFromName?.errorMessage}
        hasError={errors.owedFromName?.hasError}
        {...getOverrideProps(overrides, "owedFromName")}
      ></TextField>
      <TextField
        label="Owed to name"
        isRequired={true}
        isReadOnly={false}
        value={owedToName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owedFromName,
              owedToName: value,
              amount,
              ownerId,
              note,
            };
            const result = onChange(modelFields);
            value = result?.owedToName ?? value;
          }
          if (errors.owedToName?.hasError) {
            runValidationTasks("owedToName", value);
          }
          setOwedToName(value);
        }}
        onBlur={() => runValidationTasks("owedToName", owedToName)}
        errorMessage={errors.owedToName?.errorMessage}
        hasError={errors.owedToName?.hasError}
        {...getOverrideProps(overrides, "owedToName")}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              owedFromName,
              owedToName,
              amount: value,
              ownerId,
              note,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="Owner id"
        isRequired={false}
        isReadOnly={false}
        value={ownerId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owedFromName,
              owedToName,
              amount,
              ownerId: value,
              note,
            };
            const result = onChange(modelFields);
            value = result?.ownerId ?? value;
          }
          if (errors.ownerId?.hasError) {
            runValidationTasks("ownerId", value);
          }
          setOwnerId(value);
        }}
        onBlur={() => runValidationTasks("ownerId", ownerId)}
        errorMessage={errors.ownerId?.errorMessage}
        hasError={errors.ownerId?.hasError}
        {...getOverrideProps(overrides, "ownerId")}
      ></TextField>
      <TextField
        label="Note"
        isRequired={false}
        isReadOnly={false}
        value={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owedFromName,
              owedToName,
              amount,
              ownerId,
              note: value,
            };
            const result = onChange(modelFields);
            value = result?.note ?? value;
          }
          if (errors.note?.hasError) {
            runValidationTasks("note", value);
          }
          setNote(value);
        }}
        onBlur={() => runValidationTasks("note", note)}
        errorMessage={errors.note?.errorMessage}
        hasError={errors.note?.hasError}
        {...getOverrideProps(overrides, "note")}
      ></TextField>
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
