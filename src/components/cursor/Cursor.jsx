import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    let mouseX=0, mouseY=0, ringX=0, ringY=0, raf;
    const onMove = (e) => { mouseX=e.clientX; mouseY=e.clientY; dot.style.transform=`translate(${mouseX}px,${mouseY}px)`; };
    const animate = () => { ringX+=(mouseX-ringX)*0.12; ringY+=(mouseY-ringY)*0.12; ring.style.transform=`translate(${ringX}px,${ringY}px)`; raf=requestAnimationFrame(animate); };
    const onEnter = () => { dot.classList.add('cursor--hover'); ring.classList.add('cursor--hover'); };
    const onLeave = () => { dot.classList.remove('cursor--hover'); ring.classList.remove('cursor--hover'); };
    const attachHover = () => { document.querySelectorAll('a,button,[role="button"]').forEach(el => { el.addEventListener('mouseenter',onEnter); el.addEventListener('mouseleave',onLeave); }); };
    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);
    attachHover();
    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList:true, subtree:true });
    return () => { document.removeEventListener('mousemove',onMove); cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);
  return (<><div className="cursor__dot" ref={dotRef} /><div className="cursor__ring" ref={ringRef} /></>);
};
export default Cursor;
