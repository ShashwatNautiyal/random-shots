import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:text-white dark:bg-black text-black bg-white transition-all duration-500">
      {children}
    </div>
  );
};

export default Layout;
