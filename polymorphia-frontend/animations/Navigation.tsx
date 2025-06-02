import { gsap } from "gsap";

export const animateSidebar = (
    sidebar: HTMLDivElement,
    isExpanded: boolean
) => {
  gsap.killTweensOf(sidebar);
  const targetWidth = isExpanded ? "18rem" : "96px";
  const tl = gsap.timeline();

  const profileBlock = sidebar.querySelector<HTMLDivElement>('.profile-block');
  const headings = Array.from(sidebar.querySelectorAll<HTMLElement>('h2'));
  const chevrons = Array.from(sidebar.querySelectorAll<HTMLElement>('.chevron-container'));

  const targets = [sidebar, profileBlock, ...headings, ...chevrons].filter(Boolean) as HTMLElement[];
  gsap.killTweensOf(targets);

  if (isExpanded) {
    tl.to(sidebar, {
      width: targetWidth,
      duration: 0.5,
      ease: "power2.out",
    })
        .set([...headings, ...chevrons], { display: 'block' }, "<0.15")
        .set(profileBlock, { display: "flex" }, "<")
        .fromTo(
            [...headings, ...chevrons],
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.2,
              ease: "power1.out"
            },
            "<"
        )
        .fromTo(
            profileBlock,
            { opacity: 0, x: -20  },
            {
              opacity: 1,
              x: 0,
              duration: 0.2,
              ease: "power1.out"
            }, "<"
        )

  } else {
    tl
    .to(profileBlock, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      ease: "power1.out",
      onComplete: () => {
        gsap.set(profileBlock, { display: "none" });
      }
    }, "<")

    .to([...chevrons, ...headings], {
      opacity: 0,
      x: -20,
      duration: 0.2,
      ease: "power1.out",
    }, "<")
    .to(sidebar, {
      width: targetWidth,
      duration: 0.5,
      ease: "power1.out",
    }, "<0.1")
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
    gsap.set(drawer, { opacity: 0, y: -100, display: 'flex' });
    gsap.set(allElements, { opacity: 1, x: 0 });
    gsap.set([...chevrons], { display: 'block' })

    gsap.timeline({ defaults: { ease: 'power1.in' } })
        .to(drawer, { opacity: 1, y: 0, duration: 0.2 })
        .from(allElements, {
          x: -10,
          duration: 0.1,
          opacity: 0,
        });
  } else {
    gsap.timeline({
      defaults: { ease: 'power1.out' },
    })
        .to(allElements, {
          x: -20,
          opacity: 0,
          duration: 0.1,
        })
        .to(drawer, { opacity: 0, y: -50, duration: 0.25 }, "<0.1")
        .set(drawer, { display: 'none' });
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
          { height: fullHeight, duration: 0.2, opacity: 1, ease: 'power1.in' }
      );
    } else {
      gsap.to(container, {
        height: 0,
        duration: 0.2,
        opacity: 0,
        ease: 'power1.out'
      });
    }
  });
};