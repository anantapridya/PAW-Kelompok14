import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Modal(props) {
  return (
    <>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={props.onClose}
        >
          <div className=" px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <Transition.Child
              as={Fragment} 
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-black font-body"
                >
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-base text-black border-t pt-7 pb-3 font-body font-bold text-center">
                    {props.desc}
                  </p>
                </div>

                <div className="mt-4 flex flex-row-reverse">
                  <button
                    type="button"
                    className={" px-4 py-2 text-sm text-white border border-transparent rounded-md duration-300 " + props.className}
                    onClick={props.onClick}
                  >
                    {props.button}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
