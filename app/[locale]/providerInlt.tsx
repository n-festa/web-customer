"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";

const ProviderInlt = ({
    messages,
    locale,
    children,
}: { messages: AbstractIntlMessages; locale: string } & PropsWithChildren) => {
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            onError={() => {
                //Not show error
                return;
            }}
        >
            {children}
        </NextIntlClientProvider>
    );
};

export default ProviderInlt;
