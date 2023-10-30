"use client"

import * as React from "react"
import { SettingsIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Label } from "./label"
import { Switch } from "./switch"

export function OptionsToggle({
  setRightSide,
  rightSide,
  setNoHelm,
  noHelm,
}: {
  setRightSide: React.Dispatch<React.SetStateAction<boolean>>,
  rightSide: boolean,
  setNoHelm: React.Dispatch<React.SetStateAction<boolean>>,
  noHelm: boolean,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Show options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <Switch id="heads-rightsided" checked={rightSide} onClick={() => { setRightSide(!rightSide) }} />
          <Label htmlFor="heads-rightsided">Right-sided heads</Label>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Switch id="heads-nohelm" checked={noHelm} onClick={() => { setNoHelm(!noHelm) }} />
          <Label htmlFor="heads-nohelm">No helmet (2nd layer of skin)</Label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
