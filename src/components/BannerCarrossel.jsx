import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const BannerCarrossel = () => {
  const banners = [
    {
      image: "/images/banner1.jpg",
      title: "Bem-vindo à Buenas Store",
      subtitle: "Estilo, conforto e qualidade para os seus pés",
    },
    {
      image: "/images/banner2.jpg",
      title: "Descubra nossas ofertas",
      subtitle: "Até 50% de desconto em calçados selecionados",
    },
    {
      image: "/images/banner3.jpg",
      title: "Nova coleção de verão",
      subtitle: "Sandálias, chinelos e muito mais com frete grátis",
    },
  ];

  return (
    <div className="w-full h-[80vh]">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        stopOnHover={false}
        swipeable={true}
        emulateTouch={true}
        className="h-full"
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative w-full h-[80vh] bg-center bg-cover flex items-center justify-center"
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
            <div className="z-20 text-center text-white px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{banner.title}</h1>
              <p className="text-lg md:text-2xl drop-shadow-md">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
