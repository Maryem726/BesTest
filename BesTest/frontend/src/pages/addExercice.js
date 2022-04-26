import React, { useState, useEffect, Fragment } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";

import { css } from "styled-components/macro"; //eslint-disable-line
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
import Axios from "axios";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { AddExercices, GetAllLessons } from "Actions/Exercice";
import Spinner from "components/Layout/Spinner";

const Container = tw(
  ContainerBase
)`min-h-screen bg-gradient-to-b from-green-500 to-green-100 text-white font-medium flex justify-center -m-8`;
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
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-orange-300 text-gray-100 w-full py-4 rounded-lg hover:bg-green-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1  text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

function AddExercice({
  logoLinkUrl = "/",

  headingText = "Wish to add a new exercise ?",
  submitButtonText = "submit",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  ParentsigninUrl = components.innerPages.ParentLoginPage,
  AddExercices,
  Exercice: { exercices, lessons, loading },
  GetAllLessons,
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [lesson, setLesson] = useState("");
  let myid;
  const [images, setimages] = useState("");
  const [user, setUser] = useState(null);
  const onChangeFile = (e) => {
    setimages(e.target.files[0]);
  };
  useEffect(() => {
    setUser(localStorage.getItem("user"));
    GetAllLessons();
  }, []);

  const Add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lesson", lesson);

    formData.append("title", title);
    formData.append("type", images);
    formData.append("price", price);
    formData.append("description", description);

    AddExercices({ formData, user });
  };
  return loading || lessons === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <AnimationRevealPage>
        <Container>
          <Content>
            <MainContainer>
              <LogoLink href={logoLinkUrl}>
                <LogoImage src={logo} />
              </LogoLink>
              <MainContent>
                <Heading>{headingText}</Heading>
                <FormContainer>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    Fill up the following form to submit your request for a new
                    exercise !
                  </p>
                  <br />
                  <Form onSubmit={Add} enctype="multipart/form-data">
                    <Input
                      type="text"
                      placeholder="Title"
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />

                    <Input
                      type="text"
                      placeholder="Description"
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />

                    <div className="u-s-m-b-30">
                      <select
                        tw="text-gray-500 w-full px-8 py-4 rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                        className="select-box select-box--primary-style u-w-100"
                        name="lesson"
                        onChange={(event) => {
                          setLesson(event.target.value);
                        }}
                      >
                        <option value="">📘 Choose lesson</option>
                        {lessons.map((x, i) => (
                          <option value={x._id}>📙{x.title}</option>
                        ))}

                        {/* <option value="Arabic">📘 Arabic</option>
                   <option value="French">📗 French</option>
                   <option value="English">📒 English</option>
                   <option value="Social science">📔 Social science</option>
                   <option value="Sciences of life and earth">📙 Sciences of life and earth</option> */}
                      </select>
                    </div>

                    <Input
                      type="number"
                      placeholder="price"
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    />

                    <Input
                      type="file"
                      placeholder="file"
                      onChange={(e) => onChangeFile(e)}
                      name="type"
                    />

                    <SubmitButton type="submit">
                      <SubmitButtonIcon className="icon" />
                      <span className="text">{submitButtonText}</span>
                    </SubmitButton>
                  </Form>
                </FormContainer>
              </MainContent>
            </MainContainer>

            <IllustrationContainer>
              <IllustrationImage imageSrc="https://content.presentermedia.com/content/clipart/00019000/19982/scribbles_the_pencil_mark_300_nwm.jpg" />
            </IllustrationContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
    </Fragment>
  );
}

AddExercice.propTypes = {
  GetAllLessons: PropTypes.func.isRequired,
  Exercice: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  Exercice: state.Exercice,
});

export default connect(mapStateToProps, { AddExercices, GetAllLessons })(
  AddExercice
);
