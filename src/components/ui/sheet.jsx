import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/lib/utils";

/**
 * Locks background page scroll while SheetContent is mounted WITHOUT
 * setting `body { pointer-events: none }` or hijacking mobile `touchstart`
 * events (which otherwise block cross-origin iframes like Google reCAPTCHA).
 */
function SheetScrollLock() {
  React.useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);
  return null;
}

function Sheet({ modal = false, ...props }) {
  return <SheetPrimitive.Root data-slot="sheet" modal={modal} {...props} />;
}

function SheetTrigger({ ...props }) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }) {
  return (
    <SheetPrimitive.Close asChild>
      <div
        data-slot="sheet-overlay"
        aria-hidden="true"
        className={cn(
          "animate-in fade-in-0 duration-200 fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px]",
          className
        )}
        {...props}
      />
    </SheetPrimitive.Close>
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  title = "Sheet",
  description,
  closeClassName,
  onInteractOutside,
  onFocusOutside,
  onPointerDownOutside,
  ...props
}) {
  return (
    <SheetPortal>
      <SheetScrollLock />
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        onFocusOutside={(e) => {
          // Prevent focus moving into cross-origin iframes (e.g. Google reCAPTCHA challenge) from closing Sheet
          e.preventDefault();
          onFocusOutside?.(e);
        }}
        onInteractOutside={(e) => {
          // Backdrop clicks already close via <SheetOverlay />; prevent external popups (reCAPTCHA) from closing Sheet
          const target = e.target;
          if (
            !(target instanceof Element) ||
            !target.closest('[data-slot="sheet-overlay"]')
          ) {
            e.preventDefault();
            return;
          }
          onInteractOutside?.(e);
        }}
        onPointerDownOutside={(e) => {
          const target = e.target;
          if (
            !(target instanceof Element) ||
            !target.closest('[data-slot="sheet-overlay"]')
          ) {
            e.preventDefault();
            return;
          }
          onPointerDownOutside?.(e);
        }}
        className={cn(
          "bg-[var(--bg-primary)] data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-[60] flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 overflow-y-auto max-h-[100vh] w-full h-[100vh]",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        <VisuallyHidden>
          <SheetPrimitive.Title>{title}</SheetPrimitive.Title>
          {description && (
            <SheetPrimitive.Description>
              {description}
            </SheetPrimitive.Description>
          )}
        </VisuallyHidden>

        {children}

        <SheetPrimitive.Close
          className={cn(
            "fixed left-6 top-6 p-3 max-md:p-2 rounded-full shadow-sm backdrop-blur-md bg-[var(--soft-gray)] hover:bg-[var(--soft-gray)] transition click-sound",
            "opacity-70 hover:opacity-100 focus:outline-none cursor-pointer",
            closeClassName
          )}
        >
          <X className="size-6 max-md:size-5 stroke-[#919191]" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
