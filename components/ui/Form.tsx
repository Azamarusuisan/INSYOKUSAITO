"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-700 border-neutral-900",
  secondary:
    "bg-white text-neutral-900 border-neutral-300 hover:bg-neutral-50 focus-visible:ring-neutral-400",
  ghost:
    "bg-transparent text-neutral-700 border-transparent hover:bg-neutral-100 focus-visible:ring-neutral-300",
  danger:
    "bg-rose-600 text-white border-rose-600 hover:bg-rose-700 focus-visible:ring-rose-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs sm:h-8",
  md: "h-11 px-5 text-sm sm:h-10",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  fullWidth,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cx(
        "inline-flex items-center justify-center gap-1.5 rounded border font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? "保存中…" : children}
    </button>
  );
}

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
};

export function Field({ label, hint, error, required, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1 text-xs font-medium text-neutral-700">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-[11px] text-rose-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-[11px] text-neutral-500">{hint}</span>
      ) : null}
    </label>
  );
}

const baseInputClass =
  "block w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 disabled:bg-neutral-50 sm:py-2";

export function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(baseInputClass, className)} {...rest} />;
}

export function Textarea({
  className,
  rows = 3,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={cx(baseInputClass, "resize-y", className)}
      {...rest}
    />
  );
}

type ToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  size?: "sm" | "md";
};

export function Toggle({ checked, onChange, label, size = "md" }: ToggleProps) {
  const dim =
    size === "sm"
      ? { track: "h-4 w-7", thumb: "h-3 w-3", translate: "translate-x-3" }
      : { track: "h-5 w-9", thumb: "h-4 w-4", translate: "translate-x-4" };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="-m-2 inline-flex items-center gap-2 p-2"
    >
      <span
        className={cx(
          "relative inline-flex items-center rounded-full transition-colors",
          dim.track,
          checked ? "bg-emerald-500" : "bg-neutral-300",
        )}
      >
        <span
          className={cx(
            "ml-0.5 inline-block transform rounded-full bg-white shadow transition-transform",
            dim.thumb,
            checked ? dim.translate : "translate-x-0",
          )}
        />
      </span>
      {label && <span className="text-xs text-neutral-700">{label}</span>}
    </button>
  );
}
