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
import Hero from "components/hero/TwoColumnWithPrimaryBackground";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;

const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-1/3 sm:rounded-t-none sm:rounded-l-lg`}
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
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const [visible, setVisible] = useState(7);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };


  return (
    <AnimationRevealPage>

     <Hero
        heading={<> <HighlightedText>Arabic Exercices</HighlightedText></>}
        
        description=""
        imageSrc="https://onlinearabiccourses.net/wp-content/uploads/2021/03/33333-1.png"
        
        />
      
      <Container tw="bg-gradient-to-b from-primary-900  to-white -mx-8 -mt-8 pt-8 px-8">
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
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

const getPlaceholderPost = () => ({
  imageSrc:
  "data:image/jpeg;base64,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",
  category: "exercice",
  date: "April 19, 2020",
  title: "exercice",
  url: ""
});
