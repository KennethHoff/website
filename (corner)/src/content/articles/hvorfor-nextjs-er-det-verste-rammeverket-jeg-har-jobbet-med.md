---
title: "Hvorfor Next.js er det verste rammeverket jeg har jobbet med"
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
* **Ingen**: Siden alle disse tre applikasjonene er SSG (Static Site Generation), betyr det at Next.js gir oss ingenting som ikke er bedre løst av et mer målrettet produkt – nemlig [Astro](https://astro.build).

### Ulemper:
* Fordi Next.js er designet *SSR-first*, så betyr det at når du utvikler lokalt – selv om du har aktivert SSG globalt –
  så kjører den i SSR-modus under utvikling. Dette fører ofte til at selv om  ting fungerer lokalt så kompilerer det
  ikke i staging/produksjon.  
* I `App Router` har du ikke kontroll over `<html>`, `<body>`, og `<head>`. Du må bruke Vercel sine abstraksjoner, som selvfølgelig ikke støtter det vi trenger → mange timer bortkastet på kompromisser.  
* Next.js bruker **Webpack i 2025**. De jobber med Turbopack, men det er identisk på alle måter som har en betydning.
  Resten av utviklerverden hoppet over til [Vite](https://vitejs.dev) for lenge siden, men Vercel ville heller bruke
  millioner på å reimplementere en gammel standard istedenfor å bruke noe som faktisk fungerer.
* Det er veldig lett å lekke nøkler, API URLer osv i next.js siden det ikke er et klart skille mellom frontend og backend. Dette gjelder uansett hvilken modell du har valgt å bruke.

## Prosjekt #2

Dette prosjektet er bygget opp av tre applikasjoner dette også, men disse kjøres i SSR-modus. Vi tok over dette
prosjektet for litt siden, så det var ikke vi som valgte å bruke next.js.

### Fordeler
* Den tidligere utvikleren valgte å legge hele applikasjonen i en `<ClientOnly>`. Det vil si at alt av logikk kjører i nettleseren, og du slipper SSR-rotet. Du kan bare skrive React *"like God intended"*.  
* De valgte å bruke den eldre `Pages Router`, som betyr at du har kontroll over HTMLen og slipper de arbitrære
  begrensningene i den "moderne" App Router. Jeg er usikker på om dette valget ble tatt bevisst, eller om arbeidet startet før App Router ble lansert.
* Som du ser, dette er ikke akkurat *fordeler* – men heller *ikke så ille som det kunne vært*. Slik er livet med Next.js: det handler mest om å velge det minst dårlige alternativet.

### Ulemper
* Du sitter fortsatt igjen med ingen av fordelene Next.js påstår å gi deg.  
* Du sitter igjen med de samme problemene som nevnt over (SSR-first design, rare abstraksjoner, outdated tooling).  
* Selv om appen er "client only", må du fortsatt kjøre Next.js-serveren for å levere en tom HTML side. Dermed drar du med deg kompleksiteten, single‑threaded begrensninger, unødvendig overhead, og breaking changes et par ganger i året - uten å få noe igjen... Men du bruker Next.js da, så kunden er glade! 🙂

## Prosjekt #3

Dette prosjektet er bygget opp av to applikasjoner som kjører next.js SSR.

### Fordeler
* Dette er faktisk den eneste Next.js-appen jeg har jobbet på som har hatt noen *reelle* Next.js-fordeler! Det betyr ikke at Next.js var et bra valg – bare at det ikke var et objektivt feil valg denne gangen.
* Vi har muligheten til å ha en innloggings-sesjon til brukeren som ikke blir lagret i nettleseren til brukeren. Kommer
  tilbake til hvorfor dette ikke er så lett frem allikevel.
* Vi kan dele valideringsregler på tvers av frontend og backend 🕺

### Ulemper
* Muligheten til å dele valideringsregler er ikke unikt for Next.js – det kan også gjøres med Astro, Nuxt, Remix, etc. Så selv fordelen er ganske tynn 🤷  
* Fordi disse er hostet i Azure, forsvinner *nesten alle* fordeler med en gang.
* **Middleware**: Next.js sier at du kan implementere logging, autentisering osv. i middleware, men i praksis så kan du
  ikke gjøre dette. Dersom du later som at middleware ikke finnes så er livet ditt mye bedre.
  * Middleware kjører i en helt annen runtime, så Node APIer - som fungerer i alle andre steder i applikasjonen din , og error-meldingene er ikke spesielt hjelpsomme.
    * Vær obs på at dersom du importerer en fil som importerer en fil som[...] inneholder en linje med kode som ikke fungerer i Edge Runtime, så vil hele applikasjonen implodere uten feilmelding 🙂
  * Du kan ikke sende data mellom middleware og endepunktet; Mer-eller-mindre det eneste du kan gjøre er å redirecte brukeren.
* **Autentisering**. Pga. at:
  1. Next.js reelt sett ikke har middleware-støtte.  
  2. Next.js skal gjøre alt på sin egen måte.  

  så ender du opp med at alle såkalte "cross-cutting concerns" - d.v.s funksjonalitet som ikke er direkte relatert til den oppgaven du jobber med som f.eks. autentisering og logging - blir bare en stor "ball of mud". Det resulterer i at dersom du ikke er på "the golden path" så må du gjøre alt selv, og "the golden path" er ekstremt trang.
* På dette prosjektet valgte vi å bruke `next-auth`, men hadde vi visst hva vi vet nå, hadde vi skrevet alt selv fra scratch. En av utviklerne brukte titalls timer på å prøve å hacke inn BankID i `next-auth` i layout-filen.

## Oppsummering

Dette er bare det jeg kom på nå som jeg sitter og skriver ned ting, men det er jo ting hver eneste dag som skyter deg i foten.

Jeg har tenkt til å lage en hel serie på bloggen min om nettopp Next.js og hvorfor jeg mener at det praktisk talt ikke finnes noen fordeler med det over de eksisterende alternativene.  

Den kommer dere til å finne på 👉 [corner.kennethhoff.no/nextjs](https://corner.kennethhoff.no/nextjs)  
Sier i fra når jeg har lansert den!

\#StopUsingNextjs
