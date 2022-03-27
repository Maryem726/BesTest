import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Card = styled.div(props => [
  tw`mt-24 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-3xl font-bold text-gray-900`;
const Description = tw.p`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default () => {
  const cards = [
    {
      imageSrc:
        "https://img1.freepng.fr/20171221/udq/colourful-triangles-number-three-png-clipart-image-5a3b9bd1a88d13.7314280215138559536904.jpg",
      title: "3rd Level",
      description:
        "Here you can check all the sciences of life and earth ressources available for the 3rd level.",
      url: "/components/innerPages/SciencesOfLifeAndEarthLandingPage"
    },

    {
      imageSrc:
        "https://img1.freepng.fr/20171221/lee/colourful-triangles-number-four-png-clipart-image-5a3b9bcceb9303.6245483615138559489649.jpg",
      title: "4th level",
      description:
        "Here you can check all the sciences of life and earth ressources available for the 4th level.",
      url: "/components/innerPages/SciencesOfLifeAndEarthLandingPage"
    },

    {
      imageSrc:
        "https://spng.subpng.com/20180328/hcq/kisspng-number-triangle-0-clip-art-5-5abb3b996bf4b6.0418219615222199294422.jpg",
      title: "5th Level",
      description:
        "Here you can check all the sciences of life and earth ressources available for the 5th level.",
      url: "/components/innerPages/SciencesOfLifeAndEarthLandingPage"
    },

    {
      imageSrc:
        "https://colegiosanagustinlp.files.wordpress.com/2021/06/6-1.png",
      title: "6th Level",
      description:
        "Here you can check all the sciences of life and earth ressources available for the 6th level.",
      url: "/components/innerPages/SciencesOfLifeAndEarthLandingPage"
    }
  ];

  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>Our sciences of life and earth Levels</HeadingTitle>
          <HeadingDescription>
            Please find below the list of levels that are active in our platform, choose the levels to check it's corresponding sciences of life and earth ressources.
          </HeadingDescription>
        </HeadingInfoContainer>

        <Content>
          {cards.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={card.imageSrc} />
              <Details>
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
                <Link href={card.url}>See  Ressources</Link>
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
      <SvgDotPattern1 />
      <SvgDotPattern2 />
      <SvgDotPattern3 />
      <SvgDotPattern4 />
    </Container>
  );
};
