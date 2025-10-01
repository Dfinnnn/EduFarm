import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif', background: '#f5f5f5' }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
