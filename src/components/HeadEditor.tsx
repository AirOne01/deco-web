import * as React from "react";
import { useEffect } from "react";
import { z } from "zod";
import { ChevronsUpDown, PlusIcon, XIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"

import { ZodHeadsRowObject, ZodHeadsTagsRowsObject } from "../zod";
import { MinecraftHeadViewer } from "./HeadViewer";
import { cn } from "~/lib/utils";
import { api } from "../utils/api";
import { H4 } from "./ui/typography";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";

type DbAction = "INSERT" | "UPDATE"

export default function HeadEditor({
  dbId,
  actionType,
}: {
  dbId: number;
  actionType: DbAction;
}) {
  const { data: dbData } = api.db.get.useQuery(dbId)
  const { data: tagsData } = api.db.tags.useQuery();
  const { mutate, isSuccess, isError } = api.db.update.useMutation()

  const tags = tagsData?.results.rows.map((v) => ZodHeadsTagsRowsObject.parse(v))
  const tagsNames = tags?.map((v) => v.heads_tags_name)

  const [headName, setHeadName] = React.useState("")
  const [headKey, setHeadKey] = React.useState("")
  const [headTags, setHeadTags] = React.useState<string[]>([])
  
  const [open, setOpen] = React.useState(false)

  const [buttonStatus, setButtonStatus] = React.useState("IDLE")

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    key: z.string().min(16).max(48),
    tags: z.array(z.string().min(2).max(50)),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      key: "",
      tags: [],
    },
  })

  useEffect(() => {
    if (isSuccess) {
      setButtonStatus("SUCCESS")
      setTimeout(() => {
        setButtonStatus("IDLE")
      }, 1000)
    }
  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      setButtonStatus("FAIL")
      setTimeout(() => {
        setButtonStatus("IDLE")
      }, 1000)
    }
  }, [isError])

  function changeHandle(value: string) {
    // if the value is the same as the name of a tag, add the tag with setHeadTags
    if (tagsNames?.includes(value)) {
      // add without duplicates
      if (!headTags.includes(value)) {
        setHeadTags([...headTags, value])
      }
    }
  }

  function handleValidate(obj: {
    key: string;
    title: string;
    tags: string[];
  }) {
    const name = headName === "" ? obj.title : headName
    const tags = headTags.length > 0 ? obj.tags : headTags
    const key = headKey === "" ? obj.key : headKey

    mutate({ id: dbId, name, tags, key, actionType })
    return true
  }

  useEffect(() => {
    if (!dbData || !tagsData ||  dbData.results.rows.length === 0) return
    const obj = ZodHeadsRowObject.parse(dbData!.results.rows[0]);
    setHeadTags(obj.heads_tags.split(";"))
    setHeadName(obj.heads_name)
    setHeadKey(obj.heads_key)
  }, [dbData, tagsData])

  const tagsNamesWithoutChosen = tagsNames?.filter((v) => !headTags.includes(v)) ?? []
  let obj: z.infer<typeof ZodHeadsRowObject>;
  if (dbData && dbData.results.rows.length > 0) {
    obj = ZodHeadsRowObject.parse(dbData!.results.rows[0]);
  } else {
    obj = {
      heads_id: dbId,
      heads_key: "",
      heads_name: "",
      heads_tags: "",
    }
  }

  return (
    <Card className="flex gap-4 max-w-2xl p-2">
      <div className="flex flex-col items-center">
        <MinecraftHeadViewer
          skin={"http://textures.minecraft.net/texture/" + (headKey !== "" ? headKey : obj.heads_key)}
          width={300}
          height={300}
        />
        <Form {...form}>
          <form onSubmit={() => form.handleSubmit(handleValidate)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Head title</FormLabel>
                  <FormControl>
                    <Input value={headName} onChange={(e) => setHeadName(e.target.value)} placeholder="Psari" {...{field}} />
                  </FormControl>
                  <FormLabel>Head key</FormLabel>
                  <FormControl>
                    <Input value={headKey} onChange={(e) => setHeadKey(e.target.value)} placeholder="XXXXXXXX..." {...{field}} />
                  </FormControl>
                  <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        Add a tag...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search tag..." />
                        <CommandEmpty>No tag found.</CommandEmpty>
                        <CommandGroup className="max-h-48 overflow-scroll">
                          {tagsNamesWithoutChosen.map((tag) => (
                            <CommandItem
                              key={tag}
                              onSelect={changeHandle}
                            >
                              <PlusIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                )}
                              />
                              {tag}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col grow-0 gap-2">
          <H4>Tags</H4>
          <div className="flex flex-wrap gap-1">
            {headTags.map((v) => <Badge key={"chip-"+v} variant="outline" className="flex gap-1 pr-1">
              {v}
              <XIcon className="rounded-full p-1 bg-muted cursor-pointer" onClick={() => setHeadTags(headTags.filter((v2) => v2 !== v))} />
            </Badge>)} 
          </div>
        </div>
        <div className="grow flex flex-col-reverse">
          <Button
            onClick={() => handleValidate({ key: obj.heads_key, title: obj.heads_name, tags: obj.heads_tags.split(";") })}
            variant={buttonStatus === "SUCCESS" ? "default" : buttonStatus === "FAIL" ? "destructive" : "outline"}
            className={`w-fit transition-all duration-200 ${buttonStatus === "SUCCESS" ? "bg-green-500" : ""}`}
          >
            {buttonStatus === "SUCCESS" ? "OK!" : buttonStatus === "FAIL" ? "ERROR!" : "Validate"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
