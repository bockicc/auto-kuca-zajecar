import { FormField } from "./form-field";

interface PhoneFieldProps {
  id?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function PhoneField({ id = "phone", value, error, onChange }: PhoneFieldProps) {
  return (
    <FormField label="Telefon" htmlFor={id} error={error}>
      <input
        id={id}
        type="tel"
        className="w-full rounded-md border px-3 py-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormField>
  );
}
