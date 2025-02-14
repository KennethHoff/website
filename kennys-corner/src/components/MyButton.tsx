import { actions } from "astro:actions";
import type React from "react";
import { useState } from "react";

type Props = {
        children: React.ReactNode;
        className?: string;
};
export default function MyButton({ children, className }: Props) {
        const [response, setResponse] = useState<string | undefined>(undefined);
        return (
                <button className={className} onClick={async () => {
                        const { data, error } = await actions.greet({ name: "Kenneth" });
                        if (data) {
                                setResponse(data);
                        }
                }
                }>
                        {response ? response : children}
                </button>
        );
}
