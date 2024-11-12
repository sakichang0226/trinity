import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-svh">
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
