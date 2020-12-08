import React, {useState, useEffect, createRef} from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button , Typography} from '@material-ui/core';
import classnames from 'classnames';
import useStyles from './Styles';


 const NewsCard = ({article:{description,publishedAt,source,title,url, urlToImage}, i,activeArticle}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollTORef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() =>{
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    },[]);

    useEffect(() =>{
        if(i === activeArticle && elRefs[activeArticle]){
            scrollTORef(elRefs[activeArticle]);
        }
    },[i, activeArticle, elRefs]);


    return (
        <Card ref={elRefs[i]} className={classnames(classes.card, activeArticle === i ? classes.activeCard : null )}>
        <CardActionArea href={url} target="_blank">
            <CardMedia className={classes.media} image={urlToImage || 'https://c0.klipartz.com/pngpicture/409/826/gratis-png-comunicado-de-prensa-del-diario-de-corea-del-norte-noticias.png'} />
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                <Typography variant="body2" color="textSecondary" component="h2">{source.name} </Typography>

            </div>
            <Typography className={classes.title} gutterBottom variant="h5">{title} </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{description} </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.CardActions}>
            <Button size="small" color="primary">Learn More </Button>
            <Typography variant='h5' color="textSecondary">{i + 1} </Typography>
        </CardActions>
        
            
        </Card>
    )
}
export default NewsCard;
