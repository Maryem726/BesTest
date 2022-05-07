import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import React from 'react'
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import ComplaintsForm from "components/forms/ComplaintsForm";
import Hero from "components/hero/TeacherTwoColumnWithInput.js";
import GetStarted1 from "components/cta/TeacherGetStartedLight.js";

export default function Complaint() {
  return (
    <AnimationRevealPage>
      <ComplaintsForm />
      <Footer />
    </AnimationRevealPage>
  )
}
