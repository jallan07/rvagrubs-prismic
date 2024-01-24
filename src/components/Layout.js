"use client";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Layout({ navigation, settings, withSignUpForm, children }) {
  const { isLoading } = useUser();
  return (
    !isLoading && (
      <div className="text-slate-700">
        <Header navigation={navigation} settings={settings} />
        <main>{children}</main>
        <Footer withSignUpForm={withSignUpForm} settings={settings} />
      </div>
    )
  );
}
