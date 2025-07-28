import React, { Component } from "react";

export class About extends Component {
  render() {
    return (
      <>
        <div class="accordion container my-5" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Our Mission
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                At NewsWave, our mission is to revolutionize the way people
                consume news by providing a comprehensive and personalized news
                platform. We believe that staying informed should be effortless
                and enjoyable, and our app is designed to cater to the diverse
                interests of our users. We strive to be a reliable source of
                accurate and up-to-date news, empowering individuals to make
                well-informed decisions and engage with the world around them.
                Our mission is to foster a global community of well-informed
                citizens who are actively engaged in current affairs, promoting
                a more informed and interconnected society.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Key Features
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <strong>Personalized Newsfeed:</strong> NewsWave offers a
                personalized newsfeed that tailors news articles based on users'
                interests, preferences, and location. Say goodbye to sifting
                through irrelevant news, as our smart algorithms curate a feed
                that delivers content aligned with your tastes. <br />
                <strong>Comprehensive Coverage:</strong> Stay informed about a
                wide range of topics, including world news, politics,
                technology, science, entertainment, sports, and more. With
                NewsWave, you'll never miss critical developments in your areas
                of interest. <br />
                <strong>Real-Time Updates:</strong> Our platform provides
                real-time updates on breaking news and developing stories.
                Receive instant notifications for events that matter most to
                you, keeping you ahead of the curve. <br />
                <strong>Multimedia Content:</strong> Immerse yourself in the
                news with our multimedia-rich articles, featuring images,
                videos, infographics, and interactive elements that add depth
                and context to the stories. <br />
                <strong>Save and Share:</strong> Easily save articles for
                offline reading or share them with friends and family through
                various social media platforms. Engage in meaningful discussions
                and contribute to the news conversation with NewsWave's share
                functionalities. <br />
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Our Vision
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Our vision for NewsWave is to become the go-to news app for
                people worldwide, providing a seamless and immersive news
                experience tailored to individual preferences. We aim to bridge
                the gap between reliable news sources and the audience,
                fostering transparency and trust in media consumption. Through
                continuous innovation and user feedback, we strive to enhance
                NewsWave, making it the ultimate tool for staying informed,
                engaged, and connected with the world. <br />
                We envision a global community of curious, critical, and
                informed citizens who are active participants in shaping their
                communities and the world. With NewsWave, we aspire to inspire
                meaningful conversations, promote understanding, and empower
                individuals to be catalysts for positive change. Join us on this
                journey towards a more informed and enlightened society with
                NewsWave as your trusted news companion. <br />
                Discover the power of personalized news with NewsWave today.
                Stay informed, inspired, and connected with the world at your
                fingertips. Together, let's embrace the future of news
                consumption and make a positive impact on how we interact with
                information.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default About;
