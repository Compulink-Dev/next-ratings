import React from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Hero from "../_components/Hero";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />{" "}
    </div>
  );
}

export default MainLayout;
