import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import React from "react";
import Header from "../../components/Header";
import Image from "next/image";

const signIn: React.FC<any> = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col  justify-center items-center min-h-screen py-2 -mt-56 px-14 text-center ">
        <div className="w-10 h-10 relative">
          <Image
            alt="instagram-logo"
            src="/instagram.svg"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <img
          alt="instagram"
          src="https://links.papareact.com/ocw"
          className="w-80"
        />
        <p className="font-xs italic">
          This is not a REAL app, it is built for educational purposes only
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-black rounded-lg text-white"
                onClick={() =>
                  signIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default signIn;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
