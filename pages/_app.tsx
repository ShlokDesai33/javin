import { Manrope } from 'next/font/google';
import { AppProps } from 'next/app';
import '@/styles/globals.css';

const manrope = Manrope({
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --inter-font: ${manrope.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;