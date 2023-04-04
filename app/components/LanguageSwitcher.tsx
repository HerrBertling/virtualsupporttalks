import { Link, useLocation, useParams } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { availableLocales, getCurrentLocale } from "~/utils/locales";
import GlobeAltIcon from "./icons/GlobeAltIcon";

export default function LanguageSwitcher() {
  const [show, setShow] = useState(false);
  let { pathname } = useLocation();
  const currentLang = getCurrentLocale(pathname);
  const ref = useRef(null);

  const handleClickOutside = useCallback(() => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  const handleButtonClick = () => {
    setShow(!show);
  };

  useOnClickOutside(ref, handleClickOutside);
  const langsInMenu = availableLocales.filter((lang) => lang !== currentLang);
  return (
    <div className="mr-1 w-auto" ref={ref}>
      <div className="block cursor-pointer rounded-md p-4 no-underline hover:bg-white hover:text-vsp-500 lg:inline-block lg:rounded-md lg:py-1 lg:px-2">
        <button
          className="flex items-center justify-center uppercase"
          onClick={handleButtonClick}
          type="button"
        >
          <GlobeAltIcon classNames="h-6 w-6 mr-1" />
          {currentLang}
        </button>
      </div>
      {show && (
        <div className="absolute z-50 mt-4 flex flex-col items-center rounded-md bg-white lg:rounded-md">
          {langsInMenu.map((lang) => (
            <div key={lang} className="my-4 mx-3 hover:text-vsp-500">
              <Link
                to={`/${lang}`}
                className="block rounded-md p-4 uppercase no-underline hover:text-vsp-500 lg:rounded-md lg:py-1 lg:px-2"
              >
                {lang}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
