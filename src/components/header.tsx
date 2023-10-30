import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { BoxesIcon, LogInIcon } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "./ui/theme-toggle";
import { OptionsToggle } from "./ui/options-toggle";
import { Button } from "./ui/button";

function Header({
  setRightSide,
  rightSide,
  setNoHelm,
  noHelm,
}: {
  setRightSide?: React.Dispatch<React.SetStateAction<boolean>>,
  rightSide?: boolean,
  setNoHelm?: React.Dispatch<React.SetStateAction<boolean>>,
  noHelm?: boolean,
}) {
  return (
    <header className="flex items-center justify-between px-2 text-white w-full">
      <Link href="/">
        <BoxesIcon />
      </Link>
      <section className="flex gap-2">
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonPopoverCard: 'py-2 bg-stone-900 text-stone-100',
                userPreview: 'px-2',
                userPreviewSecondaryIdentifier: 'text-stone-500',
                userButtonPopoverActionButton: 'p-2 text-stone-100 hover:bg-stone-800',
                userButtonPopoverActionButtonText: 'text-stone-100',
                userButtonPopoverActionButtonIconBox: 'stroke-stone-100 fill-stone-100',
                userButtonPopoverFooter: 'px-5 pt-1.5',
              }
            }}
          />
        </SignedIn>
        <ModeToggle />
        { setRightSide && rightSide !== undefined && setNoHelm && noHelm !== undefined && (
          <OptionsToggle
            setRightSide={setRightSide}
            rightSide={rightSide}
            setNoHelm={setNoHelm}
            noHelm={noHelm}
          />
        )}
        <SignedOut>
          <SignInButton
            afterSignInUrl="/"
            mode="modal"
          >
            <Button variant="outline" size="icon">
              <LogInIcon className="h-[1.2rem] w-[1.2rem]"/>
              <span className="sr-only">Sign In</span>
            </Button>
          </SignInButton>
        </SignedOut>
      </section>
    </header>
  )
}
    
export default Header;
