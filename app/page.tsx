import { Landing } from "@/components/Landing";
import { MeetTheTeam } from "@/components/MeetTheTeam";
import { CrewGallery } from "@/components/CrewGallery";
import { Feedback } from "@/components/Feedback";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Landing />
      <MeetTheTeam />
      <CrewGallery />
      <Feedback />
      <Footer />
    </>
  );
}
