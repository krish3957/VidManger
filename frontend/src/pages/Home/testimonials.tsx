import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
    {
        id: 1,
        quote: "VidManager has streamlined our video production process. It's intuitive and easy to use, making collaboration a breeze.",
        author: "Emily Johnson",
        role: "Content Creator, VlogMasters",
        imgSrc: "https://zenithalsolutions.com/assets/custom/images/testimonial-img.png",
    },
    {
        id: 2,
        quote: "The approval workflow in VidManager is a game-changer. It ensures our videos meet the highest quality standards before going live.",
        author: "Michael Smith",
        role: "Video Manager, CreativeWorks",
        imgSrc: "https://zenithalsolutions.com/assets/custom/images/testimonial-img.png",
    },
    {
        id: 3,
        quote: "VidManager's scheduling feature has saved us countless hours. Now, we can focus more on creating great content and less on logistics.",
        author: "Sarah Lee",
        role: "Marketing Director, AdVantage Media",
        imgSrc: "https://zenithalsolutions.com/assets/custom/images/testimonial-img.png",
    },
    {
        id: 4,
        quote: "The analytics and reporting tools in VidManager have given us valuable insights into our video performance, helping us improve our strategy.",
        author: "David Brown",
        role: "Analytics Specialist, DataDriven Insights",
        imgSrc: "https://zenithalsolutions.com/assets/custom/images/testimonial-img.png",
    },
    {
        id: 5,
        quote: "VidManager's collaboration tools have brought our team closer together. Feedback and revisions are now more efficient than ever.",
        author: "Jessica Wilson",
        role: "Project Lead, MediaFusion",
        imgSrc: "https://zenithalsolutions.com/assets/custom/images/testimonial-img.png",
    },
];


const TestimonialSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
                <Slider {...settings}>
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="h-[70vh] col-span-1 m-2  border border-red-200 relative bg-white p-8 rounded-lg shadow-md">
                            <img
                                src={testimonial.imgSrc}
                                className="absolute rounded-full left-1/2 transform -translate-x-1/2 border-8 border-white"
                                style={{ top: '30px', width: '120px', height: '120px' }}
                                alt={testimonial.author}
                            />
                            <span className="absolute text-white text-8xl top-28 left-1/4">&quot;</span>
                            <p className="text-lg text-gray-700 py-2 px-8 mt-32">
                                {testimonial.quote}
                            </p>
                            <h1 className="font-bold text-2xl text-logoPrimary text-center my-5">
                                {testimonial.author}
                            </h1>
                            <h1 className="text-gray-500 text-center">{testimonial.role}</h1>
                            <span className="absolute text-white text-8xl bottom-28 right-2">&quot;</span>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default TestimonialSlider;
