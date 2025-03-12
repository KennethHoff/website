import { useActionState } from "react";
import { actions } from "astro:actions";

interface Props {
    children: React.ReactNode;
    className?: string;
}

async function greeter() {
    const { data } = await actions.greet({ name: "Kenneth" });
    return <span>{data}</span>;
}

export default function ReactButton({ children, className }: Props) {
    const [state, dispatch] = useActionState(greeter, <span>{children}</span>);

    return (
        <button className={className} onClick={dispatch}>
            {state}
        </button>
    );
}
