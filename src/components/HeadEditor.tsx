import { Autocomplete, Button, Chip, Stack, TextField } from "@mui/material";
import { MinecraftHeadViewer } from "./HeadViewer";
import { api } from "../utils/api";
import { ZodHeadsRowObject, ZodHeadsTagsRowsObject } from "../zod";
import * as React from "react";
import { useEffect } from "react";
import { z } from "zod";

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
  const {
    mutate: updateMutate,
    isSuccess: updateIsSuccess,
    failureReason: updateFailureReason,
    isError: updateIsError,
    data: updateData
  } = api.db.update.useMutation()

  const tags = tagsData?.results.rows.map((v) => ZodHeadsTagsRowsObject.parse(v))
  const tagsNames = tags?.map((v) => v.heads_tags_name)

  const [headName, setHeadName] = React.useState("")
  const [headTags, setHeadTags] = React.useState<string[]>([])
  const [headKey, setHeadKey] = React.useState("")

  function changeHandle(event: React.SyntheticEvent<Element, Event>, value: string) {
    // if the value is the same as the name of a tag, add the tag with setHeadTags
    if (tagsNames?.includes(value)) {
      // add without duplicates
      if (!headTags.includes(value)) {
        setHeadTags([...headTags, value])
      }
    }
  }

  function handleValidate(obj: {
    heads_id: number;
    heads_key: string;
    heads_name: string;
  }) {
    const id = obj.heads_id
    const name = headName === "" ? obj.heads_name : headName
    const tags = headTags
    const key = headKey === "" ? obj.heads_key : headKey

    updateMutate({ id, name, tags, key, actionType })
    return true
  }

  useEffect(() => {
    if (!dbData || !tagsData ||  dbData.results.rows.length === 0) return
    const obj = ZodHeadsRowObject.parse(dbData!.results.rows[0]);
    setHeadTags(obj.heads_tags.split(";"))
  }, [dbData, tagsData])

  const tagsNamesWithoutChosen = tagsNames?.filter((v) => !headTags.includes(v))
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
    <div className="flex">
      <div className="flex flex-col items-center">
        <MinecraftHeadViewer
          skin={"http://textures.minecraft.net/texture/" + (headKey !== "" ? headKey : obj.heads_key)}
          width={300}
          height={300}
        />
        <Stack spacing={2} sx={{ width: 300 }}>
          <TextField id="standard-basic" label="Title" variant="standard" defaultValue={obj.heads_name} onChange={(e) => setHeadName(e.target.value)} />
          <TextField id="standard-basic" label="Key" variant="standard" defaultValue={obj.heads_key} onChange={(e) => setHeadKey(e.target.value)} />
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            options={tagsNamesWithoutChosen!}
            disableClearable
            onChange={changeHandle}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add tags"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </Stack>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col grow-0">
          <span>
            headName: {headName}
          </span>
          <span>
            headTags: {headTags.map((v) => <Chip key={"chip-"+v} variant="outlined" onDelete={() => setHeadTags(headTags.filter((v2) => v2 !== v))} label={v} />)} 
          </span>
        </div>
        <div className="grow flex flex-col-reverse">
          <Button variant="contained" onClick={() => handleValidate(obj)}>Validate</Button>
          { updateIsSuccess ? <span>Success</span> : updateIsError ? JSON.stringify(updateFailureReason) : "Unknown error" }
          { JSON.stringify(updateData) }
        </div>
      </div>
    </div>
  )
}