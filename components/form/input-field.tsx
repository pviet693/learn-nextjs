import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
    name: Path<T>; // là một key trong T
    control: Control<T>;
}

export function InputField<T extends FieldValues>({
    name,
    control,
    onChange: externalOnchange,
    onBlur: externalOnBlur,
    value: externalValue,
    ref: externalRef,
    ...rest
}: InputFieldProps<T>) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
    } = useController({ name, control });

    return (
        <TextField
            name={name}
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                externalOnchange?.(event);
            }}
            onBlur={onBlur}
            inputRef={ref}
            size="small"
            margin="normal"
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...rest}
        />
    );
}
