import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/about/card"
import Project from "../components/about/project"

import myPhoto from "../images/konrad_drozd.jpg"
import myPhotoSmile from "../images/konrad_drozd_smile.jpg"
import { graphql, useStaticQuery } from "gatsby"

const About = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              mail
            }
          }
        }
      }
    `
  )
  const [replaceImage, setReplaceImage] = useState(false)

  const howLongInCurrentJob = startDate => {
    const diffTime = new Date().getTime() - startDate.getTime()
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30))
    const diffYears = Math.floor(diffMonths / 12)

    let timeDescription = ""

    if (diffYears > 0) {
      timeDescription += diffYears + " year" + (diffYears === 1 ? "" : "s")
    }

    const diffMonthsModulo = diffMonths % 12

    if (diffMonthsModulo > 0) {
      timeDescription +=
        " " + diffMonthsModulo + " month" + (diffMonthsModulo === 1 ? "" : "s")
    }

    if (timeDescription.length !== 0) {
      return timeDescription
    }

    return "just started"
  }

  return (
    <Layout>
      <SEO title="About me" />
      <div className="flex flex-col mt-4 px-4 mx-auto items-center max-w-screen-lg">
        <div className="flex flex-col items-center md:flex-row mx-auto">
          <div className="flex justify-center max-w-1/2 border-b pb-4 md:border-b-0 md:border-r md:pr-4 md:mx-0">
            <img
              className={"w-48 max-h-80 rounded-full"}
              alt="Konrad Drozd"
              src={replaceImage ? myPhotoSmile : myPhoto}
            ></img>
          </div>

          <div className="flex flex-col md:ml-7 text-justify">
            <div className="max-w-prose">
              <h3 className="text-center">Hi! I am Konrad!</h3>
              <p>
                I have touched many technologies and languages, but in the Java
                ecosystem, I feel at home. I consider myself very flexible when
                it comes to choosing the technology and the area in which I am
                supposed to work. In my professional career I have dealt with
                backend, devops and frontend. In the latter, I feel the least
                confident, but I'm already catching up.
              </p>

              <p>
                So far I have spent most of my time in multinational teams, so I
                have no problem communicating in English on a daily basis. I
                have completed the SAFe (Scaled Agile Framework) course and used it at work, so
                I know what it is like to work in large agile projects. I know
                many good programming practices, design patterns, software
                development techniques. Clean code, TDD, process automation,
                Linux environment are my bread and butter.
              </p>

              <p>
                After work, I often do what I do at work - I program (my own
                toys) and discover new interesting technologies 🙂. Apart from
                sitting at the computer, I really enjoy being physically active,
                especially with other people. I like to try various activities,
                but volleyball is something that has been with me for years. I
                often pick up a new topic, unknown to me, explore it over the
                next few weeks and try to apply the acquired knowledge in
                practice. Some of the recent ones are: electronics repair, car mechanics,
                plant lighting, stock market and investing, hairdressing, smart home,
                chess, computer graphics, blogging. The topics usually are very diverse 🙂
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <h2 className="text-center">Experience</h2>

          <Card
            mainTitle="Software Engineer"
            subTitle={
              "July 2017 - currently (" +
              howLongInCurrentJob(new Date(2017, 7, 17)) +")"
            }
            detailsButton="projects"
            onClick={() => setReplaceImage(!replaceImage)}
            image={
              <StaticImage
                alt="TietoEvry"
                className="w-24"
                imgClassName="object-contain"
                imgStyle={{ objectFit: "contain" }}
                src={"../images/tietoevry.png"}
              ></StaticImage>
            }
          >
            <Project
              title={"Telco project"}
              duration={howLongInCurrentJob(new Date(2019, 1, 1))}
              keywords={[
                "Java",
                "Ansible",
                "Vagrant",
                "Docker",
                "React",
                "Spring Boot",
                "Spring JPA",
                "Spring Security",
                "Spring Cloud",
                "GitHub Actions",
                "Gradle",
                "Maven",
                "Linux",
                "Rhino TAS",
                "Bamboo",
                "Jenkins",
                "SVN",
                "Git",
                "Bash",
                "SAFe",
                "Jira",
                "Confluence",
              ]}
            >
              <p>
                A project for a telecommunications operator providing services
                for several countries in Europe. As a team, we mainly created
                IMS based{" "}
                <a href="https://en.wikipedia.org/wiki/Value-added_service">
                  Value-Added-Services
                </a>{" "}
                in Java. The project was very extensive and I had the chance to
                work on things in many areas (frontend, backend, devops).
              </p>

              <p>The things I dealt with:</p>
              <ul>
                <li>development of a Java application for conducting functional tests using the SIP and Diameter protocols
                  (something like{" "}
                  <a href="https://gettaurus.org/">Taurus</a>/
                  <a href="https://www.postman.com/">Postman</a>). It is used internally by all teams as the main tool for testing,</li>
                <li>development of a provisioning system consisting of multiple microservices. It uses discovery service (registry)
                  and authorization mechanisms to access the database,</li>
                <li>development of a framework for IMS-based Value-Added-Services and multiple services based on it</li>
                <li>implementation of CI/CD workflows on GitHub and BitBucket,</li>
                <li>implementation of a dashboard React application,</li>
                <li>creation of automatically generated documentation,</li>
                <li>preparation of automated virtual machines for developers,</li>
                <li>creation of custom Gradle plugins and Docker containers,</li>
                <li>configuration of project build.</li>
              </ul>

              <p>
                We used the <a href="https://www.scaledagile.com/">SAFe</a>{" "}
                framework in the organization and I am a{" "}
                <a href="https://www.credly.com/badges/0ea2e835-2434-4900-a00d-d659cbcf9fca">
                  Certified SAFe 5 Practitioner
                </a>
                .
              </p>
            </Project>
            <Project
              title={"Conversion project"}
              duration={"9 months"}
              keywords={["Java", "Panther", "SQL", "Git", "Jira"]}
            >
              <p>
                The aim of the project was to port a part of the ERP-like system
                from ancient technology (Panther, good luck finding what it is)
                to Java.
              </p>
              <p>
                I was a team leader in the project. The difficulty of this work
                was the lack of documentation for the existing application. I
                remember this project as a lesson. It taught me, above all, how
                dangerous is technological debt and showed me live that when
                deadlines are chasing, adding new programmers to the project is
                the last nail in the coffin.
              </p>
            </Project>
            <Project
              title={"Vehicle simulator project"}
              duration={"2 months"}
              keywords={[
                "Java",
                "JavaScript",
                "Protobuf",
                "Jersey",
                "JaCoCo",
                "Scrum",
              ]}
            >
              <p>
                I was working on a vehicle simulator to test a platform that
                collects real-time information from vehicle sensors.
              </p>
              <p>
                The application was supposed to allow the user to manually draw
                the route of the simulated vehicle and to mark events (such as:
                detection of sign/pedestrian/slippery surface, or connection
                problems) on the map. The drawn scenario was saved to a file and
                then it could be used for a real-time simulation using the
                protobuf protocol.
              </p>
            </Project>
            <Project
              title={"Internship"}
              duration={"3 months"}
              keywords={[
                "Java",
                "Jersey",
                "Vert.x",
                "Hibernate",
                "JSP",
                "JQuery",
                "SoapUI",
              ]}
            >
              <p>
                I created a website that displays the weather forecast. The
                scope of work included design, implementation and tests (unit
                and functional).
              </p>
              <p>
                The backend was an REST API based on the existing service -{" "}
                <a href="https://www.wunderground.com/">Wunderground</a>. This
                site's API was not entirely consistent and had some design
                flaws. My job was to improve this API by making an adapter.
              </p>
              <p>
                As part of the exercises backend was written in both Jersey and
                Vert.x. Due to the limited number of queries to Wunderground
                API, the cache mechanism has also been implemented.
              </p>
            </Project>
          </Card>
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-center">Education</h2>
          <Card
            mainTitle="Bachelor and Master of Computer Science<br>Wroclaw University of Science and Technology"
            subTitle={"October 2015 - June 2020 (5 years)"}
            detailsButton="details"
            onClick={() => setReplaceImage(!replaceImage)}
            image={
              <StaticImage
                alt="Wroclaw University of Science and Technology"
                className="w-24"
                imgClassName="object-contain"
                imgStyle={{ objectFit: "contain" }}
                src={"../images/pwr.png"}
              ></StaticImage>
            }
          >
            <div className="flex flex-row mt-2 pt-1">
              <div className="flex w-24"></div>
              <div className="flex flex-col pl-5">
                <span className="font-semibold pb-4">
                  Department of IT and Management
                </span>
                <div>
                  Member of:{" "}
                  <ol className="pt-1">
                    <li>
                      <a href="https://samorzad.pwr.edu.pl/w8">
                        Faculty Council of the Student Government
                      </a>
                      <ul>
                        <li>organization of special events for students</li>
                        <li>help and problem solving for students</li>
                        <li>
                          training in the field of co-financing for science
                          circles
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/ASI.PWr">
                        The Academic IT Association
                      </a>
                      <ul>
                        <li>
                          development of{" "}
                          <a href="https://github.com/kkdrz/SesjaLinuksowa">
                            an android application
                          </a>{" "}
                          for{" "}
                          <a href="https://www.facebook.com/events/1042231065818542/">
                            the 13th Linux session
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col text-center">
          <h2 className="text-center">Contact</h2>
          <p>
            If you want to know more about me, check the services from the
            footer. <br />
            If you want to contact me, e-mail is the best choice:{" "}
            <a href={"mailto:" + siteMetadata.author?.mail}>
              {siteMetadata.author?.mail}
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
