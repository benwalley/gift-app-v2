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
import { Groups } from "../models";
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
export default function GroupsUpdateForm(props) {
  const {
    id: idProp,
    groups,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    groupName: "",
    memberId: [],
    createdBy: "",
    additionalAdmins: [],
    invitedEmail: [],
  };
  const [groupName, setGroupName] = React.useState(initialValues.groupName);
  const [memberId, setMemberId] = React.useState(initialValues.memberId);
  const [createdBy, setCreatedBy] = React.useState(initialValues.createdBy);
  const [additionalAdmins, setAdditionalAdmins] = React.useState(
    initialValues.additionalAdmins
  );
  const [invitedEmail, setInvitedEmail] = React.useState(
    initialValues.invitedEmail
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = groupsRecord
      ? { ...initialValues, ...groupsRecord }
      : initialValues;
    setGroupName(cleanValues.groupName);
    setMemberId(cleanValues.memberId ?? []);
    setCurrentMemberIdValue("");
    setCreatedBy(cleanValues.createdBy);
    setAdditionalAdmins(cleanValues.additionalAdmins ?? []);
    setCurrentAdditionalAdminsValue("");
    setInvitedEmail(cleanValues.invitedEmail ?? []);
    setCurrentInvitedEmailValue("");
    setErrors({});
  };
  const [groupsRecord, setGroupsRecord] = React.useState(groups);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Groups, idProp) : groups;
      setGroupsRecord(record);
    };
    queryData();
  }, [idProp, groups]);
  React.useEffect(resetStateValues, [groupsRecord]);
  const [currentMemberIdValue, setCurrentMemberIdValue] = React.useState("");
  const memberIdRef = React.createRef();
  const [currentAdditionalAdminsValue, setCurrentAdditionalAdminsValue] =
    React.useState("");
  const additionalAdminsRef = React.createRef();
  const [currentInvitedEmailValue, setCurrentInvitedEmailValue] =
    React.useState("");
  const invitedEmailRef = React.createRef();
  const validations = {
    groupName: [],
    memberId: [],
    createdBy: [{ type: "Required" }],
    additionalAdmins: [],
    invitedEmail: [],
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
          groupName,
          memberId,
          createdBy,
          additionalAdmins,
          invitedEmail,
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
            Groups.copyOf(groupsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "GroupsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Group name"
        isRequired={false}
        isReadOnly={false}
        value={groupName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              groupName: value,
              memberId,
              createdBy,
              additionalAdmins,
              invitedEmail,
            };
            const result = onChange(modelFields);
            value = result?.groupName ?? value;
          }
          if (errors.groupName?.hasError) {
            runValidationTasks("groupName", value);
          }
          setGroupName(value);
        }}
        onBlur={() => runValidationTasks("groupName", groupName)}
        errorMessage={errors.groupName?.errorMessage}
        hasError={errors.groupName?.hasError}
        {...getOverrideProps(overrides, "groupName")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              groupName,
              memberId: values,
              createdBy,
              additionalAdmins,
              invitedEmail,
            };
            const result = onChange(modelFields);
            values = result?.memberId ?? values;
          }
          setMemberId(values);
          setCurrentMemberIdValue("");
        }}
        currentFieldValue={currentMemberIdValue}
        label={"Member id"}
        items={memberId}
        hasError={errors.memberId?.hasError}
        setFieldValue={setCurrentMemberIdValue}
        inputFieldRef={memberIdRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Member id"
          isRequired={false}
          isReadOnly={false}
          value={currentMemberIdValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.memberId?.hasError) {
              runValidationTasks("memberId", value);
            }
            setCurrentMemberIdValue(value);
          }}
          onBlur={() => runValidationTasks("memberId", currentMemberIdValue)}
          errorMessage={errors.memberId?.errorMessage}
          hasError={errors.memberId?.hasError}
          ref={memberIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "memberId")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Created by"
        isRequired={true}
        isReadOnly={false}
        value={createdBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              groupName,
              memberId,
              createdBy: value,
              additionalAdmins,
              invitedEmail,
            };
            const result = onChange(modelFields);
            value = result?.createdBy ?? value;
          }
          if (errors.createdBy?.hasError) {
            runValidationTasks("createdBy", value);
          }
          setCreatedBy(value);
        }}
        onBlur={() => runValidationTasks("createdBy", createdBy)}
        errorMessage={errors.createdBy?.errorMessage}
        hasError={errors.createdBy?.hasError}
        {...getOverrideProps(overrides, "createdBy")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              groupName,
              memberId,
              createdBy,
              additionalAdmins: values,
              invitedEmail,
            };
            const result = onChange(modelFields);
            values = result?.additionalAdmins ?? values;
          }
          setAdditionalAdmins(values);
          setCurrentAdditionalAdminsValue("");
        }}
        currentFieldValue={currentAdditionalAdminsValue}
        label={"Additional admins"}
        items={additionalAdmins}
        hasError={errors.additionalAdmins?.hasError}
        setFieldValue={setCurrentAdditionalAdminsValue}
        inputFieldRef={additionalAdminsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Additional admins"
          isRequired={false}
          isReadOnly={false}
          value={currentAdditionalAdminsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.additionalAdmins?.hasError) {
              runValidationTasks("additionalAdmins", value);
            }
            setCurrentAdditionalAdminsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("additionalAdmins", currentAdditionalAdminsValue)
          }
          errorMessage={errors.additionalAdmins?.errorMessage}
          hasError={errors.additionalAdmins?.hasError}
          ref={additionalAdminsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "additionalAdmins")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              groupName,
              memberId,
              createdBy,
              additionalAdmins,
              invitedEmail: values,
            };
            const result = onChange(modelFields);
            values = result?.invitedEmail ?? values;
          }
          setInvitedEmail(values);
          setCurrentInvitedEmailValue("");
        }}
        currentFieldValue={currentInvitedEmailValue}
        label={"Invited email"}
        items={invitedEmail}
        hasError={errors.invitedEmail?.hasError}
        setFieldValue={setCurrentInvitedEmailValue}
        inputFieldRef={invitedEmailRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Invited email"
          isRequired={false}
          isReadOnly={false}
          value={currentInvitedEmailValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.invitedEmail?.hasError) {
              runValidationTasks("invitedEmail", value);
            }
            setCurrentInvitedEmailValue(value);
          }}
          onBlur={() =>
            runValidationTasks("invitedEmail", currentInvitedEmailValue)
          }
          errorMessage={errors.invitedEmail?.errorMessage}
          hasError={errors.invitedEmail?.hasError}
          ref={invitedEmailRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "invitedEmail")}
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
          isDisabled={!(idProp || groups)}
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
              !(idProp || groups) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
