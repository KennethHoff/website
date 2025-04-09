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
                                        <a href="/resume" aria-label="Resumé">
                                                <FileUser aria-hidden />
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
                                        <a
                                                href="https://github.com/kennethhoff/website"
                                                aria-label="The GitHub repository for this website"
                                        >
                                                <GithubIcon aria-hidden />
                                        </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                        The GitHub repository for this website
                                </TooltipContent>
                        </Tooltip>
                </TooltipProvider>
        );
}
