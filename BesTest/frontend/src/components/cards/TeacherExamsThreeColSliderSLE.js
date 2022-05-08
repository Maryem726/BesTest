import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import Axios from"axios";
import { DeleteExam} from "Actions/Exercice";
import { useDispatch, useSelector } from "react-redux";

const Container = tw.div`relative bg-gradient-to-b from-white via-yellow-400 to-white`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
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
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default ({PrimaryButton1Text = "Delete",
PrimaryButton1Url = "/components/innerPages/LessonExercicePage",}) => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
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
        const {data: response} = await  Axios.get(`/examen/getbyname/bySciences/${user._id}`)
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  /* Change this according to your needs */
  const cards = [
    {
      imageSrc: "https://static.vecteezy.com/system/resources/previews/002/779/585/non_2x/online-learning-concept-online-class-teacher-at-chalkboard-video-lesson-distance-study-at-school-illustration-flat-style-vector.jpg",
      title: "Exam 1",
      description: "Here is the description of Exam 1",
    },
    {
      imageSrc: "https://static.vecteezy.com/system/resources/previews/002/779/585/non_2x/online-learning-concept-online-class-teacher-at-chalkboard-video-lesson-distance-study-at-school-illustration-flat-style-vector.jpg",
      title: "Exam 2",
      description: "Here is the description of Exam 2",
    },
    {
      imageSrc: "https://static.vecteezy.com/system/resources/previews/002/779/585/non_2x/online-learning-concept-online-class-teacher-at-chalkboard-video-lesson-distance-study-at-school-illustration-flat-style-vector.jpg",
      title: "Exam 3",
      description: "Here is the description of Exam 3",
    }
  ]

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Exams List</Heading>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
        {data.slice(0).map((card, index) => (
          <Card key={index} featured={card.subject}>
              <CardImage imageSrc="https://static.vecteezy.com/system/resources/previews/002/779/585/non_2x/online-learning-concept-online-class-teacher-at-chalkboard-video-lesson-distance-study-at-school-illustration-flat-style-vector.jpg" />
              <TextInfo>
                  <Title>{card.title}</Title>
                <Description>{card.description}</Description>
              </TextInfo>
              <PrimaryButton>Check Now</PrimaryButton>
              <button as="a"
               onClick={() => {
                dispatch(DeleteExam(card._id));
              }}
              >
              {PrimaryButton1Text}
            </button>   
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};