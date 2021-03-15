import React from "react";
import Checkbox from "./Elements/Checkbox";
import TextInput from "./Elements/TextInput";
import NumberInput from "./Elements/NumberInput";
import SubmitDocument from "./Elements/SubmitDoc";
import SubmitButton from "./Elements/SubmitButton";
import NextButton from "./Elements/Next Button";


const Element = ({
  field: { type, id, label, field_value, field_options },
}) => {
  switch (type) {
    case "input-text":
      return (
        <TextInput
          field_id={id}
          field_label={label}
          field_value={field_value}
        />
      );
    case "input-number":
      return (
        <NumberInput
          field_id={id}
          field_label={label}
          field_value={field_value}
        />
      );
    case "button":
      return (
        <NextButton
          field_id={id}
          field_label={label}
          field_value={field_value}
        />
      );

    case "submit-button":
      return (
        <SubmitButton
          field_id={id}
          field_label={label}
          field_value={field_value}
        />
      );
    case "input-attachment":
      return (
        <SubmitDocument
          field_id={id}
          field_label={label}
          field_value={field_value}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          field_id={id}
          field_label={label}
          field_value={field_value}
        />
      );

    default:
      return null;
  }
};

export default Element;
