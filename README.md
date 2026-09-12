Boka grupprum

Bokningssystem för grupprum på biblioteket. Gjort med React, TypeScript och json-server (ingen egen backend, det ska vi inte bygga enligt uppgiften).

Vad appen gör 
Man kan se vilka grupprum som finns och boka ett rum genom att skriva in sin mejl och välja tid. Ingen inloggning, man skriver bara mejlen varje gång. Två saker hänger ihop: Room är själva rummet, Booking är en bokning av ett rum. Appen kollar så man inte kan boka ett rum på en tid som redan är upptagen.

Så kör du igång det
npm install
Kopiera .env.example och döp kopian till .env (då slipper vi skriva adressen till json-server rakt i koden)
Starta json-server i ett terminalfönster:
   npx json-server db.json --port 3000
Starta dev-servern i ett annat fönster:
   npm run dev

Båda måste vara igång samtidigt, annars laddas inga rum.

Vad de olika filerna gör
src/types.ts - typerna för Room och Booking, och NewBooking som är Booking fast utan id/status (de sätts när man skapar en ny bokning)
src/doubleBookingCheck.ts - koden som kollar om två tider krockar
src/config.ts - bara adressen till json-server, ligger på ett ställe istället för utspridd i varje fil
src/components/BookingForm.tsx - formuläret man bokar med, skickar bokningen uppåt via en prop som heter onBook
src/components/StatusBadge.tsx - liten lapp som visar om bokningen är bekräftad eller avbokad
src/pages/ - en fil per sida
src/router.tsx - alla routes, /rum/:id är den som har ett id i urlen
Styling

Bara vanlig CSS, inget ramverk. Fixade en media query så det ser okej ut på mobilen också.
