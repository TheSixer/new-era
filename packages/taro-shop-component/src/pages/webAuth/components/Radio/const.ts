
export interface IRadioProps {
    options: Array<{ label: string; value: string | number }>;
    value: string | number;
    onChange: (value: string | number) => void;
}
