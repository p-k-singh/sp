import React from "react";
import Checkbox from "./Elements/Checkbox";
import TextInput from "./Elements/TextInput";
import NumberInput from "./Elements/NumberInput";
import SubmitDocument from "./Elements/SubmitDoc";
import SubmitButton from "./Elements/SubmitButton";


const Element = ({
  field: {
    taskType,
    field_id,
    taskLabel,
    field_value,
    field_options,
  },
}) => {
  switch (taskType) {
    case "input-text":
      return (
        <TextInput
          field_id={field_id}
          field_label={taskLabel}
          field_value={field_value}
        />
      );
    case "input-number":
      return (
        <NumberInput
          field_id={field_id}
          field_label={taskLabel}
          field_value={field_value}
        />
      );
    case "submit-button":
      return (
        <SubmitButton
          field_id={field_id}
          field_label={taskLabel}
          field_value={field_value}
        />
      );
    case "input-attachment":
      return (
        <SubmitDocument
          field_id={field_id}
          field_label={taskLabel}
          field_value={field_value}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          field_id={field_id}
          field_label={taskLabel}
          field_value={field_value}
        />
      );

    default:
      return null;
  }
};

export default Element;
