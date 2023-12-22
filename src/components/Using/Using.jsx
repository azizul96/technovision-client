import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


const Using = () => {
    const professionals = [{name:"Project Managers"},{name:"Entrepreneurs"},{name:"Small Business Owners"}, {name:"Team Leaders and Supervisors"}, {name:"Individual Professionals"}, {name:"Human Resources Professionals"}, {name:"IT Professionals"}, {name:"Event Planners"}, {name:"Marketing Teams"}]

    return (
        <div className="container mx-auto">
            <h2 className='text-2xl font-semibold text-center my-6'>Who Can Use</h2>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                
                {
                    professionals.map((professional,index) => <SwiperSlide key={index}>
                        <div className="my-5 mx-24 text-center flex justify-center items-center">
                            <h3 className=" text-orange-500 font-semibold text-lg md:text-2xl md:font-bold">{professional.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Using;