"use client";
import React from 'react'
import ReactDOM from 'react-dom'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './components/Header'
import './globals.css'
// import Provide from './provide'
import { Provider } from 'react-redux'
import { store } from './store'
import GoogleAnalytics from '../components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="ja">
      <head>
        <title>Prompt Guresser</title>
        <GoogleAnalytics />
	support-google-analytics
      </head>
      <body className={inter.className}>
        {/* <Header /> */}
          <Provider store={store}>
          {/* <Provide> */}
            {children}
          {/* </Provide> */}
          </Provider>
      </body>
    </html>
  )
}

