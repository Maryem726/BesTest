import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import Axios from"axios";


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2 bg-gradient-to-r from-indigo-500 to-indigo-500 hover:from-indigo-300 hover:to-indigo-500`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton =tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-10 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw.button`px-8 py-3 font-bold rounded bg-gradient-to-r from-indigo-600 to-indigo-300 hover:from-indigo-200 hover:to-indigo-500 text-gray-100 hocus:bg-orange-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 sm:rounded-br-6xl py-3 sm:py-4`;

export default ()=> {
    
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await  Axios.get("/lesson/filtrbyname/french")
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };
  
 
  const cards = [
      {
        imageSrc:
        "https://cdn2.vectorstock.com/i/1000x1000/85/21/cartoon-little-boy-studying-vector-24838521.jpg",
        title: " Expressions écrite",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",
     
        url: `#`,
      },
      {
        imageSrc:
        "https://us.123rf.com/450wm/ntlstudio/ntlstudio2006/ntlstudio200600180/149014129-french-learning-flat-concept-vector-illustration-foreign-language-course-school-subject-linguistics-.jpg?ver=6",
        title: " Cours 1",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",
        url: "#"
      },
      {
        imageSrc:
        "https://thumbs.dreamstime.com/b/happy-kid-study-homework-vector-illustration-happy-kid-study-homework-vector-illustration-back-school-book-cartography-cartoon-157366484.jpg",
        title: "Cours 2",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",        
        url: "#"
      },
      {
        imageSrc:
        "https://i.pinimg.com/564x/14/18/b0/1418b03ce802ea3d47de5d88367f8038.jpg",
        title: "Cours 3",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",       
        url: "#"
      },
      {
        imageSrc:
        "https://play-lh.googleusercontent.com/g21CtlUpXEWNijsbrNox8iI-AUbCPyjWXUXSrFmAySYKxYKnRrUUD0O2faCD6zcEBNU7=w412-h220-rw",
        title: "Cours 4",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",       
        url: "#"
      },
   
    ]
    
  

  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  
  return (<div> {loading && <div>Loading</div>}
  {!loading && (
    <Container >
    <Content>
      <HeadingWithControl>
        <Heading></Heading>
        <Controls>
          <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
          <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
        </Controls>
      </HeadingWithControl>
      <CardSlider ref={setSliderRef} {...sliderSettings}>
      {data.slice(0).map((card, index) => (
          <Card key={index} featured={card.subject}>
            <CardImage imageSrc=        
            "https://cdn2.vectorstock.com/i/1000x1000/85/21/cartoon-little-boy-studying-vector-24838521.jpg"
 />
            <TextInfo>
              <TitleReviewContainer>
                <Title>{card.title}</Title>
             
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                 
                </IconWithText>
                <IconWithText>
                 
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>{card.description}</Description>
            </TextInfo>
            <PrimaryButton>Commencer</PrimaryButton>
            </Card>
          
          ))}
        </CardSlider>
      </Content>
      </Container>
      )}</div>);};