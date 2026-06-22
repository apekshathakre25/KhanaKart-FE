import React, { useEffect, useState } from 'react';
import { useAppData } from '../context/AppContext';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CgShoppingCart } from 'react-icons/cg';
import { BiMapPin, BiSearch } from 'react-icons/bi';

const Navbar = () => {
  const { auth, city } = useAppData();
  const currLocation = useLocation();
  const [search, setSearch] = useState('');
  const [searchParams, setSearchparams] = useSearchParams();

  const isHomepage = currLocation.pathname === '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setSearchparams({ search });
      } else {
        setSearchparams({});
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, setSearchparams]);

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          to={'/'}
          className="text-2xl font-bold text-[#E23744] cursor-pointer"
        >
          KhanaKart
        </Link>
        <div className="flex items-center gap-4">
          <Link to={'/cart'} className="relative">
            <CgShoppingCart className="h-6 w-6 text-[#E23744]" />
            <span className="absolute -top-2 -right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#E23744] text-xs font-semibold text-white">
              0
            </span>
          </Link>
          {auth ? (
            <Link to={'/account'} className="font-medium text-[#E23744]">
              Account
            </Link>
          ) : (
            <Link to={'/login'} className="font-medium text-[#E23744]">
              Login
            </Link>
          )}
        </div>
      </div>

      {isHomepage && (
        <div className="border-1 px-4 py-3">
          <div className="mx-auto flex max-w-7xl items-center rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 px-3 border-r text-gray-700">
              <BiMapPin className="h-4 w-4 text-[#E23744]" />
              <span className="text-sm truncate max-w-35">{city}</span>
            </div>
            <div className="flex flex-1 items-center gap-2 px-3">
              <BiSearch className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="search for restraurant"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2 text-sm outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
