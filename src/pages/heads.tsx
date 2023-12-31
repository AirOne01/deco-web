import { LinearProgress } from "@mui/material";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import { ChevronDown, ChevronUp, ClipboardCopy, ClipboardList } from "lucide-react";

import { ZodHeadsRowObject } from "~/zod";
import { api } from "~/utils/api";
import Header from "~/components/header";
import { Button } from "~/components/ui/button";
import { H1, H4, Lead, Muted } from "~/components/ui/typography";
import { Card } from "~/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { Badge } from "~/components/ui/badge";

export default function Home() {
  const { data: dbData } = api.db.getAll.useQuery();
  const [detailsOpened, setDetailsOpened] = React.useState(false);

  const [rightSide, setRightSide] = React.useState(false);
  const [noHelm, setNoHelm] = React.useState(false);

  return (
    <>
      <Head>
        <title>- Deco -</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        setRightSide={setRightSide}
        rightSide={rightSide}
        setNoHelm={setNoHelm}
        noHelm={noHelm}
      />
      <main className="flex min-h-screen flex-col items-center bg-background text-foreground p-4 gap-2">
        <div className="flex flex-col items-center justify-center h-24">
          <H1 className="p-2">
            Heads database
          </H1>
          <Lead>
            Here you can browse through and edit the heads in the database.
          </Lead>
        </div>
        <Card className="w-full flex flex-row overflow-hidden grow justify-center gap-1 flex-wrap">
          {!dbData && <LinearProgress className="w-full" />}
          {dbData?.results.rows.map((item) => {
            try {
              const obj = ZodHeadsRowObject.parse(item);

              let src = `https://mc-heads.net/head/` + obj.heads_key + `/100`;
              if (rightSide) {
                src += "/left"
              }
              if (noHelm) {
                src += "/nohelm"
              }

              return <HoverCard>
                <HoverCardTrigger asChild>
                  <Link href={`/edit/${obj.heads_id}`} key={obj.heads_id} className="flex flex-col items-center justify-start">
                    <Image
                      src={src}
                      alt={obj.heads_name}
                      width={100}
                      height={100}
                      loading="lazy"
                      unselectable="on"
                    />
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="space-y-1">
                  <H4>{obj.heads_name}</H4>
                  <Muted>Uploaded by TBD</Muted>
                  <div className="flex items-center pt-2 gap-0.5 flex-wrap">
                    {obj.heads_tags.split(";").map((tag, index) => <Badge key={"tag-" + index}>{tag}</Badge>)}
                  </div>
                </HoverCardContent>
              </HoverCard>
            } catch (err) {
              console.error(err);
              return "There was an error"
            }
          })}
        </Card>
        <SignedIn>
          <Card className="w-full">
            <div className="flex justify-between">
              <Button variant="link" onClick={() => setDetailsOpened(!detailsOpened)} className="w-fit p-2">
                {detailsOpened ? <ChevronUp /> : <ChevronDown />}
              </Button>
              <div className="flex justify-center">
                <Button variant="link" onClick={() => {void navigator.clipboard.writeText(JSON.stringify(dbData?.results.rows))}} className="w-fit p-2">
                  <ClipboardCopy />
                </Button>
                <Button variant="link" onClick={() => {void navigator.clipboard.writeText(JSON.stringify(dbData?.results.rows, null, 2))}} className="w-fit p-2">
                  <ClipboardList />
                </Button>
              </div>
            </div>
            {detailsOpened && (
              <p className="container bg-stone-950 p-2 rounded-md whitespace-pre">
                {JSON.stringify(dbData?.results.rows, null, 2)}
              </p>
            )}
          </Card>
        </SignedIn>
      </main>
    </>
  );
}
