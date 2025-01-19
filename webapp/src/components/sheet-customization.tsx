import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropsWithChildren, ReactNode } from "react";

interface SheetCustomizationProps extends PropsWithChildren {
  title: string;
  description: string;
  content: ReactNode | string;
}
export function SheetCustomization({
  children,
  title,
  content,
  closeRef,
  description = "",
}: SheetCustomizationProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {content}
        <SheetFooter hidden>
          <SheetClose asChild >
            <Button hidden={true} type="submit" ref={closeRef}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
