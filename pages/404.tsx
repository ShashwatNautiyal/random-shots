import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import PrimaryButton from '../src/common/PrimaryButton';

const Error: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 Page not found</title>
      </Head>
      <div className="lg:w-10/12 md:w-11/12 max-w-7xl md:my-10 my-5 w-full mx-auto flex md:flex-row flex-col md:mt-0 mt-10 items-center justify-between h-full">
        <div className="flex flex-col gap-3 md:items-start items-center">
          <h1 className="text-gray-800">404 error</h1>
          <h2 className="md:text-5xl text-3xl font-semibold">Page not found...</h2>
          <h3 className="text-gray-600 w-5/6 md:text-left text-center">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </h3>
          <Link href={"/"} passHref>
            <a>
              <PrimaryButton text="Back to Homepage" />
            </a>
          </Link>
        </div>
        <div className="lg:max-w-sm  max-w-xs w-screen relative h-full">
          <Image
            layout="fill"
            objectFit="contain"
            src="/page-not-found.png"
            alt={"page not found error"}
          />
        </div>
      </div>
    </>
  );
};

export default Error;
