import { FaqItem } from "./FaqItem";

const faqData = [
  {
    question: "Vad är Memory?",
    answer: `Det klassiska memoryspelet är precis vad det låter som - precis som man kan spela memory med brickor på bordet läggs det här ut bildpar som man kan vända upp och matcha med varandra, under förutsättning att man kommer ihåg var de ligger. \n Man kan vända upp två kort i taget, och om de matchar varandra så ligger de kvar uppvända. Om de inte matchar vänds de tillbaka och man kan vända upp två nya brickor - eller kanske minns man var den som matchar till någon av de senaste låg? \n Spelet finns med två olika spelplaner - den mindre har 4 x 4 brickor (8 olika bilder blir 16 brickor) och det större har 6 x 6 brickor (16 olika bilder blir 36 brickor).`,
  },
  {
    question: "Vad är Matcha Ord?",
    answer: `Matcha Ord är också en variant av memory, men med den skillnaden att man här inte får två identiska bilder att matcha. Istället matchar man bilden med det ord som bilden symboliserar. \n En bild på tex en häst matchas alltså med en bricka där det står ordet häst. 	Även här finns det lite varianter, men istället för större spelplan kan man välja att matcha mot längre ord. Den lättaste nivån har ord på 2 eller tre bokstäver, mellannivån har ord på 4 bokstäver och den svårare nivån har ord på 5 eller fler bokstäver. \n Man kan även välja en slumpmässig nivå där det blandas bilder och ord från alla tre nivåerna i ett och samma spel.`,
  },
  {
    question: "Vad är bakgrunden till projektet?",
    answer: `Jag har skapat denna sida som en del av min utbildning inom webutveckling på Medieinstitutet. \n När det var dags att börja planera ett examensarbete ville jag göra något som är både roligt och lärorikt så jag funderade länge på vad jag skulle kunna hitta på. Idén till spelet kommer av att jag brukade leka liknande lekar med min son när han var yngre med avsikt att väcka hans intresse för läsning - då med papper och penna så jag ritade och skrev, och han fick dra streck mellan bild och ord. \n När man börjar sätta ihop bokstäverna till ett ord och kan jämföra det med bilder och koppla samman dem så ser man sammanhanget, och intresset för att lära sig mer om hur de där krumelurerna kan vara ord väcks. Att lära sig genom att spela ett spel gör det till en lek, och kunskapen och förståelsen för bokstäver och ord smyger sig på utan att man riktigt reflekterar över det.	\n Det klassiska memoryspelet har jag med för att det är ett roligt sätt att träna sitt minne. Och vill man inte matcha ord så är det ett bra spel att ha som avslappning och nöje.`,
  },
  {
    question: "Jag har fler frågor, hur får jag kontakt?",
    answer: `Via menyn kan du komma till en kontaktsida, där finns ett formulär att fylla i så skickas det ett mail till mig med din fråga.`,
  },
];

export function FaqList() {
  return (
    <div>
      {faqData.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
