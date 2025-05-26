
import "./globals.css";
import { Lexend } from 'next/font/google'
 
const lexend = Lexend({
  subsets: ['latin'],
})
 
export const metadata = {
  title: "Chat Bot",
  description: "Get Solutions Quick",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} text-white`}
      >
       {children}
      </body>
    </html>
  );
}
