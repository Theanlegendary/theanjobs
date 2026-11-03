import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white border border-blue-600 border-b-blue-800 shadow-[0_2px_5px_rgba(37,99,235,0.35),0_1px_1px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-blue-400 hover:to-blue-700 active:from-blue-700 active:to-blue-800 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]",
        skeuomorphic:
          "bg-gradient-to-b from-white via-slate-50 to-slate-200 text-slate-800 border border-slate-300/90 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:from-slate-50 hover:to-slate-200/90 active:from-slate-200 active:to-slate-200 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]",
        destructive:
          "bg-gradient-to-b from-rose-500 via-rose-600 to-rose-700 text-white border border-rose-600 border-b-rose-800 shadow-[0_2px_5px_rgba(225,29,72,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-rose-400 hover:to-rose-700 active:from-rose-700 active:to-rose-800 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]",
        outline:
          "border border-slate-300 dark:border-slate-700 bg-gradient-to-b from-white/90 to-slate-100/90 dark:from-slate-800/90 dark:to-slate-900/90 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-slate-100 active:shadow-inner",
        secondary:
          "bg-gradient-to-b from-white via-slate-50 to-slate-200 text-slate-800 border border-slate-300/90 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:from-slate-50 hover:to-slate-200/90 active:from-slate-200 active:to-slate-200 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]",
        dark:
          "bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 text-slate-100 border border-zinc-700 border-b-black shadow-[0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-zinc-600 hover:to-zinc-900 active:from-zinc-900 active:to-black active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]",
        ghost: "border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
