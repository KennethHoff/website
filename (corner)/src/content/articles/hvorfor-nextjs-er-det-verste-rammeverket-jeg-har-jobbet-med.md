---
title: "Next.js: Alle ulempene, ingen av fordelene"
description: "Mine erfaringer med Next.js i produksjon – og hvorfor jeg mener det gir deg alle ulempene uten fordelene."
author: "Kenneth Hoff"
created: "2025-09-05"
---

Next.js blir bare mer og mer frustrerende jo mer du bruker det.
Jeg føler at hver eneste dag så er det et eller annet tull som Next.js har valgt å gjøre som gjør alt bare verre for utvikleren.
Og jeg er ikke overbevist om at du får noe som helst tilbake for bryet.

Her er en liten oppsummering av de tre prosjektene jeg har brukt Next.js på, og hva jeg mener vi faktisk har fått ut av det:

## Prosjekt #1

Dette prosjektet er bygget opp av tre applikasjoner som kjører samme stack; Next.js i SSG-modus.

### Fordeler:
* **Ingen**: Når du bygger rene SSG‑applikasjoner, hva er det et slikt rammeverk _kan_ gi deg?
  Se på [Astro](https://astro.build): de har [førsteparts støtte for Markdown](https://docs.astro.build/en/guides/markdown-content/), et gjennomtenkt [collections‑API for eksterne innholdskilder](https://docs.astro.build/en/guides/content-collections/), og en modell som faktisk er laget for å bygge innholdssider.
  Hvor er disse systemene i Next.js? Hvor er gevinsten?

### Ulemper:
* Fordi Next.js er designet *SSR-first* betyr det at når du utvikler lokalt – selv om du har aktivert SSG globalt –
  så kjører den i SSR-modus under utvikling. Dette fører ofte til at selv om  ting fungerer lokalt så kompilerer det
  ikke i staging/produksjon. Selv om det kompilerer så kan det hende at data-fetching fungerer helt annerledes enn du
  hadde sett for deg.
* I `App Router` har du ikke kontroll over `<html>`, `<body>`, og `<head>`. Du må bruke Vercel sine abstraksjoner, som selvfølgelig ikke støtter det vi trenger → mange timer bortkastet på kompromisser.
* Det er veldig lett å lekke nøkler, API URLer osv i next.js siden det ikke er et klart skille mellom frontend og backend. Dette gjelder uansett hvilken modell du har valgt å bruke, om det er SSG, SSR eller noe i mellom.
* Next.js bruker **Webpack i 2025**. De jobber med Turbopack, men det er identisk på alle måter som har en betydning.
  Resten av utviklerverden hoppet over til [Vite](https://vitejs.dev) for lenge siden, men Vercel ville heller bruke
  millioner på å reimplementere en gammel standard istedenfor å bytte til noe som har en fremtid.

## Prosjekt #2

Dette prosjektet er også bygget opp av tre applikasjoner, men disse kjøres i SSR-modus.
Vi tok over dette prosjektet for litt siden, så det var ikke vi som valgte å bruke next.js.

### Fordeler
* Den tidligere utvikleren valgte å legge hele applikasjonen i en `<ClientOnly>`. Det vil si at alt av logikk kjører i nettleseren, og du slipper SSR-rotet. Du kan bare skrive React *"like God intended"*.
* De valgte å bruke den eldre `Pages Router`, som betyr at du har kontroll over HTMLen og slipper de arbitrære
  begrensningene i den "moderne" App Router. Jeg er usikker på om dette valget ble tatt bevisst, eller om arbeidet startet før App Router ble lansert.
* Som du ser, dette er ikke akkurat *fordeler* – men heller *ikke så ille som det kunne vært*. Slik er livet med Next.js: det handler mest om å velge det minst dårlige alternativet.

### Ulemper
* Du sitter fortsatt igjen med ingen av fordelene Next.js påstår å gi deg.
* Du sitter igjen med de samme problemene som nevnt over (SSR-first design, rare abstraksjoner, outdated tooling).
* Selv om appen er "client only", må du fortsatt kjøre Next.js-serveren for å levere en tom HTML side. Dermed drar du med deg kompleksiteten, single‑threaded begrensninger, unødvendig overhead, og breaking changes et par ganger i året - uten å få noe igjen... Men du bruker Next.js da, så kundene er glade! 🙂

## Prosjekt #3

Dette prosjektet er bygget opp av to applikasjoner som kjører next.js SSR.

### Fordeler
* Dette er faktisk den eneste Next.js-appen jeg har jobbet på som har hatt noen *reelle* Next.js-fordeler! Det betyr ikke at Next.js var et bra valg – bare at det ikke var et objektivt feil valg denne gangen.
* Vi har muligheten til å ha en innloggings-sesjon til brukeren som ikke blir lagret i nettleseren til brukeren. Kommer
  tilbake til hvorfor dette ikke er så lett frem allikevel.
* Vi kan dele komponenter og valideringsregler på tvers av frontend og backend 🕺

### Ulemper
* Muligheten til å dele komponenter og valideringsregler er ikke unikt for Next.js – det kan også gjøres med Astro, Nuxt, Remix, etc. Så selv “fordelen” er ganske tynn 🤷
* Fordi disse er hostet i Azure – og ikke i Vercel – forsvinner nesten alle påståtte fordeler umiddelbart.

* **Middleware**: Next.js påstår at du kan bruke middleware til logging, autentisering osv. – men i praksis kan du ikke.
  - Middleware kjører i en helt egen runtime (Edge), så vanlige Node‑APIer fungerer ikke.
  - Importerer du en fil som indirekte drar inn noe som ikke støttes i Edge Runtime, imploderer hele appen – uten en klar feilmelding.
  - Du kan heller ikke sende data mellom middleware og endepunktet; i praksis kan du bare redirecte eller endre headere.
  → Det er mye enklere å late som middleware ikke finnes, og heller gjøre logikken manuelt i layout‑filen.

* **Autentisering**:
  1. Next.js har i realiteten ingen fungerende middleware‑støtte.
  2. Next.js skal alltid gjøre ting på sin egen måte (se: Webpack i 2025).

  Resultatet er at alle "cross‑cutting concerns" (autentisering, logging, osv.) ender opp som en *ball of mud* som infiserer hele kodebasen. Hvis du ikke følger "the golden path", må du gjøre alt selv – og den stien er ekstremt trang.

* På dette prosjektet bruker vi `next-auth`. Hadde vi visst hva vi vet nå, hadde vi skrevet alt selv fra scratch. En av utviklerne brukte titalls timer på å prøve å hacke inn BankID i `next-auth` i layout‑filen.

* **Sesjonshåndtering**:
  Jeg nevnte tidligere at en av fordelene med SSR er at vi kan ha en bruker‑sesjon lagret på serveren. Det høres fint ut – helt til du ser hvordan det faktisk er løst.
  Du skulle kanskje tro at Next.js har et API for sesjonshåndtering? Nope. Next.js er designet av Vercel for Vercel, og Vercel driver kun med serverless. Dermed finnes det ingen innebygd støtte for “serverful” sesjoner.
  Vi måtte derfor snekre dette selv – med Redis‑kobling direkte i layout‑filen. 🤦

## Oppsummering

Dette er bare det jeg kom på nå som jeg sitter og skriver ned ting, men det er jo ting hver eneste dag som skyter deg i foten.

Jeg har tenkt til å lage en hel serie nettopp på denne nettsiden hvor jeg går litt mer i dybden om nettopp Next.js, og hvorfor jeg mener at det praktisk talt ikke finnes noen fordeler med det over de eksisterende alternativene.

Den kommer dere til å finne på 👉 [corner.kennethhoff.no/nextjs](/nextjs)

Abonner på [RSS feeden](/rss.xml) for fremtidige innlegg.

\#StopUsingNextjs

