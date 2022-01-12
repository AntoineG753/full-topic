import React, { useState } from 'react';
import iconheader from '../../src/components/img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';




function Footer() {


    return (
        <footer className="bg-color-32 p-2 pt-3 pb-3">
            <div className="d-flex justify-content-between">
                <div id="link_footer" className="d-flex flex-direction-column col-6">
                    <a href="http://192.168.1.95:3000/cgu" className="link-primary">CGU</a>
                    <a href="http://192.168.1.95:3000/déclaration-de-confidentialité" className="link-primary">Décalration de confidentialité</a>
                    <a href="http://192.168.1.95:3000/" className="link-primary">Contact</a>
                </div>
               
                <div id="summarize_footer" className="overflow-scroll col-6">
                    <p>Le site est actuellement en développement, des bugs, des interruptions ainsi que des changements peuvent être appliqués à tout moment.</p>
                </div>
            </div>
            <div className="col-12 text-center">
                <p className="mt-2 mb-0 color-fff">Full-Topic © 2021</p>
            </div>
        </footer>
    )

};



export default Footer;