import {
    useEffect,
    useState,
} from 'react';

import Link from 'next/link';
import {
    BiHome,
    BiSearch,
} from 'react-icons/bi';
import {
    MdOutlineDarkMode,
    MdOutlineLightMode,
} from 'react-icons/md';

import { setMode } from '../../store/reducers/theme';
import { classNames } from '../../utils/helpers';
import {
    useAppDispatch,
    useAppSelector,
} from '../../utils/hooks/reducer';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const [showNavBg, setShowNavBg] = useState(false);
  const [theme, setTheme] = useState<typeof themeMode>();

  useEffect(() => {
    const handleNavbarEffect = () => {
      if (window.scrollY > 30) {
        setShowNavBg(true);
      } else {
        setShowNavBg(false);
      }
    };

    window.addEventListener("scroll", handleNavbarEffect);

    return () => {
      window.removeEventListener("scroll", handleNavbarEffect);
    };
  }, []);

  useEffect(() => {
    setTheme(themeMode);
    if (themeMode === "dark") document.documentElement.classList.add("dark");
    else if (themeMode === "light") document.documentElement.classList.remove("dark");
  }, [themeMode]);

  return (
    <div
      className={classNames(
        showNavBg
          ? "dark:backdrop-brightness-50 dark:bg-transparent dark:bg-opacity-100 bg-gray-300 bg-opacity-75 shadow-lg"
          : "dark:backdrop-brightness-100 dark:bg-opacity-100",
        "sticky top-0 z-30 backdrop-blur-md transition-[background] duration-500 px-4 md:py-5 py-3"
      )}
    >
      <div className={classNames("")}>
        <div className={classNames("max-w-[1400px]   mx-auto flex justify-between ")}>
          <Link href={"/"} passHref>
            <a className="flex md:gap-3 gap-1 items-center">
              <img src='/logo.png' alt='logo' className="h-8 w-8" />
              <span className="font-satisfy text-3xl">RandomShots</span>
            </a>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href={"/"} passHref>
                <BiHome className="h-7 w-7 cursor-pointer md:block hidden" />
            </Link>
            <input
              type={"search"}
              name="search"
              className={classNames(
                "bg-gray-200/80",
                "focus:outline-none md:block hidden px-3 py-2 rounded-md placeholder:text-center dark:placeholder:text-gray-200 placeholder:text-gray-400 w-72"
              )}
              placeholder="Search"
            />
            <BiSearch className="h-7 w-7 md:block hidden cursor-pointer" />
          </div>
          <div className="flex gap-5 items-center">
            {theme === "dark" ? (
              <MdOutlineDarkMode
                className="h-7 w-7 cursor-pointer"
                onClick={() => dispatch(setMode("light"))}
              />
            ) : (
              <MdOutlineLightMode
                className="h-7 w-7 cursor-pointer"
                onClick={() => dispatch(setMode("dark"))}
              />
            )}
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://www.financialexpress.com/wp-content/uploads/2021/09/MyGlamm-With-Shraddha-Kapoor.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex mt-2 gap-2">
        <input
          name="search"
          type={"search"}
          className={classNames(
            "bg-gray-200/80",
            "focus:outline-none md:hidden block  px-2 py-1 rounded-md dark:placeholder:text-gray-200 placeholder:text-gray-400 w-full"
          )}
          placeholder="Search"
        />
          <BiSearch className="md:h-7 md:w-7 h-6 w-6 md:hidden block cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
