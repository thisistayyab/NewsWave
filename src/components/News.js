import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  var url = {
    status: "ok",
    totalResults: 35,
    articles: [
      {
        source: { id: null, name: "The Athletic" },
        author: "Rustin Dodd and Stephen J. Nesbitt",
        title:
          "MLB waivers explained: How Angels’ salary dump could alter pennant race - The Athletic",
        description:
          "Which contenders could add talent? Which teams could be agents of chaos by blocking rivals?",
        url: "https://theathletic.com/4817320/2023/08/29/mlb-waivers-explained-angels/",
        urlToImage:
          "https://cdn.theathletic.com/app/uploads/2023/08/01115656/Giolito0801-scaled-e1690905456322.jpg",
        publishedAt: "2023-08-30T03:45:54Z",
        content:
          "First the Angelswent for it at the deadline. Then they cratered in epic fashion. Now they may have one final say on baseballs pennant races.\r\nThe Angels placed nearly a fifth of their roster on waive… [+10596 chars]",
      },
      {
        source: { id: null, name: null },
        author: null,
        title: null,
        description: null,
        url: null,
        urlToImage: null,
        publishedAt: null,
        content: null,
      },
      {
        source: { id: null, name: "Newsnationnow.com" },
        author: "Liz Jassin",
        title:
          "‘Nothing like it’: Loeb on interstellar meteor found in ocean - NewsNation Now",
        description:
          "Loeb, the head of the Galileo Project, says that the team is “very confident” the materials found aren’t from our solar system.",
        url: "https://www.newsnationnow.com/vargasreports/avi-loeb-interstellar-meteor-pacific-ocean/",
        urlToImage:
          "https://www.newsnationnow.com/wp-content/uploads/sites/108/2023/08/F63962B6467E5C95C137BBE7EC6DAC3F.jpg?w=1280",
        publishedAt: "2023-08-30T03:06:13Z",
        content:
          "(NewsNation) The remains of a small meteor discovered in the ocean are “far beyond what you find in the solar system,” according to astrophysicist Avi Loeb.\r\nNearly a decade ago, a meteor traveling f… [+1739 chars]",
      },
      {
        source: { id: "politico", name: "Politico" },
        author: null,
        title:
          "As search in Maui nears end, it's unclear how many lost their lives - POLITICO",
        description:
          'Maui Police Chief John Pelletier said urban search and rescue teams have “completed 100% of their area."',
        url: "https://www.politico.com/news/2023/08/29/as-search-in-maui-nears-end-its-unclear-how-many-lost-their-lives-00113434",
        urlToImage:
          "https://static.politico.com/ae/85/3852c6354b0ea384cc73f11587a5/hawaii-fires-police-chief-57962.jpg",
        publishedAt: "2023-08-30T02:31:32Z",
        content:
          "We have wrapped up almost completely the search and recovery mission and moving into the next phase, Darryl Oliveira, the interim administrator of the Maui Emergency Management Agency, said at a news… [+1283 chars]",
      },
      {
        source: { id: null, name: "Eonline.com" },
        author: "Gabrielle Chung",
        title:
          "Police Find Jenelle Evans’ Son Jace After He Goes Missing Again - E! NEWS",
        description:
          "Jenelle Evans' 14-year-old son Jace was found just 10 minutes away from his family home after he was reported missing on Aug. 28, according to the Teen Mom star's manager August Keen.",
        url: "https://www.eonline.com/news/1384398/police-find-teen-mom-star-jenelle-evans-son-jace-after-he-goes-missing-again",
        urlToImage:
          "https://akns-images.eonline.com/eol_images/Entire_Site/2023729/cr_1200x1200-230829183740-362673198_18384305995027656_1372926382908973340_n.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",
        publishedAt: "2023-08-30T02:16:00Z",
        content:
          "Jenelle Evans' son Jace is back home once again.\r\nThe 14-year-old was found by the police near his North Carolina home on Aug. 28, just hours after he was reported missing, Jenelle's manager August K… [+771 chars]",
      },
      {
        source: { id: null, name: "Atlanta Journal Constitution" },
        author: "Chris Joyner",
        title:
          "Last of Trump defendants in Fulton election probe gets bond -  The Atlanta Journal Constitution",
        description: "",
        url: "https://www.ajc.com/news/last-of-trump-defendants-in-fulton-election-probe-gets-bond/7R3436UKGBBNFIB4KJ6VM42O2E/",
        urlToImage:
          "https://www.ajc.com/resizer/ucdJ9ELCNWbmRbBodRX77n5hGBQ=/1200x630/cloudfront-us-east-1.images.arcpublishing.com/ajc/XVLPMMT3A5C6XNJBJJP7HC7V4A.jpg",
        publishedAt: "2023-08-30T01:26:52Z",
        content:
          "Harrison Floyd, the only one of the 19 people charged in the sprawling Fulton County election probe to spend time in jail, has been given a $100,000 bond.\r\nSuperior Court Judge Scott McAfee signed th… [+4463 chars]",
      },
      {
        source: { id: null, name: "Eonline.com" },
        author: "Gabrielle Chung",
        title:
          "See Selena Gomez's Sister Gracie Shave Brooklyn Beckham's Head - E! NEWS",
        description:
          "Selena Gomez's 10-year-old sister Gracie Teefey adorably buzzed off pal Brooklyn Beckham's hair in a new photo. See David Beckham's look-alike son rock his signature shaved look.",
        url: "https://www.eonline.com/news/1384395/see-selena-gomezs-sister-gracie-shave-brooklyn-beckhams-head",
        urlToImage:
          "https://akns-images.eonline.com/eol_images/Entire_Site/2023729/cr_1200x1200-230829173701-GettyImages-1455631951.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",
        publishedAt: "2023-08-30T01:24:00Z",
        content:
          'Look at her now: Selena Gomez\'s little sister is all grown up.\r\nIn fact, Gracie Teefey is now joining the "Single Soon" singer on her hangouts with friends, going so far as to giving Brooklyn Beckham… [+963 chars]',
      },
      {
        source: { id: "nbc-news", name: "NBC News" },
        author: "The Associated Press",
        title:
          "Jacksonville shooting: Gunman stayed in his room after dropping out of college, losing job, father says in 911 audio - NBC News",
        description:
          "The Jacksonville shooter used to work at a dollar store and stopped in at one before a security guard’s presence apparently led him to instead target the Dollar General down the road, where he killed three people.",
        url: "https://www.nbcnews.com/news/us-news/jacksonville-gunman-stayed-room-dropping-college-losing-job-father-say-rcna102472",
        urlToImage:
          "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2023-08/230828-jacksonville-sj-955-aff40e.jpg",
        publishedAt: "2023-08-30T00:48:00Z",
        content:
          "JACKSONVILLE, Fla. The Jacksonville shooter used to work at a dollar store and stopped in at one before a security guards presence apparently led him to instead target the Dollar General down the roa… [+5472 chars]",
      },
      {
        source: { id: null, name: "Yahoo Entertainment" },
        author: "ASHOK SHARMA",
        title:
          "India's moon rover confirms sulfur and detects several other elements near the lunar south pole - Yahoo News",
        description:
          "India’s moon rover confirmed the presence of sulfur and detected several other elements near the lunar south pole as it searches for signs of frozen water...",
        url: "https://news.yahoo.com/indias-moon-rover-confirms-sulfur-192357077.html",
        urlToImage:
          "https://s.yimg.com/ny/api/res/1.2/mOYcSfCCq8Ajo2sKK9i7LA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04OTY-/https://media.zenfs.com/en/ap.org/842574685af749270d6e76efa1bd2a87",
        publishedAt: "2023-08-30T00:48:00Z",
        content:
          "NEW DELHI (AP) Indias moon rover confirmed the presence of sulfur and detected several other elements near the lunar south pole as it searches for signs of frozen water nearly a week after its histor… [+2364 chars]",
      },
      {
        source: { id: null, name: "CNBC" },
        author: "Lee Ying Shan",
        title:
          "India to launch mission to study the sun — just days after successful moon landing - CNBC",
        description:
          "Days after India's successful moon mission, the country is now setting its sights on the sun.",
        url: "https://www.cnbc.com/2023/08/30/india-to-launch-mission-to-study-sun-days-after-chandrayaan-3-landing.html",
        urlToImage:
          "https://image.cnbcfm.com/api/v1/image/107293094-1693300534214-gettyimages-1232127909-economou-notitle210404_npTZC.jpeg?v=1693356294&w=1920&h=1080",
        publishedAt: "2023-08-30T00:44:00Z",
        content:
          "Days after India's successful moon mission, the country is now setting its sights on the sun. \r\nAccording to the Indian Space Research Organization (ISRO), the Aditya-L1 spacecraft will be launched f… [+1546 chars]",
      },
      {
        source: { id: null, name: "YouTube" },
        author: null,
        title:
          "Mayor Bissen, state and federal officials provide updates on Maui wildfire recovery efforts - KITV",
        description:
          "Mayor Richard Bissen is holding a press conference, joined by federal, state and county officials, with the latest on the wildfire recovery efforts on Maui.S...",
        url: "https://www.youtube.com/watch?v=r1BJAylne2E",
        urlToImage:
          "https://i.ytimg.com/vi/r1BJAylne2E/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgXChFMA8=&rs=AOn4CLCuZ8Si8qT_EAEzdcLSTwiWfAMeMw",
        publishedAt: "2023-08-30T00:28:33Z",
        content: null,
      },
      {
        source: { id: "espn", name: "ESPN" },
        author: "NFL Nation",
        title:
          "NFL cuts tracker 2023: Live roster updates for all 32 teams - ESPN - ESPN",
        description:
          "With the 2023 season a week away, NFL teams were required to finalize their 53-man rosters on Tuesday. We tracked every team's cuts here.",
        url: "https://www.espn.com/nfl/story/_/id/38259317/nfl-cuts-tracker-2023-live-roster-updates-all-32-teams",
        urlToImage:
          "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0829%2Fr1217417_1296x729_16%2D9.jpg",
        publishedAt: "2023-08-30T00:24:00Z",
        content:
          "The 2023 NFL season will kick off next week as the Super Bowl champion Kansas City Chiefs host the Detroit Lions on Thursday, Sept. 7 (8:20 p.m. ET, NBC), which means teams are cutting their rosters … [+42828 chars]",
      },
      {
        source: { id: null, name: "TODAY" },
        author: "Alex Portée",
        title:
          "Fergie and Josh Duhamel's Son Looks Like Dad In New Pic: Meet Axl Jack - TODAY",
        description:
          "Fergie is celebrating her son Axl Jack's 10th birthday. The singer shares Axl with her former husband, Josh Duhamel. Here's a look at how the two have co-parented their son.",
        url: "https://www.today.com/parents/fergie-josh-duhamel-son-axl-jack-rcna102467",
        urlToImage:
          "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/newscms/2020_48/1641269/fergie-josh-duhamel-te-main-201124.jpg",
        publishedAt: "2023-08-30T00:02:00Z",
        content:
          "Fergie is celebrating a milestone birthday for her son, Axl Jack!\r\nOn Aug. 29, the 48-year-old singer marked her sons 10th birthday with a post on Instagram. The post featured a carousel of pictures … [+3039 chars]",
      },
      {
        source: { id: null, name: "POLITICO.eu" },
        author: "Stuart Lau",
        title:
          "UK parliament calls Taiwan ‘independent country’ as Cleverly visits China - POLITICO Europe",
        description:
          "‘Taiwan possesses all the qualifications for statehood,’ a parliamentary committee report says.",
        url: "https://www.politico.eu/article/uk-parliament-calls-taiwan-independent-country-report-says-james-cleverly-visit-china/",
        urlToImage:
          "https://www.politico.eu/cdn-cgi/image/width=1200,height=630,fit=crop,quality=80,onerror=redirect/wp-content/uploads/2023/08/29/GettyImages-1242335275-scaled.jpg",
        publishedAt: "2023-08-30T00:01:00Z",
        content:
          'Press play to listen to this article\r\nVoiced by artificial intelligence.\r\nThe British parliament has for the first time referred to Taiwan as an "independent country" in an official document, breakin… [+3362 chars]',
      },
      {
        source: { id: null, name: null },
        author: null,
        title: null,
        description: null,
        url: null,
        urlToImage: null,
        publishedAt: null,
        content: null,
      },
      {
        source: { id: null, name: "Fox Business" },
        author: "Daniella Genovese",
        title:
          "This European airline is launching an 'adult-only' section - Fox Business",
        description:
          'Corendon Airlines announced Tuesday that its the first Turkish-Dutch airline to create an "Only Adult zone." It will be on flights between Amsterdam and Curaçao.',
        url: "https://www.foxbusiness.com/lifestyle/european-airline-launching-adult-only-section",
        urlToImage:
          "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2023/08/0/0/Corendon.jpg?ve=1&tl=1",
        publishedAt: "2023-08-29T23:15:25Z",
        content:
          'A European airline is launching an adult-only section for some of its international flights.\r\nCorendon Airlines announced Tuesday that it will have an "Only Adult zone" on flights between Amsterdam a… [+1507 chars]',
      },
      {
        source: { id: "cnn", name: "CNN" },
        author: "Elisabeth Buchwald",
        title:
          "US financial regulators green lit new rules aimed at reducing the cost of bank failures - CNN",
        description:
          "A group of US financial regulators signed off on new rules aimed at preparing large and regional banks for failure. in the event they fail.",
        url: "https://www.cnn.com/2023/08/29/business/bank-long-term-debt-rule/index.html",
        urlToImage:
          "https://media.cnn.com/api/v1/images/stellar/prod/230829105445-fdic-bank-failures-rules.jpg?c=16x9&q=w_800,c_fill",
        publishedAt: "2023-08-29T22:56:00Z",
        content:
          "US financial regulators on Tuesday signed off on new rules to prepare large and regional banks in the case of failure. \r\nOfficials at the Federal Deposit Insurance Corporation, Federal Reserve and Of… [+3880 chars]",
      },
      {
        source: { id: null, name: null },
        author: null,
        title: null,
        description: null,
        url: null,
        urlToImage: null,
        publishedAt: null,
        content: null,
      },
      {
        source: { id: null, name: "13WHAM-TV" },
        author: "Andrew MacBeath",
        title:
          "Monroe County sees small surge in COVID cases; doctors urge citizens to stay aware - 13WHAM-TV",
        description:
          "Rochester, N.Y. (WHAM) &mdash; As local students begin to return to the classroom, cases of a new COVID subvariant of omicron are on the rise.MORE |COVID-19 cases sl",
        url: "https://13wham.com/news/local/monroe-county-sees-small-surge-in-covid-cases-doctors-urge-citizens-to-stay-aware",
        urlToImage:
          "https://13wham.com/resources/media/833e8520-c238-4b4b-92aa-a2bed3b16433-large16x9_6pPKGLOCALCOVIDCASES.jpg",
        publishedAt: "2023-08-29T22:31:46Z",
        content: null,
      },
      {
        source: { id: null, name: "Sports Illustrated" },
        author: "Sports Illustrated",
        title:
          "Jonathan Taylor Situation Is a Mess of Jim Irsay’s Making - Sports Illustrated",
        description: null,
        url: "https://www.si.com/nfl/2023/08/29/jonathan-taylor-situation-jim-irsay-mess",
        urlToImage: null,
        publishedAt: "2023-08-29T22:30:27Z",
        content: null,
      },
    ],
  };
  const updateNews = async () => {
    props.setProgress(10);
    setloading(true);
    props.setProgress(30);
    props.setProgress(70);
    let parsedData = url;
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsWave - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setpage(page + 1);
    let parsedData = url;
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };
  return (
    <>
      <h2 className="text-center" style={{ margin: "80px 0px 20px 0px" }}>
        NewsWave - Top Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
