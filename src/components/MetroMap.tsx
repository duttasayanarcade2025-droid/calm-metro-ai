import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MetroMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    // Add fade-in animation to all elements
    const elements = containerRef.current?.querySelectorAll('.tp-caption');
    elements?.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = '0';
      setTimeout(() => {
        htmlElement.style.transition = 'opacity 0.3s ease-in-out';
        htmlElement.style.opacity = '1';
      }, 10 + (index * 20));
    });

    // Mouse movement tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = (e.clientX - centerX) / rect.width;
        const mouseY = (e.clientY - centerY) / rect.height;
        setMousePosition({ 
          x: mouseX * 50,
          y: mouseY * 30
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-metro-deep to-background">
      <div
        ref={containerRef}
        className="relative w-[2011px] h-[1081px]"
        style={{ transform: 'scale(0.6)', transformOrigin: 'center center' }}
      >
        {/* rs-parallaxlevel-1: Static text elements (no movement) */}
        <div className="absolute inset-0">
          {/* Empty background layer as in original */}
          <div
            className="tp-caption absolute text-foreground"
            style={{
              left: '8px',
              top: '123px',
              zIndex: 18,
              fontSize: '20px',
              fontFamily: 'Open Sans',
            }}
          >
            {/* Empty as in original */}
          </div>
        </div>

        {/* rs-parallaxlevel-2: Roads, back building, sunrise (subtle movement) */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Roads - Base layer */}
          <div
            className="tp-caption absolute"
            style={{
              left: '102px',
              top: '389px',
              zIndex: 5,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/roads.png"
              alt="Roads"
              width="827"
              height="622"
              className="max-w-none"
            />
          </div>

          {/* Broken image placeholder */}
          <div
            className="tp-caption absolute"
            style={{
              left: '718px',
              top: '267px',
              zIndex: 6,
            }}
          >
            <div
              style={{
                width: '76px',
                height: '82px',
                backgroundColor: 'hsl(var(--muted))',
                border: '1px solid hsl(var(--border))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'hsl(var(--muted-foreground))'
              }}
            >
              IMG
            </div>
          </div>

          {/* Building back right */}
          <div
            className="tp-caption absolute"
            style={{
              left: '814px',
              top: '298px',
              zIndex: 7,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/building-back-right.png"
              alt="Building"
              width="112"
              height="126"
              className="max-w-none"
            />
          </div>

          {/* Sun rise */}
          <div
            className="tp-caption absolute"
            style={{
              left: '-83px',
              top: '236px',
              zIndex: 9,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/sun-rise.png"
              alt="Sunrise"
              width="516"
              height="218"
              className="max-w-none"
            />
          </div>
        </div>

        {/* rs-parallaxlevel-3: Building front, girl, boat, labels (moderate movement) */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Building front */}
          <div
            className="tp-caption absolute"
            style={{
              left: '731px',
              top: '243px',
              zIndex: 8,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/building-front.png"
              alt="Building Front"
              width="140"
              height="220"
              className="max-w-none"
            />
          </div>

          {/* Girl three */}
          <div
            className="tp-caption absolute"
            style={{
              left: '566px',
              top: '413px',
              zIndex: 10,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/girl-three.png"
              alt="Girl"
              width="390"
              height="390"
              className="max-w-none"
            />
          </div>

          {/* Boat icon */}
          <div
            className="tp-caption absolute"
            style={{
              left: '179px',
              top: '428px',
              zIndex: 12,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/boat-icon.png"
              alt="Boat"
              width="310"
              height="310"
              className="max-w-none"
            />
          </div>

          {/* Label 1 */}
          <div
            className="tp-caption absolute"
            style={{
              left: '766px',
              top: '361px',
              zIndex: 14,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/label.png"
              alt="Label"
              width="147"
              height="351"
              className="max-w-none"
            />
          </div>

          {/* Label 2 */}
          <div
            className="tp-caption absolute"
            style={{
              left: '844px',
              top: '330px',
              zIndex: 15,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/label-2.png"
              alt="Label 2"
              width="147"
              height="351"
              className="max-w-none"
            />
          </div>
        </div>

        {/* rs-parallaxlevel-4: Train, clock, Aluva, Ernakulam South (focal movement) */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Train - Main element */}
          <div
            className="tp-caption absolute"
            style={{
              left: '201px',
              top: '157px',
              zIndex: 11,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/train.png"
              alt="Metro Train"
              width="813"
              height="519"
              className="max-w-none"
            />
          </div>

          {/* Clock icon */}
          <div
            className="tp-caption absolute"
            style={{
              left: '347px',
              top: '473px',
              zIndex: 13,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/clock-icon.png"
              alt="Clock"
              width="340"
              height="340"
              className="max-w-none"
            />
          </div>

          {/* Aluva text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '-66px',
              top: '288px',
              zIndex: 21,
              fontSize: '16px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('Aluva')}`)}
          >
            Aluva
          </div>

          {/* Ernakulam South text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '813px',
              top: '753px',
              zIndex: 27,
              fontSize: '16px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('Ernakulam South')}`)}
          >
            Ernakulam South
          </div>
        </div>

        {/* rs-parallaxlevel-5: Background element and multiple station texts (high movement) */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 1.0}px, ${mousePosition.y * 1.0}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Background element */}
          <div
            className="tp-caption absolute"
            style={{
              left: '-191px',
              top: '344px',
              zIndex: 16,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/bg_element.png"
              alt="Background"
              width="1484"
              height="420"
              className="max-w-none"
            />
          </div>

          {/* Kalamassery text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '-134px',
              top: '418px',
              zIndex: 22,
              fontSize: '16px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap',
              minWidth: '87px',
              maxWidth: '87px'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('Kalamassery')}`)}
          >
            Kalamassery
          </div>

          {/* Palarivattom text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '109px',
              top: '820px',
              zIndex: 24,
              fontSize: '17px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('Palarivattom')}`)}
          >
            Palarivattom
          </div>

          {/* M.G Road text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '601px',
              top: '821px',
              zIndex: 25,
              fontSize: '17px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('M.G Road')}`)}
          >
            M.G Road
          </div>

          {/* Cochin University text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '-178px',
              top: '591px',
              zIndex: 28,
              fontSize: '16px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('Cochin University')}`)}
          >
            Cochin University
          </div>

          {/* JLN Stadium text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '366px',
              top: '822px',
              zIndex: 29,
              fontSize: '17px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('JLN Stadium')}`)}
          >
            JLN Stadium
          </div>
        </div>

        {/* rs-parallaxlevel-6: Edapally text (custom movement) */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Edapally text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '-80px',
              top: '783px',
              zIndex: 23,
              fontSize: '16px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('Edapally')}`)}
          >
            Edapally
          </div>
        </div>

        {/* rs-parallaxlevel-7: Man with bag, Vyttila, SN Junction (maximum movement) */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Man with bag */}
          <div
            className="tp-caption absolute"
            style={{
              left: '931px',
              top: '567px',
              zIndex: 17,
            }}
          >
            <img
              src="https://kochimetro.org/wp-content/uploads/2018/01/man-with-bag.png"
              alt="Man with bag"
              width="166"
              height="355"
              className="max-w-none"
            />
          </div>

          {/* Vyttila text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '1033px',
              top: '646px',
              zIndex: 26,
              fontSize: '17px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('Vyttila')}`)}
          >
            Vyttila
          </div>

          {/* SN Junction text */}
          <div
            className="tp-caption absolute text-foreground hover:text-metro-cyan cursor-pointer transition-colors duration-300"
            style={{
              left: '1003px',
              top: '489px',
              zIndex: 30,
              fontSize: '17px',
              fontFamily: 'Titillium Web',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate(`/xai/${encodeURIComponent('SN Junction')}`)}
          >
            SN Junction
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetroMap;