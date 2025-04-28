'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { InfiniteScrollProps, Item } from "./InfiniteScrollProps";
import { CSSProperties } from 'react';

export default function InfiniteScroll({
  data,
  isHorizontal = true,
  leftButton,
  rightButton,
  leftButtonCSS,
  rightButtonCSS,
  height
}: InfiniteScrollProps) {

  const [items, setItems] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState(() => {
    const length = Math.min(data.length, 5);
    return Array.from({ length }, (_, i) => i);
  });
  const [slideOffset, setSlideOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const styles: Record<string, CSSProperties> = {
    container: {
      position: 'relative',
      height: height || '500px',
      width: '100vw'
    },
    navButton: {
      position: 'absolute',
      padding: '0.5rem',
      transition: 'all 0.3s',
      zIndex: 10
    },
    navButtonLeft: {
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    navButtonRight: {
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    navButtonTop: {
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    navButtonBottom: {
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    contentContainer: {
      height: '100%',
      width: '100%',
      position: 'relative'
    },
    itemsContainer: {
      display: 'flex',
      height: '100%'
    },
    item: {
      width: '100%',
      height: '100%',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.5s',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    itemWithBackground: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    },
    videoBackground: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
    setDisplayedItems(prev => {
      const next = prev.map(i => (i + 1) % items.length);
      return next;
    });
    setSlideOffset(100);
    setTimeout(() => {
      setSlideOffset(0);
    }, 500);
  };

  const handlePrev = () => {
    setSlideOffset(100);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
      setDisplayedItems(prev => {
        const next = prev.map(i => (i - 1 + items.length) % items.length);
        return next;
      });
      setSlideOffset(0);
    }, 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div style={styles.container}>
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        style={{
          ...styles.navButton,
          ...(isHorizontal ? styles.navButtonLeft : styles.navButtonTop)
        }}
      >
        {isHorizontal ? leftButton ? <img src={leftButton} alt="left" style={leftButtonCSS} /> : '←' : '↑'}
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        style={{
          ...styles.navButton,
          ...(isHorizontal ? styles.navButtonRight : styles.navButtonBottom)
        }}
      >
        {isHorizontal ? rightButton ? <img src={rightButton} alt="left" style={rightButtonCSS} /> : '→' : '↓'}
      </button>

      <div
        style={styles.contentContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div style={styles.itemsContainer}>
          {displayedItems.map((itemIndex, index) => {
            const item = items[itemIndex];
            if (!item) return null;
            
            return (
              <div
                key={item.id}
                style={{
                  ...styles.item,
                  ...(!item.backgroundVideo && styles.itemWithBackground),
                  transform: `translateX(${(index - 1) * 100 + slideOffset}%)`,
                  backgroundColor: item.color,
                  backgroundImage: item.backgroundImage ? `url(${item.backgroundImage})` : undefined
                }}
              >
                {item.backgroundVideo && (
                  <video
                    src={item.backgroundVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={styles.videoBackground}
                  />
                )}
                {item.explainHtml}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 