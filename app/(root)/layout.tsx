import Sidebar from '@/components/shared/Sidebar';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='root'>
      <Sidebar />
      <div className='root-container'>
        <div className='wrapper'>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
