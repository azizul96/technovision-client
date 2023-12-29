import { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Using from "../../components/Using/Using";
import Aos from "aos";



const Home = () => {
    useEffect(()=>{
        Aos.init()
        
    },[])

    return (
        <div>
            <div data-aos="zoom-in-up" data-aos-duration="3000">
                <Banner></Banner>
            </div>
            <div data-aos="zoom-in-up" data-aos-duration="3000">
                <Using></Using>
            </div>
        </div>
    );
};

export default Home;