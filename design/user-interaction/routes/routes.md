# Page Navigatie

![RouteNavigation](./Global%20navigation%20page%20todo%20list-Page-2-Navigation_design_new.drawio.png)

## 1. Navigatie

De gebruiker kan met deze applicatie naar vier pagina's navigeren.

- Home/ToDo (Hoofdpagina)
- Completed List
- Draft List
- Not Found

## 2. Home/ToDo (Page)

De `Home/ToDo` is de hoofdpagina (momenteel het  dashboard) waar de gebruiker naartoe wordt genavigeerd zodra die de To-Do applicatie opent. 

De `Home/ToDo` pagina heeft als enige binnen de applicatie de mogelijke om een nieuwe taak te maken, waarbij deze gebruik maakt van de formulier modal.

Deze kunnen als actieve taken aan de To Do lijst worden toegevoegd of als een draft worden opgeslagen (indien dit van toepassing is wordt de taak aan de draft lijst toegevoegd die die in de Draft list pagina bevind).

De taken die aan de To Do lijst zijn toegevoegd zijn tevens navigeerbaar naar de gerelateerde pagina van de taak zelf. Hierin heeft de gebruiker de mogelijkheid om de toegevoegde taak aan te passen, waaronder de naam van de taak, de (optionele) sub taken, de prioriteit van de taak en de begin en einddatum.

## 3. Completed List

De gebruiker kan de afgeronde taken toevoegen door via de `Home/Todo` op de specifieke taak te klikken en op de knop finish te selecteren. Dit kan alleen wanneer de specifieke taak alle subtaken heeft afgerond door knop `Done` te selecteren.

Wanneer de gebruiker de specifieke taak afrondt wordt deze toegevoegd aan de lijst die in de `Completed List` pagina bevindt.

### 3.1. Het terug zetten van een afgeronde taak naar actieve taak

De gebruiker kan bij gevallen - wanneer die eerder een taak had afgerond - deze weer omzetten naar een actieve taak. Hierbij moet er eerst naar de `Completed List` pagina worden genavigeerd en moet er vervolgens op de afgeronde item worden geklikt. Wanneer de specifieke afgeronde taak is geselecteerd wordt de specifieke pagina geopend waarbij de gebruiker op de knop `Unfinished` kan klikken. Dit zorgt ervoor dat deze specifieke taak terug wordt geplaatst naar de lijst die op de `Home/ToDo` pagina bevindt.

De afgeronde taken kunnen niet worden aangepast. Hiervoor moet de taak eerst worden terug worden gezet naar actieve taak.

## 4. Draft List

De gebruiker kan tijdens het aanmaken van een nieuwe taak ervoor kiezen deze op te slaan als een concept dat later kan worden opgepakt. Hiervoor moet de gebruiker eerst de naam van de taak invullen voordat dit kan worden gedaan. 

Wanneer de taak als een concept wordt opgeslagen, wordt deze aan de lijst toegevoegd waarvan deze zich op de `Draft List` pagina bevind.

## 5. Formulier

De formulier is zodanig opgezet dat deze meerdere keren kan worden hergebruikt, waarbij de content hiervan wordt bepaald op basis van welke mode er eerde is doorgeven.

- De Home/ToDo geeft tijdens de implementatie van de `Form` component als attribuut door dat de mode van de formulier een `create` is. Hiermee kan de `Form` component eruit herkennen dat dit gaat om een aanmaak formulier

- Bij de specifieke `Task` pagina, wordt een mode `edit` meegegeven als attribute tijdens het implementatie van de `Form` component meegegeven. Hierbij weet de `Form` component dat die de content van formulier moet aanpassen waarbij de eerdere opgeslagen taken in de invoervelden zichtbaar zijn die eerder door de gebruiker waren ingevuld en opgeslagen.

- Bij de draft wordt tijdens de implementatie van de `Form` component de attribuut `draft` meegegeven. Hierbij weet de `Form` component dat die de content moet aanpassen waarbij de invoervelden die door de gebruiker eerder waren ingevuld en is opgeslagen als een concept.
 
## 6. Not Found

Zoals de titel het omschrijft, gaat dit om een niet bestaande pagina waar de gebruiker naar toe zou kunnen navigeren. Dit zou kunnen gaan wanneer de gebruiker naar een specifiek taak zou willen navigeren, waarbij die de `ID` van de taak verkeerd heeft gespeld. 

Deze pagina heeft alleen een terugkeernavigatie naar de `Home/ToDo`, die de gebruiker terug navigeert wanneer er op deze link wordt geklikt.