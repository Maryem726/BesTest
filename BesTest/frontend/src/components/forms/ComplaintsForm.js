import React,{ useState, useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg"
import * as api from '../../api/Api';
import {useParams, useHistory, Link} from 'react-router-dom'

import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

export default () => {
    const [topic, setTopic] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState("User Not Connected");

    const history = useHistory()

    const navLinks = [
        <NavLinks>
          <NavLink href="/">
            Home
          </NavLink>
          <NavLink href="components/landingPages/RestaurantLandingPage">
            Ressources
          </NavLink>
          <NavLink href="/components/innerPages/SubscriptionPage">
            Payment
          </NavLink>
          <NavLink href="/components/innerPages/ListOfTeachers">
            Teachers
          </NavLink>
          <NavLink href="/components/innerPages/listkids">
            Kids
          </NavLink>
          
        </NavLinks>,
        <NavLinks>
          <PrimaryLink href="/">
            Log Out
          </PrimaryLink>
        </NavLinks>
      ];
    const handleSubmite = () => {
        const credentials = { topic, description, image, email, userId };
        api.createComplaint(credentials)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    //   setColor("red");
                    //   setShow("yes");
                }
                else {
                    //   setColor("green");
                    //   setShow("yes");  
                    alert("Complaint Submitted Successfully");
                    history.push('/ParentLandingPage');
                }
            })
            .catch(err => {
                alert("Error in submitting complaint");
                console.log(err)
            })
    }

    useEffect(() => {
        setUserId(JSON.parse(localStorage.getItem("user")));
        console.log(userId._id);
      }, [])


    return (
        <Container>
                        <StyledHeader links={navLinks} />

            <Content>

                <FormContainer>
                    <div tw="mx-auto max-w-4xl">
                        <h2>Submit A Complaint</h2>
                        <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                We're sorry you've had a less than
                perfect experience
                Please tell us more so we can resolve the
                issue and improve
              </p>
                        <form action="#">
                            <TwoColumn>
                                <Column>
                                    <InputContainer>
                                        <Label htmlFor="name-input">Your Email Address</Label>
                                        <Input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                                    </InputContainer>
                                    <InputContainer>
                                        <Label htmlFor="email-input">Topic</Label>
                                        <Input type="text" name="Topic"  onChange={(e) => setTopic(e.target.value)}/>
                                    </InputContainer>
                                </Column>
                                <Column>
                                    <InputContainer tw="flex-1">
                                        <Label htmlFor="name-input">Your Message</Label>
                                        <TextArea id="message-input" name="message" onChange={(e) => setDescription(e.target.value)} />
                                    </InputContainer>
                                </Column>
                            </TwoColumn>
                            <SubmitButton type="reset" value="Submit" onClick={handleSubmite}>Submit</SubmitButton>
                        </form>
                        
                    </div>
                    <SvgDotPattern1 />
                </FormContainer>
            </Content>
        </Container>
    );
};