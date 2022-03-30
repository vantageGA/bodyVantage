import React from 'react';
import './AboutView.scss';

import LinkComp from '../../components/linkComp/LinkComp';

const AboutView = () => {
  return (
    <div className="about-wrapper">
      <fieldset className="fieldSet">
        <legend>About Us</legend>
        <h1>About Us</h1>
        <p>
          BodyVantage is a personal wellbeing website for the pubic to enable
          them to search and connect with listed specialised and experienced
          wellbeing providers throughout the UK.
        </p>

        <p>
          BodyVantage believes in enabling the public through their site to
          confidently search for suitable wellbeing members in their area who
          have been vetted by BodyVantage as recognised providers.
        </p>

        <p>
          This platform will allow the registered BodyVantage members to
          advertise their services as providers to the public with contact
          details. The BodyVantage members will be allowed unlimited service
          updates and personalisation of their member profile. Members will also
          be able to add client reviews. This site gives members the opportunity
          to showcase their business to the public and to convert enquiries into
          clients
        </p>

        <p>
          I started this this business as I noticed a gap in the health and
          wellbeing industry, where there was a wealth of industry experience
          out there, but the public were not aware of the providers in their
          area. I felt there had to be a better way to put the public in touch
          with the right wellbeing providers.
        </p>
        <p>
          BodyVantage is continuously growing their established list of
          wellbeing contacts throughout the UK.
        </p>
        <p>
          Take action today by becoming a BodyVantage member which will enable
          you to reach more potential clients while growing and taking ownership
          of your industry profile.{' '}
        </p>
      </fieldset>
      <div>
        <p>
          Got any questions ? <LinkComp route="faq" routeName="FAQ's" />
        </p>
      </div>
    </div>
  );
};

export default AboutView;
