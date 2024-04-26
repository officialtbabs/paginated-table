import gsap from "gsap";

export const applyShineAnimationTL = (elementId) => {
  const shineAnimationTl = gsap.timeline();

  shineAnimationTl.fromTo(
    elementId,
    {
      transform: "rotateY(30deg) rotateX(30deg)",
      backgroundPosition: "-130px 0",
      ease: "elastic",
      background:
        "radial-gradient(circle farthest-side at 0 0, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 0.8) 98%, rgba(255, 255, 255, 0) 100%) no-repeat",
    },
    {
      backgroundPosition: "50px 0",
      ease: "circ.out",
    }
  );

  shineAnimationTl.fromTo(
    elementId,
    {
      background:
        "radial-gradient(circle farthest-side at 100% 100%, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 0.8) 98%, rgba(255, 255, 255, 0) 100%) no-repeat",
      backgroundPosition: "50px 0",
    },
    {
      backgroundPosition: "-130px 0",
      transform: "rotateY(0deg)",
      ease: "circ.in",
    }
  );

  //   shineAnimationTl.fromTo(
  //     elementId,
  //     {
  //       backgroundPosition: "-130px 0",
  //       ease: "power1.inOut",
  //     },
  //     { transform: "rotateY(0deg)" }
  //   );

  shineAnimationTl.duration(0.5);
  //   shineAnimationTl.repeat(1);
};

export const imageFocusAmimation = (element) => {
  const imageFocusAnimation = gsap.timeline();

  imageFocusAnimation.fromTo(
    element,
    {
      transform: "rotateY(30deg) rotateX(30deg)",
      backgroundPosition: "-130px 0",
      ease: "elastic",
      background:
        "radial-gradient(circle farthest-side at 0 0, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 0.8) 98%, rgba(255, 255, 255, 0) 100%) no-repeat",
    },
    {
      backgroundPosition: "50px 0",
      ease: "circ.out",
    }
  );
};

export const imageBlurAmimation = (element) => {
  const imageBlurAnimation = gsap.timeline();

  imageBlurAnimation.fromTo(
    element,
    {
      background:
        "radial-gradient(circle farthest-side at 100% 100%, rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 0.8) 98%, rgba(255, 255, 255, 0) 100%) no-repeat",
      backgroundPosition: "50px 0",
    },
    {
      backgroundPosition: "-130px 0",
      transform: "rotateY(0deg)",
      ease: "circ.in",
    }
  );
};
