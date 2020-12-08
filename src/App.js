import React , {useEffect, useState}from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './Component/NewsCards/NewsCards';

import wordsToNumbers from 'words-to-numbers';

import useStyles from './Styles.js';

const alankey = '7b68c7d6891d27b591791f74e7653d682e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = () => {
    const [newsArticles,setNewsArticles] =useState([]);
    const [activeArticle, setActiveArticles] = useState(-1);

    const classes = useStyles();

    useEffect(() =>{
        alanBtn({
            key: alankey,
            onCommand: ({ command , articles, number }) => {
                if (command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticles(-1);

                } else if(command === 'highlight'){
                    setActiveArticles((prevActiveArticle)=> prevActiveArticle + 1);
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy : true}) : number;
                    const article = articles[parsedNumber - 1];
                 
                    if(parsedNumber > 20) {
                        alanBtn().playText('plase try that again.')
                    } else if(article) {
                        window.open(article.url,'_blank');
                        alanBtn().playText('opening...');
                    }
                }
            }
        })
    },[])


    return (
        <>
            <div className={classes.logoContainer}>
            <img src="https://media-exp1.licdn.com/dms/image/C561BAQFzAiAvq0Jg8Q/company-background_10000/0/1565260089604?e=2159024400&v=beta&t=ygcEIMzRHClwTjBwChX2naoGiS2TCeDwozFfEAM73ek" className={classes.alanLogo} alt =" alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </>
    );
};

export default App;

