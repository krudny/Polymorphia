import { gsap } from "gsap";

export const animateSidebar = (
    sidebar: HTMLDivElement,
    isExpanded: boolean
) => {
  gsap.killTweensOf(sidebar);
  const targetWidth = isExpanded ? "20rem" : "96px";
  const tl = gsap.timeline();

  const imageEl = sidebar.querySelector<HTMLDivElement>('.profile-image');
  const profileBlock = sidebar.querySelector<HTMLDivElement>('.profile-block');
  const headings = Array.from(sidebar.querySelectorAll<HTMLElement>('h2'));
  const chevrons = Array.from(sidebar.querySelectorAll<HTMLElement>('.chevron-container'));

  if (isExpanded) {
    tl.to(sidebar, {
      width: targetWidth,
      duration: 0.4,
      ease: "power2.inOut",
    })
        .to(imageEl, {
          width: "40%",
          height: "40%",
          ease: "power1.out"
        }, "<")

        .set([...headings, ...chevrons], { display: 'block' }, "<0.29")
        .fromTo(
            [...headings, ...chevrons],
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.2,
              ease: "power2.out"
            },
            "<"
        )
        .set(profileBlock, { display: "flex" }, "<")
        .fromTo(
            profileBlock,
            { opacity: 0, x: -20  },
            {
              opacity: 1,
              x: 0,
              duration: 0.15,
              ease: "power2.out"
            }, "<"
        )

  } else {
    tl.to(profileBlock, {
      opacity: 0,
      x: -10,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(profileBlock, { display: "none" });
      }
    })
    .to(sidebar, {
      width: targetWidth,
      duration: 0.6,
      ease: "power2.inOut"
    })
    .to([...chevrons, ...headings], {
      opacity: 0,
      x: -10,
      duration: 0.1,
    }, "<");
  }
};

export const animateNavbar = (
    drawer: HTMLDivElement,
    isExpanded: boolean
): void => {
  const menuItems = Array.from(drawer.querySelectorAll<HTMLHeadingElement>('h2'));
  const chevrons = Array.from(drawer.querySelectorAll<HTMLElement>('.chevron-container'));

  const allElements = [...menuItems, ...chevrons];

  gsap.killTweensOf([drawer, ...allElements]);

  if (isExpanded) {
    drawer.classList.remove('hidden');
    gsap.set(drawer, { opacity: 0, y: -20, display: 'flex' });
    gsap.set(allElements, { opacity: 1 });
    gsap.set([...chevrons], { display: 'block' })

    gsap.timeline({ defaults: { ease: 'power2.out' } })
        .to(drawer, { opacity: 1, y: 0, duration: 0.3 })
        .from(allElements, {
          x: -10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05
        }, '<0.1');
  } else {
    gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: () => {
        drawer.classList.add('hidden');
      }
    })
        .to(allElements, {
          x: -10,
          opacity: 0,
          duration: 0.2,
          stagger: { each: 0.03, from: 'end' }
        })
        .to(drawer, { opacity: 0, y: -20, duration: 0.2 }, '<0.2');
  }
};

export const animateSubMenuSection = (
    containers: Array<HTMLDivElement | null>,
    openSubMenu: string[],
    isExpanded: boolean,
    options: { text: string }[]
): void => {
  options.forEach((opt, idx) => {
    const container = containers[idx];
    if (!container) return;

    gsap.killTweensOf(container);

    const isOpen = openSubMenu.includes(opt.text);

    if (isExpanded && isOpen) {
      const fullHeight = container.scrollHeight;
      gsap.fromTo(
          container,
          { height: 0 },
          { height: fullHeight, duration: 0.3, opacity: 1, delay: 0.15, ease: 'power2.inOut' }
      );
    } else {
      gsap.to(container, {
        height: 0,
        duration: 0.2,
        opacity: 0,
        ease: 'power2.inOut'
      });
    }
  });
};