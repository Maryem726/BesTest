import React ,{useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/parentLogin.gif";
import logo from "images/logoBestest.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { components } from "ComponentRenderer";
import { connect } from 'react-redux';
import { SetAlert } from '../Actions/Alert';
import { register } from '../Actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";


const Container = tw(ContainerBase)`min-h-screen bg-gradient-to-t from-yellow-100 to-yellow-500 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-purple-100`;
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
  ${tw`mt-5 tracking-wide font-semibold bg-yellow-500 text-gray-100 w-full py-4 rounded-lg hover:bg-yellow-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1  text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

function ParentSignup({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Wish to have an account ?",
  submitButtonText = "Create Account",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  SetAlert, register, isAuthenticated , props,
 // ParentsigninUrl = components.innerPages.ParentLoginPage,
user
}) { 
const [fromData, setFormData] = useState({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  typeuser:'Teacher',
  adress:'',
  RIB:'',
 
}); 

const {
  firstname,
  lastname,
  email,
  password,
  typeuser,
  adress,
  RIB ,

} = fromData;
const hundelchange = (e) =>
  setFormData({ ...fromData, [e.target.name]: e.target.value });
const onsubmit = (e) => {
  e.preventDefault();
   register({
    firstname,
    lastname,
    email,
    password,
    typeuser,
    adress,
    RIB
   });
 }
// console.log(this.props.location.state);

return (
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
                <p tw="mt-6 text-xs text-gray-600 text-center">Fill up the following form to submit your request for a verified account !</p>
              <Form  onSubmit={(e) => onsubmit(e)} >
              <Input  className='myinput'
               type='text'
               placeholder='First Name'
               name='firstname'
               value={firstname}
               onChange={(e) => hundelchange(e)}/>
              <Input className='myinput'
               type='text'
               placeholder='Last Name'
                name='lastname'
               value={lastname}
               onChange={(e) => hundelchange(e)} />
                <Input className='myinput'
                  type='email'
                  placeholder='Email'
                   name='email'
                   value={email}
                  onChange={(e) => hundelchange(e)} />
                <Input className='myinput'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                minLength='6'
                 onChange={(e) => hundelchange(e)}/>
                  <div className="u-s-m-b-30"> 
                    <select
                     tw="text-gray-500 w-full px-8 py-4 rounded-lg font-medium bg-purple-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0" 
            className=' typeuser'
            name='typeuser'
            value={typeuser}
            onChange={(e) => hundelchange(e)}
          >
            <option className='option-type-profile'>Teacher</option>
            <option className='option-type-profile'>Student</option>
            <option className='option-type-profile'>Parent</option>
          </select>
          </div>
                <Input  className='myinput' type="text" placeholder="Adress" name="adress" value={adress} onChange={(e) => hundelchange(e)}
                />
                <Input type="number" name="RIB" placeholder="RIB"  value={RIB}  onChange={(e) => hundelchange(e)}/>
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              </Form>
              {/* <p tw="mt-8 text-sm text-gray-600 text-center">
              Already have a verified account?{" "}
                <a href={ParentsigninUrl.url} tw="border-b border-gray-500 border-dotted">
                  Sign In
                </a>
              </p> */}
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
); }
ParentSignup.propTypes = {
  SetAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { SetAlert,register })(ParentSignup);