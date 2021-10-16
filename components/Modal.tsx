import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { CameraIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { db, storage } from "../Firebase/firebase";
import { useSession } from "next-auth/react";

const Modal: React.FC = () => {
  const { data: session }: any = useSession<boolean>();
  const [open, setOpen] = useRecoilState<boolean>(modalState);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);

  const addImageToPost = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (readerEvent: ProgressEvent<FileReader>): void => {
        if (readerEvent.target) {
          setSelectedFile(readerEvent.target.result);
        }
      };
    }
  };

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    // 1- Create a post and add it to Firestore
    // 2- Get the post ID from Firestore
    // 3- upload the image to firestore storage with the post ID
    // 4- get a dl link for the image and update the UI

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user.username,
      caption: captionRef.current?.value,
      profileImg: session?.user.image,
      timestamp: serverTimestamp(),
    });
    console.log("New doc added wid id: ", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-95"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    className="w-full object-contain cursor-pointer"
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current?.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        ref={captionRef}
                        type="text"
                        className="border-none focus:ring-0 w-full text-center"
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    disabled={!selectedFile}
                    onClick={uploadPost}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md 
                    border border-transparent shadow-sm px-4 py-2 bg-red-600 
                    text-base font-medium text-white hover:bg-red-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-red-500 sm:text-sm disabled:bg-gray-300 
                    disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
