import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[], options?: IntersectionObserverInit) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options || {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [sectionIds, options]);

  return activeId;
};
