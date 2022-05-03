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
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2 bg-gradient-to-r from-orange-600 to-indigo-100 hover:from-orange-200 hover:to-orange-600`}
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
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-6xl`
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

const PrimaryButton = tw.button`px-8 py-3 font-bold rounded bg-gradient-to-r from-orange-700 to-orange-300 hover:from-orange-600 hover:to-orange-300 text-gray-100 hocus:bg-orange-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 sm:rounded-br-6xl py-3 sm:py-4`;

export default ()=> {
  
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {

    var user = JSON.parse(localStorage.getItem('user'));

    console.log(user._id);

    // setUser(user.id);
    setUser(JSON.parse(localStorage.getItem("user")));
    // console.log(localStorage.getItem("user"))

    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await  Axios.get(`/lesson/filtrbyname/english/${user._id}`)
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
        "https://static.vecteezy.com/system/resources/previews/002/861/184/large_2x/cartoon-character-sticker-with-a-girl-writing-on-blank-paper-free-vector.jpg",
        title: " Writing",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",
     
        url: `#`,
      },
      {
        imageSrc:
        "https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-illustration-of-a-little-boy-learning-english-image_2286772.jpg",
        title: " Listening 1",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",
        url: "#"
      },
      {
        imageSrc:
        "https://previews.123rf.com/images/habun/habun2005/habun200500001/146044512-children-studying-english-online.jpg",
        title: "Listening 2",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",        
        url: "#"
      },
      {
        imageSrc:
        "https://i.pinimg.com/564x/14/18/b0/1418b03ce802ea3d47de5d88367f8038.jpg",
        title: "Comprehension ",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",       
        url: "#"
      },
      {
        imageSrc:
        "https://image.shutterstock.com/image-vector/online-language-courses-flat-vector-260nw-1663507810.jpg",
        title: "Language ",
        description:"   orem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod ",       
        url: "#"
      },
   
    ]
    
  

  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  
  return (
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
          "https://i.pinimg.com/564x/14/18/b0/1418b03ce802ea3d47de5d88367f8038.jpg"
/>
            <TextInfo>
              <TitleReviewContainer>
                <Title tw="text-orange-900">{card.title}</Title>
             
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
);
};
