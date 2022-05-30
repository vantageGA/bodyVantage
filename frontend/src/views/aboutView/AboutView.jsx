import './AboutView.scss';
import BodyVantage from '../../components/bodyVantage/BodyVantage';

import LinkComp from '../../components/linkComp/LinkComp';

const AboutView = () => {
  return (
    <div className="about-wrapper">
      <fieldset className="fieldSet">
        <legend>About Us</legend>

        <p>
          <BodyVantage /> is a personal wellbeing website which enables you to
          search and connect with specialised and experienced wellbeing
          providers throughout the UK.
        </p>

        <p>
          I noticed a gap in the health and wellbeing industry, where there was
          a wealth of industry experience out there, but the public were not
          aware of the providers in their location and that there had to be a
          better way to put the public in touch with the right wellbeing
          providers.
        </p>

        <p>
          Act today by becoming a <BodyVantage /> member, this will enable you
          to reach more potential clients while growing and taking ownership of
          your industry profile.
        </p>

        <div>
          As a registered <BodyVantage /> member you:
          <ul>
            <li>
              can showcase your business to the public and convert enquiries
              into clients
            </li>
            <li>can advertise your various wellbeing services to the public</li>
            <li>are allowed unlimited service updates</li>
            <li>can personalise your profile</li>
            <li>can add client reviews</li>
          </ul>
        </div>
        <div>
          <BodyVantage /> enables their visitors to search:
          <ul>
            <li>for vetted and recognised wellbeing members/providers</li>
            <li>in a location of their choice</li>
            <li>member wellbeing offerings and reviews</li>
            <li>for member contact details and make enquiries</li>
          </ul>
        </div>
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
