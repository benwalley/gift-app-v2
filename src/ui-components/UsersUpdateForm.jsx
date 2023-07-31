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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Users } from "../models";
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
export default function UsersUpdateForm(props) {
  const {
    id: idProp,
    users,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    username: "",
    email: "",
    authUsername: "",
    subuserModeOn: false,
    parentId: "",
    notes: "",
    isUser: false,
    editingUsers: [],
    image: "",
  };
  const [username, setUsername] = React.useState(initialValues.username);
  const [email, setEmail] = React.useState(initialValues.email);
  const [authUsername, setAuthUsername] = React.useState(
    initialValues.authUsername
  );
  const [subuserModeOn, setSubuserModeOn] = React.useState(
    initialValues.subuserModeOn
  );
  const [parentId, setParentId] = React.useState(initialValues.parentId);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [isUser, setIsUser] = React.useState(initialValues.isUser);
  const [editingUsers, setEditingUsers] = React.useState(
    initialValues.editingUsers
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = usersRecord
      ? { ...initialValues, ...usersRecord }
      : initialValues;
    setUsername(cleanValues.username);
    setEmail(cleanValues.email);
    setAuthUsername(cleanValues.authUsername);
    setSubuserModeOn(cleanValues.subuserModeOn);
    setParentId(cleanValues.parentId);
    setNotes(cleanValues.notes);
    setIsUser(cleanValues.isUser);
    setEditingUsers(cleanValues.editingUsers ?? []);
    setCurrentEditingUsersValue("");
    setImage(cleanValues.image);
    setErrors({});
  };
  const [usersRecord, setUsersRecord] = React.useState(users);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Users, idProp) : users;
      setUsersRecord(record);
    };
    queryData();
  }, [idProp, users]);
  React.useEffect(resetStateValues, [usersRecord]);
  const [currentEditingUsersValue, setCurrentEditingUsersValue] =
    React.useState("");
  const editingUsersRef = React.createRef();
  const validations = {
    username: [{ type: "Required" }],
    email: [],
    authUsername: [],
    subuserModeOn: [],
    parentId: [],
    notes: [],
    isUser: [],
    editingUsers: [],
    image: [],
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
          username,
          email,
          authUsername,
          subuserModeOn,
          parentId,
          notes,
          isUser,
          editingUsers,
          image,
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
            Users.copyOf(usersRecord, (updated) => {
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
      {...getOverrideProps(overrides, "UsersUpdateForm")}
      {...rest}
    >
      <TextField
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username: value,
              email,
              authUsername,
              subuserModeOn,
              parentId,
              notes,
              isUser,
              editingUsers,
              image,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username,
              email: value,
              authUsername,
              subuserModeOn,
              parentId,
              notes,
              isUser,
              editingUsers,
              image,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Auth username"
        isRequired={false}
        isReadOnly={false}
        value={authUsername}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username,
              email,
              authUsername: value,
              subuserModeOn,
              parentId,
              notes,
              isUser,
              editingUsers,
              image,
            };
            const result = onChange(modelFields);
            value = result?.authUsername ?? value;
          }
          if (errors.authUsername?.hasError) {
            runValidationTasks("authUsername", value);
          }
          setAuthUsername(value);
        }}
        onBlur={() => runValidationTasks("authUsername", authUsername)}
        errorMessage={errors.authUsername?.errorMessage}
        hasError={errors.authUsername?.hasError}
        {...getOverrideProps(overrides, "authUsername")}
      ></TextField>
      <SwitchField
        label="Subuser mode on"
        defaultChecked={false}
        isDisabled={false}
        isChecked={subuserModeOn}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              username,
              email,
              authUsername,
              subuserModeOn: value,
              parentId,
              notes,
              isUser,
              editingUsers,
              image,
            };
            const result = onChange(modelFields);
            value = result?.subuserModeOn ?? value;
          }
          if (errors.subuserModeOn?.hasError) {
            runValidationTasks("subuserModeOn", value);
          }
          setSubuserModeOn(value);
        }}
        onBlur={() => runValidationTasks("subuserModeOn", subuserModeOn)}
        errorMessage={errors.subuserModeOn?.errorMessage}
        hasError={errors.subuserModeOn?.hasError}
        {...getOverrideProps(overrides, "subuserModeOn")}
      ></SwitchField>
      <TextField
        label="Parent id"
        isRequired={false}
        isReadOnly={false}
        value={parentId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username,
              email,
              authUsername,
              subuserModeOn,
              parentId: value,
              notes,
              isUser,
              editingUsers,
              image,
            };
            const result = onChange(modelFields);
            value = result?.parentId ?? value;
          }
          if (errors.parentId?.hasError) {
            runValidationTasks("parentId", value);
          }
          setParentId(value);
        }}
        onBlur={() => runValidationTasks("parentId", parentId)}
        errorMessage={errors.parentId?.errorMessage}
        hasError={errors.parentId?.hasError}
        {...getOverrideProps(overrides, "parentId")}
      ></TextField>
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username,
              email,
              authUsername,
              subuserModeOn,
              parentId,
              notes: value,
              isUser,
              editingUsers,
              image,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <SwitchField
        label="Is user"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isUser}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              username,
              email,
              authUsername,
              subuserModeOn,
              parentId,
              notes,
              isUser: value,
              editingUsers,
              image,
            };
            const result = onChange(modelFields);
            value = result?.isUser ?? value;
          }
          if (errors.isUser?.hasError) {
            runValidationTasks("isUser", value);
          }
          setIsUser(value);
        }}
        onBlur={() => runValidationTasks("isUser", isUser)}
        errorMessage={errors.isUser?.errorMessage}
        hasError={errors.isUser?.hasError}
        {...getOverrideProps(overrides, "isUser")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              username,
              email,
              authUsername,
              subuserModeOn,
              parentId,
              notes,
              isUser,
              editingUsers: values,
              image,
            };
            const result = onChange(modelFields);
            values = result?.editingUsers ?? values;
          }
          setEditingUsers(values);
          setCurrentEditingUsersValue("");
        }}
        currentFieldValue={currentEditingUsersValue}
        label={"Editing users"}
        items={editingUsers}
        hasError={errors.editingUsers?.hasError}
        setFieldValue={setCurrentEditingUsersValue}
        inputFieldRef={editingUsersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Editing users"
          isRequired={false}
          isReadOnly={false}
          value={currentEditingUsersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.editingUsers?.hasError) {
              runValidationTasks("editingUsers", value);
            }
            setCurrentEditingUsersValue(value);
          }}
          onBlur={() =>
            runValidationTasks("editingUsers", currentEditingUsersValue)
          }
          errorMessage={errors.editingUsers?.errorMessage}
          hasError={errors.editingUsers?.hasError}
          ref={editingUsersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "editingUsers")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username,
              email,
              authUsername,
              subuserModeOn,
              parentId,
              notes,
              isUser,
              editingUsers,
              image: value,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
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
          isDisabled={!(idProp || users)}
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
              !(idProp || users) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
