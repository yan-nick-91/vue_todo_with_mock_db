# Architectuur van ToDo app

![frontend architecture](../model/simple_frontend_architecture_new.png)

In het voorbeeld is de architectuur van de ToDo app in kaart gebracht, waarbij verschillende verantwoordelijkheden zijn ingedeeld binnen de betreffende (sub)lagen ***(aangegeven met package vormen)***.

## Techstack

- vue
- typescript
- tailwind
- vite
- pinia
- json-server (mock-backend)

---

## DOM -> main.ts

In de frontend wordt er van de DOM gesproken wanneer het om de elementen gaat die door **JavaScript** (of **TypeScript**) kan worden gemanipuleerd. In dit geval zou dit gaan om één **HTML** index page die van één div element is voorzien waarop **vue.js** op leunt. De `index.html` – tevens de enige html in het gehele project – heeft een associatie met de main.ts, waarin daar verder de vue.js gelanceerd. 

## main.ts -> App.vue

De `main.ts` maakt associatie met de `App.vue`, waarin deze van twee belangrijke elementen is voorzien. De **navbar** om van de ene naar de andere pagina te kunnen navigeren en de **display** die is opgebouwd uit verschillende componenten. De display wordt niet als een losse component in de App.vue gepresenteerd. Dit gebeurd door middel van een injectie dat door de vue framework **vue-router** mogelijk wordt gemaakt. Dit gebeurd door via de router laag de specifieke view component aan te roepen en deze later aan de `RouterView` in de App.vue te injecteren.


## App.vue -> router (laag)

Zoals net kort toegelicht wordt de view componenten niet direct vanuit als componenten in de code geplaatst. Hiervoor wordt een vue framework gebruikt waarbij deze volgens een stroom verloopt. De App.vue – dat een associatie heeft met de router (laag) – doet een verzoek om naar een specifieke pagina, de view component, te navigeren. De index.ts binnen de router laag ontvangt deze verzoek en handelt verder af door de specifieke view component op te vragen. Deze wordt later verder als een injectie aan de App.vue weergegeven als een RouterView, waarvan vue router dit onder de motorkap alle behorende componenten heeft gerenderd.  

## router (laag)  -> pages (laag)

Zoals net toegelicht, heeft de router laag associatie met de pages laag, waarvan deze de view componenten aanroept zodat dit later als een injectie kan worden gebruikt voor de RouterView die in de App.vue is geïmplementeerd.

## Views

Zoals te zien is, hebben alleen de DOM en de Router laag associatie met de `Pages` sublaag (weergegeven als sublaag binnen de `Views`, waarbij deze laag in lichtblauw is weergegeven).

De `Pages` sublaag heeft alleen de verantwoordelijkheid om de gerendeerde componenten weer te geven, waarvan die in de `Components` sublaag zijn opgezet (waarvan deze sublaag ook in de `Views` laag wordt weergegeven).

De `Router` laag heeft als verantwoordelijkheid navigatie links te beheren, zodat er een mogelijkheid is om naar verschillende (sub)pagina's te navigeren.

De `UI` sublaag is alleen bekend bij de `Components` sublaag. Dit komt omdat de `UI` sublaag element, zoals knoppen, selectie dropdown, container, etc. bevat waarbij deze binnen de `Components` hergebruikt kunnen worden.

### Components sublaag

De `Components` is de belangrijkste sublaag binnen de `Views` omdat deze de kern is van alle gemaakte webcomponenten die de eindgebruiker te zien krijgt. Vanaf deze sublaag worden er associaties naar andere lagen gelegd om het volgende genoemde zaken af te kunnen handelen:

- Components --> Controller:
  De `Components` stuurt een opdracht naar de `Controller`, waarnaar deze de desbetreffende functie uitvoert om een call uit te voeren naar het andere functie die in de `Service` laag staat. Meer hierover, zie `Controller`
  <br />

- Components --> Utils:
  De `Components` maakt gebruikt van de `Utils` omdat deze functies bevatten waarvan deze puur zijn. Dit betekent dat de functie die hierin zijn opgesteld geen side-effects bevatten en de resultaten altijd hetzelfde blijven op basis
  <br />

- Components --> Router:
  De `Components` mag als enige associatie hebben met de `Router`. Dit heeft te maken omdat binnen de `Components` sublaag webcomponenten aanwezig zijn zoals een navigatie bar en knop navigatie.
  <br />

- Components --> Interface:
  De `Components` heeft relatie met de `Interface` omdat hier in types voor properties zijn bepaald moet worden voldaan.
  <br />

- Components --> Const:
  De `Components` maakt gebruik van de laag `Const` omdat deze variabelen bevat waarbij de waarde vooraf zijn gedeclareerd en altijd constant blijft
  <br />

- Components --> Errors:
  De `Components` maakt gebruik van de `Errors` laag waarin het mogelijk is de excepties meer te specificeren.

---

## Controller

De `controller` laag heeft de verantwoordelijkheid om als een middelpersoon te dienen tussen de sublaag `components` en `service`. De `controller` vangt de aanroepen vanuit de componenten op en stuurt deze door naar de juiste `service` afhandeling.

Met deze aanpak behoudt de `components` de focus op de view kant (of ook wel de UI en webcomponenten), terwijl de `controller` de koppeling met de datalogica en interacties, zoals requests of responses, afhandelt.

De data wordt vanuit de `controller` niet meteen naar de `components` door gestuurd. Dit heeft te maken om de persistentie reactief te maken, bijvoorbeeld met het getal dat bij de navigatie link staat dat aangeeft hoeveel taken er nog op actief of concept staan en welk zijn afgerond. 

De `controller` stuurt de update door naar de `store` waarbij de `components` deze leest en de vervolgens de pagina aanpast.

## Store

De store laag is opgezet als een centrale locatie waarbij de globale toestanden (state). Deze is toegankelijk voor alle module of componenten binnen de applicatie en veranderd de content of UI binnen de componenten van de `views` naar aanleiding van de update die door de `controller` is gegeven.

Doordat de `store` store op deze manier is gestructureerd, blijft de architectuur tussen de `views`, `controller` en `service` gewaarborgd. Zoals kort toegelicht in de `Controller` sectie, ontvangt de `store` de data-updates die de `controller` van de `service` heeft gekregen. Deze updates worden vervolgens afgehandeld en automatisch beschikbaar gesteld om door de `views` te worden ingelezen.

Zoals het in de architectuurmodel te zien is worden de updates, die aan de store zijn doorgegeven, ook door de `router` laag ingelezen. De `controller` ontvangt van de `service` laag een lijst met de geüpdatete taken, waarbij alle zijn voorzien met een eigen ID. De ID wordt in de `router` gebruikt om naar de specifieke pagina van de taak te navigeren, zonder dat er een directe verbinding te maken met de `controller` laag hoeft worden gemaakt. Omdat de ID rechtstreeks vanuit de databron komt is de router in staat om deze te vergelijken met hetgeen wat uit de parameter van de url adres komt. 
Als deze niet overeenkomen, zou de applicatie naar de not found pagina moeten navigeren. 

## Service

De `Service` laag bevat verantwoordelijkheden om API-calls uit te sturen of responses van het geadresseerde backend te ontvangen.

De gebruiker heeft de mogelijkheid om een taak aan de to-do lijst toe te voegen, waarbij die vooraf de verplichte invoerlijsten moet invoeren.

Omdat de scope van dit project begonnen was om met Vue.js te oefenen, is er voor dit project geen backend opgezet die de data vooraf kan valideren voordat deze aan de database wordt toegevoegd. Om toch dezelfde ervaring te krijgen dat de data naar de backend wordt gestuurd of wordt opgehaald, is hiervoor gekozen om een JavaScript tool, json-server, te gebruiken. Deze simuleert de ervaring dat data naar de backend wordt gestuurd, waarvan deze later in de database wordt opgeslagen. In werkelijkheid wordt hiervoor een json bestand gebruikt, waarbij dit gebruikmaakt van een eigen port, waarvan de frontend deze gebruikt om mee te kunnen communiceren.

Eerder bij het stuk `Controller` is er vermeld dat de functies die binnen deze laag bevinden de opdracht aan de `Service` geven, waarbij er specifiek een opdracht wordt gegeven om een API-call uit te voeren. Met de response die met de API-call wordt gegeven, gaat dit op dezelfde manier weer terug. De `Service` geeft de response door aan de `Controller`  die op zijn beurt deze weer doorgeeft aan de `Components` die zich in de `Views` laag bevindt. De `Service` laag heeft ook een associatie met de lagen `Errors` en de `Const`. Dit heeft te maken omdat de `Service` ook een foutbericht als response mag doorgeven aan de `Controller`, waarvan deze het weer doorgeeft aan de `Components`. De `Service` maakt alleen gebruik van de `Const` omdat hierin ook een constante variabel is opgezet ,waarvan dit gaat om een string waarde die de url naar de backend omschrijft.
