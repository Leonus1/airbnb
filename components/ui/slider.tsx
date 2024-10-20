"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative  h-2 w-full grow overflow-hidden rounded-full bg-slate-100 cursor-pointer">
      <SliderPrimitive.Range className="absolute h-full bg-[#FF5A5F] dark:bg-slate-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block outline-none h-5 w-5 rounded-full bg-[#FF5A5F] border-2 cursor-pointer
    border-[#FF5A5F] "
    />
    <SliderPrimitive.Thumb
      className="block outline-none h-5 w-5 rounded-full bg-[#FF5A5F] border-2 cursor-pointer
    border-[#FF5A5F] "
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
