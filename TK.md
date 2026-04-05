# Tekninen raportti – Energia-hallintapaneeliprojekti

## Projektin Yhteenveto
Energia-hallintapaneelijärjestelmä kehitettiin käyttäjien sähkönkulutuksen hallintaan ja seurantaan. Järjestelmä mahdollistaa kirjautumisen, sopimus- ja laskutietojen tarkastelun sekä sähkönkulutuksen seuraamisen päivittäin, kuukausittain ja vuosittain. Lisäksi tarjolla on edistyneitä analyysejä ja kaavioita energiankulutuksesta.

## Käytetyt teknologiat
- **React.js**: Dynaamisten käyttöliittymien rakentamiseen.
- **TypeScript**: JavaScript-pohjainen kieli, jossa on tyyppiturva.
- **Vite**: Moderni ja nopea kehitystyökalu React-sovelluksille.
- **Chart.js** ja **react-chartjs-2**: Kaavioiden ja analyysien näyttämiseen.
- **CSS**: Käyttöliittymän suunnitteluun ja tyylittelyyn.
- **Fetch API**: Tietojen hakemiseen palvelimelta.
- **Node.js**: Taustapalvelimen (backend) ajamiseen.

## Projektin rakenne
- **Käyttöliittymä (Frontend)**: Rakennettu Reactilla ja TypeScriptillä. Käyttöliittymä on jaettu erillisiin komponentteihin, kuten kirjautuminen, hallintapaneeli, kaaviot jne.
- **Palvelin (Backend)**: Node.js-pohjainen, tarjoaa rajapinnat (API) sopimus-, lasku- ja kulutustietojen hakemiseen.
- **Kaaviot**: Chart.js käytössä kulutustietojen visuaaliseen esittämiseen.
- **Monikielisyys**: Käyttöliittymä tukee sekä arabiaa että suomea.

## Käytetyt kielet
- **TypeScript** (Reactin kanssa)
- **JavaScript** (osassa palvelinta)
- **CSS** (tyylittelyyn)

## Lisäominaisuudet
- Responsiivinen suunnittelu – toimii kaikilla laitteilla.
- Moderni ja helppokäyttöinen käyttöliittymä.
- Koodin selkeä organisointi helpottaa jatkokehitystä ja ylläpitoa.

## Viimeisimmät muutokset (huhtikuu 2026)

- **Vite/Vitest-konfiguraatio**: Muutettu `vite.config.ts` käyttämään `import { defineConfig } from 'vitest/config'` mahdollistamaan test-asetusten (`test`) määrittelyn ilman TypeScript-virheitä.
- **Proxy-rewrite**: Lisätty `rewrite`-ominaisuus Vite-proxyyn, jotta kaikki `/api`-alkuiset pyynnöt ohjataan backend-palvelimelle (portti 4000) ja `/api`-etuliite poistetaan automaattisesti.
- **Testaus**: Varmistettu, että kaikki testitiedostot (`*.test.ts(x)`) toimivat ja Vitest löytää sekä suorittaa ne oikein.
- **TypeScript-tyypitykset**: Varmistettu, että `tsconfig.app.json` ja `tsconfig.vitest.json` sisältävät `"types": ["vitest"]`, jotta testien globaalit funktiot kuten `test` ja `expect` tunnistetaan.

## Haasteet ja ratkaisut (The Challenges and Solutions)

- **Frontend ja Backend eri porttien**: Oikea ongelma oli, että frontend ja backend käyttivät eri portteja. Ratkaisu oli lisätä proxy ja rewrite Vite.
- **TypeScript ei tunnista Vitest-duala**: Näkymät esimerkiksi `test` ja `expect` ei tunnistettu. Ratkaisu oli asettaa `tsconfig`-tiedostoon `types: ["vitest"]` ja käyttää `reference`-tiedostoa.
- **Käytetään kaikki testit tarkistettu**: Alkuperäisesti ei kaikki testit löydy. Ratkaisu oli tarkistaa, että kaikki testit ovat oikeassa.
- **Vite ja Vitest**: Tässä oli tarkoitus. Ratkaisu oli käyttää `import { defineConfig } from 'vitest/config'`.
- **Monikielisyys**: Jotkut näkymät tarvitsevat kahden kielen. Ratkaisu oli organisoida teksti ja näkymät.

Nämä haasteet ja ratkaisut parantavat kehitysympäristön vakautta ja mahdollistavat sujuvan testauksen sekä frontendin ja backendin välisen yhteyden paikallisesti.





نظام إشعارات للمستخدمين
تنبيه المستخدم عند وجود فاتورة جديدة أو تجاوز استهلاك معين.

لوحة تحكم للإدارة
إضافة واجهة خاصة للمشرفين لإدارة المستخدمين والبيانات.

تحسين الأمان
تطبيق مصادقة ثنائية (2FA) وتشفير البيانات الحساسة.

تحسين تجربة المستخدم (UX/UI)
إضافة رسوم بيانية تفاعلية، دعم الوضع الليلي، وتحسين الاستجابة على الجوال.

دعم لغات إضافية
إضافة لغات أخرى لتوسيع قاعدة المستخدمين.

تكامل مع خدمات خارجية
ربط النظام مع مزودي الطاقة أو خدمات الدفع الإلكتروني.

تحليل بيانات متقدم
إضافة تقارير ذكية وتوقعات استهلاك الطاقة باستخدام الذكاء الاصطناعي.

اختبارات تلقائية شاملة
زيادة تغطية الاختبارات لضمان استقرار النظام مع كل تحديث.