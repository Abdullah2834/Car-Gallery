import React, {Component,Fragment} from 'react';
import { ASSETS } from '../../constants/routePaths';
import { getElementWidth } from '../../helper';



class SmallSliderComponent extends Component {
    itemWidth = React.createRef();
    containerWidth= React.createRef();
   
    state={
        translateValue:0,
        dotIndex:0,
        container:0,
        itemImgWidth:0
    }
    calculateItem = () => {
        this.setState({
            itemImgWidth : getElementWidth(this.itemWidth.current),
            container: this.containerWidth.current.offsetWidth
        },()=>{
            console.log("itemWidth",this.state.itemImgWidth);
        })
       
    }
    componentDidUpdate(prevProps){
        if(prevProps.activeIndex !== this.props.activeIndex){
            this.setTranslateValue()
        }
    }
    setTranslateValue = () => {
        this.calculateItem()
        this.setState({
            translateValue: this.state.container * Math.floor(this.props.activeIndex / 10),
            dotIndex: Math.floor(this.props.activeIndex / 10)
        })
    }
    changeSmallAreaIndex = (inx) => {
        this.setTranslateValue()
        this.setState({
            translateValue: this.state.itemImgWidth * inx,
            dotIndex:inx
        },()=>{
            console.log("translateValue",this.state.translateValue);
            console.log("dotIndex",this.state.dotIndex);
        })
        
    }
    render() {
       let {galleryArr,activeIndex,slideFunc,changeAreaIndex} = this.props
       let sliderItemCount = Math.ceil(galleryArr.length / 10)
        return (
            <Fragment>
                
                    
                    <div ref={this.containerWidth} className={`mini-img-block`} style={{transform:`translateX(-${this.state.translateValue}px)`}}>
                    {   
                        Array.from({length: sliderItemCount}).map((item,inx)=>
                            <div ref={this.itemWidth} className="mini-slider-block">
                            {
                              galleryArr.slice(inx * 10, (inx + 1) * 10).map((item,index)=>
                                <div key={index}
                                     onClick={()=>changeAreaIndex(index + (10 * inx))} 
                                     className={`img-item ${activeIndex === index + (10 * inx)  ? "active" : ""}`} >
                                    <picture>
                                        <source
                                            srcSet={`${ASSETS}${item.substring(0, item.lastIndexOf("."))}.webp 1x, ${ASSETS}${item.substring(0, item.lastIndexOf("."))}_2x.webp 2x`}/>
                                            <source
                                            srcSet={`${ASSETS}${item} 1x, ${ASSETS}${item.substring(0, item.lastIndexOf("."))}_2x${item.substring(item.lastIndexOf("."))} 2x`}/>
                                        <img src={`${ASSETS}${item}`}  alt={""}/>
                                    </picture>
                                </div>
                                )
                            }
                            </div>
                        )
                    }
                    

                 </div>
                
                 
                 <div className="slider-info-container">
                  <div className="slide-num-item">
                        <p>{activeIndex + 1}/{galleryArr.length} Fotoğraf</p>
                  </div>
                  <div className="slider-nav-block">
                        <div className={`arr-item`} onClick={()=>slideFunc(-1)}/> 
                        <div className="dot-block">
                            {
                                Array.from({length: sliderItemCount}).map((item,index)=>
                                    <span className={`${this.state.dotIndex === index ? "active" : ""}`} key={index} onClick={()=>this.changeSmallAreaIndex(index)}/>
                                )
                            }
                           
                        </div>
                        <div className={`arr-item right-arr`} onClick={()=>slideFunc(1)}/>
                  </div>
               </div>
            </Fragment>
         
          
        );
    }
}


export default SmallSliderComponent;
