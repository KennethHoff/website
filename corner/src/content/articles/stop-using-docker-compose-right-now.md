---
title: "Stop Using docker compose Right Now!"
description: "A short introduction to .Net Aspire, and why you should replace your docker compose file with it."
author: "Kenneth Hoff"
created: "2025-04-05"
---

Are you a .Net developer juggling multiple services, databases, and third-party integrations for your applications?
For years, Docker Compose has been the go-to tool for orchestrating these dependencies.
It's powerful, but managing complex docker-compose.yml files, handling networking, and ensuring smooth debugging across containers can often be time-consuming and feel like a chore, pulling you away from writing actual .NET code.

* Do you need a database, cache, or messaging queue for your .NET application?
* Are you building microservices or a complex system that needs multiple components running together?
* Do you want a simpler, more integrated way to manage and debug these dependencies right alongside your C# code?

If this sounds familiar, you need an orchestration tool tailored for the .NET ecosystem.
Enter [.NET Aspire](https://github.com/dotnet/aspire) – Microsoft's opinionated, cloud-ready stack designed to dramatically simplify your local development and deployment story.
In this post, we'll explore why Aspire might just be the Docker Compose replacement you've been looking for.
