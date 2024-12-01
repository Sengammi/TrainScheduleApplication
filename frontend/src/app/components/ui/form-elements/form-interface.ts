import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { FieldValues } from "react-hook-form";


export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeholder: string;
	error?: FieldValues | undefined;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypeInputPropsField {}