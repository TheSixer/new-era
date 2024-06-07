import { CustomLinkValue } from "../const";

export interface CustomLinkProps {
  value: CustomLinkValue;
  onChange(value: CustomLinkValue): void;
}

