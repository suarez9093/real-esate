import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import {Link} from 'react-router-dom'
import {RoomContext} from '../Context'
import AppointmentApp from "../components/AppointmentApp";
import StyledHero from '../components/StyledHero'

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        this.state ={
            slug:this.props.match.params.slug,
            defaultBcg
        };
    }
    static contextType = RoomContext;
    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        if (!room){
            return(
           <div className="error">
                <h3>no such search could be found...</h3>
                <Link to="/rooms" className="btn-primary"> back to listings</Link>
            </div>
            );
        }
        const {name,description,capacity,size,price,breakfast,pets,images} = room;
        const [mainImg,...defaultImg] = images;
        return (
            <>
            <StyledHero img={mainImg || this.state.defaultBcg}>
                <Banner title={`${name} home`}>
                    <Link to="/rooms" className="btn-primary">
                        back to listings
                    </Link>
                    
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {defaultImg.map((item, index)=>{
                     return <img key={index} src={item} alt={name} />;
                    })}

                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price : ${price}</h6>
                        <h6>size: {size} SQFT</h6>
                        <h6>
                            Garage Parking : {
                                capacity > 1 ?`${capacity} cars`: `${capacity}person`
                            }
                        </h6>
                        <h6>{pets? "open viewings today":"no viewings available today"}</h6>
                        <h6>{breakfast && "open viewing now"}</h6>
                        <Link to="/locks"className="btn-primary">
                           click for code
                        </Link>
                        
                    </article>
                </div>
            </section>
           
            <div>
                     <MuiThemeProvider>
                        <AppointmentApp />
                     </MuiThemeProvider>
             </div>
            {/* <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    {extras.map((item,index) =>{
                        return <li key={index}>- {item}</li>
                    })}
                </ul>
            </section> */}
            </>
        );
    }
}
