export type FieldType =
  | "header"
  | "label"
  | "paragraph"
  | "linebreak"
  | "text"
  | "number"
  | "dropdown"
  | "checkboxes"
  | "multipleChoice"
  | "tags";


export interface Field {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: FieldOption[];
  displayOnShortForm?: boolean;
}

export interface FieldOption {
  text: string;
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  displayOnShortForm?: boolean;
  options?: FieldOption[];
}
