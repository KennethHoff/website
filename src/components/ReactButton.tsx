import { actions } from "astro:actions";
import { useActionState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

async function greeter() {
    const { data } = await actions.greet({ name: "Visitor" });
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
