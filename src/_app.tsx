import { AppProps } from 'next/app';  // AppPropsをインポート
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './lib/supabaseClient';  // パスを適切に設定

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event: string, session: any) => {
            if (!session && router.pathname !== '/auth/signin') {
                router.push('/auth/signin');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();  // unsubscribeの修正
        };
    }, [router]);

    return <Component {...pageProps} />;
}

export default MyApp;
