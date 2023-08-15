import { z } from "zod";

const ZodHeadsRowObject = z.object({
  heads_key: z.string(),
  heads_name: z.string(),
  heads_id: z.number(),
  heads_tags: z.string(),
});

// {heads_tags_id, heads_tags_name}
const ZodHeadsTagsRowsObject = z.object({
  heads_tags_id: z.number(),
  heads_tags_name: z.string(),
});

export { ZodHeadsRowObject, ZodHeadsTagsRowsObject }