import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/about/card"
import Project from "../components/about/project"

const About = () => {
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
            <StaticImage
              className="w-48 max-h-80"
              imgClassName="rounded-full max-h-80"
              src="../images/konrad_drozd.jpg"
              alt="Konrad Drozd photo"
              placeholder="blurred"
            ></StaticImage>
          </div>

          <div className="flex flex-col md:ml-7 text-justify">
            <div className="max-w-prose">
              <h3 className="text-center">Hi! I am Konrad!</h3>
              <p>
                I am most comfortable using Java, but depending on the problem
                posed, I also use other technologies such as JavaScript (React,
                Vue.js), Python, Bash, Kotlin. I am a big fan of clean code and
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
              title={"Project #3"}
              duration={"2.5 year"}
              keywords={["Java", "SIP", "Diameter"]}
            >
              A project for a telecommunications operator providing services for
              several countries in Europe. As a team, we created IMS based{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Value-added_service"
              >
                Value-Added-Services
              </a>{" "}
              using SIP and Diameter protocols. Tests (especially functional)
              were extremely important in the project and we spent a lot of time
              on this topic.
            </Project>
            <Project
              title={"Project #2"}
              duration={"9 months"}
              keywords={["Java", "Panther", "SQL"]}
            >
              The aim of the project was to port a part of the ERP-like system
              from ancient technology (Panther, good luck finding what it is) to
              Java. I was a team leader in the project. The difficulty of this
              work was the lack of documentation for the existing application. I
              remember this project as a lesson. It taught me, above all, how
              dangerous is technological debt and showed me live that when
              deadlines are chasing, adding new programmers to the project is
              the last nail in the coffin.
            </Project>
            <Project
              title={"Project #1"}
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
              I was working on a vehicle simulator to test a platform that
              collects real-time information from vehicle sensors. This
              application was supposed to allow the user to manually draw the
              route of the simulated vehicle and to mark events (such as:
              detection of sign/pedestrian/slippery surface, or connection
              problems) on the map. The drawn scenario was saved to a file and
              then it could be used for a real-time simulation using the
              protobuf protocol.
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
              I created a website that displays the weather forecast. The scope
              of work included design, implementation and tests (unit and
              functional). The backend was an REST API based on the existing
              service -{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wunderground.com/"
              >
                Wunderground
              </a>
              . This site's API was not entirely consistent and had some design
              flaws. My job was to improve this API by making an adapter. As
              part of the exercises backend was written in both Jersey and
              Vert.x. Due to the limited number of queries to Wunderground API,
              the cache mechanism has also been implemented.
            </Project>
          </Card>
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-center">Education</h2>
          <Card
            mainTitle="Master of Computer Science"
            subTitle={"October 2015 - June 2020 (5 years)"}
            detailsButton="details"
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
                <span className="font-semibold pb-4">Department of IT and Management</span>
                <div>
                  Member of:{" "}
                  <ul className="pt-1">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://samorzad.pwr.edu.pl/w8"
                      >
                        Faculty Council of the Student Government
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.facebook.com/ASI.PWr"
                      >
                        The Academic IT Association
                      </a>
                    </li>
                  </ul>
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
