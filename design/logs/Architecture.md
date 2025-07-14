# Architectuur van ToDo app

![frontend architecture](../model/simple_frontend_architecture_new.png)

In het voorbeeld is de architectuur van de ToDo app in kaart gebracht, waarbij verschillende verantwoordelijkheden zijn ingedeeld binnen de betreffende (sub)folders.

## Techstack

- vue
- typescript
- tailwind
- vite
- pinia
- json-server (mock-backend)

---

## Views

Zoals te zien is, hebben alleen de DOM en de Router folders associatie met de `Pages` subfolder (weergegeven als subfolder binnen de `Views`, waarbij deze folder in lichtblauw is weergegeven).

De `Pages` subfolder heeft alleen de verantwoordelijkheid om de gerenderde componenten weer te geven, waarvan die in de `Component` subfolder zijn opgezet (waarvan deze subfolder ook in de `Views` folder wordt weergegeven).

De `Router` folder heeft als verantwoordelijkheid navigatielinks te beheren, zodat er een mogelijkheid is om naar verschillende (sub)pagina's te navigeren.

De `UI` subfolder is alleen bekend bij de `Component` subfolder. Dit komt omdat de `UI` subfolder element, zoals knoppen, selectie dropdown, container, etc. bevat waarbij deze binnen de `Component` hergebruikt kunnen worden.

### Component subfolder

De `Component` is de belangrijktste subfolder binnen de `Views` omdat deze de kern is van alle gemaakte webcomponenten die de eindgebruiker te zien krijgt. Vanaf deze subfolder worden er associaties naar andere folders gelegd om het volgende genoemde zaken af te kunnen handelen:

- Component --> Controller:
  De `Component` stuurt een opdracht naar de `Controller`, waarnaar deze de desbetreffende functie uitvoert om een call uit te voeren naar het andere functie die in de `Service` folder staat. Meer hierover, zie `Controller`
  <br />

- Component --> Utils:
  De `Component` maakt gebruikt van de `Utils` omdat deze functies bevatten waarvan deze puur zijn. Dit betekent dat de functie die hierin zijn opgesteld geen side-effects bevatten en de resultaten altijd hetzelfde blijven op basis
  <br />

- Component --> Router:
  De `Component` mag als enige associatie hebben met de `Router`. Dit heeft te maken omdat binnen de `Component` subfolder webcomponenten aanwezig zijn zoals een navigatiebar en knop-navigaties.
  <br />

- Component --> Interface:
  De `Component` heeft relatie met de `Interface` omdat hier in types voor properties zijn bepaald moet worden voldaan.
  <br />

- Component --> Const:
  De `Component` maakt gebruik van de folder `Const` omdat deze variabelen bevat waarbij de waarde vooraf zijn gedeclareerd en altijd constant blijft
  <br />

- Compontent --> Errors:
  De `Component` maakt gebruik van de `Errors` folder waarin het mogelijk is de excepties meer te specificeren.

---

## Controller

De `Controller` folder heeft de verantwoordelijkheid om als een middelpersoon te dienen tussen de subfolder `Component` en `Service`. De controller vangt de aanroepen vanuit de componenten op en stuurt deze door naar de juiste `Service` afhandeling.

Met deze aanpak behoudt de component de focus op de view kant (of ook wel de UI en webcomponenten), terwijl de controller de koppeling met de datalogica en interacties, zoals requests of responses, afhandelt.

```mermaid
flowchart LR
    %% Heen route zonder labels (standaard pijlen)
    Views --> Controller
    Views --> Store
    Controller --> Service
    Service --> Backend

    %% Retour route als aparte nodes en rechte verbindingen
    subgraph Communication: Views-Controller-Service
      direction LR
      Backend --- DataLabel ---> Service
      Service --- ResponseLabel ---> Controller
      Controller --- StoreUpdateLabel ---> Store
      Views --- ReactiveLabel ---> Store
    end

    %% Label nodes met tekst
    DataLabel["data"]
    ResponseLabel["response"]
    StoreUpdateLabel["store.update()"]
    ReactiveLabel["reads from store"]

    %% Style label nodes
    class DataLabel,ResponseLabel,StoreUpdateLabel,ReactiveLabel labelStyle;

    classDef labelStyle fill:#58a6ff,stroke:none,color:#fff,font-weight:bold,font-size:12px,border-radius:4px,padding:4px;

    %% Gestippelde stijl voor retourroute (inclusief Store → Views)
    linkStyle 4,5,6,7,8,9,10,11 stroke:#58a6ff, stroke-width:2px, stroke-dasharray: 6 4, fill:none
```

## Service

De `Service` folder bevat verantwoordelijkheden om API-calls uit te sturen of responses van het geadresseede backend te ontvangen.

De gebruiker heeft de mogelijkheid om een taak aan de to-do lijst toe te voegen, waarbij die vooraf de verplichte invoerlijsten moet invoeren.

Omdat de scope van dit project begonnen was om met Vue.js te oefenen, is er voor dit project geen backend opgezet die de data vooraf kan valideren voordat deze aan de database wordt toegevoegd. Om toch dezelfde ervaring te krijgen dat de data naar de backend wordt gestuurd of wordt opgehaald, is hiervoor gekozen om een JavaScript tool, json-server, te gebruiken. Deze simuleert de ervaring dat data naar de backend wordt gestuurd, waarvan deze later in de database wordt opgeslagen. In werkelijkheid wordt hiervoor een json bestand gebruikt, waarbij dit gebruikmaakt van een eigen port, waarvan de frontend deze gebruikt om mee te kunnen communiceren.

Eerder bij het stuk `Controller` is er vermeld dat de functies die binnen deze folder bevinden de opdracht aan de `Service` geven, waarbij er specifiek een opdracht wordt gegeven om een API-call uit te voeren. Met de response die met de API-call wordt gegeven, gaat dit op dezelfde manier weer terug. De `Service` geeft de response door aan de `Controller`  die op zijn beurt deze weer doorgeeft aan de `Component` die zich in de `Views` folder bevindt. De `Service` folder heeft ook een associatie met de folders `Errors` en de `Const`. Dit heeft te maken omdat de `Service` ook een foutbericht als response mag doorgeven aan de `Controller`, waarvan deze het weer doorgeeft aan de `Component`. De `Service` maakt alleen gebruik van de `Const` omdat hierin ook een constante variabel is opgezet ,waarvan dit gaat om een stringwaarde die de url naar de backend omschrijft.
