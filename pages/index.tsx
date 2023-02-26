import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Spinner from 'components/spinner';
import Typed from "react-typed";
import { GitFork } from 'phosphor-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  return (
    <>
      <Head>
        <title>Javin: An Aspiring AI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-full">
        <div className="w-full py-6 border-b bg-white">
          <nav className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" width={30} height={30} alt='logo' />
                <h1 className="text-2xl font-semibold">Javin</h1>
              </div>
              <a
                href="https://github.com/rmadith/Javin-Madata"
                className="text-base font-medium underline underline-offset-2"
              >Github Repo</a>
            </div>
          </nav>
        </div>

        <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-8">
          <div>
            <div>
              <h1 className="pt-20 font-bold text-5xl">Hey there, I&apos;m Javin</h1>
              <div className="flex items-center mt-5 gap-x-1 text-gray-700">
                <p>Tell me about the cool project you want to make ......</p>
                {
                  isLoading ? (
                    <p> in the text box below.</p>
                  ) : (
                    <Typed
                      strings={[ " that you'll probably never finish.", " in the text box below." ]}
                      typeSpeed={100}
                      backSpeed={30}
                      loop
                    />
                  )
                }
              </div>
            </div>

            <form
              className="mt-12 flex"
              onSubmit={(e) => {
                e.preventDefault();
                
                // @ts-ignore
                if (!e.target[0].value) return;
                setIsLoading(true);

                try {
                  fetch('https://javin.jmsgvn.com/upload/', {
                    method: 'POST',
                    body: JSON.stringify({
                      // @ts-ignore
                      query: e.target[0].value
                    })
                  })
                    .then(res => res.json())
                    .then(data => {
                      setData(data);
                      setIsLoading(false);
                    }
                  );
                }
                catch {
                  setIsLoading(false);
                }

              }}
            >
              <input
                type="text"
                placeholder="Enter project description"
                className="w-full focus:outline-none placeholder:text-gray-500 bg-transparent font-normal 
                          text-base py-4 px-6 border border-slate-600 disabled:cursor-not-allowed"
                disabled={isLoading}
              />

              <button 
                type="submit" 
                className="border-2 border-[#0ACF83] px-4 ml-2 disabled:cursor-not-allowed text-[#0ACF83] 
                          flex items-center gap-x-1 hover:text-white group hover:bg-[#0ACF83]" 
                disabled={isLoading}
              >
                <p className="font-medium">Submit</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                  strokeWidth={1.5} stroke="currentColor" 
                  className="w-6 h-6 text-[#0ACF83] group-hover:text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </form>

            {isLoading ? (
                <Spinner />
              ) : data ? (
                <article className="pt-10">
                  <div className="flex flex-wrap items-center">
                    <p className="text-base mr-2">Keywords you searched for</p>

                    <div className="flex gap-3">
                      {data.keywords.map((keyword: string) => (
                        <div className="text-[#0ACF83] py-1 px-4 rounded-full bg-[#0ACF83]/20" key={keyword}>
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-gray-700">Repositories you should consider:</p>
                    {data.hits.map((hit: any) => (
                      <div className="w-full bg-slate-100 mt-4 px-6 py-4 rounded-md" key={hit.name}>
                        <div className="flex items-center justify-between">
                          <a className="text-lg" href={hit.link}>
                            {hit.name}
                          </a>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            {hit.stars}

                            <GitFork className="w-5 h-5 ml-2 mr-1" />
                            {hit.forks}

                            <p className="ml-2">{hit.size / 1000} kB</p>
                          </div>
                        </div>

                        <p className="text-base mt-1 text-gray-700">{hit.description}</p>
                        <a href={hit.link} className="text-sm text-[#0ACF83]">{hit.link}</a>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-700 mt-8">Created by Julia, Muthu, James & Shlok.</p>
                </article>
              ) : null
            }
          </div>
        </main>
      </div>
    </>
  )
}
