/* eslint-disable @next/next/no-css-tags */
import BottomNavigation from "@/component/BottomNavigation/BottomNavigation";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/Header/Header";
import React from "react";

export const metadata = {
  title: "G마켓 - 지금부터의 마켓",
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <head>
        <link
          rel='shortcut icon'
          href='//image.gmarket.co.kr/favicon/gmarket.ico'
        />
        <link rel='stylesheet' href='//script.gmarket.co.kr/gds/gds.css' />
        <link
          rel='stylesheet'
          href='//script.gmarket.co.kr/build/mobile/css/gnb/app.css'
        />
        <link
          rel='stylesheet'
          href='//script.gmarket.co.kr/build/mobile/css/fashionsquare/app.css'
        />
      </head>
      <body className='service__fashionsquare has-bnbar page__fashionsquare_lp'>
        <div id='__next'>
          <Header />
          <div role='main'>
            <div id='container'>
              <div
                id='service__fashionsqure'
                className='box__fashionsqure-wrap'
              >
                {children}
              </div>
            </div>
          </div>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
