/* import react, useRef, useEffect */
import React, {useRef, useEffect} from 'react';

/**
 * Landing function
 * @param {*} props 
 */
const Landing = props => {
        const html = document.documentElement;
        const canvasRef = useRef(null)

        useEffect(() => { 
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            const currentFrame = index => (
             `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/${index.toString().padStart(4, '0')}.jpg`
            )
            canvas.width = 1520;
            canvas.height = 840;
            const image = new Image();
            image.src = currentFrame(1);

            image.onload = function () {
                context.drawImage(image, 0, 0);
            }
            const preloadImages = () => {
                for (let i = 1; i < 131; i++) {
                  const image = new Image();
                  image.src = currentFrame(i);
                }
              };
              const heading = document.getElementById('heading');
              //const textAnim = TweenMax.fromTo(heading, 5, { opacity: 1 }, { opacity: 0 });
              window.addEventListener('scroll', () => {
                const scrollTop = html.scrollTop;
                const maxScroll = html.scrollHeight - window.innerHeight;
                const scrollFraction = scrollTop / maxScroll;
                const frameIndex = Math.min(131,Math.floor(scrollFraction * 131));
                  requestAnimationFrame(() => updateImage(frameIndex+1))
            })
            
            const updateImage = index => {
              image.src = currentFrame(index);
              context.drawImage(image, 0, 0);
            }

            preloadImages()
          }, [])
          
    /* Landing page screen UI */
    return(
        <div className="landing">
            <div id="intro">
                <h1 id="heading">Capture & Share Timeless Moments</h1>
                <canvas className="hero" id="hero-section" ref={canvasRef}></canvas>
            </div>
        </div>
    )
}

export default Landing;