import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <svg
              className="h-8 w-8 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z"></path>
            </svg>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">ScholarStream</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-500 dark:text-slate-400 order-last mt-4 sm:mt-0 sm:order-none">
            © {new Date().getFullYear()} ScholarStream. All Rights Reserved.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <Link to="#" className="hover:opacity-75">
              <img
                alt="Twitter"
                className="h-6 w-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5i4PZEAd3FYDstl_D7djANnL87KPxuhxUDGgmOb0vjzWIkJGm1JCW1dEnCU-0_zdbbwJLyjsHA48WzU5MlQ-_2QvSsjf0-YmXBto2dpgnnkx64zAKqQ9zXBcO6g4p-gd6EWb3DRBv4wBDSEKIZwgcOsVt9gj1n8v6V3w89fU-jTWG-2Dl-mW_gPay0BGG42FVp_pSwuE9gsZdAMB-odA2231xsMQrZ1CmE2SHgbiQo8_pw4QVbuodmeyzSiKp2ALn0Ui8HzodY1Or"
              />
            </Link>
            <Link to="#" className="hover:opacity-75">
              <img
                alt="Facebook"
                className="h-6 w-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJyEIJwDp3zaR7vC_SY_iVGkMmmHigarNY-JQBgxslAxAC25RnyJR_4kRoOSgbJ5IABYZ_AeYpd_Z8xZfSksJXGF0RbED3oeeXPkoEDuZuhF0nkjpVeaR_h0QuzCYvptiuLnFM2dS2iWxJV8NU2nQTGNmzuFB2GeivofWK6zdzqxse35FggrcZ33XgbAr6W9ij7t3vY2YnEz3oPyWfp0QPXXOv2isuX35u3S_U1XZF5_Q3g4Jp4EjsZAGqqjb7D0de4AbXD1yHXLFk"
              />
            </Link>
            <Link to="#" className="hover:opacity-75">
              <img
                alt="Instagram"
                className="h-6 w-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm1nGZsgiH5RXS2DvUO9AnVJYllnlRPhwMfiJAsdYq9PNcRq25ZQqJb2G_PGIoIWDC3TW5FxmMtGIq8GoxoAqqbhbiQ42IGSzAHlQiIre2VDIBt2b7fiFZas5oZt-hRxkQ841XMQbPPVjwhRbWEimQ9CTip3Pp5bIYsdpvPEPE74bV4loKKeRNkhZAtydG07ikD1mxjLUNjrXBocaJtICAO7fDGPtKl8O30lNTu7HJ981Yk5sELdOAZS-YIcUyfqp4I-z7Z6sQR62y"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
