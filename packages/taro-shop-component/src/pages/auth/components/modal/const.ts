export interface IModalCodeProps {
    visible: boolean;
    title: string;
    content: string;
    onConfirm?: () => void;
    onClose?: () => void;
}