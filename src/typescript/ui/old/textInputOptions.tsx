export interface TextInputOptions {
    value?: string;
    onChange?: (value: string) => void;
    type?: "text" | "password" | "email";
    placeholder?: string;
    onEnter?: () => void;
    autofocus?: boolean;
};