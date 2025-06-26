"use client";

import { Controller } from "react-hook-form";
import { Form } from "antd";
// import JoditEditor, { Jodit } from "jodit-react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function UTextEditor({
  name,
  label,
  placeholder,
  required = false,
  defaultValue,
}) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          <JoditEditor
            value={field.value || ""}
            config={{
              height: 500,
              placeholder: placeholder,
              // controls: {
              //   font: {
              //     list: Jodit.atom({
              //       "General Sans": "General Sans",
              //     }),
              //   },
              // },
              uploader: {
                insertImageAsBase64URI: true,
              },
            }}
            defaultValue={defaultValue}
            onBlur={(content) => field.onChange(content)}
          />
        </Form.Item>
      )}
    />
  );
}
