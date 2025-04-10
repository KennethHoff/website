import { FileUser, GithubIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

export function ResumeLink() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="/resume">
                        <FileUser aria-hidden />
                        <span className="sr-only">My Resumé</span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>My Resumé</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function GithubLink() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="https://github.com/kennethhoff/website">
                        <GithubIcon aria-hidden />
                        <span className="sr-only">
                            The GitHub repository for this website
                        </span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    The GitHub repository for this website
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function CornerEntryLink() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="https://corner.kennethhoff.no">
                        <pre className="text-primary" aria-hidden>
                            &lt;KC&gt;
                        </pre>
                        <span className="sr-only"> Enter Kenny's Corner</span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>Enter Kenny's Corner</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
