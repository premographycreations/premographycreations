import React from 'react'
import logo from "../assets/logo.jpg"
import Navbar from "./nav.jsx"
import Footer from "./footer.jsx"
import WhatsAppButton from './whatsappbutton.jsx'

const team = () => {
    const team =[
        {
            name:"PREM SAGAR DAS",
            description:"  Role: Chief Executive Officer  As the driving force behind our brand, PREM SAGAR DAS is more than just a leader—they are the creative visionary who ensures every project aligns with our core philosophy of “Every Click Tells a Story.” With years of experience in the photography and creative industry, PREM SAGAR DAS has built a team that thrives on passion, precision, and innovation. Their expertise lies in blending business acumen with artistic sensibility, ensuring clients receive not just services, but experiences worth cherishing. From nurturing talent within the team to building strong client relationships, they are deeply involved in every aspect of our work. Known for their calm leadership and inspiring vision, PREM SAGAR DAS continuously pushes boundaries, ensuring our studio remains at the forefront of creative storytelling. Under their guidance, our brand has grown into a trusted name for capturing life’s most precious moments",

            image:"../assets/team/team1.jpg" // only change team1.jpg part 


        },
        {
            name:"PRITAM MAL",
            description:"Role: Lead VideographerFor PRITAM MAL, every frame is a canvas and every story is meant to be told with movement, sound, and soul. With expertise in cinematic videography, they specialize in weaving together emotions, expressions, and experiences into films that feel alive. Their work captures the grandeur of ceremonies, the intimacy of candid exchanges, and the vibrancy of celebrations in a way that touches hearts. Known for their technical mastery of modern cinematography tools and techniques, they craft videos that are visually stunning while staying true to the essence of the moment. Clients often praise their storytelling approach, where even the smallest gestures are highlighted with elegance and depth. Beyond shooting, they are also involved in editing and post-production, ensuring that every video has a flawless finish. Their vision is simple—turning fleeting memories into films that can be cherished for generations.",
            image:"../assets/team/team4.jpg"

        },
        {
            name:"AKASH DAS",
            description:"Role: Senior PhotographerWith years of expertise in professional photography, AKASH DAS has mastered the art of turning ordinary scenes into extraordinary stories. Their strength lies in capturing candid moments that reflect pure emotions—be it laughter, tears, or the magic in between. Having worked across weddings, portraits, and cultural ceremonies, they bring a versatile skill set to the team. Known for their patience and friendly nature, they have an innate ability to make clients feel at ease, resulting in natural, authentic images. Their portfolio reflects a balance of traditional elegance and contemporary style, making them a client favorite for timeless photographs. They believe that photography is not just about clicking pictures but about preserving feelings, culture, and connections. Each assignment they take on becomes a heartfelt project where passion meets perfection. Their contribution adds immense value to our creative family.",
            image:"../assets/team/team3.jpg"

        },
        {
            name:"SUBHANKAR BOSE",
            description:"Role: Senior Photographer A storyteller at heart, SUBHANKAR BOSE uses their camera to craft narratives that speak beyond words. With a refined sense of aesthetics and technical expertise, they excel in capturing both intimate details and grand moments with equal finesse. Their style blends artistry with spontaneity, resulting in photographs that feel alive and authentic. Over the years, they have developed a strong understanding of different cultural rituals and ceremonies, allowing them to document events with respect and precision. Clients often appreciate their warmth, professionalism, and ability to anticipate moments even before they happen. Their passion lies in freezing raw emotions into frames that evoke the same feelings even decades later. They continue to inspire the team with fresh ideas, creative angles, and dedication to perfection. For them, every project is an opportunity to create art that lives forever.",
            image:"../assets/team/team2.jpg"

        },

    ]
  return (
    <>
      <Navbar />
      <div className="team-container">
        {team.map((item)=>{
            return(
                <div className="team">
                    <img src={item.image} alt="team" className="team-img"/>
                    <div className="team-content">
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                    </div>
                </div>
            )
        })}
      
      </div>
      <Footer />
<WhatsAppButton/>
    </>
  )
}

export default team
