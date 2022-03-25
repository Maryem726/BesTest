import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { components } from "ComponentRenderer.js";


import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";

export default ({
  ListExams = components.innerPages.ListExams

}) => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <Hero
        heading={<> <HighlightedText>Ressources</HighlightedText></>}
        description="welcome to our main ressources page in which you will find the list of lessons, exercices and exams available categorized by level and the teacher who uploaded them"
        //imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        //imageCss={imageCss}
        //imageDecoratorBlob={true}
        
      />
      
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>Lessons</HighlightedText>
          </>
        }
      />
      
      
     <MainFeature
        subheading={<Subheading>Hello</Subheading>}
        heading={
          <>
            We'll be presenting to you
            <wbr /> <HighlightedText>our exercices</HighlightedText>
          </>
        }
        
        description={
          <Description>
           Time goes by fast when you're avoiding Homework...
            <br />
            <br />
            
          </Description>
        }
        
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="show"
        imageSrc={
          "https://img.myloview.fr/images/cartoon-little-boy-studying-on-the-table-400-187835570.jpg"
        }
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />


      <MainFeature2
        subheading={<Subheading>Hello</Subheading>}
        heading={<>We'll be presenting to you <HighlightedText>our exames</HighlightedText></>}
        description={
          <Description>
           Don't Stress...Do your Best!
            <br />
            <br />
            
          </Description>
        }
        statistics={[
          {
            key: "exames",
            value: "100+",
          },
          {
            key: "corrections",
            value: "100+"
          },
          {
            key: "teachers",
            value: "many"
          }
        ]}
        primaryButtonText="show"
        primaryButtonUrl= {ListExams.url}
        imageInsideDiv={false}
        imageSrc="https://cdn1.vectorstock.com/i/thumb-large/13/80/happy-cute-little-student-boy-raising-his-hand-vector-38521380.jpg"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />


      <Testimonial
        subheading=""
        heading={<>Teachers <HighlightedText>About Us</HighlightedText></>}
      />
      
      <Footer />
    </AnimationRevealPage>
  );
}
