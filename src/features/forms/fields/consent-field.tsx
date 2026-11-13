interface ConsentFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ConsentField({ checked, onChange }: ConsentFieldProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      Saglasan/na sam sa obradom podataka.
    </label>
  );
}
