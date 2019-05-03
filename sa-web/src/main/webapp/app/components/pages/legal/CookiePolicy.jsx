import * as React from 'react';
import { appConstants } from 'Constants';

const CookiePolicy = () => (
  <div className='container-fluid text-justify'>
    <header className='mb-4'>
      <h2 className='h1'>Cookie Policy</h2>
    </header>
    <section>
      <p className='h5'>HOW DOES {appConstants.website.name.toUpperCase()} USE COOKIES?</p>
      <p>
        A cookie is a small piece of text that allows a website to recognize your device and maintain a consistent,
        cohesive experience throughout multiple sessions. If you use the {appConstants.website.name}, both
        {appConstants.website.name} and third parties will use cookies to track and monitor some of your activities on
        and off the {appConstants.website.name}, and store and access some data about you, your browsing history, and
        your usage of the {appConstants.website.name}.
      </p>
      <p>
        This policy describes how both {appConstants.website.name} and other third parties use cookies both within and
        without the {appConstants.website.name} and how you can exercise a greater degree of control over cookies.
        Please keep in mind that this may alter your experience with our platform, and may limit certain features
        (including being logged in as a user).
      </p>
      <p>
        <span className='h6'>General Browsing:</span> We use cookies that are important for certain technical features
        of our website, like logging into user accounts and implementing fixes and improvements to our platform.
      </p>
      <p>These cookies:</p>
      <ul>
        <li>
          Enable behavior in our Products and/or Services that is tailored to the activity or preferences of a person
          visiting our properties
        </li>
        <li>Allow users to opt out of certain types of modeling, tailoring, or personalization in our products</li>
        <li>Collect information on our users’ preferences in order to create more useful products</li>
        <li>
          Maintain the regular business operations of our Advertising and Marketing departments (such as one-time
          pop-ups or “hero” displays when first visiting a site and to collect impressions and click data)
        </li>
        <li>
          Help to diagnose and correct downtime, bugs, and errors in our code to ensure that our products are operating
          efficiently
        </li>
      </ul>
      <p>
        <span className='h6'>Advertising:</span> We use cookies to enable advertising with our third-party Partners,
        which in turn allows us to provide many of our services free of charge.
      </p>
      <p>These cookies:</p>
      <ul>
        <li>
          Customize the ad experience for our users, including tailoring job and display ads to the technologies a
          person has previously looked at, the communities a person has visited, and the job ads a person has already
          seen
        </li>
        <li>
          Allow direct communication between a 3rd party partner who hosts a promotional event with us, and users who
          have opted into the promotion
        </li>
        <li>
          Allow us to track when a {appConstants.website.name} user sees or clicks on an ad or later visits a
          third-party website or purchases a product on a third-party website
        </li>
        <li>Collect impressions and click data for internal reporting and product optimization</li>
      </ul>
      <p>
        <span className='h6'>Analytics:</span> We use cookies to compile usage activity in order to better cater our
        Products and Services offerings to you, and to third parties. We DO NOT share identifiable “raw” data with our
        clients or any third parties, however we do make high-level decisions based on aggregated data about your usage
        of our Products and Services.
      </p>
      <p>These cookies:</p>
      <ul>
        <li>Monitor site traffic and behavior flows of users</li>
        <li>Measure the effectiveness of on-site products</li>
        <li>Measure the effectiveness of off-site marketing campaigns and tactics</li>
      </ul>
    </section>
    <section>
      <p className='h5'>WHAT INFORMATION IS COLLECTED ON ME VIA COOKIES?</p>
      <p>
        In general, we collect most data from you via form submission. However, there are cases when visiting our site
        and/or using our platforms in which we may receive certain information through the use of cookies. This data
        will generally not include personally identifying information about you.
      </p>
      <ul>
        <li>Unique identification tokens</li>
        <li>User preferences such as favorite tags (for anonymous users only)</li>
      </ul>
      <p className='h6'>Third Party Cookies</p>
      <p>
        The use of cookies, the names of cookies, and other cookies related cookies technology may change over time and
        {appConstants.website.name} will make all reasonable efforts to notify you by updating our cookies table where
        material changes occur and from time-to-time. Please also note that companies and other organization that
        sponsor pages on {appConstants.website.name} may use cookies or other technologies to learn more about your
        interest in their products and services and in some cases to tailor such products and services to you.
      </p>
    </section>
    <section>
      <div className='grid gs16 gsx'>
        <div className='grid--cell12'>
          <p className='h5'>HOW DO I RESTRICT COOKIES?</p>
          <p>
            If you don’t want {appConstants.website.name} to use cookies when you visit the {appConstants.website.name},
            you can opt-out of certain cookie related processing activities in your
            <a href='/users/preferences/current'> account settings page</a>. If you opt-out of cookies, we (ironically)
            have to set a cookie to tell us that. Please note that {appConstants.website.name} may not work properly and
            you may have diminished functionality if you opt-out of certain cookies.
          </p>
          <p>
            If you decide that you do not want cookies to be set on your device by our third-party Partners, you can
            adjust the settings on your internet browser and choose from the available Cookies setting to best meet your
            preferences. While setting options may vary from browser to browser, you can generally choose to reject some
            or all cookies, or instead to receive a notification when a cookie is being placed on your device. For more
            information, please refer to the user help information for your browser of choice. Please keep in mind that
            cookies may be required for certain functionalities, and by blocking these cookies, you may limit your
            access to certain parts or features of our sites and platforms.
          </p>
          <p>
            Finally, while cookies are set for varying durations on your device, you can manually delete them at any
            time. However, deleting cookies will not prevent the site from setting further cookies on your device unless
            you adjust the settings discussed above.
          </p>
        </div>
      </div>
    </section>
    <section>
      <div className='grid gs16 gsx'>
        <div className='grid--cell12'>
          <p className='h5'>CONTACT US</p>
          <p>
            If you have any questions, comments, or concerns regarding this Cookies Policy, please contact
            {appConstants.website.name} at:
          </p>
          <p>
            <span>privacy (at) sriastrology (dot) com</span>
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default CookiePolicy;
