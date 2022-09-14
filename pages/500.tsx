import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import PrimaryButton from '../src/common/PrimaryButton';

const ServerError: NextPage = () => {
  return (
    <>
        <Head>
            <title>500 Internal server error</title> 
            <meta name="description" content="Random Shots is a Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos." />   
        </Head>

      <div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto flex md:flex-row flex-col md:mt-0 mt-10 items-center justify-between h-full">
        <div className="flex flex-col gap-3 md:items-start items-center">
          <h1 className="text-gray-800">500 error</h1>
          <h2 className="md:text-5xl text-3xl font-semibold">Server Side error...</h2>
          <h3 className="text-gray-600 w-4/6 md:text-left text-center">
            Sorry, there is internal server error at this moment. Pease visit this page after
            sometime.
          </h3>
          <Link href={"/"} passHref>
            <a>
              <PrimaryButton text="Back to Homepage" />
            </a>
          </Link>
        </div>
        <div className="lg:max-w-sm  max-w-xs w-screen relative h-[250px]">
          <Image layout="fill" objectFit="contain" src="/error.png" alt="internal server error" />
        </div>
      </div>
    </>
  );
};

export default ServerError;
