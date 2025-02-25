import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
    value?: string;
    onPickerChange: (color: string) => void
}

export function ColorPicker({ value, onPickerChange }: Props) {

    return (
        <section
            className="relative color-picker"
        >
            <div
                className="flex flex-row items-center"
            >
                <p>#</p>
                <HexColorInput
                    prefix="#"
                    color={value}
                    onChange={onPickerChange}
                    className="hex-input"
                />
            </div>
            <HexColorPicker
                color={value}
                onChange={onPickerChange}
                className="hex-color-picker"
            />
        </section>
    )
}
