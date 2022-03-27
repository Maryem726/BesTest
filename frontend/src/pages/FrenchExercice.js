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
import Hero from "components/hero/TwoColumnWithPrimaryBackgroundFrench";

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
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-indigo-600 transition duration-300`;
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
  const HighlightedText = tw.span`bg-indigo-600 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const [visible, setVisible] = useState(8);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };


  return (
    <AnimationRevealPage>
    <Container tw="bg-gradient-to-b from-indigo-600 via-indigo-100 to-white relative">
      <Header  />

      <Hero
        heading={<> <HighlightedText>Exercices de Français</HighlightedText></>}
        
        description="Exercices variés pour évaluation et amélioration des compétences"
        imageSrc="https://images.squarespace-cdn.com/content/v1/5f4677c11310ba489fc553b5/1610648226741-XGEGGBYP95U00JHZLA1C/French+Boy.png?fbclid=IwAR01wsXsR1sxUMCE-nly20DYql2zbituHCr7UK3PispwxDAuQOq_EmhSdMM"
        
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
  imageSrc:
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5dxxxHlwDYIDzt5XCyNCduqHIod8ll1ungQ&usqp=CAU",
  category: "",
  date: "April 19, 2020",
  title: "exercice",
  url: ""
});
