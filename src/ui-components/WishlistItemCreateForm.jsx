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
import { WishlistItem } from "../models";
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
export default function WishlistItemCreateForm(props) {
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
    name: "",
    price: "",
    images: [],
    note: "",
    groups: [],
    ownerId: "",
    priority: "",
    link: "",
    gottenBy: [],
    wantsToGet: [],
    custom: false,
    isPublic: false,
    createdById: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [price, setPrice] = React.useState(initialValues.price);
  const [images, setImages] = React.useState(initialValues.images);
  const [note, setNote] = React.useState(initialValues.note);
  const [groups, setGroups] = React.useState(initialValues.groups);
  const [ownerId, setOwnerId] = React.useState(initialValues.ownerId);
  const [priority, setPriority] = React.useState(initialValues.priority);
  const [link, setLink] = React.useState(initialValues.link);
  const [gottenBy, setGottenBy] = React.useState(initialValues.gottenBy);
  const [wantsToGet, setWantsToGet] = React.useState(initialValues.wantsToGet);
  const [custom, setCustom] = React.useState(initialValues.custom);
  const [isPublic, setIsPublic] = React.useState(initialValues.isPublic);
  const [createdById, setCreatedById] = React.useState(
    initialValues.createdById
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setPrice(initialValues.price);
    setImages(initialValues.images);
    setCurrentImagesValue("");
    setNote(initialValues.note);
    setGroups(initialValues.groups);
    setCurrentGroupsValue("");
    setOwnerId(initialValues.ownerId);
    setPriority(initialValues.priority);
    setLink(initialValues.link);
    setGottenBy(initialValues.gottenBy);
    setCurrentGottenByValue("");
    setWantsToGet(initialValues.wantsToGet);
    setCurrentWantsToGetValue("");
    setCustom(initialValues.custom);
    setIsPublic(initialValues.isPublic);
    setCreatedById(initialValues.createdById);
    setErrors({});
  };
  const [currentImagesValue, setCurrentImagesValue] = React.useState("");
  const imagesRef = React.createRef();
  const [currentGroupsValue, setCurrentGroupsValue] = React.useState("");
  const groupsRef = React.createRef();
  const [currentGottenByValue, setCurrentGottenByValue] = React.useState("");
  const gottenByRef = React.createRef();
  const [currentWantsToGetValue, setCurrentWantsToGetValue] =
    React.useState("");
  const wantsToGetRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    price: [],
    images: [],
    note: [],
    groups: [],
    ownerId: [{ type: "Required" }],
    priority: [],
    link: [],
    gottenBy: [],
    wantsToGet: [],
    custom: [],
    isPublic: [],
    createdById: [],
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
          name,
          price,
          images,
          note,
          groups,
          ownerId,
          priority,
          link,
          gottenBy,
          wantsToGet,
          custom,
          isPublic,
          createdById,
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
          await DataStore.save(new WishlistItem(modelFields));
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
      {...getOverrideProps(overrides, "WishlistItemCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              price,
              images,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        value={price}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price: value,
              images,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images: values,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            values = result?.images ?? values;
          }
          setImages(values);
          setCurrentImagesValue("");
        }}
        currentFieldValue={currentImagesValue}
        label={"Images"}
        items={images}
        hasError={errors.images?.hasError}
        setFieldValue={setCurrentImagesValue}
        inputFieldRef={imagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Images"
          isRequired={false}
          isReadOnly={false}
          value={currentImagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.images?.hasError) {
              runValidationTasks("images", value);
            }
            setCurrentImagesValue(value);
          }}
          onBlur={() => runValidationTasks("images", currentImagesValue)}
          errorMessage={errors.images?.errorMessage}
          hasError={errors.images?.hasError}
          ref={imagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "images")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Note"
        isRequired={false}
        isReadOnly={false}
        value={note}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note: value,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups: values,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            values = result?.groups ?? values;
          }
          setGroups(values);
          setCurrentGroupsValue("");
        }}
        currentFieldValue={currentGroupsValue}
        label={"Groups"}
        items={groups}
        hasError={errors.groups?.hasError}
        setFieldValue={setCurrentGroupsValue}
        inputFieldRef={groupsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Groups"
          isRequired={false}
          isReadOnly={false}
          value={currentGroupsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.groups?.hasError) {
              runValidationTasks("groups", value);
            }
            setCurrentGroupsValue(value);
          }}
          onBlur={() => runValidationTasks("groups", currentGroupsValue)}
          errorMessage={errors.groups?.errorMessage}
          hasError={errors.groups?.hasError}
          ref={groupsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "groups")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Owner id"
        isRequired={true}
        isReadOnly={false}
        value={ownerId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId: value,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
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
        label="Priority"
        isRequired={false}
        isReadOnly={false}
        value={priority}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId,
              priority: value,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            value = result?.priority ?? value;
          }
          if (errors.priority?.hasError) {
            runValidationTasks("priority", value);
          }
          setPriority(value);
        }}
        onBlur={() => runValidationTasks("priority", priority)}
        errorMessage={errors.priority?.errorMessage}
        hasError={errors.priority?.hasError}
        {...getOverrideProps(overrides, "priority")}
      ></TextField>
      <TextField
        label="Link"
        isRequired={false}
        isReadOnly={false}
        value={link}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId,
              priority,
              link: value,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            value = result?.link ?? value;
          }
          if (errors.link?.hasError) {
            runValidationTasks("link", value);
          }
          setLink(value);
        }}
        onBlur={() => runValidationTasks("link", link)}
        errorMessage={errors.link?.errorMessage}
        hasError={errors.link?.hasError}
        {...getOverrideProps(overrides, "link")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy: values,
              wantsToGet,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            values = result?.gottenBy ?? values;
          }
          setGottenBy(values);
          setCurrentGottenByValue("");
        }}
        currentFieldValue={currentGottenByValue}
        label={"Gotten by"}
        items={gottenBy}
        hasError={errors.gottenBy?.hasError}
        setFieldValue={setCurrentGottenByValue}
        inputFieldRef={gottenByRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Gotten by"
          isRequired={false}
          isReadOnly={false}
          value={currentGottenByValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.gottenBy?.hasError) {
              runValidationTasks("gottenBy", value);
            }
            setCurrentGottenByValue(value);
          }}
          onBlur={() => runValidationTasks("gottenBy", currentGottenByValue)}
          errorMessage={errors.gottenBy?.errorMessage}
          hasError={errors.gottenBy?.hasError}
          ref={gottenByRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "gottenBy")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet: values,
              custom,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            values = result?.wantsToGet ?? values;
          }
          setWantsToGet(values);
          setCurrentWantsToGetValue("");
        }}
        currentFieldValue={currentWantsToGetValue}
        label={"Wants to get"}
        items={wantsToGet}
        hasError={errors.wantsToGet?.hasError}
        setFieldValue={setCurrentWantsToGetValue}
        inputFieldRef={wantsToGetRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Wants to get"
          isRequired={false}
          isReadOnly={false}
          value={currentWantsToGetValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.wantsToGet?.hasError) {
              runValidationTasks("wantsToGet", value);
            }
            setCurrentWantsToGetValue(value);
          }}
          onBlur={() =>
            runValidationTasks("wantsToGet", currentWantsToGetValue)
          }
          errorMessage={errors.wantsToGet?.errorMessage}
          hasError={errors.wantsToGet?.hasError}
          ref={wantsToGetRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "wantsToGet")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Custom"
        defaultChecked={false}
        isDisabled={false}
        isChecked={custom}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom: value,
              isPublic,
              createdById,
            };
            const result = onChange(modelFields);
            value = result?.custom ?? value;
          }
          if (errors.custom?.hasError) {
            runValidationTasks("custom", value);
          }
          setCustom(value);
        }}
        onBlur={() => runValidationTasks("custom", custom)}
        errorMessage={errors.custom?.errorMessage}
        hasError={errors.custom?.hasError}
        {...getOverrideProps(overrides, "custom")}
      ></SwitchField>
      <SwitchField
        label="Is public"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isPublic}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic: value,
              createdById,
            };
            const result = onChange(modelFields);
            value = result?.isPublic ?? value;
          }
          if (errors.isPublic?.hasError) {
            runValidationTasks("isPublic", value);
          }
          setIsPublic(value);
        }}
        onBlur={() => runValidationTasks("isPublic", isPublic)}
        errorMessage={errors.isPublic?.errorMessage}
        hasError={errors.isPublic?.hasError}
        {...getOverrideProps(overrides, "isPublic")}
      ></SwitchField>
      <TextField
        label="Created by id"
        isRequired={false}
        isReadOnly={false}
        value={createdById}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              images,
              note,
              groups,
              ownerId,
              priority,
              link,
              gottenBy,
              wantsToGet,
              custom,
              isPublic,
              createdById: value,
            };
            const result = onChange(modelFields);
            value = result?.createdById ?? value;
          }
          if (errors.createdById?.hasError) {
            runValidationTasks("createdById", value);
          }
          setCreatedById(value);
        }}
        onBlur={() => runValidationTasks("createdById", createdById)}
        errorMessage={errors.createdById?.errorMessage}
        hasError={errors.createdById?.hasError}
        {...getOverrideProps(overrides, "createdById")}
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
