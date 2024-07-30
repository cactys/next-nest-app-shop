import Head from 'next/head';
import AuthPage from '@/components/templates/AuthPage/AuthPage';
import { useRedirectByUserCheck } from '@/hooks/useRedirectByUserCheck';

const Auth = () => {
  const { shouldLoadContent } = useRedirectByUserCheck(true);

  return (
    <>
      <Head>
        <title>ШозаМагазин | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet="UTF-8" />
        <meta name="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  );
};

export default Auth;
