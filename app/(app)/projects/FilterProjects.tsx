import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/utils/tailwind.utils"
import Link from "next/link"

const tags = ["NFT", "Games", "Marketplace"]

export default function FilterProjects() {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "default" }))}>
        Open
      </SheetTrigger>
      <SheetContent className="border-none">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
          <div className="grid grid-cols-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`?tag=${tag}`}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                {tag}
              </Link>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
