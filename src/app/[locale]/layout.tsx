import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "./globals.css";
import { Providers } from "@/lib/Provider";
import NavigationBar from "../components/Navigation/NavigationBar";
import Loading from "../components/Loading";
type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("meta.title"),
  };
}
export default async function LocaleLayout({ children, params }: Props) {
  // const pathname = usePathname();
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <NavigationBar />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
