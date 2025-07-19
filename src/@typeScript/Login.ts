import { ChangeEvent } from "react";

export interface LoginProps {
  labels: string;
  placeholder?: string;
  id: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
