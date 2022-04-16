import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ContentWithPaddingXl, Container } from "components/misc/Layouts.js";
import { SectionHeading as Heading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";

const Subheading = tw(SubheadingBase)`text-center`;
const Testimonials = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch`;
const TestimonialContainer = tw.div`mt-16 lg:w-1/3`;
const Testimonial = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const Image = tw.img`w-20 h-20 rounded-full`;
const Quote = tw.blockquote`mt-5 text-gray-600 font-medium leading-loose`;
const CustomerName = tw.p`mt-5 text-gray-900 font-semibold uppercase text-sm tracking-wide`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 top-0 h-56 w-56 opacity-15 transform -translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 bottom-0 h-64 w-64 opacity-15 transform translate-x-2/3 text-yellow-500`}
`;

export default ({
  subheading = "Testimonials",
  heading = "Customer's Review",
  testimonials = [
    {
      imageSrc:
      "data:image/png;base64,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",
      quote:
        "English Teacher",
      customerName: "Lachheb Maryem"
    },
    {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5JVCoWZ7m8x8b1_YDV2E6n-E9-uyRkbfwHeCYnvysDGhBcavhuB_9qiB0I6UKR5rkVz0&usqp=CAU",
      quote:
        "Socials Sciences Teacher",
      customerName: "maiez ahmed"
    },
    {
      imageSrc:
      "data:image/jpeg;base64,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",
      quote:
        "Mathematics Teacher",
      customerName: "armaoui eya"
    },
    {
      imageSrc:
      "data:image/jpeg;base64,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",
      quote:
        "Arabic Teacher",
      customerName: "Ben Ameur Maram"
    },
    {
      imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUnQFDFW38qwi8Z3oUxikMFTPXfwLaV5i_Q&usqp=CAU",
      quote:
        "French Teacher",
      customerName: "Sahli Iheb"
    }
  ]
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        <Testimonials>
          {testimonials.map((testimonial, index) => (
            <TestimonialContainer key={index}>
              <Testimonial>
                <Image src={testimonial.imageSrc} />
                <Quote>"{testimonial.quote}"</Quote>
                <CustomerName>- {testimonial.customerName}</CustomerName>
              </Testimonial>
            </TestimonialContainer>
          ))}
        </Testimonials>
      </ContentWithPaddingXl>

      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
