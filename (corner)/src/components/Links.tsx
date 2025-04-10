import { FileUser, GithubIcon, RssIcon } from "lucide-react";
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
                    <a href="https://www.kennethhoff.no/resume">
                        <FileUser aria-hidden />
                        <span className="sr-only">My Resumé</span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>My Resumé</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function RssFeedLink() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="/rss.xml">
                        <RssIcon aria-hidden />
                        <span className="sr-only">
                            RSS Feed for Kenny's Corner
                        </span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>RSS Feed</TooltipContent>
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

export function CornerExitLink() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="https://www.kennethhoff.no">
                        <pre className="text-primary">&lt;&#47;KC&gt;</pre>
                        <span className="sr-only"> Leave Kenny's Corner</span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>Leave Kenny's Corner</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
