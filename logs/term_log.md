# Verzameling van Directives binnen Vue

## Toelichting

Met dit soort van logverslag beschrijf ik de punten van wat ik geleerd heb over **vue directives**.

De intentie hiervan is dat ik hetgeen wat ik geleerd heb in het project toepas en dit logverslag gebruik om in het kort uit te leggen wat deze directive doet.
Deze hoeven niet te uitbundig te zijn, maar het moet ook niet zo zijn dat deze te kort van stof zijn.

Voor eigen bescherming spreek ik af per stuk — waarbij ik het over een **directives** heb — de intentie aan te houden waarbij ik niet meer dan 4 zinnen te schrijven, en minimaal 1 (mits ik dit in een zin goed weet uit te leggen) tot 2 zinnen.

---

## Wat zijn directives binnen vue

Binnen Vue bestaat de mogelijkheid om met speciale attributen functies uit te voeren waarvoor normaal binnen JavaScript een functie voor moet worden gebouwd, zodat een HTML tag binnen de DOM kan worden gemanipuleerd.

In de meeste gevallen gebeurd dit met een prefix 'v-', gevolgt door een specifiek keyword zoals, 'if', 'else-if' 'else', 'for', 'model' etc. zie concrete voorbeeld hieronder.

- v-if
- v-else-if
- v-else
- v-for
- v-model

**_Voorbeeld 1._**

Note:

In sommige gevallen is het mogelijk om bij specifieke **directives** met een korte notatie te vervangen zoals:

- v-bind -> : (voorbeeld v-bind:src -> :src of v-bind:class -> :class)
- v-on -> @ (voorbeeld v-on:click() -> @click)

**Source**: [W3Schools](https://www.w3schools.com/vue/vue_directives.php)

## Stijl van gedeelde voorbeelden in code

Hoewel mij is opgevallen dat de meeste voorbeelden — die op het internet te vinden zijn — de **Option API** aanpak hebben gebruikt, heb ik ondanks dit er voor gekozen mijne voorbeelden in **Composition API** aan te houden.
De reden hiervan is dat deze aanpak, naar mijn mening, veel meer overzicht geeft hoe een component is opgebouwd en ik deze ook een makkelijkere aanpak vindt om mee te werken.

De code in het project zelf heb ik in TypeScript geschreven, puur om extra type safety te hebben met de gedeclareerde variabelen. Dit is puur eigen voorkeur.

---

## Directives

###

## Conditionele directives

Deze directives bepalen de uitkomst op basis van een boolean waarde. Door deze als attributen in HTML tags te gebruiken, kan een UI-element worden gemanipuleerd (zie aantal voorbeelden hieronder).

### v-if

Deze **directive** — waarvan deze in HTML tag is toegepast — gebruikt de uitkomst van de `isAvailable()` functie als waarde en geeft deze deze door aan de stock component. Deze wordt in de `defineProps()` opgevangen. Vervolgens wordt deze props gebruikt als expressie binnen `v-if` en zorgt ervoor dat de `<div>` element wordt gerenderd, omdat de prop waarde **true** is. Als de uitkomst van isAvailable **false** is, wordt de HTML tag `<div>` **niet** gerenderd — zoals te zien is in **voorbeeld 2**.

```javascript
<script setup>
const isAvailable = () => {
    return product.stock > 0
}
</script>

<template>
    <Stock :is-available="isAvailable()" />
</template>
```

**_Voorbeeld 2.1._**

```javascript
<script setup>
defineProps({
    isAvailable: {
        type: Boolean
    }
})
</script>

<template>
    <div v-if="isAvailable">
        <!-- Dit wordt getoond als de prop 'isAvailable' true is -->
        Het product is beschikbaar.
    </div>
</template>
```

**_Voorbeeld 2.2._**

**Bonus:** defineProps kan binnen Vue worden gebruikt zonder dat deze van vue hoeft te worden geïmporteerd

### v-else

Deze speciale attributen kan in combinatie met **v-if** als attribuut worden gebruikt, mits deze direct opvolgt na de HTML tag waar **v-if** is toegepast.

**Toegestaan.**

```javascript
<div v-if=...>...</div>
<div v-else>...</div> <!-- Deze HTML tag bevat een v-else en volgt direct na de HTML tag die een v-if bevat -->
```

**Niet toegestaan.**

```javascript
<div v-if=...> ... </div>
<div> ... </div> <!-- Deze HTML tag bevat geen v-else en heeft hierdoor de conditionele directives onderbroken-->
<div v-else> ... </div>
```

**Note:** In tegenstelling tot de v-if bevat de v-else geen expressie; net zoals dit normaal met if else statement gaat.

### v-else-if

Zoals gebruikelijk is bij conditionele waarden – waarbij een else if kan worden gebruikt als een andere voorwaarde – biedt Vue hiervoor ook een directive: `v-else-if` (zie voorbeeld 3).

```javascript
<div v-if="value.length > 5 && value.length < 8">
    Deze element tag wordt gerenderd
</div>
<div v-else-if="value.length >= 8 && value.length <= 10">
    Deze element tag wordt gerendered en omdat gelijk en hoger 8 wordt de if niet gerenderd
</div>
...

```

**_Voorbeeld 3_**

> **Let op:**
>
> Bij `v-if` moet expliciet worden aangegeven dat een grens is bereikt zoals in **voorbeeld 3**.
> Net als bij een normale conditionele waarden wordt de `else if` **alleen** getriggerd wanneer de **if** waarde **false** is.
>
> Als in de `v-if` niet was vermeld dat de `value.length` niet hoger dan waarden 8 mag zijn, dan zou `v-else-if` worden genegeerd — omdat alle waarden boven de 8 ook zouden voldoen aan de **if-voorwaarden** (zie voorbeeld 4).

```javascript
<div v-if="value.length > 5">
    Deze element tag wordt gerenderd
</div>
<div v-else-if="value.length >= 8 && value.length <= 10">
    Wordt nooit getriggerd, want de 'v-if' is nog steeds true.
    Om deze reden valt deze deel nu onder dead code.
</div>
...

```

**_Voorbeeld 4._**

---

### Toegepast aan eigen project

Binnen de component [TheCreateTask.vue](https://github.com/yan-nick-91/vue_todo_with_mock_db/blob/main/src/views/components/home/TheCreateTask.vue) heb deze logic toegepast, waarbij er een check wordt gedaan of er bullet points aan de lijst is toegevoegd. Deze kijkt of de lengte meer dan 0 is, voor dat de `<div>` element wordt gerenderd. `<div v-if="bulletList.length > 0">`.

Als deze de conditie niet heeft behaald, wordt de element`<div v-else>` gerenerd waarbij met tekst **'Nothing added yet'**.

### v-show

Deze directive kan worden gebruikt als een alternatief voor v-if en wordt pas zichtbaar de expressie **true** is.

In tegenstelling tot `v-if` is het element bij `v-show` al aangemaakt in de DOM, ongeacht de voorwaarde. De zichtbaarheid van dit element staat op verborgen waardoor de gebruiker deze niet ziet waarneer die expressie op false staat. Deze wordt pas zichtbaar wanneer de expressie van `v-show` **true** is. Dit betekent dat de element niet hoeft worden gerenderd, waarvan de v-if dit wel doet op basis van de conditionele waarden.

#### v-show vs v-if

Afhankelijk hoe de applicatie is opgebouwd, heeft beide van deze aanpak zijn voordelen hoe deze per situatie het beste kunnen worden toegepast.

Bij gebruik van `v-show` – zoals net kort toegelicht – is het element al aanwezig in de DOM en wordt deze pas zichtbaar wanneer de expressie op **true** staat.

Echter wil dit niet zeggen dat `v-show` `v-if` volledig zou kunnen vervangen. Omdat `v-if` samen met `v-else-if` of `v-else` elementen alleen in de DOM rendert - op basis van welk voorwaarde kloppend is - worden onnodige elementen niet gerenderd.

---

## Lijst directive

Deze directive kan als attribuut binnen een HTML tag worden gebruikt om items uit een array waarde als een lijst weer te geven.

### v-for

```javascript
<script setup>
const items = ["item 1", "item 2", "item 3"]
</script>

<template>
    <div>
        <ul>
            <li v-for="item in items">
                {{ item }}
            </li>
        </ul>
    </div>
</template>
```

**_Voorbeeld 5_**

> **Note:**
>
> Bij het renderen van een lijst dient elk geloopte waarde een unieke key waard te bevatten. Deze kan op twee manieren worden gedaan.
>
> - Render per geloopte item een nieuwe index en gebruik
>   deze waarde als expressie voor de key binding:
>   `<div v-for=(index, item) in items :key="index">` > <br>
> - Gebruik de ID die als dat met de item is meegegeven, zoals in voorbeeld 6 is weergegeven.
>
> ```javascript
>  <script setup>
>  const items = [
>      {"id": 1, "content": "item 1"},
>      {"id": 2, "content": "item 2"},
>      {"id": 3, "content": "item 3"}]
>  </script>
>
>  <template>
>      <ul>
>          <li v-for="item in items" :key="item.id">{{ item. content }}</li>
>          <!--
>          result:
>           item 1
>           item 2
>           item 3
>           -->
>      </ul
>  </template>
> ```

**_Voorbeeld 6_**

---

### v-bind

Deze `v-bind` directive maakt het mogelijk om HTML attributen zoals `href`, `class`, `style`, et cetera, aan te passen op basis van de status van de data. Op deze manier is het manipuleren van de waarden voor attributen eenvoudiger, omdat de expressie direct de gebruik kan maken van de logica van Javascript — bijvoorbeeld door conidionele waarden toe te passen zie voorbeeld 7.

```javascript
<input
    v-bind:class="`border p-1 w-[100%] ${taskInputError ? 'border-red-500 bg-red-200' : ''}`"
    type="text"
    placeholder="Enter a task..."
    v-model="taskInput"
    @input="taskInputError = ''"
    />
```

**_Voorbeeld 7_**

Met dit voorbeeld — rechtstreeks afkomstig van [TheCreateTask.vue](https://github.com/yan-nick-91/vue_todo_with_mock_db/blob/main/src/views/components/home/TheCreateTask.vue) — is te zien dat bij het class attribuut een v-bind:class is wordtgebruikt en hierdoor nu dynamisch is.

Binnen de accolades (met behulp van backtickeks `` ` `` ) wordt de logica van Javascript toegepast, waarbij de archtergrond van het invoerveld kan veranderen op basis van de status van de `taskInputError`. Deze class heet ook wel binnen Vue de _dynamic class_.

**Side-note:** Omdat `v-bind` binnen Vue in het algmeen veel wordt gebruikt, kan deze ook worden afgekort als een `:` teken. Dit wil zeggen dat je bij elk van deze HTML attribuur geen v-bind ervoor hoeft te plaatsen. In 'voorbeeld 8.' is dit al weergeven, maar als goed naar mijn Vue-project kijkt, zie je dat ik altijd gebruik heb gemaakt van deze afkorting.

```javascript
<input
    :class="`border p-1 w-[100%] ${taskInputError ? 'border-red-500 bg-red-200' : ''}`"
    type="text"
    placeholder="Enter a task..."
    v-model="taskInput"
    @input="taskInputError = ''"
    />
```

**Source**: [Vue v-bind Directive](https://www.w3schools.com/vue/vue_v-bind.php)

---

## Bronnen

1. _W3Schools<span>.com.</span>_ (z.d.). W3Schools. Geraadpleegd op 15 mei 2025, van [https://www.w3schools.com/vue/vue_directives.php](https://www.w3schools.com/vue/vue_directives.php)

---

2. _W3Schools<span>.com.</span>_ (z.d.). W3Schools. Geraadpleegd op 21 mei 2025, van [https://www.w3schools.com/vue/vue_v-bind.php](https://www.w3schools.com/vue/vue_v-bind.php)
