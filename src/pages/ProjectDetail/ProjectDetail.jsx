import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Head from "react-helmet";
import { useEffect, useState } from "react";
import GoToTop from "../../components/GoToTop";

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = t(`projects.${projectId}`, { returnObjects: true });

  if (!project) {
    return <div>Project not found.</div>;
  }

  const technologies = project.technologies || [];
  const externalLinks = project.externalLinks || [];
  const challenges = project.challenges || [];
  const solutions = project.solutions || [];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150 z-[100]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Fixed back button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="container mx-auto py-8 px-4">
        <Head>
          <title>
            {project.introduction.name} Project - Kamal Ait Yous Portfolio
          </title>
          <meta name="description" content={project.description} />
        </Head>

        {/* Project Header */}
        <div className="max-w-4xl mx-auto mt-16 mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 text-center font-montserrat uppercase">
            {project.introduction.name}
          </h1>

          {/* Star Separator */}
          <hr className="star-primary mb-8" />

          <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center">
            {project.description}
          </p>

          {/* Project Stats */}
          <div className="flex flex-wrap gap-6 mb-12 justify-center">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">6 months</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="text-gray-700">Team of 5</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">2023</span>
            </div>
          </div>

          {/* Technologies Used */}
          {technologies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Technologies & Skills
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-50 p-8 rounded-lg">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Project Context
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {project.introduction.introduction}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                My Role
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {project.introduction.description}
              </p>
            </div>
          </div>
        </div>

        {/* Key Actions & Impact */}
        {project.tasks && project.tasks.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
              Key Actions & Impact
            </h2>
            <div className="space-y-12">
              {project.tasks.map((taskGroup, groupIndex) => (
                <div
                  key={groupIndex}
                  className="relative bg-gray-50 p-8 rounded-lg"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {taskGroup.group.titre}
                  </h3>
                  {taskGroup.group.intro && (
                    <p className="mb-6 text-gray-700 leading-relaxed">
                      {taskGroup.group.intro}
                    </p>
                  )}
                  <div className="space-y-8">
                    {Object.keys(taskGroup.data).map((taskId, dataIndex) => (
                      <div
                        key={dataIndex}
                        className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-[calc(100%-1rem)] before:bg-blue-500"
                      >
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {taskGroup.data[taskId].title}
                        </h4>
                        <div className="text-gray-700 space-y-2">
                          {taskGroup.data[taskId].description.map(
                            (desc, idx) => (
                              <p key={idx} className="leading-relaxed">
                                {desc}
                              </p>
                            )
                          )}
                        </div>
                        {taskGroup.data[taskId].img && (
                          <img
                            src={taskGroup.data[taskId].img}
                            alt={taskGroup.data[taskId].title}
                            className="mt-4 max-w-full h-auto rounded-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges & Solutions */}
        {(challenges.length > 0 || solutions.length > 0) && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {challenges.length > 0 && (
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Key Challenges
                  </h2>
                  <ul className="space-y-4">
                    {challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">•</span>
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {solutions.length > 0 && (
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Solutions Implemented
                  </h2>
                  <ul className="space-y-4">
                    {solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* External Links */}
        {externalLinks.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              External Links
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Go to Top button */}
      <GoToTop />
    </div>
  );
};

export default ProjectDetail;
