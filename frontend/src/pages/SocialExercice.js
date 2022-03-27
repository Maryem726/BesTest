import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import Hero from "components/hero/TwoColumnWithPrimaryBackgroundSocial";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`bg-gradient-to-b from-gray-400  to-gray-600`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;

const PostContainer = styled.div`
${tw`mt-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`}
${props =>
  props.featured &&
  css`
    ${tw`w-full!`}
    ${Post} {
      ${tw`rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 `}
    }
    ${Image} {
      ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
    }
    ${Info} {
      ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
    }
    ${Description} {
      ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
    }
  `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 bg-opacity-0 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;

const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

export default ({
  
  headingText = "",
  posts = [
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
    getPlaceholderPost(),
  ]
}) => {
  const HighlightedText = tw.span`bg-gradient-to-b from-pink-200  to-pink-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const [visible, setVisible] = useState(8);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };


  return (
    <AnimationRevealPage>

    
      
      <Container tw="bg-gradient-to-b from-white  via-pink-200 to-white relative -mx-8 -mt-8 pt-8 px-8">
      <Header  />

      <Hero
        heading={<> <HighlightedText>تمارين المواد الاجتماعية</HighlightedText></>}
        
        description="تمارين متنوعة تغطي كامل البرنامج الدراسي لدعم المكتسبات"
        imageSrc="https://math-center.org/_nuxt/img/coloring.4e9b469.svg?fbclid=IwAR3LfkOh0PSzW878TU2lDTVLEvK-sfxrlP1_-nzNykwazSbr4RegkvJUFNU"
        
        />
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Posts>
            {posts.slice(0, visible).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <Post className="group" as="a" href={post.url}>
                  <Image imageSrc={post.imageSrc} />
                  <Info>
                    <Category>{post.category}</Category>
                    <CreationDate>{post.date}</CreationDate>
                    <Title>{post.title}</Title>
                    {post.featured && post.description && <Description>{post.description}</Description>}
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </Posts>
          {visible < posts.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Next</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
        <Footer />
      </Container>
      
    </AnimationRevealPage>
  );
};

const getPlaceholderPost = () => ({
  imageSrc:"data:image/png;base64,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",
   category: "exercice",
  date: "April 19, 2020",
  title: "exercice",
  url: ""
});
