/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Giving } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function GivingUpdateForm(props) {
  const {
    id: idProp,
    giving,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    status: "",
    giftId: "",
    actualPrice: "",
    buyerId: "",
    giverIds: [],
  };
  const [status, setStatus] = React.useState(initialValues.status);
  const [giftId, setGiftId] = React.useState(initialValues.giftId);
  const [actualPrice, setActualPrice] = React.useState(
    initialValues.actualPrice
  );
  const [buyerId, setBuyerId] = React.useState(initialValues.buyerId);
  const [giverIds, setGiverIds] = React.useState(initialValues.giverIds);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = givingRecord
      ? { ...initialValues, ...givingRecord }
      : initialValues;
    setStatus(cleanValues.status);
    setGiftId(cleanValues.giftId);
    setActualPrice(cleanValues.actualPrice);
    setBuyerId(cleanValues.buyerId);
    setGiverIds(cleanValues.giverIds ?? []);
    setCurrentGiverIdsValue("");
    setErrors({});
  };
  const [givingRecord, setGivingRecord] = React.useState(giving);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Giving, idProp) : giving;
      setGivingRecord(record);
    };
    queryData();
  }, [idProp, giving]);
  React.useEffect(resetStateValues, [givingRecord]);
  const [currentGiverIdsValue, setCurrentGiverIdsValue] = React.useState("");
  const giverIdsRef = React.createRef();
  const validations = {
    status: [],
    giftId: [],
    actualPrice: [],
    buyerId: [],
    giverIds: [],
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
          status,
          giftId,
          actualPrice,
          buyerId,
          giverIds,
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
          await DataStore.save(
            Giving.copyOf(givingRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "GivingUpdateForm")}
      {...rest}
    >
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status: value,
              giftId,
              actualPrice,
              buyerId,
              giverIds,
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
      <TextField
        label="Gift id"
        isRequired={false}
        isReadOnly={false}
        value={giftId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              giftId: value,
              actualPrice,
              buyerId,
              giverIds,
            };
            const result = onChange(modelFields);
            value = result?.giftId ?? value;
          }
          if (errors.giftId?.hasError) {
            runValidationTasks("giftId", value);
          }
          setGiftId(value);
        }}
        onBlur={() => runValidationTasks("giftId", giftId)}
        errorMessage={errors.giftId?.errorMessage}
        hasError={errors.giftId?.hasError}
        {...getOverrideProps(overrides, "giftId")}
      ></TextField>
      <TextField
        label="Actual price"
        isRequired={false}
        isReadOnly={false}
        value={actualPrice}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              giftId,
              actualPrice: value,
              buyerId,
              giverIds,
            };
            const result = onChange(modelFields);
            value = result?.actualPrice ?? value;
          }
          if (errors.actualPrice?.hasError) {
            runValidationTasks("actualPrice", value);
          }
          setActualPrice(value);
        }}
        onBlur={() => runValidationTasks("actualPrice", actualPrice)}
        errorMessage={errors.actualPrice?.errorMessage}
        hasError={errors.actualPrice?.hasError}
        {...getOverrideProps(overrides, "actualPrice")}
      ></TextField>
      <TextField
        label="Buyer id"
        isRequired={false}
        isReadOnly={false}
        value={buyerId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              giftId,
              actualPrice,
              buyerId: value,
              giverIds,
            };
            const result = onChange(modelFields);
            value = result?.buyerId ?? value;
          }
          if (errors.buyerId?.hasError) {
            runValidationTasks("buyerId", value);
          }
          setBuyerId(value);
        }}
        onBlur={() => runValidationTasks("buyerId", buyerId)}
        errorMessage={errors.buyerId?.errorMessage}
        hasError={errors.buyerId?.hasError}
        {...getOverrideProps(overrides, "buyerId")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              status,
              giftId,
              actualPrice,
              buyerId,
              giverIds: values,
            };
            const result = onChange(modelFields);
            values = result?.giverIds ?? values;
          }
          setGiverIds(values);
          setCurrentGiverIdsValue("");
        }}
        currentFieldValue={currentGiverIdsValue}
        label={"Giver ids"}
        items={giverIds}
        hasError={errors.giverIds?.hasError}
        setFieldValue={setCurrentGiverIdsValue}
        inputFieldRef={giverIdsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Giver ids"
          isRequired={false}
          isReadOnly={false}
          value={currentGiverIdsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.giverIds?.hasError) {
              runValidationTasks("giverIds", value);
            }
            setCurrentGiverIdsValue(value);
          }}
          onBlur={() => runValidationTasks("giverIds", currentGiverIdsValue)}
          errorMessage={errors.giverIds?.errorMessage}
          hasError={errors.giverIds?.hasError}
          ref={giverIdsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "giverIds")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || giving)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || giving) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
