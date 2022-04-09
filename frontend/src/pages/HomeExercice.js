import TabGrid from "components/cards/TabCardGrid.js";
import TabCardGridExercice from "components/cards/TabCardGridExercice";
import tw from "twin.macro";
import { Container, Content2Xl, ContentWithVerticalPadding } from "components/misc/Layouts";
import React, {useState, useEffect} from "react";
import axios from "axios";



 function HomeExercice({

})  {
   
    const Subheading = tw.span`tracking-wider text-sm font-medium`;
    const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
    const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
    const Description = tw.span`inline-block mt-8`;
    const imageCss = tw`rounded-4xl`;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () =>{
        setLoading(true);
       
          const resultat = await axios.get('http://localhost:3001/exercice/list');
          setData(resultat.data);
        
        
        setLoading(false);
      }
  
      fetchData();
    }, []);
    
    return (

     
      
<TabCardGridExercice


heading={
  <>
    Checkout our <HighlightedText>Exercices</HighlightedText>
    
  </>
  
}

/>


)}
export default HomeExercice;