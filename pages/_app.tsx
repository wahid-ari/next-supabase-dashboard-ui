import { useEffect } from 'react';
import type { NextComponentType } from 'next';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { Toaster as ReactHotToast } from 'react-hot-toast';

import 'nprogress/nprogress.css';

import { useSession } from 'next-auth/react';

import { GlobalProvider } from '@/context/GlobalContext';

import '@/styles/globals.css';
import '@/styles/prism.css';

import { Toaster as SonnerToaster } from '@/components/ui/Sonner';
import { Toaster } from '@/components/ui/Toaster';

import LoadingDots from '@/components/systems/LoadingDots';

const inter = Inter({ subsets: ['latin'] });

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  if (status === 'loading')
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <LoadingDots medium />
      </div>
    );

  return children;
}

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  // Show progress on All Pages
  // router.events.on('routeChangeStart', () => NProgress.start());
  // router.events.on('routeChangeComplete', () => NProgress.done());
  // router.events.on('routeChangeError', () => NProgress.done());

  function handleStart(url: string) {
    let splitUrl = url.split('/');
    // Show progress only in Detail Pages
    if (splitUrl.includes('detail')) {
      NProgress.start();
    }
  }

  function handleStop() {
    NProgress.done();
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <GlobalProvider session={pageProps.session}>
      <div className={inter.className}>
        <Toaster />
        <SonnerToaster closeButton={false} visibleToasts={5} offset={'16px'} gap={10} richColors position='top-right' />
        <ReactHotToast
          gutter={4}
          toastOptions={{
            style: {
              maxWidth: 380,
              padding: '2px 4px',
              wordBreak: 'break-all',
            },
          }}
        />
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </GlobalProvider>
  );
}

export default MyApp;
