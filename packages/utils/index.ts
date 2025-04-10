import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Thing, WithContext } from "schema-dts";

export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
}

export function defineStructuredData<T extends Thing>(
        thing: WithContext<T>,
): WithContext<T> {
        return thing;
}

