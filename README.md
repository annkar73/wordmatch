## WordMatch

### Background
This project was created as a degree project for my education as Front End Developer at Medieinstitutet.

### Project idea summary
The Word Match Game is a memory game where players match images with corresponding words. Players can choose different difficulty levels based on word length or play a random selection from all levels. The game is designed to offer a fun, interactive way to improve reading and recognizing words.
The addition of a classic version of the memory game offers a plain game experience to get used to the game play and for relaxing amusement. The classic memory version of the game offers two different sizes of the board – 4 x 4 cards (8 pairs) and 6 x 6 cards (18 pairs) for variation.


### Application flow




### Purpose
The idea for the Word Match came from playing similar word games with my son to help him understand how letters form words and connect them to the objects they represent. These games made learning fun and interactive, sparking the concept for a digital version that others could enjoy.
This project will provide value by offering a playful and educational tool that enhances literacy skills. It allows players to match images with words, helping to reinforce vocabulary and phonics in an engaging way. The game bridges the gap between visual and linguistic learning, making it suitable for both home and educational use.
The classic version of the memo game is good training of memory and coordination and is a simpler game not demanding knowledge of the alphabet.


### Target audience
The primary target audience for this project includes young children, aged approximately 3 to 6 years old, who are beginning to learn how to read and write. 
Additionally, parents and educators seeking engaging and interactive educational tools to support literacy development are also part of this audience.

Parents are interested in resources that can make learning fun and effective for their children, helping them to build a strong foundation in reading skills. 
Educators are always looking for innovative teaching methods to engage students in the classroom. Both groups will find value in a game that combines play with learning, as it fosters language development while maintaining children's interest and excitement about reading.

### Goal
The expected outcome of this project within six weeks was to develop a fully functional and engaging educational game that allows children to match images with words. The project aimed to create a simple and user-friendly interface with intuitive gameplay mechanics that promote basic literacy skills.  
It includes features such as different difficulty levels based on word length and the ability to randomly select from all levels, providing a versatile learning experience.  
Overall, the project is expected to provide an enjoyable learning experience that helps children develop their reading skills in a dynamic and supportive environment.

### Tech Stack  
- Vite
- React Styled Components
- TypeScript
- Framer-Motion


### Technical breakdown
#### Frontend
- __React (with TypeScript)__ handles routing, UI components and game logic
- __Styled Components__ ensures dynamib styling based on game state

#### Backend
- __Supabase PostgreSQL Database__ stores image URLs, words and matching identifiers

#### Routing and navigation
- __React Router__ manages seamless transitions between views

#### Game Logic
- Both games share a common fetch for reusable handling depending on selection of game and difficulty setting

#### Assets and Storage
- __Supabase Storage Bucket__ is used to host images for both game modes

#### Deployment
- Hosted on __Netlify__, providing continuous deployment and responsive performance. Added extension for configuration in connection to Supabase

### Database Structure


### Summary  
The app’s structure is modular and designed for scalability, with clear routing and logic separation between game modes. A PostgreSQL database hosted by Supabase handles data storage efficiently, while the frontend is lightweight and responsive due to Vite and React. This setup ensures an engaging and intuitive experience for all users.

### Screenshots
