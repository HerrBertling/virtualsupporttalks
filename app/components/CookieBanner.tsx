import { Fragment, useRef, useState } from "react";
import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";
import CookieIcon from "./icons/CookieIcon";

export const CookieBanner = ({ initialOpen }: { initialOpen: boolean }) => {
  const { t } = useTranslation("cookies");
  const analyticsFetcher = useFetcher();
  const [open, setOpen] = useState(initialOpen);

  const focusButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={focusButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <analyticsFetcher.Form method="post" action="/enable-analytics">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-vsp-100">
                      <CookieIcon
                        classNames="h-6 w-6 text-vsp-800"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-slate-800"
                      >
                        {t("title")}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-slate-500">
                          {t("description")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      name="accept-gdpr"
                      value="true"
                      className="inline-flex w-full justify-center rounded-md bg-vsp-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vsp-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vsp-600 sm:col-start-2"
                      ref={focusButtonRef}
                    >
                      {t("accept")}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 focus:outline-vsp-400 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpen(false)}
                    >
                      {t("decline")}
                    </button>
                  </div>
                </analyticsFetcher.Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
