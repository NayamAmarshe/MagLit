import * as React from "react";
import { cn } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="relative w-full">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={cn(
            "flex h-10 w-full rounded-base border-2 border-border bg-white px-3 py-2 text-sm font-base text-text ring-offset-white selection:bg-main selection:text-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText",
            isPassword && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <Button
            type="button"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1 text-border dark:text-darkText lg:top-2"
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 dark:text-text" />
            ) : (
              <FaEye className="h-5 w-5 dark:text-text" />
            )}
          </Button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
