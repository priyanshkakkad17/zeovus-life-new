import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
  title: 'Zeovus Life - Wellness Products Manufacturer',
  description: 'Trusted B2B nutraceutical and cosmetic manufacturer. Formulated to deliver, built to scale.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans text-neutral-900 bg-white">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}