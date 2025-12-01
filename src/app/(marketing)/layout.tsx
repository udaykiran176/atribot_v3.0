import type { PropsWithChildren } from "react";
import {Navbar} from '@/components/Navbar'
import {Footer} from '@/components/Footer'

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
