"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import type { Slide } from "@/lib/sanity/queries";

const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    easing: "ease",
    pauseOnDotsHover: true,
    pauseOnHover: true,
    pauseOnFocus: true,
};

export default function Carousel({ slides }: { slides: Slide[] }) {
    return (
        <Slider {...settings}>
            {slides.map((slide) => {
                return (
                    <div key={slide.title} className="carousel-slider">
                        <div className="carousel-slider__top">
                            <hr />
                            <h3>{slide.title}</h3>
                        </div>
                        <div className="carousel-slider__bottom">
                            <h4>{slide.subtitle}</h4>
                            <p>{slide.description}</p>
                            {slide.ctaLink && (
                                <Link
                                    href={slide.ctaLink}
                                    className="carousel-slider__cta"
                                    {...(slide.ctaLink.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })}
                                >
                                    {slide.ctaText}
                                </Link>
                            )}
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}
