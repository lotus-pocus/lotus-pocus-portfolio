import { useEffect, useRef, useState } from "react";
import { client } from "../../sanityClient";
import Accordion from "../../components/Accordion/Accordion";
import ClientWorkCard from "./ClientWorkCard";
import "./ClientWork.css";

const SWIPE_THRESHOLD = 65;
const VELOCITY_THRESHOLD = 0.35;
const SLIDE_DURATION = 320;

function ClientWork() {
  const [clientProjects, setClientProjects] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const dragOffsetRef = useRef(0);
  const animationFrameRef = useRef(null);
  const timeoutRefs = useRef([]);

  const dragStart = useRef({
    x: 0,
    y: 0,
    time: 0,
    pointerId: null,
    directionLocked: false,
    isHorizontal: false,
  });

  useEffect(() => {
    Promise.all([
      client.fetch(`
        *[
          _type == "project" &&
          workCategory == "client"
        ] | order(coalesce(displayOrder, 9999) asc, title asc) {
          _id,
          title,
          type,
          description,
          tags,
          projectUrl,
          repo,
          "slug": slug.current,
          mainImage {
            asset-> {
              url
            }
          }
        }
      `),

      client.fetch(`
        *[_type == "siteSettings"][0] {
          clientWorkAccordionTitle,
          clientWorkAccordionContent
        }
      `),
    ])
      .then(([projects, settings]) => {
        setClientProjects(projects || []);
        setSiteSettings(settings || null);
      })
      .catch(console.error);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      timeoutRefs.current.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
    };
  }, []);

  function setTrackedTimeout(callback, duration) {
    const timeout = window.setTimeout(callback, duration);
    timeoutRefs.current.push(timeout);
    return timeout;
  }

  function updateDragOffset(offset) {
    dragOffsetRef.current = offset;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setDragOffset(offset);
    });
  }

  function getNextIndex(direction) {
    if (direction === "next") {
      return (activeIndex + 1) % clientProjects.length;
    }

    return (
      (activeIndex - 1 + clientProjects.length) %
      clientProjects.length
    );
  }

  function animateToProject(direction, requestedIndex = null) {
    if (clientProjects.length < 2 || isAnimating) {
      return;
    }

    const nextIndex =
      requestedIndex ?? getNextIndex(direction);

    if (nextIndex === activeIndex) {
      setIsDragging(false);
      updateDragOffset(0);
      return;
    }

    const viewportWidth = window.innerWidth;

    const exitOffset =
      direction === "next" ? -viewportWidth : viewportWidth;

    const entryOffset =
      direction === "next" ? viewportWidth : -viewportWidth;

    setIsDragging(false);
    setIsAnimating(true);
    updateDragOffset(exitOffset);

    setTrackedTimeout(() => {
      setActiveIndex(nextIndex);

      /*
        Temporarily turn off animation and place the
        incoming card just outside the opposite edge.
      */
      setIsAnimating(false);
      updateDragOffset(entryOffset);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
          updateDragOffset(0);

          setTrackedTimeout(() => {
            setIsAnimating(false);
          }, SLIDE_DURATION);
        });
      });
    }, SLIDE_DURATION);
  }

  function showNextProject() {
    animateToProject("next");
  }

  function showPreviousProject() {
    animateToProject("previous");
  }

  function changeProject(index) {
    if (
      index === activeIndex ||
      clientProjects.length < 2 ||
      isAnimating
    ) {
      return;
    }

    const direction =
      index > activeIndex ? "next" : "previous";

    animateToProject(direction, index);
  }

  function handlePointerDown(event) {
    if (event.target.closest("a, button")) {
      return;
    }

    if (clientProjects.length < 2 || isAnimating) {
      return;
    }

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      pointerId: event.pointerId,
      directionLocked: false,
      isHorizontal: false,
    };

    setIsDragging(true);
    updateDragOffset(0);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (
      !isDragging ||
      dragStart.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const horizontalMovement =
      event.clientX - dragStart.current.x;

    const verticalMovement =
      event.clientY - dragStart.current.y;

    /*
      Wait for a small amount of movement before deciding
      whether this is a horizontal swipe or vertical scroll.
    */
    if (!dragStart.current.directionLocked) {
      const movementDistance = Math.max(
        Math.abs(horizontalMovement),
        Math.abs(verticalMovement),
      );

      if (movementDistance < 8) {
        return;
      }

      dragStart.current.directionLocked = true;

      dragStart.current.isHorizontal =
        Math.abs(horizontalMovement) >
        Math.abs(verticalMovement);
    }

    if (!dragStart.current.isHorizontal) {
      return;
    }

    event.preventDefault();

    /*
      Slight resistance keeps the card controlled while
      still following the pointer closely.
    */
    const resistedOffset = horizontalMovement * 0.92;

    updateDragOffset(resistedOffset);
  }

  function finishDrag(event) {
    if (
      !isDragging ||
      dragStart.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const elapsedTime = Math.max(
      performance.now() - dragStart.current.time,
      1,
    );

    const velocity =
      dragOffsetRef.current / elapsedTime;

    dragStart.current.pointerId = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const swipedLeft =
      dragOffsetRef.current <= -SWIPE_THRESHOLD ||
      velocity <= -VELOCITY_THRESHOLD;

    const swipedRight =
      dragOffsetRef.current >= SWIPE_THRESHOLD ||
      velocity >= VELOCITY_THRESHOLD;

    if (swipedLeft) {
      showNextProject();
      return;
    }

    if (swipedRight) {
      showPreviousProject();
      return;
    }

    /*
      Return the card smoothly to its starting position
      when the gesture was not long or fast enough.
    */
    setIsDragging(false);
    setIsAnimating(true);
    updateDragOffset(0);

    setTrackedTimeout(() => {
      setIsAnimating(false);
    }, SLIDE_DURATION);
  }

  function handlePointerCancel(event) {
    dragStart.current.pointerId = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
    setIsAnimating(true);
    updateDragOffset(0);

    setTrackedTimeout(() => {
      setIsAnimating(false);
    }, SLIDE_DURATION);
  }

  if (!clientProjects.length) {
    return null;
  }

  const activeProject = clientProjects[activeIndex];

  const accordionTitle =
    siteSettings?.clientWorkAccordionTitle ||
    "About my client work";

  const accordionContent =
    siteSettings?.clientWorkAccordionContent ||
    "These are commercial projects completed for clients. The case studies focus on the design, development and measurable value of the work while respecting client confidentiality.";

  return (
    <section className="client-work" id="client-work">
      <div className="client-work-header">
        <p className="client-work-kicker">
          Client Work
        </p>

        <h2>Selected client work.</h2>

        <Accordion
          title={accordionTitle}
          content={accordionContent}
        />
      </div>

      <div className="client-feature">
        <ClientWorkCard
          project={activeProject}
          isDragging={isDragging}
          isAnimating={isAnimating}
          dragOffset={dragOffset}
          showSwipeHint={clientProjects.length > 1}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={handlePointerCancel}
        />

        {clientProjects.length > 1 && (
          <div
            className="client-feature-dots"
            aria-label="Choose a client project"
          >
            {clientProjects.map((project, index) => (
              <button
                key={project._id}
                type="button"
                className={
                  index === activeIndex ? "active" : ""
                }
                onClick={() => changeProject(index)}
                aria-label={`Show ${project.title}`}
                aria-pressed={index === activeIndex}
                disabled={isAnimating}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ClientWork;