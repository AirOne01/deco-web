import { z } from "zod";

const ZodHeadsRowObject = z.object({
  heads_key: z.string(),
  heads_name: z.string(),
  heads_id: z.number(),
  heads_tags: z.string(),
});

type RowObject = z.infer<typeof ZodHeadsRowObject>;

// {heads_tags_id, heads_tags_name}
const ZodHeadsTagsRowsObject = z.object({
  heads_tags_id: z.number(),
  heads_tags_name: z.string(),
});

export { ZodHeadsRowObject, type RowObject, ZodHeadsTagsRowsObject }