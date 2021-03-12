import React from "react";
import Checkbox from "./Elements/Checkbox";
import Input from "./Elements/Input";
import SubmitDocument from "./Elements/SubmitDoc";


const Element = ({
  field: {
    field_type,
    field_id,
    field_label,
    field_placeholder,
    field_value,
    field_options,
  },
}) => {
  switch (field_type) {
    case "text":
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
        />
      );
    case "submitDoc":
      return (
        <SubmitDocument
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_options={field_options}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          field_id={field_id}
          field_label={field_label}
          field_value={field_value}
        />
      );

    default:
      return null;
  }
};

export default Element;
