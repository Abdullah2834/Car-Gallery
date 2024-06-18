import React, {Component} from 'react';
import { ASSETS } from '../../constants/routePaths';


class SliderImgComponent extends Component {
    render() {
       let {img,itemWidth} = this.props;
       
        return (
            <div ref={itemWidth} className="slider-item ">
                <div className="img-item">
                    <picture>
                        <source
                            srcSet={`${ASSETS}${img.substring(0, img.lastIndexOf("."))}.webp 1x, ${ASSETS}${img.substring(0, img.lastIndexOf("."))}_2x.webp 2x`}/>
                        <source
                            srcSet={`${ASSETS}${img} 1x, ${ASSETS}${img.substring(0, img.lastIndexOf("."))}_2x${img.substring(img.lastIndexOf("."))} 2x`}/>
                        <img src={`${ASSETS}${img}`}  alt={""}/>
                    </picture>
                </div>
            </div>

        );
    }
}

export default SliderImgComponent;
