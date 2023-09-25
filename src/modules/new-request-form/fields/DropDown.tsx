import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Option,
  Message,
} from "@zendeskgarden/react-dropdowns.next";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../data-types";

interface DropDownProps {
  field: Field;
  onChange: (value: string) => void;
}

export function DropDown({ field, onChange }: DropDownProps): JSX.Element {
  const { label, options, error, value, name, required, description } = field;
  const selectionValue = options.find((option) => option.value === value);

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && <Hint>{description}</Hint>}
      <Combobox
        inputProps={{ name, required }}
        isEditable={false}
        validation={error ? "error" : undefined}
        selectionValue={selectionValue}
        renderValue={() => selectionValue?.name || "-"}
        onChange={({ selectionValue }) => {
          if (selectionValue !== undefined) {
            onChange(selectionValue as string);
          }
        }}
      >
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
            isSelected={option.value === value}
          >
            {option.name}
          </Option>
        ))}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
