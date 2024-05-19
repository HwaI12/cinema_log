import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './lib/supabaseClient';
import Page from './app/page';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <Page />
    </SessionContextProvider>
  </StrictMode>
);
