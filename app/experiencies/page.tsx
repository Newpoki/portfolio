import { SlideUp } from "../components/slide-up";
import { Typography } from "../components/typography";
import { ExperienceTimelineCard } from "./experience-timeline-card";

export default async function Experiencies() {
  return (
    <div>
      <div className="mb-8">
        <SlideUp>
          <Typography variant="h1">Experiencies</Typography>
        </SlideUp>
      </div>

      <section className="flex flex-col ">
        <ExperienceTimelineCard title="✪ Mention ✪">
          En **CDI** chez [Mention](https://mention.com/en/) en tant que
          Développeur Front End.\n\nJe fais parti de la squad **Publish**, la
          feature de **social media management**, qui permet aux utilisateurs
          une gestion amélioré de leur réseau sociaux. Pour continuer de faire
          grandir Mention, j'ai pour tache de:\n\n- Intégration de vue complexe
          à partir de design Figma\n- Conversion de code legacy vers du code
          plus actuel\n- Proposition de nouvelles fonctionalités /
          comportements\n- Rédaction de documentation\n- Meeting front où on
          partage nos meilleurs pratiques\n- Un peu de mentoring avec les plus
          juniors\n\n\n**Librairies utilisées :** React, Redux, Relay, Moment,
          Jest, Material ui, Styled-components, Flow, Typescript, etc...
        </ExperienceTimelineCard>

        <ExperienceTimelineCard title="✪ Mention ✪">
          In an open-ended contract at Mediakeys as Front-End web developer.
          I&apos;m working on few projects, the two mains being a platform
          allowing companies / media trader to handle their advertising
          campaigns around the worl on various media as Facebook, Instagram,
          website, native applications, Youtube, etc, and an app to create AD
          usable for these AD campaigns. In order to create new applications and
          continue the existings, I have to: Create wireframes mockups Create
          components and ducks Writing a lot of unit tests Advise new
          functionality nor evolution Write documentation Take part to SCRUM
          ceremonies Used libraries : React, Redux, Redux Sagas, Moment, Moment
          JS, Material-UI, Jest, etc ...
        </ExperienceTimelineCard>
      </section>
    </div>
  );
}
