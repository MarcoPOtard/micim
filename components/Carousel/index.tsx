"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { CarouselData } from "@/datas/ICarouselData";

const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    autoPlay: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    easing: "ease",
    pauseOnDotsHover: true,
    pauseOnHover: true,
    pauseOnFocus: true,
};

export default function Carousel({ sliderData }: { sliderData: CarouselData }) {
    return (
        <Slider {...settings}>
            {sliderData.sliders.map((data) => {
                return (
                    <div key={data.title} className="carousel-slider">
                        <div className="carousel-slider__top">
                            <hr />
                            <h3>{data.title}</h3>
                        </div>
                        <div className="carousel-slider__bottom">
                            <h4>{data.subtitle}</h4>
                            <p dangerouslySetInnerHTML={{__html: data.description}}/>
                            <Link
                                href={data.ctaLink}
                                className="carousel-slider__cta"
                            >
                                {data.ctaText}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}
