
import "./globals.css";
import { Lexend } from 'next/font/google'
 
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
const lexend = Lexend({
  subsets: ['latin'],
})
 
export const metadata = {
  title: "ResuMate AI",
  description: "Your smart assistant for resume creation and review",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} text-white`}
      >
        <PrimeReactProvider>
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
