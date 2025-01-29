# WordMatch

Gå till [🇸🇪 svensk version](#ordmatch)

### Background
This project was created as a degree project for my Front-End Developer education at Medieinstitutet.

### Project Overview
The Word Match Game is a memory game where players match images with corresponding words. The game has different difficulty levels based on word length or random selection from all levels. Additionally, a classic memory game version is included, offering a simple and relaxing gameplay experience. The classic version has two board sizes: 4x4 (8 pairs) and 6x6 (18 pairs).

## Application Flow

![Application Flow](public/readme-assets/flowchart_site.png)

## Purpose
The Word Match Game was inspired by playing similar word games with my son to help him connect letters to words and objects. These games made learning fun, leading to the idea of creating a digital version for others to enjoy. This project offers an engaging educational tool that enhances literacy skills, bridging the gap between visual and linguistic learning.

## Target Audience
- **Children (3-6 years old)**: The game is designed to support early literacy development, offering an engaging learning experience.
- **Parents**: Seeking educational and fun resources for their children's literacy development.
- **Educators**: Looking for innovative, interactive methods to teach students.

## Project Goals
The goal was to create a fully functional educational game with:
- User-friendly interface and intuitive gameplay
- Different difficulty levels based on word length
- Random word selection across all levels
The game aims to help children develop reading skills in an enjoyable and supportive environment.

## Tech Stack
- **Vite**: Fast development environment
- **React with Styled Components**: Building the UI and game logic
- **TypeScript**: For type safety and clarity
- **Framer-Motion**: Animations and transitions

## Technical Breakdown

### Frontend
- **React (with TypeScript)**: Manages UI components, routing, and game logic.
- **Styled Components**: Dynamic styling based on game state.

### Backend
- **Supabase PostgreSQL Database**: Stores image-urls, words, and matching identifiers.

### Routing and Navigation
- **React Router**: Manages transitions between views for smooth navigation.

### Game Logic
- The game shares a reusable fetch function to handle both game modes and difficulty settings.

### Assets and Storage
- **Supabase Storage Bucket**: Hosts images used in both game modes.

### Deployment
- Hosted on **Netlify** with continuous deployment and responsive performance. Supabase configuration extension is also integrated.

## Database Structure

![Database Structure](public/readme-assets/flowchart_db.png)

## Summary
The app is modular and scalable, with clear separation between game modes and logic. It uses Supabase for efficient data storage and Vite/React for a responsive and engaging frontend. This architecture ensures a smooth and intuitive experience for users of all ages.

## Screenshots  

See bottom of page for [screenshots of project](#screenshots)

---

<a name="ordmatch"></a>

# OrdMatch

Go to [🇬🇧 English Version](#wordmatch)

### Bakgrund
Detta projekt skapades som ett examensprojekt för min utbildning som Front-End Developer på Medieinstitutet.

### Projektöversikt
OrdMatch är ett memoryspel där spelarna matchar bilder med motsvarande ord. Spelet har olika svårighetsgrader baserat på ordlängd eller en slumpmässig urval från alla nivåer. Dessutom finns en klassisk version av Memory, som erbjuder en enkel och avkopplande spelupplevelse. Den klassiska versionen har två olika brädesstorlekar: 4x4 (8 par) och 6x6 (18 par).

## Applikationsflöde

![Applikationsflöde](public/readme-assets/flowchart_site.png)

### Syfte
Idén till OrdMatch kom från att leka liknande ordlekar med min son för att hjälpa honom att koppla ihop bokstäver med ord och objekt. Dessa spel gjorde lärandet roligt, vilket ledde till idén att skapa en digital version för andra att njuta av.  
Projektet erbjuder ett engagerande utbildningsverktyg som förbättrar läsfärdigheter och skapar en bro mellan visuell och språklig inlärning.

### Målgrupp
- **Barn (3-6 år gamla)**: Spelet är utformat för att stödja tidig läs- och skrivutveckling och erbjuder en engagerande lärandeupplevelse via lek.
- **Föräldrar**: Söker pedagogiska och roliga resurser för sina barns läsutveckling.
- **Pedagoger**: Letar efter innovativa, interaktiva metoder för att undervisa elever.

### Projektmål
Målet var att skapa ett fullt fungerande utbildningsspel med:
- Användarvänligt gränssnitt och intuitiv spelmekanik
- Olika svårighetsgrader baserat på ordlängd
- Slumpmässigt urval av ord från alla nivåer
Spelet syftar till att hjälpa barn att utveckla läsfärdigheter i en rolig och stödjande miljö.

### Teknikstack
- **Vite**: Snabb utvecklingsmiljö
- **React med Styled Components**: Bygger UI och spel-logik
- **TypeScript**: För typ-säkerhet och tydlighet
- **Framer-Motion**: Animationer och övergångar

### Teknisk uppdelning

#### Frontend
- **React (med TypeScript)**: Hanterar UI-komponenter, routing och spel-logik.
- **Styled Components**: Dynamisk styling baserat på spelets tillstånd.

#### Backend
- **Supabase PostgreSQL-databas**: Lagrar bildlänkar, ord och matchande identifierare.

#### Routing och navigering
- **React Router**: Hanterar övergångar mellan vyer för smidig navigering.

#### Spellogik
- Spelet delar en återanvändbar fetch-funktion för att hantera båda spelmoderna och svårighetsinställningarna.

#### Tillgångar och lagring
- **Supabase Storage Bucket**: Lagrar bilder för båda spelmoderna.

#### Deployment
- Hostat på **Netlify** med kontinuerlig deployment och responsiv prestanda. Tillägg för Supabase-konfiguration är också integrerad.

## Databasstruktur

![Databasstruktur](public/readme-assets/flowchart_db.png)

### Sammanfattning
Appen är modulär och responsiv med tydlig separation mellan spelmoderna och logik. Den använder Supabase för effektiv datalagring och Vite/React för ett responsivt och engagerande frontend. Denna arkitektur säkerställer en smidig och intuitiv upplevelse för användare i alla åldrar.

<a name="screenshots"></a>  

### Screenshots / Skärmbilder

#### Start Page / Startsida
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/homescreen_light.png" alt="Landing page Light theme / Startsida med ljust tema" width="300">
    <img src="public/readme-assets/homescreen_dark.png" alt="Landing Page Dark theme / Startsida med mörkt tema" width="300">
</div>  
<strong>The start page where users can navigate to different game modes / Startsida där användaren kan navigera till de olika spelversionerna</strong>

#### Game Overview / Spelöversikt
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/game_overview_light.png" alt="Game overview Light theme / Spelöversikt med ljust tema" width="300">
    <img src="public/readme-assets/game_overview_dark.png" alt="Game overview Dark theme / Spelöversikt med mörkt tema" width="300">
</div>  
<strong>The game overview displaying available game modes / Spelöversikt där användaren kan välja mellan de olika spelversionerna</strong>

#### Word Match  / Matcha Ord
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/wordmatch_light.png" alt="Word Match Light theme / Word Match med ljust tema" width="300">
</div>  
<strong>Gameplay for WordMatch / Spelläget för Matcha Ord</strong>  

#### Classic Memory  / Klassiskt Memory
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/memory_dark.png" alt="Classic Memory Dark theme / Klassisk memory med mörkt tema" width="300">
</div>  
<strong>Gameplay for Classic Memory / Spelläget Klassisk Memory</strong>  

#### Game Over / Spel avslutat
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/game_over.png" alt="Screen showing Game Over / Skärm som visar avslutat spel" width="300">
</div>  
<strong>Screen showing Game Over / Skärm som visar avslutat spel</strong>


#### More Info  / Mer Info
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/faq_light.png" alt="FAQ Light theme / FAQ med ljust tema" width="300">
    <img src="public/readme-assets/faq_dark.png" alt="FAQ Dark theme / FAQ med mörkt tema" width="300">
</div>  
<strong>FAQ page providing additional information about the game / FAQ-sidan med mer information om spelet</strong>  

#### Contact Page  / Kontaktsida
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/contact_light.png" alt="Contact Page Light theme / Kontaktsida med ljust tema" width="300">
    <img src="public/readme-assets/contact_dark.png" alt="Contact Page Dark theme / Kontaktsida med mörkt tema" width="300">
</div>  
<strong>The contact page where users can get in touch via a contact form / Kontaktsidan där användaren kan ta kontakt via ett kontaktformulär</strong>  

#### Mobile Navigation  / Mobil navigation
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="public/readme-assets/navigation_mobile_light.png" alt="Mobile Navigation Light theme / Navigationsmeny mobilversion ljust tema" width="300">
    <img src="public/readme-assets/navigation_mobile_dark.png" alt="Mobile Navigation Dark theme / Navigationsmeny mobilversion mörkt tema" width="300">
</div>  
<strong>Navigation menu as displayed on mobile devices / Navigationsmenyn i mobilvy</strong>  