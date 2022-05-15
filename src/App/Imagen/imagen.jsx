import React from 'react';
import '../../styles.css';
import heart_svg from '../../assets/heart-outline.svg';

const Photo_card = ({img_data}) => {

    const imgSmall_src = img_data.urls.small;

    const imgLikes = img_data.likes;

    const imgAuthor = img_data.user.username;

    const imgLink = img_data.links.html;

    const imgTitle = img_data.alt_description;

    return (<>

        <div className="Photo_card__Container">
        
            <h2 className="Photo_card__Overlay_Element Photo_card__Overlay_Element--top_left">@{imgAuthor}</h2>

            <span className="Photo_card__Overlay_Element Photo_card__Overlay_Element--bottom_left">{imgLikes} <img id="Photo_card__Overlay_Heart" src={heart_svg}/> </span>

            <h3 className="Photo_card__Overlay_Element Photo_card__Overlay_Element--bottom_right"><a href={imgLink} target="_blank">Link</a></h3>
            
            <img src={imgSmall_src} className="Photo_card__Image" title={imgTitle}/>
        
        </div>    
    </>);
}

export default Photo_card;