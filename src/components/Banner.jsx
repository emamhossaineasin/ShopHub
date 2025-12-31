import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer z-10"
      >
        <div className="w-6 h-6 border-r-4 border-t-4 border-black rotate-45"></div>
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer z-10"
      >
        <div className="w-6 h-6 border-l-4 border-t-4 border-black -rotate-45"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <Slider {...settings}>
          <div className="flex justify-center">
            <img
              src="/Banner_img_2.jpg"
              alt="Banner 1"
              className="w-[80%] object-center m-auto"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="/Banner_img_3.jpg"
              alt="Banner 2"
              className="w-[80%] object-center m-auto"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="/Banner_img_4.jpg"
              alt="Banner 3"
              className="w-[80%] object-center m-auto"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
