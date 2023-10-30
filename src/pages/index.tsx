import Head from "next/head";
import Header from "~/components/header";
import { CompassButton } from "~/components/ui/compass-button";
import { H1, Lead } from "~/components/ui/typography";

export default function Home() {
  return (
    <>
      <Head>
        <title>- Deco -</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <main className="grow flex flex-col items-center justify-center bg-background text-foreground p-4 gap-2">
          <div className="flex flex-col items-center justify-center gap-8">
            <section className="flex flex-col items-center justify-center h-24">
              <H1 className="p-2">
                MC data API
              </H1>
              <Lead>
                Some info, currated into a nice website. Also: an API.
              </Lead>
            </section>
            <CompassButton />
          </div>
        </main>
      </div>
    </>
  )
}