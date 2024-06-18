import React, {Component} from 'react';
import SmallSliderComponent from "./smallSliderComponent";
import SliderImgComponent from './sliderImgComponent';
import { getElementWidth } from '../../helper';



class SliderComponent extends Component {
  
   sliderBlock = React.createRef()

   gallery= {gallery_images:"[\"/z-rv/vers-select-C.png\",\"/z-rv/vers-select-D.png\",\"/z-rv/vers-select-E.png\",\"/z-rv/vers-select-F.jpg\",\"/z-rv/vers-select-G.jpg\",\"/z-rv/vers-select-H.jpg\",\"/z-rv/vers-select-J.jpg\",\"/z-rv/vers-select-K.jpg\",\"/z-rv/vers-select-L.jpg\",\"/z-rv/vers-select-M.jpg\",\"/z-rv/vers-select-C.png\",\"/z-rv/vers-select-D.png\",\"/z-rv/vers-select-E.png\",\"/z-rv/vers-select-F.jpg\",\"/z-rv/vers-select-G.jpg\"]"}

   galleryArr= JSON.parse(this.gallery.gallery_images)
   
   itemWidth = 0
   activeIndex = 0
   state={
      translateValue: 0,
   }
   componentDidMount(){
      
      if(typeof window !== "undefined"){
         window.addEventListener("resize", this.setTranslateValue)
      }
   }

   calculateItemWidth=()=>{
      this.itemWidth = getElementWidth(this.sliderBlock.current.children[1])
      
   }

   setTranslateValue=()=>{
      this.calculateItemWidth()
      this.setState({
         translateValue: this.activeIndex * this.itemWidth
      })
   }
 
   changeAreaIndex = (index) =>{
      this.activeIndex = index
      this.setTranslateValue()
   }
   
   slideFunc=(direction)=>{
      if((direction === - 1 && this.activeIndex === 0)){
         this.activeIndex = this.galleryArr.length 
      }
      if((direction === 1 && this.activeIndex === this.galleryArr.length - 1)){
         this.activeIndex = 0
      }else{
         this.activeIndex += direction
      }
      
      this.setTranslateValue()
      console.log("activeIndex",this.activeIndex);
   }

   render() {
      
      return (
          <div className={"slider-wrapper safe-area "}>
             <div className={`slider-container`}>
                
                  <div className={`arr-item `} onClick={()=>this.slideFunc(-1)}/>
                
                <div ref={this.sliderBlock} className="slider-block" style={{transform: `translate3d(-${this.state.translateValue}px,0,0)`}}
                    >
                      {
                        this.galleryArr && this.galleryArr.map((item,index)=>
                           <SliderImgComponent itemWidth={this.itemWidth} key={index} img={item} />
                        )
                     }  
                  
                </div>
                
                  <div className={`arr-item right-arr`} onClick={()=>this.slideFunc(1)} />
                
             </div>
               <SmallSliderComponent 
               galleryArr={this.galleryArr} 
               activeIndex={this.activeIndex} 
               slideFunc={this.slideFunc}
               changeAreaIndex={this.changeAreaIndex}
               />
          </div>
      );
   }
}


export default SliderComponent;

