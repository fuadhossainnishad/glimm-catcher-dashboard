import { Select } from "antd";
import { Form } from "antd";
import { Controller } from "react-hook-form";

// Dummy options
// // const options = [{
//     label: "",
//     value: "",
//   }]

export default function UMultiSelect({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  style,
  labelStyles = {},
  showDropdown = true,
}) {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value: fieldValue },
        fieldState: { error },
      }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <Select
            mode="tags"
            allowClear
            style={{ ...style, height: style?.height, width: "100%" || "35px" }}
            placeholder={placeholder}
            onChange={onChange}
            options={options}
            disabled={disabled}
            open={showDropdown}
            value={fieldValue}
          />
        </Form.Item>
      )}
    />
  );
}
