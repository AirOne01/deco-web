import { TextField } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { MinecraftHeadViewer } from "~/HeadViewer";
import { api } from "~/utils/api";
import { MultiUploader } from "./cusomUploader"
import { UploadButton } from "~/utils/uploadthing";

type MyRow = {
  heads_key: string;
  heads_name: string;
  heads_id: string;
}

export default function Home() {
  const { data: dbData } = api.db.getAll.useQuery();
  const { data: filesData } = api.files.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b bg-stone-950 text-white p-4">
        <h1 className="text-4xl font-bold p-2">
          Deco - Heads
        </h1>
        <div className="container bg-stone-900 m-1 flex">
          {filesData && filesData.files.map((item) => {
            if (!dbData) return <>Loading...</>;
            const filter = dbData.results.rows.filter((row) => {
              const row2 = row as MyRow;
              return row2.heads_key === item.key
            })
            const inDb = filter.length > 0 && filter[0]
            const row = filter[0] as MyRow;

            return <div key={item.id} className={`flex flex-col items-center justify-center border-green-500 border-2 rounded-lg ${!inDb ? "border-red-500" : ""}`}>
              <MinecraftHeadViewer
                skin={"https://utfs.io/f/" + item.key}
                width={100}
                height={100}
                control={true}
              />
              <span className="text-stone-300">
                {inDb ? row.heads_name : "Not in DB"}
              </span>
            </div>
          })}
        </div>
        <div className="container bg-stone-900 m-1">
          {JSON.stringify(dbData?.results.rows)}
        </div>
        <div className="container bg-stone-900 m-1">
          {/* <MultiUploader /> */}
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              // alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </main>
    </>
  );
}
