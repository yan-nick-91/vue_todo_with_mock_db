# Verzameling van Directives binnen Vue

## Toelichting

Met dit soort van logverslag beschrijf ik de punten van wat ik geleerd heb over **vue directives**.

De intentie hiervan is dat ik hetgeen wat ik geleerd heb in het project toepas en dit logverslag gebruik om in het kort uit te leggen wat deze directive doet.
Deze hoeven niet te uitbundig te zijn, maar het moet ook niet zo zijn dat deze te kort van stof zijn.

Voor eigen bescherming spreek ik af per stuk — waarbij ik het over een **directives** heb — de intentie aan te houden waarbij ik niet meer dan 4 zinnen te schrijven, en minimaal 1 (mits ik dit in een zin goed weet uit te leggen) tot 2 zinnen.

---

## Wat zijn directives binnen vue

Binnen Vue bestaat de mogelijkheid om met speciale attributen functies uit te voeren waarvoor normaal binnen JavaScript een functie voor moet worden gebouwd, zodat een HTML tag binnen de DOM kan worden gemanipuleerd.

In de meeste gevallen gebeurd dit met een prefix 'v-', gevolgt door een specifiek keyword zoals, 'if', 'else-if' 'else', 'for', 'model' etc. zie concrete voorbeelden hieronder.

- v-if
- v-else-if
- v-else
- v-for
- v-model

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

Deze **directive** — waarvan deze in HTML tag is toegepast — gebruikt de uitkomst van de `isAvailable()` functie als waarde en geeft deze deze door aan de stock component. Deze wordt in de `defineProps()` opgevangen. Vervolgens wordt deze props gebruikt als expressie binnen `v-if` en zorgt ervoor dat de `<div>` element wordt gerenderd, omdat de prop waarde **true** is. Als de uitkomst van isAvailable **false** is, wordt de HTML tag `<div>` <ins>**niet**</ins> gerenderd — zoals te zien is in **voorbeeld 2**.

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

**Voorbeeld 1.**

---

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

**Voorbeeld 2.**

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

---

### Toegepast aan eigen project

Binnen de component [TheCreateTask.vue](https://github.com/yan-nick-91/vue_todo_with_mock_db/blob/main/src/views/components/home/TheCreateTask.vue) heb deze logic toegepast, waarbij er een check wordt gedaan of er bullet points aan de lijst is toegevoegd. Deze kijkt of de lengte meer dan 0 is, voor dat de `<div>` element wordt gerenderd. `<div v-if="bulletList.length > 0">`.

Als deze de conditie niet heeft behaald, wordt de element`<div v-else>` gerenerd waarbij met tekst **'Nothing added yet'**.

### Toepassen bij eigen componenten

Binnen vue is het ook mogelijk om deze directives aan de eigen gemaakte componenten toe te voegen, om bijvoorbeeld deze wel of niet te renderen. zie voor in de [TheTaskComponent](https://github.com/yan-nick-91/vue_todo_with_mock_db/blob/main/src/views/components/task/TheTaskComponent.vue), waarbij er bij `<UpdateTaskModal />` en `<DeleteTaskModal />` deze directives zijn toegepast.

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

> **Note:**
>
> Bij het renderen van een lijst dient elk geloopte waarde een unieke key waard te bevatten. Deze kan op twee manieren worden gedaan.

- Render per geloopte item een nieuwe index en gebruik deze waarde als expressie voor de key binding:
  `<div v-for=(index, item) in items :key="index">`
  <br>

- Gebruik de ID die als dat met de item is meegegeven

  ```javascript
  <script setup>
  const items = [
      {"id": 1, "content": "item 1"},
      {"id": 2, "content": "item 2"},
      {"id": 3, "content": "item 3"}]
  </script>

  <template>
      <ul>
          <li v-for="item in items" :key="item.id">{{ item.content }}</li>
          <!--
          result:
           item 1
           item 2
           item 3
           -->
      </ul
  </template>
  ```

---

## Bronnen

1. _W3Schools.com_. (z.d.). W3Schools. Geraadpleegd op 15 mei 2025, van [https://www.w3schools.com/vue/vue_directives.php](https://www.w3schools.com/vue/vue_directives.php)
