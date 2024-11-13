"use client"
import Logo from './Logo';
import NavigationBar from './NavigationBar';
import Search from './Search';

export default function Header() {
  return (
    <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
      <div className="flex flex-wrap items-center justify-between lg:flex-nowrap h-full w-full">
        <Logo></Logo>
        <div className='w-full'>
          <Search></Search>
        </div>
        <div className="invisible md:visible">
          <NavigationBar></NavigationBar>
        </div>
      </div>
    </header>
  );
}
