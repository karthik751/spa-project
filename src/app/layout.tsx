"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { reduxStore } from "../lib/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={reduxStore}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
