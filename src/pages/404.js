import React from "react";

function NotFound() {
   return (
      <>
         <section id="inner-headline">
            <div className="container">
               <div className="row">
                  <div className="span4">
                     <div className="inner-heading">
                        <h2>404</h2>
                     </div>
                  </div>
                  <div className="span8">
                     <ul className="breadcrumb">
                        <li>
                           <a href="index.html">Home</a>
                           <i className="icon-angle-right"></i>
                        </li>
                        <li>
                           <a href="#">Pages</a>
                           <i className="icon-angle-right"></i>
                        </li>
                        <li className="active">404 Error page</li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>
         <section id="content">
            <div className="container">
               <div className="row">
                  <div className="span12">
                     <h2 className="errortitle aligncenter">404</h2>
                     <h3 className="aligncenter">
                        <i className="icon-remove"></i> Sorry requested page not
                        found
                     </h3>
                     <p className="aligncenter">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam non mod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua.
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default NotFound;
