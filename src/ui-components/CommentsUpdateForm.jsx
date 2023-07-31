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
import { Comments } from "../models";
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
export default function CommentsUpdateForm(props) {
  const {
    id: idProp,
    comments,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    isWishlistComment: "",
    posterId: "",
    groupIds: [],
    isVisibleToOwner: false,
    commentText: "",
    parentId: "",
  };
  const [isWishlistComment, setIsWishlistComment] = React.useState(
    initialValues.isWishlistComment
  );
  const [posterId, setPosterId] = React.useState(initialValues.posterId);
  const [groupIds, setGroupIds] = React.useState(initialValues.groupIds);
  const [isVisibleToOwner, setIsVisibleToOwner] = React.useState(
    initialValues.isVisibleToOwner
  );
  const [commentText, setCommentText] = React.useState(
    initialValues.commentText
  );
  const [parentId, setParentId] = React.useState(initialValues.parentId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = commentsRecord
      ? { ...initialValues, ...commentsRecord }
      : initialValues;
    setIsWishlistComment(cleanValues.isWishlistComment);
    setPosterId(cleanValues.posterId);
    setGroupIds(cleanValues.groupIds ?? []);
    setCurrentGroupIdsValue("");
    setIsVisibleToOwner(cleanValues.isVisibleToOwner);
    setCommentText(cleanValues.commentText);
    setParentId(cleanValues.parentId);
    setErrors({});
  };
  const [commentsRecord, setCommentsRecord] = React.useState(comments);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Comments, idProp)
        : comments;
      setCommentsRecord(record);
    };
    queryData();
  }, [idProp, comments]);
  React.useEffect(resetStateValues, [commentsRecord]);
  const [currentGroupIdsValue, setCurrentGroupIdsValue] = React.useState("");
  const groupIdsRef = React.createRef();
  const validations = {
    isWishlistComment: [{ type: "Required" }],
    posterId: [{ type: "Required" }],
    groupIds: [{ type: "Required" }],
    isVisibleToOwner: [{ type: "Required" }],
    commentText: [{ type: "Required" }],
    parentId: [],
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
          isWishlistComment,
          posterId,
          groupIds,
          isVisibleToOwner,
          commentText,
          parentId,
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
            Comments.copyOf(commentsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CommentsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Is wishlist comment"
        isRequired={true}
        isReadOnly={false}
        value={isWishlistComment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              isWishlistComment: value,
              posterId,
              groupIds,
              isVisibleToOwner,
              commentText,
              parentId,
            };
            const result = onChange(modelFields);
            value = result?.isWishlistComment ?? value;
          }
          if (errors.isWishlistComment?.hasError) {
            runValidationTasks("isWishlistComment", value);
          }
          setIsWishlistComment(value);
        }}
        onBlur={() =>
          runValidationTasks("isWishlistComment", isWishlistComment)
        }
        errorMessage={errors.isWishlistComment?.errorMessage}
        hasError={errors.isWishlistComment?.hasError}
        {...getOverrideProps(overrides, "isWishlistComment")}
      ></TextField>
      <TextField
        label="Poster id"
        isRequired={true}
        isReadOnly={false}
        value={posterId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              isWishlistComment,
              posterId: value,
              groupIds,
              isVisibleToOwner,
              commentText,
              parentId,
            };
            const result = onChange(modelFields);
            value = result?.posterId ?? value;
          }
          if (errors.posterId?.hasError) {
            runValidationTasks("posterId", value);
          }
          setPosterId(value);
        }}
        onBlur={() => runValidationTasks("posterId", posterId)}
        errorMessage={errors.posterId?.errorMessage}
        hasError={errors.posterId?.hasError}
        {...getOverrideProps(overrides, "posterId")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              isWishlistComment,
              posterId,
              groupIds: values,
              isVisibleToOwner,
              commentText,
              parentId,
            };
            const result = onChange(modelFields);
            values = result?.groupIds ?? values;
          }
          setGroupIds(values);
          setCurrentGroupIdsValue("");
        }}
        currentFieldValue={currentGroupIdsValue}
        label={"Group ids"}
        items={groupIds}
        hasError={errors.groupIds?.hasError}
        setFieldValue={setCurrentGroupIdsValue}
        inputFieldRef={groupIdsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Group ids"
          isRequired={true}
          isReadOnly={false}
          value={currentGroupIdsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.groupIds?.hasError) {
              runValidationTasks("groupIds", value);
            }
            setCurrentGroupIdsValue(value);
          }}
          onBlur={() => runValidationTasks("groupIds", currentGroupIdsValue)}
          errorMessage={errors.groupIds?.errorMessage}
          hasError={errors.groupIds?.hasError}
          ref={groupIdsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "groupIds")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Is visible to owner"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isVisibleToOwner}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              isWishlistComment,
              posterId,
              groupIds,
              isVisibleToOwner: value,
              commentText,
              parentId,
            };
            const result = onChange(modelFields);
            value = result?.isVisibleToOwner ?? value;
          }
          if (errors.isVisibleToOwner?.hasError) {
            runValidationTasks("isVisibleToOwner", value);
          }
          setIsVisibleToOwner(value);
        }}
        onBlur={() => runValidationTasks("isVisibleToOwner", isVisibleToOwner)}
        errorMessage={errors.isVisibleToOwner?.errorMessage}
        hasError={errors.isVisibleToOwner?.hasError}
        {...getOverrideProps(overrides, "isVisibleToOwner")}
      ></SwitchField>
      <TextField
        label="Comment text"
        isRequired={true}
        isReadOnly={false}
        value={commentText}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              isWishlistComment,
              posterId,
              groupIds,
              isVisibleToOwner,
              commentText: value,
              parentId,
            };
            const result = onChange(modelFields);
            value = result?.commentText ?? value;
          }
          if (errors.commentText?.hasError) {
            runValidationTasks("commentText", value);
          }
          setCommentText(value);
        }}
        onBlur={() => runValidationTasks("commentText", commentText)}
        errorMessage={errors.commentText?.errorMessage}
        hasError={errors.commentText?.hasError}
        {...getOverrideProps(overrides, "commentText")}
      ></TextField>
      <TextField
        label="Parent id"
        isRequired={false}
        isReadOnly={false}
        value={parentId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              isWishlistComment,
              posterId,
              groupIds,
              isVisibleToOwner,
              commentText,
              parentId: value,
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
          isDisabled={!(idProp || comments)}
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
              !(idProp || comments) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
