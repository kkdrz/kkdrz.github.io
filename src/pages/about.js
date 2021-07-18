import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/about/card"
import Project from "../components/about/project"

import myPhoto from "../images/konrad_drozd.jpg"
import myPhotoSmile from "../images/konrad_drozd_smile.jpg"

const About = () => {
  const [replaceImage, setReplaceImage] = useState(false)

  const howLongInCurrentJob = startDate => {
    const diffTime = new Date().getTime() - startDate.getTime()
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    const diffYears = Math.ceil(diffMonths / 12)

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
      return "(" + timeDescription + ")"
    }

    return "(just started)"
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
                I have touched many technologies and languages in my life, but
                Java is still my favorite. This may change, as I hear more and
                more positive opinions about the Kotlin language lately, but I
                haven't had the opportunity to use it in any serious project
                yet. In general, I assume that it is more important to know what
                needs to be done, and the implementation itself and the choice
                of technology (i.e. how to do it) is a secondary issue (equally
                important, but secondary).
              </p>
              <p>
                I consider myself very flexible when it comes to choosing the
                technology and the area in which I am supposed to work. In my
                professional career I have dealt with backend, devops and
                frontend. In the latter, I feel the least confident, but I'm
                already catching up.
              </p>
              <p>
                So far I have spent most of my time in multinational teams, so I
                have no problem communicating in English on a daily basis. 
                I am a big fan of clean code and
                process automation. My heart bleeds when I see someone doing
                manual work that can be scripted. Besides, I can prepare an
                environment for application development (VDE, continuous
                integration / deployment). I feel comfortable working with Linux
                systems.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <h2 className="text-center">Experience</h2>

          <Card
            mainTitle="Software Engineer"
            subTitle={
              "July 2017 - currently " +
              howLongInCurrentJob(new Date(2017, 7, 17))
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
              duration={"2.5 year"}
              keywords={[
                "Java",
                "Ansible",
                "Vagrant",
                "Docker",
                "React",
                "Spring Boot",
                "Gradle",
                "Maven",
                "Linux",
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
              <p>
                For a large part of the time, I was developing an application
                for conducting functional tests using the SIP and Diameter
                protocols (something like{" "}
                <a href="https://gettaurus.org/">Taurus</a>/
                <a href="https://www.postman.com/">Postman</a>) and it was used
                by other dev-teams as well.
              </p>
              <p>
                In addition, I also dealt with:
                <ul>
                  <li>configuration of CI/CD pipelines,</li>
                  <li>preparation of virtual machines for developers,</li>
                  <li>creation of Gradle plugins and Docker containers,</li>
                  <li>configuration of project build,</li>
                  <li>implementation of a dashboard React application,</li>
                  <li>documentation configuration and writing.</li>
                </ul>
              </p>
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
            mainTitle="Master of Computer Science"
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
        <div className="flex flex-col">
          <h2 className="text-center">Contact</h2>
          <p>
            The best chance of reading your message is when you send me an
            e-mail - <a href="mailto:konrad@kdrozd.pl">konrad@kdrozd.pl</a> -
            but feel free to contact me using any of the sites in the footer ;)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
