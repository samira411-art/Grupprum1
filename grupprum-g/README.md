# Boka grupprum

bokningssystem för grupprum på biblioteket. Gjort med React,
TypeScript och json-server.

## Vad appen gör

Man kan se vilka grupprum som finns och boka ett rum genom att skriva in
sin mejl och välja tid. Ingen inloggning, man skriver bara mejlen varje
gång. Två saker hänger ihop: `Room` är själva rummet, `Booking` är en
bokning av ett rum. Appen kollar så man inte kan boka ett rum på en tid
som redan är upptagen.

---

##  VIKTIGT: appen kräver TVÅ terminalfönster igång samtidigt

React-appen och json-server  är två helt separata
program. Startar man bara ett av dem funkar INTE appen. Man måste ha
**båda igång samtidigt**, i varsitt terminalfönster, hela tiden man
testar appen. Stänger man ett fönster slutar den delen fungera.

### Terminal 1 – json-server (API:et / "databasen")

Detta måste köras i mappen där `db.json` ligger:

npx json-server db.json --port 3000


Lämna det här fönstret öppet och kör hela tiden. Startar man inte
detta får man felet **"Kunde inte hämta rum"** i appen.

### Terminal 2 – själva webbappen

Öppna ETT NYTT fönster (stäng inte det första), i samma mapp:

npm run dev


Öppna sedan länken den skriver ut i webbläsaren, oftast
`http://localhost:5173`

---

## Så kör du igång det (steg för steg, första gången)

1. Packa upp projektet, öppna en terminal i mappen `grupprum-g`
   (den där `package.json` och `db.json` ligger)
2. Installera beroenden:

npm install

3. Kopiera `.env.example` och döp kopian till `.env` (så slipper vi
   skriva adressen till json-server rakt i koden)
4. Starta json-server, i det HÄR fönstret:

npx json-server db.json --port 3000

5. Öppna ETT NYTT terminalfönster, gå till samma mapp igen, kör:

npm run dev

6. Öppna adressen som skrevs ut (t.ex. `http://localhost:5173`)


## Styling

Bara vanlig CSS, inget ramverk och  en media query så det ser okej ut
på mobilen också