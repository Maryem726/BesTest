import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/logoBestest.png";
import logo from "images/logoBestest.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { components } from "ComponentRenderer";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const Container = tw(ContainerBase)`min-h-screen bg-gradient-to-b from-yellow-400 to-yellow-100 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;


const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-indigo-600 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-white text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
  
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Wish to add  a new exam ?",
  submitButtonText = "Add exam",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  ParentsigninUrl = components.innerPages.AddLessonPage,

}) => (
  <AnimationRevealPage>
    <Container >
      <Content>
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
                <p tw="mt-6 text-xs text-gray-600 text-center">Fill up the following form to add a new exam ! </p><br/>
              <Form>
              <Input type="text" placeholder="Title" />
              <Input type="text" placeholder="Description" />
                
                <Combobox  tw="w-full rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0">
                <ComboboxInput tw="w-full px-8 py-4 rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0" 
                placeholder="Level"
                />
      <ComboboxPopover>
        <ComboboxList>
          <ComboboxOption value="3 Class">
           <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="4 Class">
           <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="5 Class">
          <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="6 Class">
        <ComboboxOptionText />
          </ComboboxOption>
          
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>  


                <Combobox tw="w-full rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0">
                <ComboboxInput tw="w-full px-8 py-4 rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0" 
                placeholder="Subject"
                />
      <ComboboxPopover>
        <ComboboxList>
          <ComboboxOption value="Mathematique">
          📙 <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="Arabic">
          📘 <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="French">
          📗<ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="English">
          📒<ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="Social science">
          📔<ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="Sciences of life and earth">
          📙<ComboboxOptionText />
          </ComboboxOption>
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>     
    
    <Input type="number" placeholder="Price" />
    <Input type="file" placeholder="Type" />

                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              </Form>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                <a href={ParentsigninUrl.url} tw="border-b border-gray-500 border-dotted">
                </a>
              </p>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc="https://content.presentermedia.com/content/animsp/00022000/22511/scribbles_teaching_student_300_wht.gif"/>
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
);