import React, { useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { components } from "ComponentRenderer.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, Content2Xl, ContentWithVerticalPadding } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { LogoLink } from "components/headers/light.js";
import { SectionHeading as HeadingBase } from "components/misc/Headings";
import { SectionDescription as DescriptionBase } from "components/misc/Typography";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import { ReactComponent as CheckboxIcon } from "feather-icons/dist/icons/check-circle.svg";
import { ReactComponent as RadioIcon } from "feather-icons/dist/icons/radio.svg";
import { ReactComponent as HandleIcon } from "images/handle-icon.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";

import heroScreenshotImageSrc from "images/banner-img.png";
import logo from "images/logoBestest.png";
import useInView from "@owaiswiz/use-in-view";

/* Hero */
const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;
const PrimaryNavLink = tw(
  NavLink
)`text-gray-100 bg-gradient-to-r from-primary-100 to-primary-500 hover:from-pink-300 hover:to-pink-500 px-6 py-3 border-none rounded hocus:bg-primary-900 focus:shadow-outline mt-6 md:mt-4 lg:mt-0`;
const HeroRow = tw(Row)`flex-col lg:flex-row justify-between items-center pt-8 lg:pt-12 pb-16 max-w-screen-2xl mx-auto flex-wrap`;

const Column = tw.div`flex-1`;

const UpdateNotice = tw(Column)`w-full flex-auto mb-4 sm:mb-8 rounded px-4 py-3 sm:px-5 sm:py-4 bg-orange-100 text-orange-800 flex items-center sm:items-start md:items-center justify-center lg:justify-start border border-orange-200 text-xs sm:text-sm text-center sm:text-left md:leading-none`;
const UpdateNoticeIcon = tw(RadioIcon)`w-0 sm:w-5 sm:mr-3`;

const TextColumn = tw(Column)`mx-auto lg:mr-0 max-w-2xl lg:max-w-xl xl:max-w-2xl flex-shrink-0`;
const Heading = tw(HeadingBase)`text-center lg:text-left text-primary-900 leading-snug`;
const Description = tw(
  DescriptionBase
)`mt-4 text-center lg:text-left lg:text-base text-gray-700 max-w-lg mx-auto lg:mx-0`;
const Actions = tw.div`flex flex-col sm:flex-row justify-center lg:justify-start`;
const ActionButton = tw(
  AnchorLink
)`px-8 py-3 font-bold rounded bg-gradient-to-r from-primary-100 to-primary-500 hover:from-pink-300 hover:to-pink-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-12 inline-block tracking-wide text-center px-10 py-4 font-semibold tracking-normal`;
const PrimaryButton = tw(ActionButton)`mt-6 sm:mt-12 sm:ml-8`;
const FeatureList = tw.ul`mt-6 leading-loose flex flex-wrap max-w-xl mx-auto lg:mx-0`;
const Feature = tw.li`mt-2 flex items-center flex-shrink-0 w-full sm:w-1/2 justify-center lg:justify-start`;
const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-primary-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
const ImageColumn = tw(Column)`mx-auto lg:mr-0 relative mt-16 lg:mt-0 lg:ml-8`;
const ImageContainer = tw.div``;
const Image = tw.img`max-w-full rounded-t sm:rounded`;

const SectionContainer = tw(ContentWithVerticalPadding)``;
const SectionHeading = tw(HeadingBase)`text-primary-900`;
const SectionDescription = tw(DescriptionBase)`text-center mx-auto text-gray-600 max-w-4xl`;

const PreviewCards = tw.div`flex flex-wrap -mr-12`;
const PreviewCardContainer = tw.div`mt-24 mx-auto md:mx-0 max-w-lg w-full md:w-1/2 lg:w-1/3 pr-12`;
const PreviewCard = tw(motion.a)`block rounded-lg shadow-raised`;
const PreviewCardImageContainer = tw.div`rounded-t-lg border-0 border-b-0`;
const PreviewCardImage = styled(motion.div)`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-128 md:h-144 bg-cover bg-left-top`}
`;
const PreviewButton = tw(PrimaryButtonBase)`w-full rounded-b-lg rounded-t-none py-5 font-semibold`;

const ComponentsContainer = tw.div`mt-24`;
const Components = tw.div``;
const Component = tw.div`mt-12 border rounded-lg bg-white`;
const ComponentContent = tw.div`flex justify-between overflow-hidden rounded-b-lg bg-gray-600 relative`;
const ResizeHandleButton = tw.button`cursor-col-resize focus:outline-none w-4 border-l bg-gray-100 absolute right-0 inset-y-0`;

export default ({
  features = null,
  primaryButtonUrl = "#landingPageDemos",
  teacherButtonText = "Teacher",
  parentButtonText = "Parent",
  kidButtonText = "Kid",
  buttonRoundedCss = "",
  landingPages = components.landingPages,
  blocks = components.blocks,
  heading = "Whatever the problems, Be part of BesTest",
  description = "Our new innovative approach for a better online education including teachers, kids and also parents.",
  role ="Let us know who you are !"
}) => {
  /*
   * Using gtag like this because we only want to use Google Analytics when Main Landing Page is rendered
   * Remove this part and the the gtag script inside public/index.html if you dont need google analytics
   */
  window.gtag("js", new Date());
  window.gtag("config", "UA-45799926-9");

  const previewImageAnimationVariants = {
    rest: {
      backgroundPositionY: "0%"
    },
    hover: {
      backgroundPositionY: "100%",
      transition: { type: "tween", ease: "linear", duration: 5 }
    }
  };

  const noOfComponentBlocks = Object.values(blocks).reduce((acc, block) => acc + Object.keys(block.elements).length, 0);

  features = features || [
    `High quality lessons`,
    `Quizzes`,
    `Exercices`,
    "Exams",
    "Parent-teacher direct communication",
    "Catch-up sessions"
  ];

  return (
    <AnimationRevealPage enabled>
      <Container tw="bg-gradient-to-b from-indigo-100 via-pink-500 to-purple-500 -mx-8 -mt-8 pt-8 px-8">
        <Content2Xl>
          <NavRow>
            <LogoLink href="/">
              <img src={logo} alt="" />
              BesTest
            </LogoLink>
            <div tw="flex flex-wrap justify-center lg:justify-end items-center -mr-12">
              <NavLink target="_blank" href="https://owaiskhan.me/post/free-tailwindcss-react-ui-kit">
                About our project
              </NavLink>
              <NavLink target="_blank" href="https://owaiskhan.me">
                About the team
              </NavLink>
              <div tw="md:hidden flex-100 h-0"></div>
              <PrimaryNavLink target="_blank" href="https://gum.co/QaruQ">
                Admin Login
              </PrimaryNavLink>
            </div>
          </NavRow>
          <HeroRow>
            <TextColumn>
              <Heading as="h1">{heading}</Heading>
              <Description>{description}</Description>
              <FeatureList>
                {features.map((feature, index) => (
                  <Feature key={index}>
                    <FeatureIcon />
                    <FeatureText>{feature}</FeatureText>
                  </Feature>
                ))}
              </FeatureList>
              <br/>
              <Description>{role}</Description>
              <Actions>
                <PrimaryButton href={primaryButtonUrl} css={buttonRoundedCss}>
                  {teacherButtonText}
                </PrimaryButton>
                <PrimaryButton href={primaryButtonUrl} css={buttonRoundedCss}>
                  {parentButtonText}
                </PrimaryButton>
                <PrimaryButton href={primaryButtonUrl} css={buttonRoundedCss}>
                  {kidButtonText}
                </PrimaryButton>
              </Actions>
            </TextColumn>
            <ImageColumn>
              <ImageContainer>
                <Image src={heroScreenshotImageSrc} />
              </ImageContainer>
            </ImageColumn>
          </HeroRow>
          <SectionContainer id="landingPageDemos">
            <SectionHeading>A sneak peek</SectionHeading>
            <SectionDescription>
              Take a look at some of our main features mentionned above and see for yourself how it will be presented, each one in its designated section !
            </SectionDescription>



            <PreviewCards>
              {Object.entries(landingPages).map(([pageName, page], index) => (
                <PreviewCardContainer key={index}>
                  <PreviewCard initial="rest" animate="rest" whileHover="hover" href={page.url} target="_blank">
                    <PreviewCardImageContainer>
                      <PreviewCardImage
                        transition={{ type: "tween" }}
                        variants={previewImageAnimationVariants}
                        imageSrc={page.imageSrc}
                      />
                    </PreviewCardImageContainer>
                    <PreviewButton>Our Ressources</PreviewButton>
                  </PreviewCard>



                </PreviewCardContainer>
              ))}
            </PreviewCards>
          </SectionContainer>
          <SectionContainer>
            <SectionHeading>About our project</SectionHeading>
            <SectionDescription tw="text-white">
            Welcome to BesTest web application dedicated for kids in El Fekir school currently enrolling between the 3rd and 6th primary grade in which they will be able to consult the list of lessons, exams and exercises provided by their teachers and also get involved in activities that pushes them to invest more in the application by providing them with fun side activities and getting rewarded with score points along the way depending on their state of completion of activities that will allow them to unlock more themes and more exciting activities. 
            The teacher will also have the opportunity to organize online catch-up sessions by hosting real time video calls with their students.
            The parent will also have the ability to organize private catch-up sessions for his kids in our site.
            </SectionDescription>
          </SectionContainer>

          <SectionContainer>
            <SectionHeading>Cool As Code</SectionHeading>
            <SectionDescription tw="text-white">
              We also provide {noOfComponentBlocks} components along with the premade landing pages so you can create
              your own landing page within minutes as you see fit. You can combine these components to create 1000s of
              unique attractive web pages.
            </SectionDescription>
            <BlocksRenderer blocks={Object.values(blocks)} />
          </SectionContainer>
        </Content2Xl>
      </Container>
    </AnimationRevealPage>
  );
};

const BlocksRenderer = ({ blocks }) => {
  const [lastVisibleBlockIndex, setLastVisibleBlockIndex] = useState(0);

  const updateLastVisibleBlockIndex = index => {
    console.log("LAST WAS ", lastVisibleBlockIndex);
    if (index > lastVisibleBlockIndex) setLastVisibleBlockIndex(index);
  };

  return (
    <ComponentsContainer>
      {blocks.map(
        (block, index) =>
          lastVisibleBlockIndex + 1 >= index && (
            <Block key={index} components={block} notifyIsVisible={() => updateLastVisibleBlockIndex(index)} />
          )
      )}
    </ComponentsContainer>
  );
};

const Block = ({ notifyIsVisible, components }) => {
  const offset = 30;
  const [ref, inView] = useInView(offset);

  useEffect(() => {
    if (inView) notifyIsVisible();
  }, [inView, notifyIsVisible]);

  const ResizeHandle = (
    <ResizeHandleButton>
      <HandleIcon tw="w-4 h-4 text-gray-600" />
    </ResizeHandleButton>
  );

  const componentBlockRefs = {};

  const updateComponentBlockIframeHeight = iframe => {
    iframe.style.height = "auto";
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
  };

  return (
    <div ref={ref} tw="mt-32">
      <Components>
        {Object.values(components.elements).map((component, componentIndex) => (
          <Component>
            <ComponentContent>

                <iframe
                  src={component.url}
                  title="Hero"
                  width="100%"
                  ref={ref => (componentBlockRefs[component.url] = ref)}
                  onLoad={e => updateComponentBlockIframeHeight(e.target)}
                />
            </ComponentContent>
          </Component>
        ))}
      </Components>
    </div>
  );
};
